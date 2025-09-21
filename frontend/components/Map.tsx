import { useEffect, useRef, useState } from "react";
import MapView, { LatLng, MapMarker, Marker, Region } from "react-native-maps";
import * as Location from 'expo-location';

type MapProps = {
  onRegionChange?: (region: Region) => void;
};

export default function Map({ onRegionChange }: MapProps) {
  const [region, setRegion] = useState<Region>();
  const [userMarkerLatLng, setUserMarkerLatLng] = useState<LatLng>();
  const mapRef = useRef<MapView>(null);
  const userMapMarkerRef = useRef<MapMarker>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        // TODO: beter error handling
        console.warn('Location permission denied');
        return;
      }

      const subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 2000,
          distanceInterval: 5,
        },
        (loc) => {
          const { latitude, longitude } = loc.coords;
          setRegion({
            latitude,
            longitude,
            latitudeDelta: region?.latitudeDelta || 0.01,
            longitudeDelta: region?.longitudeDelta || 0.01,
          });
          setUserMarkerLatLng({ latitude, longitude });

          // if (onRegionChange && region) {
          //   onRegionChange(region);
          // }
        }
      );
      // Clean up on unmount
      return () => subscription.remove();
    })();
  }, []);


  useEffect(() => {
    if (!region) return;
    if (mapRef.current) {
      mapRef.current.animateToRegion(region, 1000);
    }
    if (userMapMarkerRef.current) {
      userMapMarkerRef.current.setCoordinates(region);
    }

    console.log(region);
    if (onRegionChange) {
      onRegionChange(region);
    }
  }, [region]);
  return (
    <MapView
      ref={mapRef}
      style={{ width: "100%", height: "100%" }}
      scrollEnabled={false}
      region={region}
    >
      {userMarkerLatLng &&
        <Marker
          ref={userMapMarkerRef}
          coordinate={userMarkerLatLng}
          title="Current Location"
          description="You are here"
        />
      }
    </MapView>
  );
}
