"use client";

import { useMemo, useRef } from "react";
import {
  Marker,
  useMapEvents,
} from "react-leaflet";

import type L from "leaflet";

import type { LocationCoordinates } from "./types";
import { toLatLng } from "@/lib/features/map/location";

interface LocationMarkerProps {
  location?: LocationCoordinates;
  onChange: (location: LocationCoordinates) => void;
  draggable?: boolean;
}

export default function LocationMarker({
  location,
  onChange,
  draggable = true,
}: LocationMarkerProps) {
  const markerRef = useRef<L.Marker | null>(null);

  useMapEvents({
    click(event) {
      onChange({
        lat: event.latlng.lat,
        lng: event.latlng.lng,
      });
    },
  });

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;

        if (!marker) return;

        const position = marker.getLatLng();

        onChange({
          lat: position.lat,
          lng: position.lng,
        });
      },
    }),
    [onChange]
  );

  if (!location) {
    return null;
  }

  return (
    <Marker
      ref={markerRef}
      position={toLatLng(location)}
      draggable={draggable}
      eventHandlers={eventHandlers}
    />
  );
}