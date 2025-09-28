import { Button, Text } from "tamagui";
import { useRouter } from "expo-router";
import ModalStyling from "@/components/ModalStyling";

export default function SelectedDriverModal() {
  const router = useRouter();

  return (
    <ModalStyling onBackgroundPress={() => router.back()}>
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
    </ModalStyling>
  );
}
