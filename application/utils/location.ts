import { Coordinates } from "./types";

type postGISLocation = string;

export function coordinatesToPostGISLocation(coordinates: Coordinates): postGISLocation {
  return `POINT(${coordinates.longitude} ${coordinates.latitude})`;
}

