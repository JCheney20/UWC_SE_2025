import { Tabs } from "expo-router";
import { Home } from '@tamagui/lucide-icons';

type TabScreenProps = {
  name: string;
  Icon: typeof Home;
};

export default function TabScreen({ name, Icon }: TabScreenProps) {
  return (
    <Tabs.Screen
      name={name}
      options={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ color, size }) => <Icon color={color} size={size} />
      }} />
  );
}
