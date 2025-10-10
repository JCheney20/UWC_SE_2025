import { SafeAreaView } from "react-native-safe-area-context";
import GradientBackground from "@/components/GradientBackground";
import { Button } from "tamagui";
import { supabase } from "@/utils/supabase";
import { useMutation } from "@tanstack/react-query";

export default function ProfilePage() {
  const { mutate, isPending } = useMutation({
    mutationFn: async () => await supabase.auth.signOut()
  })
  return (
    <GradientBackground>
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Button onPress={() => mutate()}>{isPending ? "Signing out..." : "Sign out"}</Button>
      </SafeAreaView>
    </GradientBackground >
  );
}
