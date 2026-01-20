import type { ButtonHTMLAttributes } from "react";

type ButtonVariant =
  | "primary"
  | "outline"
  | "ghost"
  | "danger"
  | "info"
  | "warning";
type ButtonSize = "sm" | "md";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-league-700 text-white hover:bg-league-800 shadow-sm",
  outline:
    "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
  ghost: "bg-transparent text-slate-600 hover:bg-slate-100",
  danger:
    "border border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100",
  info: "border border-sky-200 bg-sky-50 text-sky-700 hover:bg-sky-100",
  warning:
    "border border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100",
};
const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
};

const Button = ({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    />
  );
};

export default Button;
