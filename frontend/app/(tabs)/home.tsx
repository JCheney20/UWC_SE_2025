import { useState } from "react";
import { LatLng } from 'react-native-maps';
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, YStack, XStack, H4, ScrollView } from "tamagui";
import { UserCircle, ArrowRight } from '@tamagui/lucide-icons';
import MainPageBackground from "@/components/MainPageBackground";
import Map from "@/components/Map";
import { Pressable } from "react-native";
import { useRouter } from "expo-router";

type Driver = {
  name: string;
  location: { latitude: number; longitude: number };
}

function DriverListItem({ driver }: { driver: Driver }) {
  const router = useRouter();
  return (
    <Pressable onPress={() => router.push({ pathname: '/ride-confirmed-modal' })}>
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
    </Pressable>
  );
}

function fetchNearbyDrivers({ latitude, longitude }: LatLng): Driver[] {

  // return drivers with random locations within a 10-mile radius of the current location
  const randomLat = () => latitude + Math.random() * 0.1 - 0.05;
  const randomLong = () => longitude + Math.random() * 0.1 - 0.05;
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

export default function HomePage() {
  const [drivers, setDrivers] = useState<Driver[]>([]);

  return (
    <MainPageBackground>
      <SafeAreaView mode="margin" style={{ flex: 1, paddingHorizontal: 10, gap: 20 }}>
        <View marginHorizontal={10} height="30%" overflow="hidden" borderRadius={30}>
          <Map
            onRegionChange={(region) => {
              if (drivers.length === 0) setDrivers(fetchNearbyDrivers(region));
            }}
          />
        </View>

        <XStack alignItems="center" gap={5}>
          <H4 color="white">
            Available Drivers
          </H4>
          <ArrowRight color="white" fontWeight={800} />
        </XStack>
        <ScrollView showsVerticalScrollIndicator={false}>
          <YStack gap={10}>
            {drivers.map((driver) => <DriverListItem driver={driver} key={driver.name} />)}
          </YStack>
        </ScrollView>
      </SafeAreaView>
    </MainPageBackground>
  );
}
