import { Tabs, useRouter } from "expo-router";
import { Home, Map, MessageSquare, User } from '@tamagui/lucide-icons';
import { useRideContext } from "@/providers/RideProvider";
import { useEffect } from "react";

function createTabBarOptions(Icon: typeof Home) {
  return {
    tabBarIcon: ({ color, size }: { color: string, size: number }) => <Icon color={color} size={size} />
  };
}

export default function PassengerLayout() {
  const { phase } = useRideContext();
  const router = useRouter();

  console.log("PassengerLayout - Current Phase:", phase);

  useEffect(() => {
    console.log("PassengerLayout - useEffect triggered, phase:", phase);
    if (phase === 'driver-en-route') {
      console.log("PassengerLayout - Navigating to map tab.");
      router.replace('/(passenger)/(tabs)/map');
    }
  }, [phase, router]);

  return (
    <Tabs screenOptions={{ headerShown: false, tabBarShowLabel: false }}>
      <Tabs.Screen name="index" options={createTabBarOptions(Home)} />
      <Tabs.Screen name="map" options={createTabBarOptions(Map)} />
      <Tabs.Screen name="profile" options={createTabBarOptions(User)} />
    </Tabs>
  );
}
