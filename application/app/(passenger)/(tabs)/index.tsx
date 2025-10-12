import { useState, useEffect, use } from "react";
import { Pressable, Modal } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, YStack, XStack, H4, ScrollView } from "tamagui";
import { UserCircle, ArrowRight } from '@tamagui/lucide-icons';
import GradientBackground from "@/components/GradientBackground";
import Map from "@/components/Map";
import { Driver } from "@/utils/types";
import { fetchNearbyDrivers } from "@/utils/mock-data";
import MapSearchInput from "@/components/MapSearchInput";
import useCurrentLocation from "@/hooks/useCurrentLocation";
import { useRideContext } from "@/providers/RideProvider";
import { getDistance } from "@/utils/location"; // For displaying distance in DriverListItem
import { Coordinate } from "@/utils/route";
import ModalStyling from "@/components/ModalStyling"; // Reusing for confirmation modal
import { Button, Spinner } from "tamagui"; // For modal buttons and loading
import { SupabaseAuthContext } from "@/providers/SupabaseAuthProvider";

// New component for confirming ride
interface ConfirmRideModalProps {
  driver: Driver;
  pickup: Coordinate;
  destination: Coordinate;
  cost: number;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmRideModal = ({ driver, pickup, destination, cost, onCancel, onConfirm }: ConfirmRideModalProps) => {
  return (
    <Modal
      visible={true}
      transparent={true}
      animationType="slide"
      onRequestClose={onCancel}
    >
      <YStack
        flex={1}
        backgroundColor="rgba(0,0,0,0.5)"
        justifyContent="center"
        alignItems="center"
        padding="$4"
      >
        <YStack
          backgroundColor="$background"
          padding="$4"
          borderRadius="$4"
          gap="$3"
          width="90%"
          maxWidth={400}
        >
          <Text fontSize="$6" fontWeight="bold">
            Confirm Ride with {driver.name}?
          </Text>
          <Text>From: Your current location</Text>
          <Text>To: {destination.latitude.toFixed(4)}, {destination.longitude.toFixed(4)}</Text>
          <Text>Driver: {driver.name} ({driver.distance ? (driver.distance / 1000).toFixed(1) : 'N/A'} km away)</Text>
          <Text fontSize="$5" fontWeight="bold">Estimated Cost: R{cost.toFixed(2)}</Text>

          <XStack gap="$3" justifyContent="flex-end" marginTop="$3">
            <Button onPress={onCancel} theme="red" flex={1}>
              Cancel
            </Button>
            <Button onPress={onConfirm} theme="green" flex={1}>
              Confirm
            </Button>
          </XStack>
        </YStack>
      </YStack>
    </Modal>
  );
};

// New component for awaiting driver confirmation
function AwaitingDriverConfirmationModal({ onTimeout, isVisible }: { onTimeout: () => void; isVisible: boolean }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isVisible) { // Only start timer if modal is visible
      const timer = setTimeout(() => {
        setLoading(false);
        onTimeout(); // Call the callback after 5 seconds
      }, 5000); // 5 seconds

      return () => clearTimeout(timer);
    }
  }, [isVisible, onTimeout]);

  return (
    <Modal
      visible={isVisible} // Control visibility with prop
      transparent={true}
      animationType="slide"
      onRequestClose={() => {}} // Cannot be dismissed by back button
    >
      <YStack
        flex={1}
        backgroundColor="rgba(0,0,0,0.5)"
        justifyContent="center"
        alignItems="center"
        padding="$4"
      >
        <YStack
          backgroundColor="$background"
          padding="$4"
          borderRadius="$4"
          gap="$3"
          width="90%"
          maxWidth={400}
        >
          {loading ? (
            <>
              <Spinner size="large" color="$blue10" />
              <Text fontSize="$5">Awaiting drivers confirmation...</Text>
            </>
          ) : (
            <Text fontSize="$5" color="$green10">Driver Confirmed!</Text>
          )}
        </YStack>
      </YStack>
    </Modal>
  );
}


function DriverListItem({ driver, onSelectDriver }: { driver: Driver; onSelectDriver: (driver: Driver) => void }) {
  return (
    <Pressable onPress={() => onSelectDriver(driver)}>
      <XStack
        paddingHorizontal={10}
        paddingVertical={10}
        borderRadius={10}
        gap={10}
        backgroundColor="white"
        alignItems="center"
        justifyContent="space-between"
      >
        <XStack alignItems="center" gap={10}>
          <UserCircle size={50} />
          <YStack>
            <Text fontSize="$5" fontWeight="bold">{driver.name}</Text>
            <Text>Rate: R{driver.rate.toFixed(2)}/km</Text>
          </YStack>
        </XStack>
        <YStack alignItems="flex-end">
          <Text>{driver.distance ? (driver.distance / 1000).toFixed(1) : 'N/A'} km away</Text>
        </YStack>
      </XStack>
    </Pressable>
  );
}

export default function HomePage() {
  const userLocation = useCurrentLocation();
  const { setDestination, requestRide, phase, pickup, destination, setPickup, confirmRide } = useRideContext();

  const session = use(SupabaseAuthContext);
  const userName = session?.user?.user_metadata?.full_name || session?.user?.email || 'Guest';

  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [activeInput, setActiveInput] = useState<'destination' | null>(null);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [driverToConfirm, setDriverToConfirm] = useState<Driver | null>(null);
  const [estimatedCost, setEstimatedCost] = useState(0);
  const [destinationName, setDestinationName] = useState('');

  console.log("HomePage - Current Phase:", phase);

  useEffect(() => {
    if (userLocation?.coords) {
      setPickup(userLocation.coords);
      const fetchedDrivers = fetchNearbyDrivers(userLocation.coords);
      setDrivers(fetchedDrivers);
    }
  }, [userLocation?.coords, setPickup]);

  useEffect(() => {
    // Calculate cost when driverToConfirm or destination changes
    if (driverToConfirm && destination && pickup) {
      // Assuming destination is already set in context
      const distanceToDestination = getDistance(pickup, destination);
      setEstimatedCost(driverToConfirm.rate * (distanceToDestination / 1000)); // Cost per km
    }
  }, [driverToConfirm, destination, pickup]);


  const handleSelectDriver = (driver: Driver) => {
    if (userLocation?.coords && destination) {
      setDriverToConfirm(driver);
      setIsConfirmModalVisible(true);
    } else {
      // Optionally, alert user to set destination first
      alert("Please set your destination first.");
    }
  };

  const handleConfirmRide = () => {
    console.log("handleConfirmRide called.");
    if (userLocation?.coords && destination && driverToConfirm) {
      requestRide(userLocation.coords, destination, driverToConfirm);
      setIsConfirmModalVisible(false);
      console.log("handleConfirmRide - requestRide called, modal hidden.");
    } else {
      console.log("handleConfirmRide - conditions not met.");
    }
  };

  const handleAwaitingConfirmationTimeout = () => {
    console.log("handleAwaitingConfirmationTimeout called.");
    confirmRide(); // Call confirmRide to transition phase and start simulation
    console.log("handleAwaitingConfirmationTimeout - confirmRide called.");
  };

  return (
    <GradientBackground>
      <SafeAreaView mode="margin" style={{ flex: 1, paddingHorizontal: 10, gap: 20 }}>
        <Text fontSize="$6" fontWeight="bold" color="white">
            Welcome, {userName}!
        </Text>
        <View style={{ width: '100%', zIndex: activeInput === 'destination' ? 10 : 1 }}>
          <MapSearchInput
            placeholder="Where to?"
            onLocationSelect={(coords: Coordinate, placeName: string) => {
              setDestination(coords);
              setDestinationName(placeName.split(',')[0]); // Shorten for input display
            }}
            onFocus={() => setActiveInput('destination')}
            onBlur={() => setActiveInput(null)}
            value={destinationName}
          />
        </View>

        <View marginHorizontal={10} height="30%" overflow="hidden" borderRadius={30}>
          <Map
            startPoint={userLocation?.coords}
            endPoint={destination || undefined}
          />
        </View>

        <XStack alignItems="center" gap={5}>
          <H4 color="white">
            Available Drivers
          </H4>
          <ArrowRight color="white" fontWeight={800} />
        </XStack>
        <ScrollView showsVerticalScrollIndicator={false}>
          <YStack gap={10}>
            {drivers.map((driver) => (
              <DriverListItem
                driver={driver}
                key={driver.name}
                onSelectDriver={handleSelectDriver}
              />
            ))}
          </YStack>
        </ScrollView>
      </SafeAreaView>

      {isConfirmModalVisible && driverToConfirm && pickup && destination && (
        <ConfirmRideModal
          driver={driverToConfirm}
          pickup={pickup}
          destination={destination}
          onConfirm={handleConfirmRide}
          onCancel={() => setIsConfirmModalVisible(false)}
          cost={estimatedCost}
        />
      )}

      <AwaitingDriverConfirmationModal onTimeout={handleAwaitingConfirmationTimeout} isVisible={phase === 'requesting'}/>
    </GradientBackground>
  );
}
