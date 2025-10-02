import GradientBackground from "@/components/GradientBackground";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Label, Button, Input, H3 } from "tamagui";



// TODO: Implement sign-in page
export default function SignInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Logging in as", username);
    console.log("Password is", password);
  }

  return (
    <GradientBackground>
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View
          width="75%"
          gap="$3"
          borderWidth={1}
          padding="$4"
          borderRadius="$4"
          backgroundColor="white"
        >
          <H3>Sign In</H3>
          <Label>Username</Label> <Input width="100%" onChangeText={setUsername} />
          <Label>Password</Label> <Input width="100%" secureTextEntry={true} onChangeText={setPassword} />
          <Button theme="black" onPress={handleLogin}>Login</Button>
        </View>
      </SafeAreaView>
    </GradientBackground>
  )
}
