import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";

export const shellVariants = tv({
  base: "px-20 text-sm",
});

interface Shell
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof shellVariants> {
  custom?: string;
}

type ShellRef = HTMLDivElement;

export const Shell = React.forwardRef<ShellRef, Shell>((props, ref) => {
  return (
    <div
      className={shellVariants({ class: props.custom })}
      {...props}
      ref={ref}
    >
      {props.children}
    </div>
  );
});

Shell.displayName = "Shell";
