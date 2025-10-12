import { useEffect, useRef, useState } from "react";
import MapView, { LatLng, MapMarker, Marker, Polyline, Region } from "react-native-maps";
import * as Location from 'expo-location';
import { Coordinate } from "@/utils/route";

type MapProps = {
  onRegionChange?: (region: Region) => void;
  routeCoordinates?: LatLng[];
  startPoint?: Coordinate;
  endPoint?: Coordinate;
  children?: React.ReactNode;
};

/*
 * This component is used to display a map with a user's current location.
 * It uses the react-native-maps library to display the map and the user's location.
 */
export default function Map({ onRegionChange, routeCoordinates, startPoint, endPoint, children }: MapProps) {
  const [region, setRegion] = useState<Region>();
  const [userMarkerLatLng, setUserMarkerLatLng] = useState<LatLng>();
  const mapRef = useRef<MapView>(null);
  const userMapMarkerRef = useRef<MapMarker>(null);

  // Correct placement for useRef
  const latestRegion = useRef(region);
  const latestUserMarkerLatLng = useRef(userMarkerLatLng);

  // Update refs whenever state changes
  useEffect(() => {
    latestRegion.current = region;
  }, [region]);

  useEffect(() => {
    latestUserMarkerLatLng.current = userMarkerLatLng;
  }, [userMarkerLatLng]);


  useEffect(() => { // This is the useEffect for location watching
    let subscriber: Location.LocationSubscription | null = null;

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        // TODO: beter error handling
        console.warn('Location permission denied');
        return;
      }

      subscriber = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 2000,
          distanceInterval: 5,
        },
        (loc) => {
          const { latitude, longitude } = loc.coords;
          const newLatLng = { latitude, longitude };

          // Only update userMarkerLatLng if it has actually changed
          if (!latestUserMarkerLatLng.current || latestUserMarkerLatLng.current.latitude !== newLatLng.latitude || latestUserMarkerLatLng.current.longitude !== newLatLng.longitude) {
            setUserMarkerLatLng(newLatLng);
          }

          const currentRegion = latestRegion.current;
          const newRegion = {
            latitude,
            longitude,
            latitudeDelta: currentRegion?.latitudeDelta || 0.01,
            longitudeDelta: currentRegion?.longitudeDelta || 0.01,
          };
          // Only update region if it has changed significantly and no route is active
          if(!routeCoordinates && (
            !currentRegion ||
            Math.abs(newRegion.latitude - currentRegion.latitude) > 0.0001 ||
            Math.abs(newRegion.longitude - currentRegion.longitude) > 0.0001
          )) {
            setRegion(newRegion);
          }
        }
      );
      // Clean up on unmount
      return () => {
        if (subscriber) {
          subscriber.remove();
        }
      };
    })();
  }, []); // Empty dependency array


  useEffect(() => {
    if (!region) return;
    if (mapRef.current) {
      mapRef.current.animateToRegion(region, 1000);
    }
    if (userMapMarkerRef.current) {
      userMapMarkerRef.current.setCoordinates(region);
    }

    if (onRegionChange) {
      onRegionChange(region);
    }
  }, [region]);

  useEffect(() => {
    if (routeCoordinates && startPoint && endPoint) {
      const latitudes = [startPoint.latitude, endPoint.latitude, ...routeCoordinates.map(c => c.latitude)];
      const longitudes = [startPoint.longitude, endPoint.longitude, ...routeCoordinates.map(c => c.longitude)];

      const minLat = Math.min(...latitudes);
      const maxLat = Math.max(...latitudes);
      const minLng = Math.min(...longitudes);
      const maxLng = Math.max(...longitudes);

      const latDelta = (maxLat - minLat) * 1.5;
      const lngDelta = (maxLng - minLng) * 1.5;

      const newRegion = {
        latitude: (minLat + maxLat) / 2,
        longitude: (minLng + maxLng) / 2,
        latitudeDelta: Math.max(latDelta, 0.01),
        longitudeDelta: Math.max(lngDelta, 0.01)
      };
      setRegion(newRegion);
    }
  }, [routeCoordinates, startPoint, endPoint]);

  return (
    <MapView
      ref={mapRef}
      style={{ width: "100%", height: "100%" }}
      region={region}
    >
      {userMarkerLatLng && !routeCoordinates &&
        <Marker
          ref={userMapMarkerRef}
          coordinate={userMarkerLatLng}
          title="Current Location"
          description="You are here"
        />
      }
      {startPoint && <Marker coordinate={startPoint} title="Start" pinColor="green" />}
      {endPoint && <Marker coordinate={endPoint} title="Destination" pinColor="red" />}
      {routeCoordinates && routeCoordinates.length > 0 && (
        <Polyline
          coordinates={routeCoordinates}
          strokeColor="#007AFF"
          strokeWidth={4}
        />
      )}
      {children}
    </MapView>
  );
}

