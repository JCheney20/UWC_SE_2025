import { Stack } from "expo-router";
import { RideProvider } from "@/providers/RideProvider";
import React from "react";

export default function PassengerLayout() {
  return (
    <RideProvider>
      <React.Fragment>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(modals)" options={{ presentation: "transparentModal" }} />
        </Stack>
      </React.Fragment>
    </RideProvider>
  );
}
