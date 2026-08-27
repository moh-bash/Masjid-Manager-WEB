"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Menu,
  X,
  Building2,
  LogIn,
  ChevronLeft,
} from "lucide-react";
import Button from "../UI/Button";

const navLinks = [
  {
    name: "الرئيسية",
    href: "/",
  },
  {
    name: "المنشورات",
    href: "/posts",
  },
  {
    name: "عن النظام",
    href: "/about",
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

       {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <Button 
          variant="primary"
          href="/login"
          leftIcon={<LogIn size={18} />}
          size="md"
          >
            تسجيل الدخول
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 transition hover:bg-slate-100 md:hidden"
          aria-label="فتح القائمة"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-4 py-2 text-md font-medium text-slate-600 transition hover:bg-slate-100 hover:text-primary-600"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        

         {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-bold text-slate-900">
              مسجدي
            </span>

            <span className="text-xs font-medium text-slate-500">
              Masjidly
            </span>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white shadow-sm transition hover:bg-primary-700">
            <Building2 size={24} strokeWidth={2.2} />
          </div>

        </Link>

      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-slate-100 bg-white md:hidden h-screen">
          <div className="space-y-2 px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-emerald-600"
              >
                {link.name}
                <ChevronLeft size={18} />
              </Link>
            ))}

            <div className="border-t border-slate-100 pt-3">
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primry-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                <LogIn size={18} />
                تسجيل الدخول
              </Link>
            </div>
          </div> 
        </div>
      )}
    </header>
  );
}