import { useEffect, useRef, useState } from "react";
import * as Location from 'expo-location';
import { ImageBackground } from "expo-image";
import MapView, { LatLng, MapMarker, Region, Marker } from 'react-native-maps';
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, YStack, XStack, H5, ScrollView } from "tamagui";
import { UserCircle, ArrowRight } from '@tamagui/lucide-icons';

type Driver = {
  name: string;
  location: { latitude: number; longitude: number };
}

function DriverListItem({ driver }: { driver: Driver }) {
  return (
    <XStack
      paddingHorizontal={10}
      paddingVertical={10}
      borderRadius={10}
      gap={10}
      backgroundColor="white"
      alignItems="center"
    >
      <UserCircle size={50} />
      <Text>{driver.name}</Text>
    </XStack>
  );
}

function fetchNearbyDrivers({ latitude, longitude }: LatLng): Driver[] {

  // return drivers with random locations within a 10-mile radius of the current location
  const randomLat = () => latitude + Math.random() * 10;
  const randomLong = () => longitude + Math.random() * 10;
  return [
    { name: "Driver 1", location: { latitude: randomLat(), longitude: randomLong() }, },
    { name: "Driver 2", location: { latitude: randomLat(), longitude: randomLong() } },
    { name: "Driver 3", location: { latitude: randomLat(), longitude: randomLong() }, },
    { name: "Driver 4", location: { latitude: randomLat(), longitude: randomLong() } },
    { name: "Driver 5", location: { latitude: randomLat(), longitude: randomLong() } },
    { name: "Driver 6", location: { latitude: randomLat(), longitude: randomLong() } },
    { name: "Driver 7", location: { latitude: randomLat(), longitude: randomLong() } },
    { name: "Driver 8", location: { latitude: randomLat(), longitude: randomLong() } },
    { name: "Driver 9", location: { latitude: randomLat(), longitude: randomLong() } },
    { name: "Driver 10", location: { latitude: randomLat(), longitude: randomLong() } },
  ];
}

export default function() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [region, setRegion] = useState<Region>();
  const [userMarkerLatLng, setUserMarkerLatLng] = useState<LatLng>();
  const mapRef = useRef<MapView>(null);
  const userMapMarkerRef = useRef<MapMarker>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
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
        }
      );
      // Clean up on unmount
      return () => subscription.remove();
    })();
  }, []);

  useEffect(() => {
    if (!region) return;
    if (mapRef.current) {
      mapRef.current.animateToRegion(region, 500);
    }
    if (userMapMarkerRef.current) {
      userMapMarkerRef.current.setCoordinates(region);
    }

    if (drivers.length === 0) {
      setDrivers(fetchNearbyDrivers(region));
    }
  }, [region]);

  console.log(region);

  return (
    <ImageBackground
      source={require('../../assets/images/background-gradient.jpg')}
      style={{ width: "100%", height: "100%" }}
    >
      <SafeAreaView mode="margin" style={{ flex: 1, paddingHorizontal: 10, gap: 20 }}>
        <View paddingHorizontal={10} height="30%">
          <MapView
            ref={mapRef}
            style={{ width: "100%", height: "100%" }}
            scrollEnabled={false}
            region={region} >
            {userMarkerLatLng &&
              <Marker
                ref={userMapMarkerRef}
                coordinate={userMarkerLatLng}
                title="Current Location"
                description="You are here"
              />
            }
          </MapView>
        </View>

        <H5 color="white">
          Available Drivers <ArrowRight color="white" />
        </H5>
        <ScrollView showsVerticalScrollIndicator={false}>
          <YStack gap={10}>
            {drivers.map((driver) => <DriverListItem driver={driver} key={driver.name} />)}
          </YStack>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}
