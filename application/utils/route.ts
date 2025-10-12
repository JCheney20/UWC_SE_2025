import polyline from '@mapbox/polyline';

// Types
export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface RouteInfo {
  distance: number; // in meters
  duration: number; // in seconds
  coordinates: Coordinate[];
}

export type RoutingProfile = 'driving' | 'walking' | 'cycling' | 'driving-traffic';

const MAPBOX_ACCESS_TOKEN = process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN;

export const getRoute = async (
  start: Coordinate,
  end: Coordinate,
  routingProfile: RoutingProfile = 'driving'
): Promise<RouteInfo | null> => {
  const url = `https://api.mapbox.com/directions/v5/mapbox/${routingProfile}/${start.longitude},${start.latitude};${end.longitude},${end.latitude}?geometries=polyline&overview=full&access_token=${MAPBOX_ACCESS_TOKEN}`;

  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();

    if (!data.routes || data.routes.length === 0) {
      throw new Error('No routes found');
    }

    const route = data.routes[0];
    const points = polyline.decode(route.geometry);

    const coordinates = points.map((point: number[]) => ({
      latitude: point[0],
      longitude: point[1]
    }));

    return {
      distance: route.distance,
      duration: route.duration,
      coordinates
    };
  } catch (err) {
    console.error('Error fetching route:', err);
    throw err;
  }
};