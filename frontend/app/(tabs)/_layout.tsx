import { Tabs } from "expo-router";
import { Home, Map, MessageSquare, User } from '@tamagui/lucide-icons';
import { ImageBackground } from "expo-image";

const createTabOptions = (Icon: any) => ({
  headerShown: false,
  tabBarShowLabel: false,
  tabBarIcon: (
    { focused, color, size }: {
      focused: boolean;
      color: string;
      size: number;
    }
  ) => <Icon focused={focused} color={color} size={size} />,
});

export default function TabsLayout() {
  return (
    <Tabs>

      <Tabs.Screen name="index" options={createTabOptions(Home)} />
      <Tabs.Screen name="map" options={createTabOptions(Map)} />
      <Tabs.Screen name="chat" options={createTabOptions(MessageSquare)} />
      <Tabs.Screen name="profile" options={createTabOptions(User)} />
    </Tabs>
  );
}
