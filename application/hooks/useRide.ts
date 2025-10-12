import { useState, useRef, useEffect, useCallback } from 'react';
import { getRoute, RouteInfo, Coordinate } from '@/utils/route';
import { getDistance, getBearing } from '@/utils/location';
import { Driver } from '@/utils/types';
import { useRouter } from 'expo-router'; // Added import

export type RidePhase = 'idle' | 'requesting' | 'driver-en-route' | 'passenger-pickup' | 'en-route-to-destination' | 'arrived';

const SPEED_MULTIPLIER = 10; // Make the simulation 2 times faster

export function useRide() {
  // Added router instance
  const router = useRouter();

  // Ride state
  const [phase, setPhase] = useState<RidePhase>('idle');
  const [pickup, setPickup] = useState<Coordinate | null>(null);
  const [destination, setDestination] = useState<Coordinate | null>(null);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [route, setRoute] = useState<RouteInfo | null>(null);

  // Simulation state
  const [simulationState, setSimulationState] = useState<{
    driverLocation: Coordinate | null;
    driverBearing: number;
    remainingDistance: number;
    remainingDuration: number;
    remainingRoute: Coordinate[];
  }> ({
    driverLocation: null,
    driverBearing: 0,
    remainingDistance: 0,
    remainingDuration: 0,
    remainingRoute: [],
  });

  const animationFrameRef = useRef<number>(0);
  const simulationStartTimeRef = useRef<number>(0);

  // Store phase in a ref to access its latest value inside animate without re-creating animate
  const phaseRef = useRef(phase);
  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  const driverLocationRef = useRef(simulationState.driverLocation);
  useEffect(() => {
    driverLocationRef.current = simulationState.driverLocation;
  }, [simulationState.driverLocation]);

  const animate = useCallback((currentRoute: RouteInfo, duration: number) => {
    const elapsedTime = (Date.now() - simulationStartTimeRef.current) / 1000;
    const progress = elapsedTime / duration;

    if (progress >= 1) {
      setSimulationState(prev => ({
        ...prev,
        driverLocation: currentRoute.coordinates[currentRoute.coordinates.length - 1],
        remainingRoute: [],
        remainingDistance: 0,
        remainingDuration: 0,
      }));
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      // Handle arrival using phaseRef.current
      if (phaseRef.current === 'driver-en-route') {
        setPhase('passenger-pickup');
      } else if (phaseRef.current === 'en-route-to-destination') {
        setPhase('arrived');
      }
      return;
    }

    const distanceCovered = progress * currentRoute.distance;
    let distanceAccumulator = 0;
    let currentSegmentIndex = -1;

    for (let i = 0; i < currentRoute.coordinates.length - 1; i++) {
      const segmentDistance = getDistance(currentRoute.coordinates[i], currentRoute.coordinates[i + 1]);
      if (distanceAccumulator + segmentDistance >= distanceCovered) {
        currentSegmentIndex = i;
        break;
      }
      distanceAccumulator += segmentDistance;
    }

    if (currentSegmentIndex !== -1) {
      const segment = { start: currentRoute.coordinates[currentSegmentIndex], end: currentRoute.coordinates[currentSegmentIndex + 1] };
      const distanceIntoSegment = distanceCovered - distanceAccumulator;
      const segmentDistance = getDistance(segment.start, segment.end);
      const fractionOfSegment = segmentDistance > 0 ? distanceIntoSegment / segmentDistance : 0;

      const interpolatedLat = segment.start.latitude + (segment.end.latitude - segment.start.latitude) * fractionOfSegment;
      const interpolatedLng = segment.start.longitude + (segment.end.longitude - segment.start.longitude) * fractionOfSegment;
      const newDriverLocation = { latitude: interpolatedLat, longitude: interpolatedLng };
      const newDriverBearing = getBearing(segment.start, segment.end);

      const newRemainingRoute = [newDriverLocation, ...currentRoute.coordinates.slice(currentSegmentIndex + 1)];

      let newRemainingDistance = getDistance(newDriverLocation, segment.end);
      for (let i = currentSegmentIndex + 1; i < currentRoute.coordinates.length - 1; i++) {
        newRemainingDistance += getDistance(currentRoute.coordinates[i], currentRoute.coordinates[i + 1]);
      }
      const newRemainingDuration = duration - elapsedTime;

      setSimulationState(prev => ({
        ...prev,
        driverLocation: newDriverLocation,
        driverBearing: newDriverBearing,
        remainingRoute: newRemainingRoute,
        remainingDistance: newRemainingDistance,
        remainingDuration: newRemainingDuration,
      }));
    }

    animationFrameRef.current = requestAnimationFrame(() => animate(currentRoute, duration));
  }, [setSimulationState, setPhase, animationFrameRef, simulationStartTimeRef]); // Dependencies for useCallback

  const startSimulation = async (start: Coordinate, end: Coordinate) => {
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    
    const newRoute = await getRoute(start, end, 'driving-traffic');
    if (newRoute && newRoute.coordinates.length > 0) {
      setRoute(newRoute);
      setSimulationState(prev => ({ ...prev, driverLocation: start }));
      simulationStartTimeRef.current = Date.now();
      animate(newRoute, newRoute.duration / SPEED_MULTIPLIER);
    }
  };
 
  const requestRide = (pickup: Coordinate, destination: Coordinate, driver: Driver) => {
    setPickup(pickup);
    setDestination(destination);
    setSelectedDriver(driver);
    setPhase('requesting');
  };

  const confirmRide = () => {
    if (pickup && selectedDriver) {
      setPhase('driver-en-route');
      startSimulation(selectedDriver.location, pickup);
    }
  };
  
  const confirmPickup = () => {
    if (pickup && destination) {
      setPhase('en-route-to-destination');
      startSimulation(pickup, destination);
      router.replace('/(passenger)/(tabs)/map-to-destination'); // Added navigation
    }
  };

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return {
    phase,
    pickup,
    destination,
    selectedDriver,
    route,
    driverLocation: simulationState.driverLocation,
    driverBearing: simulationState.driverBearing,
    remainingDistance: simulationState.remainingDistance,
    remainingDuration: simulationState.remainingDuration,
    remainingRoute: simulationState.remainingRoute,
    requestRide,
    confirmRide,
    confirmPickup,
    setDestination,
    setPickup,
  };
}

