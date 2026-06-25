import { type InputHTMLAttributes } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function FormInput({ label, ...props }: FormInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="pl-1 text-xs font-bold text-gray-600">{label}</label>
      <input
        {...props}
        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-base text-gray-900 transition-all duration-200 focus:border-blue-300 focus:bg-white focus:outline-none"
      />
    </div>
  );
}
