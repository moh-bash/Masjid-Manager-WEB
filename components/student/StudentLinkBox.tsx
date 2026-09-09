"use client";

import { useState } from "react";
import { Key, Copy, Check, RefreshCw } from "lucide-react";

interface StudentLinkBoxProps {
  linkCode?: string | null;
  onRefresh?: () => void; 
}

export function StudentLinkBox({ linkCode, onRefresh }: StudentLinkBoxProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!linkCode) return;
    try {
      await navigator.clipboard.writeText(linkCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); 
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3.5">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Key size={22} />
        </div>
        <div>
          <span className="block text-xs font-medium text-gray-500">كود ربط ولي الأمر</span>
          <span className="font-mono text-base font-bold text-gray-900 tracking-wider">
            {linkCode || "لا يوجد كود حالياً"}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 self-end sm:self-center">
        {linkCode && (
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 transition-colors cursor-pointer shadow-2xs"
            title="نسخ الكود"
          >
            {copied ? (
              <>
                <Check size={16} className="text-emerald-600" />
                <span className="text-emerald-600 font-semibold">تم النسخ</span>
              </>
            ) : (
              <>
                <Copy size={16} className="text-gray-500" />
                <span>نسخ الكود</span>
              </>
            )}
          </button>
        )}

        <button
          type="button"
          onClick={onRefresh}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-gray-500 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 transition-colors cursor-pointer shadow-2xs"
          title="تحديث الكود (قريباً)"
        >
          <RefreshCw size={16} />
          <span>تحديث الكود</span>
        </button>
      </div>
    </div>
  );
}