import { Tabs } from "expo-router";
import { Home, Map, MessageSquare, User } from '@tamagui/lucide-icons';

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
      <Tabs.Screen name="home" options={createTabOptions(Home)} />
      <Tabs.Screen name="map" options={createTabOptions(Map)} />
      <Tabs.Screen name="chat" options={createTabOptions(MessageSquare)} />
      <Tabs.Screen name="profile" options={createTabOptions(User)} />
    </Tabs>
  );
}
