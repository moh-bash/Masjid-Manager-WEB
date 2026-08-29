"use client";

import { useState } from "react";
import { Loader2, Search } from "lucide-react";

import type { LocationCoordinates } from "./types";

interface MapSearchProps {
  onSelect: (location: LocationCoordinates) => void;
}

interface SearchResult {
  lat: string;
  lng: string;
  display_name: string;
}

export default function MapSearch({
  onSelect,
}: MapSearchProps) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);

  const handleSearch = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    if (!query.trim()) return;

    try {
      setLoading(true);

      const response = await fetch(
        `/api/location/search?q=${encodeURIComponent(
          query
        )}`
      );

      if (!response.ok) {
        throw new Error("Failed to search location");
      }

      const data: SearchResult[] =
        await response.json();

      setResults(data);
    } catch (error) {
      console.error(error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (
    result: SearchResult
  ) => {
    onSelect({
      lat: Number(result.lat),
      lng: Number(result.lng),
    });

    setQuery(result.display_name);
    setResults([]);
  };

  return (
    <div className="absolute left-12 right-4 top-4 z-[1000] sm:right-auto sm:w-96">
      <form
        onSubmit={handleSearch}
        className="relative"
      >
        <Search
          size={20}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          value={query}
          onChange={(event) =>
            setQuery(event.target.value)
          }
          placeholder="ابحث عن مدينة أو عنوان..."
          className="
            h-12 w-full rounded-xl border border-slate-200
            bg-white pr-12 pl-4 text-sm
            shadow-lg outline-none
            transition
            focus:border-primary
            focus:ring-4
            focus:ring-primary/10
          "
        />

        {loading && (
          <Loader2
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 animate-spin text-slate-400"
          />
        )}
      </form>

      {results.length > 0 && (
        <div className="mt-2 overflow-hidden rounded-xl bg-white shadow-xl">
          {results.map((result, index) => (
            <button
              key={`${result.lat}-${result.lng}-${index}`}
              type="button"
              onClick={() =>
                handleSelect(result)
              }
              className="
                block w-full border-b border-slate-100
                px-4 py-3 text-right text-sm
                text-slate-600 transition
                last:border-0
                hover:bg-slate-50
              "
            >
              {result.display_name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}