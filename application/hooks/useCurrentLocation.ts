import { useEffect, useState } from "react";
import * as Location from 'expo-location';

export default function useCurrentLocation() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      const subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 2000,
          distanceInterval: 5,
        },
        setLocation
      );
      // Clean up on unmount
      return () => subscription.remove();
    })();
  }, []);

  return location;
}
