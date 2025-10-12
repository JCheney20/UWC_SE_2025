import { Button, Text, YStack, XStack } from "tamagui";
import { useRouter } from "expo-router";
import ModalStyling from "@/components/ModalStyling";
import { useRideContext } from "@/providers/RideProvider";
import { useEffect, useState } from "react";
import { getDistance } from "@/utils/location";

export default function ConfirmRideModalScreen() {
  const router = useRouter();
  const { pickup, destination, selectedDriver, requestRide, phase, pickupAddress, destinationAddress } = useRideContext();
  const [estimatedCost, setEstimatedCost] = useState(0);

  useEffect(() => {
    if (selectedDriver && destination && pickup) {
      const distanceToDestination = getDistance(pickup, destination);
      setEstimatedCost(selectedDriver.rate * (distanceToDestination / 1000));
    }
  }, [selectedDriver, destination, pickup]);

  useEffect(() => {
    if (phase === 'requesting') {
      router.replace('/(passenger)/(modals)/awaiting-confirmation');
    }
  }, [phase, router]);

  const handleConfirm = () => {
    if (pickup && destination && selectedDriver) {
      requestRide(pickup, destination, selectedDriver);
    }
  };

  return (
    <ModalStyling onBackgroundPress={() => router.back()}>
      {selectedDriver && pickup && destination ? (
        <YStack gap="$3" alignItems="center">
          <Text fontSize="$6">Confirm Ride with {selectedDriver.name}?</Text>
          <Text>From: {pickupAddress || 'Your current location'}</Text>
          <Text>To: {destinationAddress || `${destination.latitude.toFixed(4)}, ${destination.longitude.toFixed(4)}`}</Text>
          <Text>Driver: {selectedDriver.name} ({selectedDriver.distance ? (selectedDriver.distance / 1000).toFixed(1) : 'N/A'} km away)</Text>
          <Text fontSize="$5" fontWeight="bold">Estimated Cost: R{estimatedCost.toFixed(2)}</Text>
          <XStack gap="$3">
            <Button onPress={() => router.back()} theme="red" flex={1}>Cancel</Button>
            <Button onPress={handleConfirm} theme="green" flex={1}>Confirm</Button>
          </XStack>
        </YStack>
      ) : (
        <YStack gap="$3" alignItems="center">
          <Text>Loading ride details...</Text>
          <Spinner size="large" />
        </YStack>
      )}
    </ModalStyling>
  );
}
