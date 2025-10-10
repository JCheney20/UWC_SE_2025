import GradientBackground from "@/components/GradientBackground";
import { supabase } from "@/utils/supabase";
import { useRouter, Link } from "expo-router";
import { useState } from "react";
import { Text, View, Label, Button, Input, H3, H4, Spinner } from "tamagui";
import { useMutation } from "@tanstack/react-query";
import { KeyboardAvoidingView, Platform } from 'react-native';

async function signInUser(email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);
};

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate, isError, error, isPending } = useMutation({
    mutationFn: async () => {
      if (!email) {
        throw new Error("email is required");
      }
      if (!password) {
        throw new Error("password is required");
      }
      await signInUser(email, password)
      return;
    },
    onSuccess: () => router.replace("/map"),
  })

  return (
    <GradientBackground>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <View
          width="75%"
          gap="$3"
          borderWidth={1}
          padding="$4"
          borderRadius="$4"
          backgroundColor="white"
        >
          <H3>Sign In</H3>
          <H4 alignContent="center" width="100%">
            New here?
            <Link href="/register" style={{ textDecorationLine: "underline" }}>Register</Link>
          </H4>
          <Label>Email</Label>
          <Input width="100%" onChangeText={setEmail} textContentType="emailAddress" />
          <Label>Password</Label>
          <Input width="100%" secureTextEntry={true} onChangeText={setPassword} textContentType="password" />
          <Button theme="black" onPress={() => mutate()} disabled={isPending}>{isPending ? <Spinner theme="black" /> : "Login"}</Button>
          {isError && <Text theme="error" color="red" fontSize="$6">Error: {error?.message}</Text>}
        </View>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
}
