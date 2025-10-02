import { Tabs } from "expo-router";
import { Home, Map, MessageSquare, User } from '@tamagui/lucide-icons';

function createTabBarOptions(Icon: typeof Home) {
  return {
    tabBarIcon: ({ color, size }: { color: string, size: number }) => <Icon color={color} size={size} />
  };
}

export default function DriverLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarShowLabel: false }}>
      <Tabs.Screen name="index" options={createTabBarOptions(Home)} />
      <Tabs.Screen name="map" options={createTabBarOptions(Map)} />
      <Tabs.Screen name="chat" options={createTabBarOptions(MessageSquare)} />
      <Tabs.Screen name="profile" options={createTabBarOptions(User)} />
    </Tabs>
  );
}
