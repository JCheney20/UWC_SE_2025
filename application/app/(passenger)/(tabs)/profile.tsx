import { SafeAreaView } from "react-native-safe-area-context";
import GradientBackground from "@/components/GradientBackground";
import { Button, YStack, Text } from "tamagui";
import { supabase } from "@/utils/supabase";
import { useMutation } from "@tanstack/react-query";

export default function ProfilePage() {
  const { mutate, isPending } = useMutation({
    mutationFn: async () => await supabase.auth.signOut(),
  });

  return (
    <GradientBackground>
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <YStack width="90%" gap="$4" alignItems="center">
          <Text fontSize="$6" fontWeight="bold">
            Profile Page
          </Text>
          <Text>
            This is where user profile information would be displayed.
          </Text>
          <Button onPress={() => mutate()} marginTop="$4">
            {isPending ? "Signing out..." : "Sign out"}
          </Button>
        </YStack>
      </SafeAreaView>
    </GradientBackground>
  );
}