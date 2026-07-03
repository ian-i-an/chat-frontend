import { type InputHTMLAttributes, type ReactNode } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  rightElement?: ReactNode;
}

export default function FormInput({ rightElement, ...props }: FormInputProps) {
  return (
    <div className="relative">
      <input
        {...props}
        className={`w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pr-4 pl-4 text-base text-gray-800 transition-all duration-200 focus:border-blue-300 focus:bg-white focus:outline-none ${
          rightElement ? "pr-11" : ""
        }`}
      />
      {rightElement && (
        <div className="absolute top-1/2 right-3 -translate-y-1/2">
          {rightElement}
        </div>
      )}
    </div>
  );
}
