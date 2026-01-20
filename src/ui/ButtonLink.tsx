import type { AnchorHTMLAttributes } from "react";

type ButtonVariant =
  | "primary"
  | "outline"
  | "ghost"
  | "danger"
  | "info"
  | "edit";

type ButtonSize = "sm" | "md";

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
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
  edit: "border border-accent-blue/30 bg-accent-blue/10 text-accent-blue hover:bg-accent-blue/20",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
};

const ButtonLink = ({
  variant = "outline",
  size = "md",
  className = "",
  ...props
}: ButtonLinkProps) => {
  return (
    <a
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    />
  );
};

export default ButtonLink;
