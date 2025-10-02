import { useState } from "react";
import { Pressable } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, YStack, XStack, H3, H5, ScrollView } from "tamagui";
import { UserCircle, ArrowRight } from '@tamagui/lucide-icons';
import GradientBackground from "@/components/GradientBackground";
import Map from "@/components/Map";
import { fetchNearbyPassengers } from "@/utils/mock-data";
import { Passenger } from "@/utils/types";


function PassengerListItem({ passenger }: { passenger: Passenger }) {
  return (
    <Link
      href={{ pathname: "/accepted-ride-request", params: { name: passenger.name } }}
      asChild
    >
      <Pressable>
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
    </Link>
  );
}

export default function HomePage() {
  const [passengers, setPassengers] = useState<Passenger[]>([]);

  return (
    <GradientBackground>
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
    </GradientBackground>
  );
}
