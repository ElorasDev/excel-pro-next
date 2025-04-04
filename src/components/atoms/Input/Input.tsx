import { ChangeEvent, forwardRef } from "react";

export interface InputProps {
    id: string;
    name: string;
    type?: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onFocus: () => void;
    onBlur: () => void;
    placeholder: string;
  }
  export const Input = forwardRef<HTMLInputElement, InputProps>(
    (
      { id, name, type = 'text', value, onChange, onFocus, onBlur, placeholder },
      ref
    ) => (
      <input
        ref={ref}
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
      />
    )
  );
  Input.displayName = 'Input';