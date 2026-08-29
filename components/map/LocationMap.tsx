"use client";

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";

import "./leaflet-config"

import type { LocationCoordinates } from "./types";

import { toLatLng } from "@/lib/features/map/location";

interface LocationMapProps {
  location: LocationCoordinates;
  zoom?: number;
  height?: number;
  markerLabel?: string;
  className?: string;
}

export default function LocationMap({
  location,
  zoom = 16,
  height = 400,
  markerLabel,
  className = "",
}: LocationMapProps) {
  return (
    <div
      style={{ height }}
      className={`
        w-full overflow-hidden rounded-2xl
        border border-slate-200
        ${className}
      `}
    >
      <MapContainer
        center={toLatLng(location)}
        zoom={zoom}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker
          position={toLatLng(location)}
        >
          {markerLabel && (
            <Popup>
              {markerLabel}
            </Popup>
          )}
        </Marker>
      </MapContainer>
    </div>
  );
}