import { forwardRef } from "react";

interface LabelProps {
    htmlFor: string;
    text: string;
    isFocused: boolean;
  }
  export const Label = forwardRef<HTMLLabelElement, LabelProps>(
    ({ htmlFor, text, isFocused }, ref) => (
      <label
        ref={ref}
        htmlFor={htmlFor}
        className={`absolute transition-all duration-200 ${
          isFocused
            ? '-top-2 left-2 text-xs bg-white px-1 text-gray-700'
            : 'top-3 left-3 text-gray-500'
        }`}
      >
        {text}
      </label>
    )
  );
  Label.displayName = 'Label';