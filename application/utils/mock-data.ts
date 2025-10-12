import { LatLng } from "react-native-maps";
import { Passenger, Driver } from "./types";
import { getDistance } from "./location";

// return passengers with random locations within around the current location
export function fetchNearbyPassengers({ latitude, longitude }: LatLng): Passenger[] {

  const randomLat = () => latitude + Math.random() * 0.1 - 0.05;
  const randomLong = () => longitude + Math.random() * 0.1 - 0.05;
  return [
    { name: "Passenger 1", location: { latitude: randomLat(), longitude: randomLong() }, },
    { name: "Passenger 2", location: { latitude: randomLat(), longitude: randomLong() } },
    { name: "Passenger 3", location: { latitude: randomLat(), longitude: randomLong() }, },
    { name: "Passenger 4", location: { latitude: randomLat(), longitude: randomLong() } },
    { name: "Passenger 5", location: { latitude: randomLat(), longitude: randomLong() } },
    { name: "Passenger 6", location: { latitude: randomLat(), longitude: randomLong() } },
    { name: "Passenger 7", location: { latitude: randomLat(), longitude: randomLong() } },
    { name: "Passenger 8", location: { latitude: randomLat(), longitude: randomLong() } },
    { name: "Passenger 9", location: { latitude: randomLat(), longitude: randomLong() } },
    { name: "Passenger 10", location: { latitude: randomLat(), longitude: randomLong() } },
  ];
}

const DRIVER_NAMES = [
  "Alice", "Bob", "Charlie", "Diana", "Eve",
  "Frank", "Grace", "Heidi", "Ivan", "Judy",
  "Kevin", "Linda", "Mike", "Nancy", "Oscar"
];

// return drivers with random locations within around the current location
export function fetchNearbyDrivers(userLocation: LatLng): Driver[] {

  const randomLat = () => userLocation.latitude + Math.random() * 0.1 - 0.05;
  const randomLong = () => userLocation.longitude + Math.random() * 0.1 - 0.05;
  const randomRate = () => 1 + Math.random() * 4; // Random rate between $1 and $5

  const drivers: Omit<Driver, 'distance'>[] = DRIVER_NAMES.slice(0, 10).map((name) => ({
    name,
    location: { latitude: randomLat(), longitude: randomLong() },
    rate: randomRate(),
  }));

  return drivers.map(driver => ({
    ...driver,
    distance: getDistance(userLocation, driver.location),
  }));
}

