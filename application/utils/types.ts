import { Database } from "./database.types";

export type Driver = {
    name: string;
    location: { latitude: number; longitude: number };
    rate: number; // Add rate property
    distance?: number; // Add optional distance property
}

export type Passenger = {
    name: string;
    location: { latitude: number; longitude: number };
}

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export type Coordinates = {
    latitude: number;
    longitude: number;
}

export const profileRoles = {
    passenger: "passenger",
    driver: "driver",
}
