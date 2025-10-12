import { SafeAreaView } from "react-native-safe-area-context";
import { YStack, View, H4, Separator, Button, Text, Spinner, XStack } from "tamagui";
import Map from "@/components/Map";
import { useRideContext } from "@/providers/RideProvider";
import { Image } from "react-native";
import ModalStyling from "@/components/ModalStyling";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Marker, Polyline } from "react-native-maps";

// Helper functions for formatting (copied from profile.tsx, can be moved to utils if needed)
const formatDistance = (meters: number): string => {
  if (meters <= 0) return "0m";
  if (meters < 1000) {
    return `${Math.round(meters)}m`;
  }
  return `${(meters / 1000).toFixed(1)}km`;
};

const formatDuration = (seconds: number): string => {
  if (seconds <= 0) return "0 min";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
};

const getDriverMarkerSize = (currentRegion?: any) => { // currentRegion type is any for now
  if (!currentRegion) return 20;
  const zoom = Math.log2(360 / currentRegion.longitudeDelta);
  return Math.max(25, Math.min(50, zoom * 5));
};


// New component for "Passenger in car" confirmation
function PassengerInCarModal({ onConfirm }: { onConfirm: () => void }) {
  return (
    <ModalStyling onBackgroundPress={() => {}}> {/* No dismiss on background press */}
      <YStack gap="$3" alignItems="center">
        <Text fontSize="$6">Driver has arrived!</Text>
        <Text>Confirm you are in the car to proceed to your destination.</Text>
        <Button onPress={onConfirm} theme="green" width="100%">
          Confirm Pickup
        </Button>
      </YStack>
    </ModalStyling>
  );
}

// New component for "Ride Completed"
function RideCompletedModal({ onDismiss }: { onDismiss: () => void }) {
  const router = useRouter();
  return (
    <ModalStyling onBackgroundPress={onDismiss}>
      <YStack gap="$3" alignItems="center">
        <Text fontSize="$6">Ride Completed!</Text>
        <Text>You have arrived at your destination.</Text>
        <Button onPress={() => { onDismiss(); router.replace('/(passenger)/(tabs)/index'); }} theme="blue" width="100%">
          OK
        </Button>
      </YStack>
    </ModalStyling>
  );
}


export default function MapPage() {
  const {
    phase,
    pickup,
    destination,
    selectedDriver,
    route,
    driverLocation,
    driverBearing,
    remainingDistance,
    remainingDuration,
    remainingRoute,
    confirmPickup,
  } = useRideContext();
  const router = useRouter();

  // Effect to handle navigation away from map if ride is completed
  useEffect(() => {
    if (phase === 'arrived') {
      // The RideCompletedModal will handle navigation back to index
    }
  }, [phase, router]);


  // Determine which points to show on the map
  let mapStartPoint = null;
  let mapEndPoint = null;
  let mapRouteCoordinates = [];

  if (phase === 'driver-en-route') {
    mapStartPoint = driverLocation; // Driver's current location
    mapEndPoint = pickup; // Passenger's pickup location
    mapRouteCoordinates = remainingRoute;
  } else if (phase === 'en-route-to-destination') {
    mapStartPoint = driverLocation; // Passenger's current location (with driver)
    mapEndPoint = destination; // Final destination
    mapRouteCoordinates = remainingRoute;
  }


  return (
    <SafeAreaView style={{ display: "flex", height: "100%" }} edges={["top", "bottom"]}>
      <YStack flex={1}>
        <YStack
          backgroundColor="white"
          padding="$4"
          gap="$3"
          borderBottomWidth={1}
          borderBottomColor="gray"
        >
          <H4>
            {phase === 'driver-en-route' && `Driver en route to ${pickup?.latitude.toFixed(4)}, ${pickup?.longitude.toFixed(4)}`}
            {phase === 'en-route-to-destination' && `En route to ${destination?.latitude.toFixed(4)}, ${destination?.longitude.toFixed(4)}`}
            {phase === 'passenger-pickup' && `Driver at pickup location`}
            {phase === 'arrived' && `Arrived at destination`}
          </H4>
          <Separator borderColor="rgba(128,0,128,0.2)" />
          <XStack justifyContent="space-between">
            <Text>Distance: {formatDistance(remainingDistance)}</Text>
            <Text>Time: {formatDuration(remainingDuration)}</Text>
          </XStack>
        </YStack>

        <View flex={1} borderRadius={15} overflow="hidden" margin="$4">
          <Map
            startPoint={mapStartPoint || undefined}
            endPoint={mapEndPoint || undefined}
            routeCoordinates={mapRouteCoordinates}
          >
            {/* Driver Marker */}
            {driverLocation && (
              <Marker coordinate={driverLocation} title="Driver" anchor={{ x: 0.5, y: 0.5 }}>
                <View
                  style={{
                    width: getDriverMarkerSize(),
                    height: getDriverMarkerSize(),
                    borderRadius: getDriverMarkerSize() / 2,
                    backgroundColor: 'blue',
                    borderColor: 'white',
                    borderWidth: 2,
                    transform: [{ rotate: `${driverBearing}deg` }]
                  }}
                />
              </Marker>
            )}
            {/* Destination Marker (passenger pickup or final destination) */}
            {mapEndPoint && <Marker coordinate={mapEndPoint} title="Destination" pinColor="red" />}
          </Map>
        </View>

        {/* Modals */}
        {phase === 'passenger-pickup' && (
          <PassengerInCarModal onConfirm={confirmPickup} />
        )}
        {phase === 'arrived' && (
          <RideCompletedModal onDismiss={() => { /* handle dismiss */ }} />
        )}
      </YStack>
    </SafeAreaView>
  );
}
