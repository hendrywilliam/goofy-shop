import { ButtonHTMLAttributes, forwardRef } from "react";
import { tv, type VariantProps } from "tailwind-variants";

export const buttonVariants = tv({
  base: "px-4 py-2 rounded-md hover:opacity-80 antialiased cursor-pointer disabled:opacity-75",
  variants: {
    variant: {
      primary: "bg-primary text-white",
      neutral: "bg-zinc-500 text-black dark:text-white",
      destructive: "text-destructive border border-destructive",
      ghost: "hover:bg-[#f9f9f9] border-none",
      bordered: "bg-transparent hover:bg-gray-100 border",
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "sm",
  },
});

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  custom?: string;
}

type Ref = HTMLButtonElement;

export const Button = forwardRef<Ref, ButtonProps>((props, ref) => {
  return (
    <button
      ref={ref}
      className={buttonVariants({
        variant: props.variant,
        size: props.size,
        class: props.custom,
      })}
      {...props}
    >
      {props.children}
    </button>
  );
});

Button.displayName = "Button";
