import { type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "filled" | "outline";
  children: React.ReactNode;
}

export default function Button({
  children,
  variant = "filled",
  className = "",

  ...props
}: ButtonProps) {
  const variantStyles = {
    filled:
      "bg-primary enabled:hover:bg-primary-hover enabled:active:bg-primary-hover text-white disabled:bg-gray-200  ",

    outline:
      "border border-primary-hover text-primary enabled:hover:bg-primary-soft enabled:active:bg-primary-soft disabled:border-border ",
  };

  return (
    <button
      {...props}
      className={`rounded-xl py-3 text-center font-bold transition-all duration-200 enabled:active:scale-95
         disabled:text-subtle-foreground cursor-pointer disabled:cursor-not-allowed  ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
