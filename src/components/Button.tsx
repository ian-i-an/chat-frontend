import { type ButtonHTMLAttributes } from "react";

//  HTML 버튼의 기본 속성을 그대로 물려받습니다.
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  variant?: "filled" | "outline";
}

export default function Button({
  text,
  variant = "filled",
  className = "",

  ...props // 여기에 disabled, type 등이 알아서 들어옵니다.
}: ButtonProps) {
  const variantStyles = {
    filled: props.disabled
      ? "bg-gray-200  text-gray-400 cursor-not-allowed" // 비활성화 상태
      : "bg-blue-500 hover:bg-blue-400 text-white cursor-pointer active:scale-95", // 일반 상태

    outline: props.disabled
      ? "border border-gray-200 text-gray-400 cursor-not-allowed" // 비활성화 상태
      : "border border-blue-400 text-blue-500 hover:bg-blue-50 cursor-pointer active:scale-95", // 일반 상태
  };

  return (
    <button
      {...props}
      className={`rounded-xl py-3 text-center font-bold transition-all duration-200 ${variantStyles[variant]} ${className}`}
    >
      {text}
    </button>
  );
}
