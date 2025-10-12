import { createContext, useContext, ReactNode } from 'react';
import { useRide, RidePhase } from '@/hooks/useRide';
import { Coordinate, RouteInfo } from '@/utils/route';
import { Driver } from '@/utils/types';

type RideContextType = {
  phase: RidePhase;
  pickup: Coordinate | null;
  destination: Coordinate | null;
  selectedDriver: Driver | null;
  route: RouteInfo | null;
  driverLocation: Coordinate | null;
  driverBearing: number;
  remainingDistance: number;
  remainingDuration: number;
  remainingRoute: Coordinate[];
  requestRide: (pickup: Coordinate, destination: Coordinate, driver: Driver) => void;
  confirmRide: () => void;
  confirmPickup: () => void;
  setDestination: (destination: Coordinate | null) => void;
  setPickup: (pickup: Coordinate | null) => void;
};

const RideContext = createContext<RideContextType | undefined>(undefined);

export function RideProvider({ children }: { children: ReactNode }) {
  const ride = useRide();
  return <RideContext.Provider value={ride}>{children}</RideContext.Provider>;
}

export function useRideContext() {
  const context = useContext(RideContext);
  if (context === undefined) {
    throw new Error('useRideContext must be used within a RideProvider');
  }
  return context;
}
