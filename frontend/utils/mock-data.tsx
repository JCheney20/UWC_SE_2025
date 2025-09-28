import { LatLng } from "react-native-maps";
import { Passenger, Driver } from "./types";

export function fetchNearbyPassengers({ latitude, longitude }: LatLng): Passenger[] {

  // return passengers with random locations within a 10-mile radius of the current location
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

export function fetchNearbyDrivers({ latitude, longitude }: LatLng): Driver[] {

  // return drivers with random locations within a 10-mile radius of the current location
  const randomLat = () => latitude + Math.random() * 0.1 - 0.05;
  const randomLong = () => longitude + Math.random() * 0.1 - 0.05;
  return [
    { name: "Driver 1", location: { latitude: randomLat(), longitude: randomLong() }, },
    { name: "Driver 2", location: { latitude: randomLat(), longitude: randomLong() } },
    { name: "Driver 3", location: { latitude: randomLat(), longitude: randomLong() }, },
    { name: "Driver 4", location: { latitude: randomLat(), longitude: randomLong() } },
    { name: "Driver 5", location: { latitude: randomLat(), longitude: randomLong() } },
    { name: "Driver 6", location: { latitude: randomLat(), longitude: randomLong() } },
    { name: "Driver 7", location: { latitude: randomLat(), longitude: randomLong() } },
    { name: "Driver 8", location: { latitude: randomLat(), longitude: randomLong() } },
    { name: "Driver 9", location: { latitude: randomLat(), longitude: randomLong() } },
    { name: "Driver 10", location: { latitude: randomLat(), longitude: randomLong() } },
  ];
}

