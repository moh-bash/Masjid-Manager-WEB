"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import { login } from "@/lib/features/auth/services/auth.service";
import Input from "@/components/UI/Input";
import { ROLE_CONFIG } from "@/lib/features/auth/roles";


export default function LoginForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(
    e: FormEvent<HTMLFormElement>,
  ) {
    e.preventDefault();

    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage(
        "يرجى إدخال البريد الإلكتروني وكلمة المرور",
      );
      return;
    }

    try {
      setIsLoading(true);

      const response = await login({
        email,
        password,
      });

      localStorage.setItem("token", response.token);

      const firstRole = response.role[0];

      const redirectPath = ROLE_CONFIG[firstRole].href;

      router.push(redirectPath);
    } catch (error) {
      console.error("Login error:", error);

      setErrorMessage(
        "البريد الإلكتروني أو كلمة المرور غير صحيحة",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      {/* Error Message */}
      {errorMessage && (
        <div
          className="
            rounded-xl
            border
            border-red-100
            bg-red-50
            px-4
            py-3
            text-sm
            text-red-600
          "
        >
          {errorMessage}
        </div>
      )}

      {/* Email */}
      <Input
        id="email"
        label="البريد الإلكتروني"
        Icon={Mail}
        type="email"
        placeholder="example@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        isLoading={isLoading}
      />


      {/* Password */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label
            htmlFor="password"
            className="text-sm font-medium text-[#202B3F]"
          >
            كلمة المرور
          </label>

          <Link
            href="/"
            className="text-sm font-medium text-[#4B9BC0] transition hover:text-[#202B3F]"
          >
            نسيت كلمة المرور؟
          </Link>
        </div>

        <div className="relative">
          <Lock
            size={20}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
            disabled={isLoading}
            className="
              h-13
              w-full
              rounded-xl
              border
              border-gray-200
              bg-gray-50
              pr-12
              pl-12
              text-sm
              text-[#202B3F]
              outline-none
              transition
              focus:border-[#58A5C7]
              focus:bg-white
              focus:ring-4
              focus:ring-[#58A5C7]/10
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword((prev) => !prev)
            }
            disabled={isLoading}
            aria-label={
              showPassword
                ? "إخفاء كلمة المرور"
                : "إظهار كلمة المرور"
            }
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-gray-400
              transition
              hover:text-[#202B3F]
              disabled:cursor-not-allowed
            "
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        </div>
      </div>

      {/* Remember */}
      <label className="flex cursor-pointer items-center gap-3 text-sm text-gray-500">
        <input
          type="checkbox"
          className="
            h-4
            w-4
            rounded
            border-gray-300
            accent-[#4B9BC0]
          "
        />

        تذكرني على هذا الجهاز
      </label>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="
          group
          flex
          h-13
          w-full
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-[#202B3F]
          font-semibold
          text-white
          shadow-lg
          shadow-[#202B3F]/20
          transition-all
          hover:-translate-y-0.5
          hover:bg-[#4B9BC0]
          hover:shadow-xl
          active:translate-y-0
          disabled:cursor-not-allowed
          disabled:opacity-70
          disabled:hover:translate-y-0
        "
      >
        {isLoading ? (
          <>
            <Loader2
              size={20}
              className="animate-spin"
            />

            جاري تسجيل الدخول...
          </>
        ) : (
          <>
            تسجيل الدخول

            <ArrowLeft
              size={19}
              className="transition-transform group-hover:-translate-x-1"
            />
          </>
        )}
      </button>

      {/* Divider */}
      <div className="flex items-center gap-4 py-2">
        <div className="h-px flex-1 bg-gray-100" />

        <span className="text-xs text-gray-400">
          أو
        </span>

        <div className="h-px flex-1 bg-gray-100" />
      </div>

      {/* Register */}
      <p className="text-center text-sm text-gray-500">
        ليس لديك حساب؟

        <Link
          href="/register"
          className="mr-2 font-semibold text-[#4B9BC0] transition hover:text-[#202B3F]"
        >
          إنشاء حساب جديد
        </Link>
      </p>
    </form>
  );
}