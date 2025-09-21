import { SafeAreaView } from "react-native-safe-area-context";
import Map from "@/components/Map";
import { YStack, View, H4, Separator, Button } from "tamagui";

export default function MapPage() {
  return (
    <SafeAreaView style={{ display: "flex", height: "100%" }} edges={["top", "bottom"]}>
      <YStack
        backgroundColor="white"
        padding="$4"
        gap="$3"
        borderBottomWidth={1}
        borderBottomColor="gray"
      >
        <H4>
          (Destination)
        </H4>
        <Separator borderColor="rgba(128,0,128,0.2)" />
        <Button borderRadius="$12" theme="blue">
          Share my live location
        </Button>
      </YStack>
      <View height="75%">
        <Map />
      </View>
      <YStack
        padding="$4"
        backgroundColor="white"
        borderTopWidth={1}
        borderTopColor="gray"
      >
        <Button theme="green">
          Drive completed
        </Button>
      </YStack>
    </SafeAreaView>
  );
}
