"use client";
import Link from "next/link";
import {
  ButtonHTMLAttributes,
  ReactNode,
  MouseEventHandler,
} from "react";

type ButtonVariant = "primary" | "secondary" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const variants = {
  primary:
    "group bg-primary text-white shadow-sm shadow-primary/20 hover:-translate-y-0.5 hover:bg-primary/80",
  secondary:
    "bg-slate-800 text-white hover:bg-slate-700",
  outline:
    "border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-primary-200 hover:bg-primary-50 hover:text-primary-700",
};

const sizes = {
  sm: "rounded-xl px-4 py-2 text-sm gap-1.5",
  md: "rounded-xl px-5 py-2.5 text-sm gap-2",
  lg: "rounded-2xl px-7 py-4 text-base gap-2",
};

function Button({
  children,
  type,
  variant = "primary",
  size = "md",
  href,
  leftIcon,
  rightIcon,
  className= "",
  disabled,
  onClick,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold transition-all duration-300";

  const buttonStyles = `
    ${baseStyles}
    ${variants[variant]}
    ${sizes[size]}
    ${className}
  `;

  if (href) {
    return (
      <Link href={href} className={buttonStyles}>
        {leftIcon && (
          <span className="flex items-center">
            {leftIcon}
          </span>
        )}
        {children}
        {rightIcon && (
          <span className="flex items-center transition-transform group-hover:-translate-x-1">
            {rightIcon}
          </span>
        )}
      </Link>
    );
  }


  return (
    <button
      type={type || "button"}
      className={buttonStyles}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {leftIcon && (
        <span className="flex items-center">
          {leftIcon}
        </span>
      )}

      {children}

      {rightIcon && (
        <span className="flex items-center transition-transform group-hover:-translate-x-1">
          {rightIcon}
        </span>
      )}
    </button>
  );
}

export default Button
