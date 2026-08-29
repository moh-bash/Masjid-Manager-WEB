export interface LocationCoordinates {
  lat: number;
  lng: number;
}

export interface LocationData extends LocationCoordinates {
  address?: string;
}