import { InputHTMLAttributes, ElementType } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  Icon?: ElementType;
  isLoading?: boolean;
}

export default function Input({
  label,
  Icon,
  id,
  type = "text",
  value,
  onChange,
  isLoading,
  placeholder,
  className = "",
  disabled,
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="mb-2 block text-sm font-medium text-[#202B3F]">
          {label}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <Icon
            size={20}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
        )}

        <input
          id={id}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          disabled={disabled || isLoading}
          className={`
            h-13 w-full rounded-xl border border-gray-200 bg-gray-50
            pl-4 text-sm outline-none transition
            focus:border-[#58A5C7] focus:bg-white focus:ring-4 focus:ring-[#58A5C7]/10
            disabled:cursor-not-allowed disabled:opacity-60
            ${Icon ? "pr-12" : "pr-4"}
            ${className}
          `}
          {...props}
        />
      </div>
    </div>
  );
}