import type { ButtonHTMLAttributes, ReactNode } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function IconButton({
  children,
  className = "",
  ...props
}: IconButtonProps) {
  return (
    <button
      {...props}
      className={`flex h-9 w-9 items-center justify-center cursor-pointer
         rounded-full text-gray-400 transition-colors enabled:hover:bg-gray-100 ${className}`}
    >
      {children}
    </button>
  );
}
