import { useState } from "react";
import { Pressable } from "react-native";
import { useRouter } from "expo-router";
import { LatLng } from 'react-native-maps';
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, YStack, XStack, H3, H5, ScrollView }  from "tamagui";
import { UserCircle, ArrowRight } from '@tamagui/lucide-icons';
import MainPageBackground from "@/components/MainPageBackground";
import Map from "@/components/Map";

type Passenger = {
  name: string;
  location: { latitude: number; longitude: number };
}

function PassengerListItem({ passenger }: { passenger: Passenger }) {
  const router = useRouter();
  return (
    <Pressable onPress={() => router.push({ pathname: '/ride-request-modal', params: { name: passenger.name } })}>
        <XStack
          paddingHorizontal={10}
          paddingVertical={10}
          borderRadius={10}
          gap={10}
          backgroundColor="white"
          alignItems="center"
          >
          <UserCircle size={50} />
          <Text>{passenger.name}</Text>
        </XStack>
    </Pressable>
  );
}

function fetchNearbyPassengers({ latitude, longitude }: LatLng): Passenger[] {

  // return passengers with random locations within a 10-mile radius of the current location
  const randomLat = () => latitude + Math.random() * 0.1 - 0.05;
  const randomLong = () => longitude + Math.random() * 0.1 - 0.05;
  return [
    { name: "Passenger 1", location: { latitude: randomLat(), longitude: randomLong() }, },
    { name: "Passenger 2", location: { latitude: randomLat(), longitude: randomLong() } },
    { name: "Passenger 3", location: { latitude: randomLat(), longitude: randomLong() }, },
    { name: "Passenger 4", location: { latitude: randomLat(), longitude: randomLong() } },
    { name: "Passenger 5", location: { latitude: randomLat(), longitude: randomLong() } },
    { name: "Passenger 6", location: { latitude: randomLat(), longitude: randomLong() } },
    { name: "Passenger 7", location: { latitude: randomLat(), longitude: randomLong() } },
    { name: "Passenger 8", location: { latitude: randomLat(), longitude: randomLong() } },
    { name: "Passenger 9", location: { latitude: randomLat(), longitude: randomLong() } },
    { name: "Passenger 10", location: { latitude: randomLat(), longitude: randomLong() } },
  ];
}


export default function HomePage() {
  const [passengers, setPassengers] = useState<Passenger[]>([]);

  return (
    <MainPageBackground>
      <SafeAreaView mode="margin" style={{ flex: 1, paddingHorizontal: 10, gap: 20 }}>
        <H3 color="white">
        My Rides
        </H3>
        <View marginHorizontal={10} height="30%" overflow="hidden" borderRadius={30}>
          <Map
            onRegionChange={(region) => {
              if (passengers.length === 0) setPassengers(fetchNearbyPassengers(region));
            }}
          />
        </View>

        <XStack alignItems="center" gap={5}>
          <H5 color="white">
            Upcoming Requests
          </H5>
          <ArrowRight color="white" />
        </XStack>
        <ScrollView showsVerticalScrollIndicator={false}>
          <YStack gap={10}>
            {passengers.map((passenger) => <PassengerListItem passenger={passenger} key={passenger.name} />)}
          </YStack>
        </ScrollView>
      </SafeAreaView>
    </MainPageBackground>
  );
}
