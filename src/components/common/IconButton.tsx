import type { ButtonHTMLAttributes, ReactNode } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

// 색에 관해서는 관련 x
export default function IconButton({
  children,
  className = "",
  ...props
}: IconButtonProps) {
  return (
    <button
      {...props}
      className={`flex h-9 w-9 shrink-0 
        cursor-pointer items-center justify-center rounded-full active:scale-95 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
}
