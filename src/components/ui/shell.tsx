import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";

export const shellVariants = tv({
  base: "px-20 text-sm",
});

/**
 * forwardRef<T, P{}>
 * P - props without ref
 * T - ref attributes <T>, T contains ref
 */

/**
 * shell is a component that binding all things together
 * entire components should use this to make things more
 * consistent.
 * example: px-20 every component (e.g navbar, page, footer.)
 */

interface Shell
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof shellVariants> {}

type ShellRef = HTMLDivElement;

export const Shell = React.forwardRef<ShellRef, Shell>((props, ref) => {
  return (
    <div
      className={shellVariants({ class: props.className })}
      {...props}
      ref={ref}
    >
      {props.children}
    </div>
  );
});

Shell.displayName = "Shell";
