import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";

//checkbox container
interface CheckboxContainer
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof checkBoxContainer> {
  custom?: string;
}
type CheckboxContainerRef = HTMLDivElement;

const checkBoxContainer = tv({
  base: "flex flex-row h-12 min-w-max w-full px-2 border justify-center gap-2 rounded-md",
});

const CheckboxContainer = React.forwardRef<
  CheckboxContainerRef,
  CheckboxContainer
>((props, ref) => {
  return (
    <div
      className={checkBoxContainer({ class: props.custom })}
      {...props}
      ref={ref}
    >
      {props.children}
    </div>
  );
});

CheckboxContainer.displayName = "CheckboxContainer";

//checkbox
interface Checkbox
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof checkBoxVariants> {
  custom?: string;
}
type CheckboxRef = HTMLInputElement;

const checkBoxVariants = tv({
  base: "rounded-md cursor-pointer",
});

const Checkbox = React.forwardRef<CheckboxRef, Checkbox>((props, ref) => {
  //set default type
  const { type = "checkbox" } = props;

  return (
    <input
      className={checkBoxVariants({ class: props.custom })}
      type={type}
      {...props}
      ref={ref}
    />
  );
});

Checkbox.displayName = "Checkbox";

export { Checkbox, CheckboxContainer };
