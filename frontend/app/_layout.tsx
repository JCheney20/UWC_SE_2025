import { Stack, SplashScreen } from "expo-router";
import { TamaguiProvider } from 'tamagui';
import { config, poppinFontImports } from '@/utils/tamagui';
import { useFonts } from 'expo-font';
import { useEffect } from "react";

export default function RootLayout() {
  // Load all Poppins fonts
  const [fontsLoaded, fontError] = useFonts(poppinFontImports);

  // Hide the splash screen when fonts are loaded
  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // If font loading is still in progress or errors, return null to prevent the app from mounting
  if (!fontsLoaded && !fontError) {
    return null;
  }

  const isLoggedIn = true; // TODO: Implement user authentication
  const userType: string = "driver"; // TODO: Implement user authentication

  return (
    <TamaguiProvider config={config}>
      <Stack screenOptions={{ headerShown: false }}>

        {/* Only render the sign-in and register screens if the user is not logged in */}
        <Stack.Protected guard={!isLoggedIn}>
          <Stack.Screen name="sign-in" />
          <Stack.Screen name="register" />
        </Stack.Protected>

        { /* Only render the driver screens if the user is logged in and is a driver */}
        <Stack.Protected guard={isLoggedIn && userType === "driver"}>
          <Stack.Screen name="(driver)" />
          <Stack.Screen name="(modals)" options={{ presentation: "transparentModal" }} />
        </Stack.Protected>

        <Stack.Protected guard={isLoggedIn && userType === "passenger"}>
          <Stack.Screen name="(passenger)" />
        </Stack.Protected>

      </Stack>
    </TamaguiProvider>
  );
}
