import type { ButtonHTMLAttributes, ReactNode } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "secondary";
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
  };

  return (
    <button
      {...props}
      className={`shrink-0 flex h-9 w-9 items-center justify-center cursor-pointer active:scale-95
         rounded-full transition-colors disabled:cursor-not-allowed disabled:text-gray-400 ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
