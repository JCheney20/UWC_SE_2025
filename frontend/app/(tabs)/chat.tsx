import { ImageBackground } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "tamagui";

export default function() {
  return (

    <ImageBackground
      source={require('../../assets/images/background-gradient.jpg')}
      style={{ width: "100%", height: "100%" }}
    >
      <SafeAreaView>
        <View
          flex={1}
          justifyContent="center"
          alignItems="center"
        >
          <Text>Chat Screen in Progress...</Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
