import { InputHTMLAttributes, forwardRef } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export type InputRef = HTMLInputElement;

export const Input = forwardRef<InputRef, InputProps>((props, ref) => {
  return <input {...props} ref={ref} />;
});

/**
 * eslint will be mad at u if u dont add displayName prop.
 * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/display-name.md
 *
 * forwardRef return type is ForwardRefExoticComponent which
 * extends an interface called NamedExoticComponent which also
 * extends an interface called ExoticComponent🗿
 *
 * displayName is obtained from NamedExoticComponent interface.
 */
Input.displayName = "Input";

/**
 * Usage:
 *
 * import { Input } from "@/components/ui/input"
 * import { useRef } from "react"
 *
 * const inputRef = useRef(null);
 *
 * fn focus() {
 *  return inputRef.current.focus(); (?)
 * }
 * <Input onChange="onChange fn" type="text" ref={inputRef}/>
 */
