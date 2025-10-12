import { RideProvider } from "@/providers/RideProvider";
import { Stack } from "expo-router";

export default function PassengerLayout() {
  return (
    <RideProvider>
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(modals)" options={{ presentation: "transparentModal" }} />
    </Stack>
    </RideProvider>
  );
}
