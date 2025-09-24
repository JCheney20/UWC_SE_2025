import { Tabs } from "expo-router";
import { Home, Map, MessageSquare, User } from '@tamagui/lucide-icons';
import TabScreen from "@/components/TabScreen";

export default function TabsLayout() {
  return (
    <Tabs>
      <TabScreen name="home" Icon={Home} />
      <TabScreen name="map" Icon={Map} />
      <TabScreen name="driver" Icon={MessageSquare} />
      <TabScreen name="profile" Icon={User} />
    </Tabs>
  );
}
