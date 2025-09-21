import { Button, Text, YStack, XStack, Image } from "tamagui";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function RideRequestModal() {
  const router = useRouter();
  const { name } = useLocalSearchParams<{ name: string }>();

  const handleAccept = () => {
    router.replace({ pathname: '/map'});
  };

  const handleDecline = () => {
    router.back();
  };

  return (
    <YStack
      flex={1}
      alignItems="center"
      justifyContent="center"
      backgroundColor="rgba(0,0,0,0.7)"
      onPress={handleDecline}
    >
      <YStack
        backgroundColor="white"
        borderRadius="$4"
        width="80%"
        overflow="hidden"
        onPress={(e) => e.stopPropagation()}
      >
        <YStack padding="$4" alignItems="center" gap="$3">
          <Text fontSize="$6">
            New Ride Request
          </Text>
          <Text>
            You have a new ride request from {name}.
          </Text>
          <XStack justifyContent="space-around" gap="$3" marginTop="$3" width="100%">
            <Button
              onPress={handleDecline}
              theme="white"
              borderRadius="$8"
              flex={1}
            >
              Decline
            </Button>
            <Button
              onPress={handleAccept}
              theme="black"
              borderRadius="$8"
              flex={1}
            >
              Accept
            </Button>
          </XStack>
        </YStack>
      </YStack>
    </YStack>
  );
}
