import Link from "next/link";
import {
  ArrowLeft,
  BookOpenCheck,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";

interface ParentFeature {
  id: string;
  title: string;
  description: string;
}

interface ParentSectionProps {
  features: ParentFeature[];
}

export default function ParentSection({
  features,
}: ParentSectionProps) {
  return (
    <section className="overflow-hidden bg-neutral-50 px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-14 lg:grid-cols-2">

          {/* Visual */}
          <div className="relative order-2 lg:order-1">
            <div className="absolute -inset-4 rounded-[2.5rem] bg-primary-100/50 blur-2xl" />

            <div className="relative overflow-hidden rounded-[2rem] bg-primary-900 p-3 shadow-2xl">
              <div className="overflow-hidden rounded-[1.5rem]">
                <Image
                  width={520}
                  height={520}
                  src="https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=1200&q=85"
                  alt="القرآن الكريم"
                  className="h-[520px] w-full object-cover"
                />
              </div>

              <div className="absolute bottom-8 right-8 left-8 rounded-2xl border border-white/20 bg-white/95 p-5 backdrop-blur">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary">
                    <BookOpenCheck className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="font-bold text-neutral-900">
                      رحلة تعليمية متصلة
                    </p>

                    <p className="mt-1 text-xs text-neutral-500">
                      كن قريباٌ من رحلة ابنك
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <span className="text-sm font-semibold text-primary">
              لولي الأمر
            </span>

            <h2 className="mt-3 text-3xl font-bold leading-[1.4] text-neutral-900 sm:text-4xl">
              كن قريبًا من رحلة ابنك في القرآن والعلم
            </h2>

            <p className="mt-5 leading-8 text-neutral-600">
              بعد تسجيل الدخول، يستطيع ولي الأمر متابعة المعلومات المتعلقة
              بأبنائه والاطلاع على جوانب من رحلتهم التعليمية في الحلقة.
            </p>

            <div className="mt-8 space-y-5">
              {features.map((feature) => (
                <div
                  key={feature.id}
                  className="flex gap-4"
                >
                  <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success-50 text-success-700">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>

                  <div>
                    <h3 className="font-bold text-neutral-900">
                      {feature.title}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-neutral-500">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/login"
              className="mt-9 inline-flex items-center gap-3 rounded-xl bg-primary px-6 py-3.5 font-semibold text-white transition-all hover:bg-primary-600"
            >
              الدخول إلى حساب ولي الأمر
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}