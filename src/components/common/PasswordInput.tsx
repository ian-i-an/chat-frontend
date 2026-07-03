import { useState, type InputHTMLAttributes } from "react";
import FormInput from "./FormInput";
import { Eye, EyeOff } from "lucide-react";

type PasswordInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export default function PasswordInput(props: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <FormInput
      {...props}
      type={isVisible ? "text" : "password"}
      rightElement={
        <button
          type="button"
          onClick={() => setIsVisible((current) => !current)}
          className="flex h-6 w-6 items-center justify-center text-gray-400 transition-colors hover:text-gray-600"
        >
          {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      }
    />
  );
}
