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

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof button> {}

export type Ref = HTMLButtonElement;

/*eslint-disable*/
export const Button = forwardRef<Ref, ButtonProps>((props, ref) => {
  return (
    <button
      ref={ref}
      className={button({ color: props.color, size: props.size })}
      {...props}
    >
      {props.children}
    </button>
  );
});
