import { useState, useEffect, use } from "react";
import { Pressable } from "react-native";
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
function ConfirmRideModal({
  driver,
  pickup,
  destination,
  onConfirm,
  onCancel,
  cost
}: {
  driver: Driver;
  pickup: Coordinate;
  destination: Coordinate;
  onConfirm: () => void;
  onCancel: () => void;
  cost: number;
}) {
  return (
    <ModalStyling onBackgroundPress={onCancel}>
      <YStack gap="$3" alignItems="center">
        <Text fontSize="$6">Confirm Ride with {driver.name}?</Text>
        <Text>From: Your current location</Text>
        <Text>To: {destination.latitude.toFixed(4)}, {destination.longitude.toFixed(4)}</Text>
        <Text>Driver: {driver.name} ({driver.distance ? (driver.distance / 1000).toFixed(1) : 'N/A'} km away)</Text>
        <Text fontSize="$5" fontWeight="bold">Estimated Cost: R{cost.toFixed(2)}</Text>
        <XStack gap="$3">
          <Button onPress={onCancel} theme="red" flex={1}>Cancel</Button>
          <Button onPress={onConfirm} theme="green" flex={1}>Confirm</Button>
        </XStack>
      </YStack>
    </ModalStyling>
  );
}

// New component for awaiting driver confirmation
function AwaitingDriverConfirmationModal({ onTimeout }: { onTimeout: () => void }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      onTimeout(); // Call the callback after 5 seconds
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, []);

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
  const { setDestination, requestRide, phase, pickup, destination, setPickup } = useRideContext();

  const session = use(SupabaseAuthContext);
  const userName = session?.user?.user_metadata?.full_name || session?.user?.email || 'Guest';

  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [activeInput, setActiveInput] = useState<'destination' | null>(null);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [driverToConfirm, setDriverToConfirm] = useState<Driver | null>(null);
  const [estimatedCost, setEstimatedCost] = useState(0);
  const [destinationName, setDestinationName] = useState('');

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
    if (userLocation?.coords && destination && driverToConfirm) {
      requestRide(userLocation.coords, destination, driverToConfirm);
      setIsConfirmModalVisible(false);
      // Phase will change to 'requesting' in useRide hook
    }
  };

  const handleAwaitingConfirmationTimeout = () => {
    // This will be called after 5 seconds in AwaitingDriverConfirmationModal
    // The useRide hook will handle phase transition to 'driver-en-route'
    // and navigation to map.tsx will be handled by a useEffect in _layout.tsx or map.tsx
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
              setDestinationName(placeName);
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

      {phase === 'requesting' && (
        <AwaitingDriverConfirmationModal onTimeout={handleAwaitingConfirmationTimeout} />
      )}
    </GradientBackground>
  );
}
