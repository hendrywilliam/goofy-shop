import { InputHTMLAttributes, forwardRef } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

type InputRef = HTMLInputElement;

export const Input = forwardRef<InputRef, InputProps>((props, ref) => {
  return <input {...props} ref={ref} />;
});

Input.displayName = "Input";
