import type { InputHTMLAttributes } from "react";

export default function FormInput({ ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    
      <input
        {...props}
        className={`w-full rounded-xl border border-border bg-background py-3 pr-4 pl-4 text-base text-foreground transition-all duration-200 focus:border-primary-middle focus:bg-surface focus:outline-none`}
      />
   
  );
}
