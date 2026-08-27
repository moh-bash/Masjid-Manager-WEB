import type { Metadata } from "next";
import { Tajawal, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/context/toast";

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "مسجدي",
  description: "منصة ادارة طلاب المساجد في بلدة جسرين",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ar"
      className={`${tajawal.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body dir="rtl" className="min-h-full flex flex-col">
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
