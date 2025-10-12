import { useState, useRef, useEffect } from 'react';
import { getRoute, RouteInfo, Coordinate } from '@/utils/route';
import { getDistance, getBearing } from '@/utils/location';
import { Driver } from '@/utils/types';

export type RidePhase = 'idle' | 'requesting' | 'driver-en-route' | 'passenger-pickup' | 'en-route-to-destination' | 'arrived';

export function useRide() {
  // Ride state
  const [phase, setPhase] = useState<RidePhase>('idle');
  const [pickup, setPickup] = useState<Coordinate | null>(null);
  const [destination, setDestination] = useState<Coordinate | null>(null);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [route, setRoute] = useState<RouteInfo | null>(null);

  // Simulation state
  const [driverLocation, setDriverLocation] = useState<Coordinate | null>(null);
  const [driverBearing, setDriverBearing] = useState(0);
  const [remainingDistance, setRemainingDistance] = useState(0);
  const [remainingDuration, setRemainingDuration] = useState(0);
  const [remainingRoute, setRemainingRoute] = useState<Coordinate[]>([]);

  const animationFrameRef = useRef<number>(0);
  const simulationStartTimeRef = useRef<number>(0);

  const animate = (currentRoute: RouteInfo, duration: number) => {
    const elapsedTime = (Date.now() - simulationStartTimeRef.current) / 1000;
    const progress = elapsedTime / duration;

    if (progress >= 1) {
      setDriverLocation(currentRoute.coordinates[currentRoute.coordinates.length - 1]);
      setRemainingRoute([]);
      setRemainingDistance(0);
      setRemainingDuration(0);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      // Handle arrival
      if (phase === 'driver-en-route') {
        setPhase('passenger-pickup');
      } else if (phase === 'en-route-to-destination') {
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

      setDriverLocation(newDriverLocation);
      setDriverBearing(getBearing(segment.start, segment.end));

      const newRemainingRoute = [newDriverLocation, ...currentRoute.coordinates.slice(currentSegmentIndex + 1)];
      setRemainingRoute(newRemainingRoute);

      let newRemainingDistance = getDistance(newDriverLocation, segment.end);
      for (let i = currentSegmentIndex + 1; i < currentRoute.coordinates.length - 1; i++) {
        newRemainingDistance += getDistance(currentRoute.coordinates[i], currentRoute.coordinates[i + 1]);
      }
      setRemainingDistance(newRemainingDistance);
      setRemainingDuration(duration - elapsedTime);
    }

    animationFrameRef.current = requestAnimationFrame(() => animate(currentRoute, duration));
  };

  const startSimulation = async (start: Coordinate, end: Coordinate) => {
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    
    const newRoute = await getRoute(start, end, 'driving-traffic');
    if (newRoute && newRoute.coordinates.length > 0) {
      setRoute(newRoute);
      setDriverLocation(start);
      simulationStartTimeRef.current = Date.now();
      animate(newRoute, newRoute.duration);
    }
  };

  const requestRide = (pickup: Coordinate, destination: Coordinate, driver: Driver) => {
    setPickup(pickup);
    setDestination(destination);
    setSelectedDriver(driver);
    setPhase('requesting');
  };

  const confirmRide = () => {
    console.log("useRide - confirmRide called.");
    console.log("useRide - confirmRide: pickup =", pickup);
    console.log("useRide - confirmRide: selectedDriver =", selectedDriver);
    if (pickup && selectedDriver) {
      setPhase('driver-en-route');
      console.log("useRide - confirmRide: phase set to 'driver-en-route'.");
      // startSimulation(selectedDriver.location, pickup);
    } else {
      console.log("useRide - confirmRide: conditions not met (pickup or selectedDriver is null).");
    }
  };
  
  const confirmPickup = () => {
    if (pickup && destination) {
      setPhase('en-route-to-destination');
      startSimulation(pickup, destination);
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
    driverLocation,
    driverBearing,
    remainingDistance,
    remainingDuration,
    remainingRoute,
    requestRide,
    confirmRide,
    confirmPickup,
    setDestination,
    setPickup,
  };
}
