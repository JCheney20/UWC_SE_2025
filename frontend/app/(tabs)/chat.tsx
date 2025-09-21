import MainPageBackground from "@/components/MainPageBackground";
import { ImageBackground } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "tamagui";

export default function() {
  return (
    <MainPageBackground>
      <SafeAreaView>
        <View
          flex={1}
          justifyContent="center"
          alignItems="center"
        >
          <Text>Chat Screen in Progress...</Text>
        </View>
      </SafeAreaView>
    </MainPageBackground>
  );
}
