import type { ButtonHTMLAttributes, ReactNode } from "react";

interface PhotoButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function PhotoButton({
  children,
  className = "",
  ...props
}: PhotoButtonProps) {
  return (
    <button
      {...props}
      className={`shrink-0 cursor-pointer overflow-hidden rounded-full border border-gray-100 transition-opacity hover:opacity-80 active:opacity-80 ${className}`}
    >
      {children}
    </button>
  );
}
