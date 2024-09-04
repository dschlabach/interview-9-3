import React, { InputHTMLAttributes } from "react";
import { cn } from "@/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = ({ label, className, ...props }: InputProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={props.id}
        className="block text-xs font-medium text-gray-600"
      >
        {label}
      </label>
      <input
        className={cn(
          "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500",
          className
        )}
        {...props}
      />
    </div>
  );
};

export default Input;
