import { Coordinates } from "./types";

type postGISLocation = string;

export function coordinatesToPostGISLocation(coordinates: Coordinates): postGISLocation {
  return `POINT(${coordinates.longitude} ${coordinates.latitude})`;
}

export function getDistance(coord1: Coordinates, coord2: Coordinates): number {
    const R = 6371e3; // metres
    const φ1 = coord1.latitude * Math.PI / 180; // φ, λ in radians
    const φ2 = coord2.latitude * Math.PI / 180;
    const Δφ = (coord2.latitude - coord1.latitude) * Math.PI / 180;
    const Δλ = (coord2.longitude - coord1.longitude) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c; // in metres
    return d;
}

// Helper functions for bearing calculation
function toRad(deg: number) { return deg * Math.PI / 180; }
function toDeg(rad: number) { return rad * 180 / Math.PI; }

export function getBearing(start: Coordinates, end: Coordinates) {
    const startLat = toRad(start.latitude);
    const startLng = toRad(start.longitude);
    const endLat = toRad(end.latitude);
    const endLng = toRad(end.longitude);

    const y = Math.sin(endLng - startLng) * Math.cos(endLat);
    const x = Math.cos(startLat) * Math.sin(endLat) -
              Math.sin(startLat) * Math.cos(endLat) * Math.cos(endLng - startLng);
    let brng = Math.atan2(y, x);
    brng = toDeg(brng);
    return (brng + 360) % 360;
}