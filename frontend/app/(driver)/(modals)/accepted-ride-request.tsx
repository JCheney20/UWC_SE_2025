import { Button, Text, XStack } from "tamagui";
import { useLocalSearchParams, useRouter } from "expo-router";
import ModalStyling from "@/components/ModalStyling";

export default function RideRequestModal() {
  const router = useRouter();
  const { name } = useLocalSearchParams<{ name: string }>();

  return (
    <ModalStyling onBackgroundPress={() => router.back()}>
      <Text fontSize="$6"> New Ride Request </Text>
      <Text> You have a new ride request from {name}. </Text>
      <XStack justifyContent="space-around" gap="$3" marginTop="$3" width="100%">
        <Button
          onPress={() => router.back()}
          theme="white"
          borderRadius="$8"
          flex={1}
        >
          Decline
        </Button>
        <Button
          onPress={() => router.replace('/map')}
          theme="black"
          borderRadius="$8"
          flex={1}
        >
          Accept
        </Button>
      </XStack>
    </ModalStyling>
  );
}
