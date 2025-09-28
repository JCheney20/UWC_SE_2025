import { useState } from "react";
import { Pressable } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, YStack, XStack, H4, ScrollView } from "tamagui";
import { UserCircle, ArrowRight } from '@tamagui/lucide-icons';
import MainPageBackground from "@/components/MainPageBackground";
import Map from "@/components/Map";
import { Driver } from "@/utils/types";
import { fetchNearbyDrivers } from "@/utils/mock-data";


function DriverListItem({ driver }: { driver: Driver }) {
  return (
    <Link href="/selected-driver" asChild>
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
          <Text>{driver.name}</Text>
        </XStack>
      </Pressable>
    </Link>
  );
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
