"use client";

import { useState } from "react";
import Link from "next/link";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  UserPlus,
  Phone,
  Loader2,
} from "lucide-react";
import { register } from "@/lib/features/auth/services/auth.service";
import { useRouter } from "next/navigation";
import Input from "@/components/UI/Input";

export default function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");

    if (!name || !email || !phoneNumber || !password) {
      setErrorMessage("يرجى إدخال جميع الحقول المطلوبة");
      return;
    }

    try {
      setIsLoading(true);
      const response = await register({
        name,
        email,
        phoneNumber,
        password,
      })

      console.log('====================================');
      console.log(response);
      console.log('====================================');

      router.push("/admin");

    } catch (error) {
      setErrorMessage("حدث خطأ أثناء تسجيل المستخدم");
      console.error("Register error:", error);
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

      {/* Name */}
      <Input
        id="name"
        label="الاسم الكامل"
        Icon={User}
        type="text"
        placeholder="أدخل اسمك الكامل"
        value={name}
        onChange={(e) => setName(e.target.value)}
        isLoading={isLoading}
      />

      {/* Email */}
      <div>
        <label className="mb-2 block text-sm font-medium text-[#202B3F]">
          البريد الإلكتروني
        </label>

        <div className="relative">
          <Mail
            size={20}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="email"
            placeholder="example@email.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            autoComplete="email"
            disabled={isLoading}
            className="
              h-13
              w-full
              rounded-xl
              border
              border-gray-200
              bg-gray-50
              pr-12
              pl-4
              text-sm
              outline-none
              transition
              focus:border-[#58A5C7]
              focus:bg-white
              focus:ring-4
              focus:ring-[#58A5C7]/10
            "
          />
        </div>
      </div>

      {/* Phone Number */}
      <div>
        <label className="mb-2 block text-sm font-medium text-[#202B3F]">
          رقم الهاتف
        </label>

        <div className="relative">
          <Phone
            size={20}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="number"
            placeholder="09********"
            onChange={(e) => setPhoneNumber(e.target.value)}
            value={phoneNumber}
            autoComplete="phone"
            disabled={isLoading}
            className="
              h-13
              w-full
              rounded-xl
              border
              border-gray-200
              bg-gray-50
              pr-12
              pl-4
              text-sm
              outline-none
              transition
              focus:border-[#58A5C7]
              focus:bg-white
              focus:ring-4
              focus:ring-[#58A5C7]/10
            "
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label className="mb-2 block text-sm font-medium text-[#202B3F]">
          كلمة المرور
        </label>

        <div className="relative">
          <Lock
            size={20}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="أدخل كلمة مرور قوية"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            disabled={isLoading}
            autoComplete="new-password"
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
              outline-none
              transition
              focus:border-[#58A5C7]
              focus:bg-white
              focus:ring-4
              focus:ring-[#58A5C7]/10
            "
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#202B3F]"
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        </div>
      </div>

      {/* Terms */}
      <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-gray-500">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 accent-[#4B9BC0]"
        />

        <span>
          أوافق على
          <Link
            href="/terms"
            className="mx-1 font-medium text-[#4B9BC0]"
          >
            الشروط والأحكام
          </Link>

          وسياسة الخصوصية
        </span>
      </label>

      {/* Submit */}
      <button
        type="submit"
        className="
          flex
          h-13
          w-full
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-[#4B9BC0]
          font-semibold
          text-white
          shadow-lg
          shadow-[#4B9BC0]/20
          transition-all
          hover:-translate-y-0.5
          hover:bg-[#202B3F]
          hover:shadow-xl
          cursor-pointer
        "
      >
        {isLoading ? (
          <>
            <Loader2
              size={20}
              className="animate-spin"
            />
            جاري إنشاء الحساب...
          </>
        ) : (
          <>
            إنشاء الحساب
            <UserPlus
              size={19}
              className="transition-transform group-hover:-translate-x-1"
            />
          </>
        )}
      </button>

      <p className="pt-2 text-center text-sm text-gray-500">
        لديك حساب بالفعل؟

        <Link
          href="/login"
          className="mr-2 font-semibold text-[#4B9BC0] hover:text-[#202B3F]"
        >
          تسجيل الدخول
        </Link>
      </p>
    </form>
  );
}