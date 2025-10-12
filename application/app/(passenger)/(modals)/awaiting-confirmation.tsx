import { Button, Text, YStack, Spinner } from "tamagui";
import { useRouter } from "expo-router";
import ModalStyling from "@/components/ModalStyling";
import { useEffect, useState } from "react";
import { useRideContext } from "@/providers/RideProvider";

export default function AwaitingConfirmationModalScreen() {
  const router = useRouter();
  const { confirmRide, phase } = useRideContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      confirmRide(); // Driver confirms, so start simulation
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (phase === 'driver-en-route') {
      router.replace('/(passenger)/(tabs)/map'); // Navigate to map tab
    }
  }, [phase, router]);

  return (
    <ModalStyling onBackgroundPress={() => {}}> {/* No dismiss on background press */}
      <YStack gap="$3" alignItems="center">
        {loading ? (
          <>
            <Spinner size="large" color="$blue10" />
            <Text fontSize="$5">Awaiting driver's confirmation...</Text>
          </>
        ) : (
          <Text fontSize="$5" color="$green10">Driver Confirmed!</Text>
        )}
      </YStack>
    </ModalStyling>
  );
}
