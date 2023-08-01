import { InputHTMLAttributes, forwardRef } from "react";
import { tv, type VariantProps } from "tailwind-variants";

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  custom?: string;
}

type InputRef = HTMLInputElement;

//input variants
const inputVariants = tv({
  base: "p-2 border rounded-md focus:ring-2 ring-muted outline-none",
});

export const Input = forwardRef<InputRef, InputProps>((props, ref) => {
  return (
    <input
      className={inputVariants({ class: props.custom })}
      {...props}
      ref={ref}
    />
  );
});

Input.displayName = "Input";
