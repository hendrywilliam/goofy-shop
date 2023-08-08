import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";

interface Label
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {
  custom?: string;
}
type LabelRef = HTMLLabelElement;

const labelVariants = tv({
  base: "flex self-center",
});

const Label = React.forwardRef<LabelRef, Label>((props, ref) => {
  return (
    <label
      className={labelVariants({ class: props.custom })}
      {...props}
      ref={ref}
    >
      {props.children}
    </label>
  );
});

Label.displayName = "Label";

export { Label };
