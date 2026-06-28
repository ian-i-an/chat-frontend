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
      "bg-blue-500 enabled:hover:bg-blue-400 enabled:active:bg-blue-400 text-white disabled:bg-gray-200  ",

    outline:
      "border border-blue-400 text-blue-500 enabled:hover:bg-blue-50 enabled:active:bg-blue-50 disabled:border-gray-200 ",
  };

  return (
    <button
      {...props}
      className={`rounded-xl py-3 text-center font-bold transition-all duration-200 enabled:active:scale-95
         disabled:text-gray-400 cursor-pointer disabled:cursor-not-allowed  ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
