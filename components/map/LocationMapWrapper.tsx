"use client";

import dynamic from "next/dynamic";

const LocationMap = dynamic(
  () => import("./LocationMap"),
  {
    ssr: false,

    loading: () => (
      <div
        className="
          flex h-[400px] items-center
          justify-center rounded-2xl
          bg-slate-100 text-sm text-slate-500
        "
      >
        جاري تحميل الخريطة...
      </div>
    ),
  }
);

export default LocationMap;