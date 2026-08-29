"use client";

import { useCallback, useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  useMap,
} from "react-leaflet";

import {
  Crosshair,
  Loader2,
  MapPin,
} from "lucide-react";

import LocationMarker from "./LocationMarker";
import MapSearch from "./MapSearch";
import "./leaflet-config";

import type { LocationCoordinates } from "./types";

import {
  DEFAULT_LOCATION,
  toLatLng,
} from "@/lib/features/map/location";

interface MapPickerProps {
  value?: LocationCoordinates;
  onChange: (location: LocationCoordinates) => void;
  defaultLocation?: LocationCoordinates;
  defaultZoom?: number;
  disabled?: boolean;
  className?: string;
  showSearch?: boolean;
  showCurrentLocation?: boolean;
}

function ChangeMapView({
  location,
}: {
  location?: LocationCoordinates;
}) {
  const map = useMap();

  useEffect(() => {
    if (!location) return;

    map.flyTo(
      toLatLng(location),
      Math.max(map.getZoom(), 15),
      {
        duration: 0.8,
      }
    );
  }, [location, map]);

  return null;
}

export default function MapPicker({
  value,
  onChange,
  defaultLocation = DEFAULT_LOCATION,
  defaultZoom = 14,
  disabled = false,
  className = "",
  showCurrentLocation = true,
}: MapPickerProps) {

  const [loadingLocation, setLoadingLocation] =
    useState(false);

  const handleLocationChange = useCallback(
    (location: LocationCoordinates) => {
      if (disabled) return;

      onChange(location);
    },
    [disabled, onChange]
  );

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert(
        "المتصفح لا يدعم خدمة تحديد الموقع"
      );

      return;
    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat:
            position.coords.latitude,

          lng:
            position.coords.longitude,
        };

        onChange(location);

        setLoadingLocation(false);
      },
      () => {
        alert(
          "تعذر الحصول على موقعك الحالي"
        );

        setLoadingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    );
  };

  return (
    <div
      className={`
        relative h-[300px] w-full overflow-hidden
        rounded-3xl border border-slate-200
        bg-slate-100
        ${className}
      `}
    >
      <MapContainer
        center={toLatLng(
          value ?? defaultLocation
        )}
        zoom={defaultZoom}
        className="h-full w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ChangeMapView location={value} />

        <LocationMarker
          location={value}
          onChange={handleLocationChange}
          draggable={!disabled}
        />
      </MapContainer>

      {showCurrentLocation && !disabled && (
        <button
          type="button"
          onClick={handleCurrentLocation}
          disabled={loadingLocation}
          className="
            absolute bottom-5 left-5 z-[1000]
            flex h-12 w-12 items-center justify-center
            rounded-xl bg-white text-primary
            shadow-lg transition
            hover:bg-slate-50
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
          aria-label="تحديد موقعي الحالي"
        >
          {loadingLocation ? (
            <Loader2
              size={22}
              className="animate-spin"
            />
          ) : (
            <Crosshair size={22} />
          )}
        </button>
      )}

      <div
        className="
          pointer-events-none absolute bottom-5 right-5
          z-[1000] flex items-center gap-2
          rounded-xl bg-white/95 px-4 py-2
          text-sm text-slate-600 shadow-md
          hidden sm:flex
        "
      >
        <MapPin
          size={18}
          className="text-primary"
        />

        <span>
          اضغط على الخريطة لتحديد الموقع
        </span>
      </div>
    </div>
  );
}