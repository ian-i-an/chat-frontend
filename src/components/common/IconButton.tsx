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
      "text-gray-400 enabled:hover:bg-gray-100 enabled:active:bg-gray-100",
    primary:
      "bg-blue-500 text-white enabled:hover:bg-blue-400 enabled:active:bg-blue-400",
    secondary:
      "bg-gray-200 text-gray-500 enabled:hover:bg-gray-100 enabled:active:bg-gray-100",
    ghost: "text-gray-500",
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
