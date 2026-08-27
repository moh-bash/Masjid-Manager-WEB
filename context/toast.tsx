"use client";

import { X } from "lucide-react";
import { createContext, useContext, useState, useCallback, useEffect, ElementType, ReactNode } from "react";

export type ToastType = "success" | "danger" | "warning" | "info";

export type ToastOptions = {
  message: string;
  type?: ToastType;
  Icon?: ElementType;
  backgroundColor?: string;
  textColor?: string;
  duration?: number;
};

type ToastContextType = {
  showToast: (options: ToastOptions) => void;
  hideToast: () => void;
};

const typeStyles: Record<ToastType, { bg: string; text: string }> = {
  success: {
    bg: "bg-emerald-50 border-emerald-200 text-emerald-800",
    text: "text-emerald-800",
  },
  danger: {
    bg: "bg-rose-50 border-rose-200 text-rose-800",
    text: "text-rose-800",
  },
  warning: {
    bg: "bg-amber-50 border-amber-200 text-amber-800",
    text: "text-amber-800",
  },
  info: {
    bg: "bg-sky-50 border-sky-200 text-sky-800",
    text: "text-sky-800",
  },
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<(ToastOptions & { id: number }) | null>(null);

  const showToast = useCallback((options: ToastOptions) => {
    setToast({ ...options, id: Date.now() });
  }, []);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
            {toast && (
        <Toast
          key={toast.id}
          {...toast}
          onClose={hideToast}
        />
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

type ToastProps = ToastOptions & { onClose: () => void };

function Toast({
  message,
  type = "info",
  Icon,
  backgroundColor,
  textColor,
  duration = 3500,
  onClose,
}: ToastProps) {
  useEffect(() => {
    if (!duration) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const preset = typeStyles[type];

  return (
    <div
      role="alert"
      className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 w-full max-w-sm p-4 rounded-2xl border shadow-xl backdrop-blur-md transition-all duration-300 animate-bounce-in ${
        backgroundColor || preset.bg
      }`}
    >
      <div className="flex-shrink-0">
        {Icon && <Icon size={20} />}
      </div>

      <div className={`flex-1 text-sm font-medium ${textColor || preset.text}`}>
        {message}
      </div>

      <button
        type="button"
        onClick={onClose}
        className="flex-shrink-0 p-1.5 rounded-lg opacity-60 hover:opacity-100 hover:bg-black/5 transition-all focus:outline-none"
        aria-label="إغلاق"
      >
        <X size={20} />
      </button>
    </div>
  );
}