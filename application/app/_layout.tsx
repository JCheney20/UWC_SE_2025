import { Stack, SplashScreen } from "expo-router";
import { TamaguiProvider } from 'tamagui';
import { config, poppinFontImports } from '@/utils/tamagui';
import { useFonts } from 'expo-font';
import { createContext, use, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useCurrentLocation from "@/hooks/useCurrentLocation";
import { SupabaseAuthContext, SupabaseAuthProvider } from "@/providers/SupabaseAuthProvider";
import ReactModal from 'react-modal';

const queryClient = new QueryClient()
export const testContext = createContext(false)

export default function RootLayout() {
  const location = useCurrentLocation();
  const [fontsLoaded, fontError] = useFonts(poppinFontImports);

  // TODO: Handle font error
  const finishedLoading = (fontsLoaded || fontError) && (location != null);
  useEffect(() => {
    if (finishedLoading) {
      SplashScreen.hideAsync();
      if (typeof window !== 'undefined') { // Check if running in a browser environment
        ReactModal.setAppElement('#root'); // Assuming '#root' is the ID of your app's root element in web
      }
    }
  }, [finishedLoading]);

  // If font loading is still in progress or errors, return null to prevent the app from mounting
  if (!finishedLoading) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider config={config}>
        <SupabaseAuthProvider>
          <Routing />
        </SupabaseAuthProvider>
      </TamaguiProvider>
    </QueryClientProvider>
  );
}

function Routing() {
  const session = use(SupabaseAuthContext);
  const isLoginedIn = !!session 
  const isDriver = session?.user?.user_metadata.role === "driver"
  const isPassenger = session?.user?.user_metadata.role === "passenger"
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!isLoginedIn}>
        <Stack.Screen name="sign-in" />
        <Stack.Screen name="register" />
      </Stack.Protected>
      <Stack.Protected guard={isDriver}>
        <Stack.Screen name="(driver)" />
      </Stack.Protected>
      <Stack.Protected guard={isPassenger}>
        <Stack.Screen name="(passenger)" />
      </Stack.Protected>
    </Stack>
  )
}
