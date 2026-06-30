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
      className={`shrink-0 flex h-9 w-9 items-center justify-center cursor-pointer active:scale-95
         rounded-full text-gray-400 transition-colors enabled:hover:bg-gray-100  enabled:active:bg-gray-100 ${className}`}
    >
      {children}
    </button>
  );
}
