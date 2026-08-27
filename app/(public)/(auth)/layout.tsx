import { ReactNode } from "react";
import { Landmark } from "lucide-react";
import Link from "next/link";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function Layout({
  children
}: AuthLayoutProps) {
  return (
    <main className="min-h-[80vh] bg-white flex items-center justify-center px-4 md:px-8">
      <div className="w-full mt-2 max-w-6xl overflow-hidden rounded-[2rem] bg-white shadow-2xl grid lg:grid-cols-2">

        {/* info */}
        <div className="relative hidden lg:flex  bg-[#202B3F] p-12 flex-col justify-center overflow-hidden">

          {/* circles */}
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#58A5C7]/20" />

          <div className="absolute top-40 -left-20 w-56 h-56 rounded-full bg-[#57C45A]/10" />

          <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-[#FFBD32]/10" />

          {/* content */}
          <div className="relative z-10">
            <div className="mb-6 inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm text-[#58A5C7] backdrop-blur">
              منصة متكاملة لإدارة المساجد
            </div>

            <h2 className="text-5xl font-bold leading-tight text-white">
              إدارة أسهل،
              <br />

              <span className="text-[#58A5C7]">
                تنظيم أفضل.
              </span>
            </h2>

            <p className="mt-6 max-w-md text-lg leading-8 text-white/60">
              منصة تساعدك على إدارة المساجد والحلقات والطلاب
              والحضور والصلاحيات من مكان واحد.
            </p>
          </div>

         
        </div>

        {/* Form */}
        <div className="flex py-10 items-center justify-center bg-white px-6 py-10 sm:px-10 lg:px-16">
          <div className="w-full max-w-md">
            {children}
          </div>
        </div>

      </div>
    </main>
  );
}