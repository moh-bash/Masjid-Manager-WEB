import type { LocationCoordinates } from "@/components/UI/map/types";

export const DEFAULT_LOCATION: LocationCoordinates = {
  lat: 33.51018757,
  lng: 36.38865424,
};

export function toLatLng(
  location: LocationCoordinates
): [number, number] {
  return [
    location.lat,
    location.lng,
  ];
}

export function isValidLocation(
  location?: LocationCoordinates | null
) {
  if (!location) {
    return false;
  }

  const { lat, lng } = location;

  return (
    lat >= -90 &&
    lat <= 90 &&
    lng >= -180 &&
    lng <= 180
  );
}