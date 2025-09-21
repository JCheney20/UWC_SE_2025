import { Button, Text, YStack, Image } from "tamagui";
import { StatusBar } from "expo-status-bar";
import { Platform, Modal as RNModal } from "react-native";
import { useRouter } from "expo-router";

export default function Modal() {
  const router = useRouter();

  return (
    <YStack
      flex={1}
      alignItems="center"
      justifyContent="center"
      backgroundColor="rgba(0,0,0,0.7)"
      onPress={() => router.back()}
    >
      <YStack
        backgroundColor="white"
        borderRadius="$4"
        width="80%"
        overflow="hidden"
        onPress={() => { }}
      >
        <Image
          source={require('@/assets/images/modal-header-image.jpg')}
          width="100%"
          height={150}
        />
        <YStack padding="$4" alignItems="center" gap="$3">
          <Text fontSize="$6">
            Your ride has been confirmed!
          </Text>
          <Text>
            Estimated arrival time is 08:10AM
          </Text>
          <Button
            onPress={() => router.replace('/map')}
            theme="black"
            borderRadius="$8"
            width="100%"
          >
            Follow the driver
          </Button>
        </YStack>
      </YStack>
    </YStack>
  );
}
