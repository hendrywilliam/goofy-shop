import { ButtonHTMLAttributes, forwardRef } from "react";
import { tv, type VariantProps } from "tailwind-variants";

export const button = tv({
  base: "px-4 py-2 rounded-md hover:opacity-80 antialiased",
  variants: {
    color: {
      primary: "bg-primary text-white",
      neutral: "bg-zinc-500 text-black dark:text-white",
      destructive: "bg-destructive text-white",
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    color: "primary",
    size: "sm",
  },
});

/**
 * ButtonHTMLAttributes<T> is an interface for giving special attributes
 * for element <button>.
 * it accepts <T> as generic parameter, which accepts a HTML element.
 */

/**
 * omit is used to exclude "color" property from ButtonHTMLAttributes
 * we are unable to simultaneously extends 2 interface with the same property.
 * color property comes from ButtonHTMLAttributes extending HTMLAttributes
 */
export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof button> {}

//or you could easily add replace <T> in forwardRef with HTMLButtonElement
export type Ref = HTMLButtonElement;

/*eslint-disable*/
export const Button = forwardRef<Ref, ButtonProps>((props, ref) => (
  <button ref={ref} className={button({ color: props.color })} {...props}>
    {props.children}
  </button>
));

/**
 * import { Button } from "@/components/ui/button"
 *
 * fn greetMom() {
 *  alert("hi mom")
 * }
 *
 * usage: <Button @click="greetMom">hi mom</Button>
 */
