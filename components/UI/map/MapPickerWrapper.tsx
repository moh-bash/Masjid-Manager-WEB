"use client";

import dynamic from "next/dynamic";

const MapPicker = dynamic(
  () => import("./MapPicker"),
  {
    ssr: false,

    loading: () => (
      <div
        className="
          flex h-[450px] w-full items-center
          justify-center rounded-2xl
          border border-slate-200 bg-slate-50
          text-sm text-slate-500
        "
      >
        جاري تحميل الخريطة...
      </div>
    ),
  }
);

export default MapPicker;