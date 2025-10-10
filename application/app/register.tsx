import GradientBackground from "@/components/GradientBackground";
import useCurrentLocation from "@/hooks/useCurrentLocation";
import { coordinatesToPostGISLocation } from "@/utils/location";
import { supabase } from "@/utils/supabase";
import { useMutation } from "@tanstack/react-query";
import { LocationObject } from "expo-location";
import { useRouter, Link } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Label, Button, Input, H3, H4, Text, Spinner, RadioGroup, XStack } from "tamagui";

async function registerUser(
  email: string,
  password: string,
  fullName: string,
  role: string,
  currentLocation: LocationObject
) {
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        role,
        current_location: coordinatesToPostGISLocation(currentLocation.coords),
      },
    },
  });
  if (error) throw new Error(error.message);
}

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("passenger");
  const [password, setPassword] = useState("");
  const currentLocation = useCurrentLocation();
  const router = useRouter();

  const { mutate, isError, error, isPending } = useMutation({
    mutationFn: async (_: any) => {
      if (!fullName) {
        throw new Error("full name is required");
      }
      if (!email) {
        throw new Error("email is required");
      }
      if (!password) {
        throw new Error("password is required");
      }
      if (!currentLocation) {
        throw new Error("Location permission are required");
      }
      await registerUser(email, password, fullName, role, currentLocation);
    },
    onSuccess: () => router.prefetch("/")
  })

  return (
    <GradientBackground>
      <SafeAreaView style={{ flex: 1 }}>
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
            <H3>Register</H3>
            <H4 alignContent="center" width="100%">
              Have an Account?
              <Link href="/sign-in" style={{ textDecorationLine: "underline" }}>Login</Link>
            </H4>
            <Label>Type of User</Label>
            <RadioGroup value={role} onValueChange={setRole} gap="$2">
              <XStack gap="$2">
                <RadioGroup.Item value="passenger" id="role-radio-item-passenger">
                  <RadioGroup.Indicator />
                </RadioGroup.Item>
                <Text>Passenger</Text>
              </XStack>
              <XStack gap="$2">
                <RadioGroup.Item value="driver" id="role-radio-item-driver">
                  <RadioGroup.Indicator />
                </RadioGroup.Item>
                <Text>Driver</Text>
              </XStack>
            </RadioGroup>
            <Label>Full Name</Label>
            <Input onChangeText={setFullName} textContentType="name" />
            <Label>Email</Label>
            <Input onChangeText={setEmail} textContentType="emailAddress" />
            <Label>Password</Label>
            <Input onChangeText={setPassword} secureTextEntry={true} textContentType="password" />
            <Button theme="black" onPress={mutate} disabled={isPending}>
              {isPending ? <Spinner color="white" /> : "Register"}
            </Button>
            {isError && <Text theme="error" color="red" fontSize="$6">Error: {error?.message}</Text>}
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>

    </GradientBackground>
  );
}
