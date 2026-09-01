import type { ButtonHTMLAttributes, ReactNode } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "secondary" | "ghost";
  children: ReactNode;
}

export default function IconButton({
  children,
  variant = "default",
  className = "",
  ...props
}: IconButtonProps) {
  const variantStyles = {
    default:
      "text-subtle-foreground enabled:hover:bg-gray-100 enabled:active:bg-gray-100",
    primary:
      "bg-primary text-white enabled:hover:bg-primary-hover enabled:active:bg-primary-hover",
    secondary:
      "bg-gray-200 text-muted-foreground enabled:hover:bg-gray-100 enabled:active:bg-gray-100",
    ghost: "text-muted-foreground",
  };

  return (
    <button
      {...props}
      className={`flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors active:scale-95 disabled:cursor-not-allowed ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
