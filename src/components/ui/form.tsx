import {
  FormHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  forwardRef,
} from "react";
import { tv, type VariantProps } from "tailwind-variants";

//form root interfaces
export interface Form extends FormHTMLAttributes<HTMLFormElement> {}

type FormRef = HTMLFormElement;

export const Form = forwardRef<FormRef, Form>((props, ref) => {
  return (
    <form {...props} ref={ref}>
      {props.children}
    </form>
  );
});

Form.displayName = "Form";

//form field interfaces
export interface FormField extends FormHTMLAttributes<HTMLFieldSetElement> {}

type FormFieldRef = HTMLFieldSetElement;

export const FormField = forwardRef<FormFieldRef, FormField>((props, ref) => {
  return (
    <fieldset {...props} ref={ref}>
      {props.children}
    </fieldset>
  );
});

FormField.displayName = "FormField";

//form label interfaces
export interface FormLabel extends LabelHTMLAttributes<HTMLLabelElement> {}

type FormLabelRef = HTMLLabelElement;

export const FormLabel = forwardRef<FormLabelRef, FormLabel>((props, ref) => {
  return <label {...props}>{props.children}</label>;
});

FormLabel.displayName = "FormLabel";

//form input interfaces
export interface FormInput
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "color">,
    FormInputVariant {
  custom?: string;
}

type FormInputRef = HTMLInputElement;

//form input variant
const FormInputVariant = tv({
  base: "p-2 rounded-md",
  variants: {
    color: {
      primary: "border",
      error: "border border-destructive",
    },
    font: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    color: "primary",
    font: "sm",
  },
});

type FormInputVariant = VariantProps<typeof FormInputVariant>;

export const FormInput = forwardRef<FormInputRef, FormInput>((props, ref) => {
  return (
    <input
      className={FormInputVariant({
        color: props.color,
        font: props.font,
        class: props.custom,
      })}
      {...props}
      ref={ref}
    />
  );
});

FormInput.displayName = "FormInput";

export interface FormMessage
  extends Omit<HTMLAttributes<HTMLParagraphElement>, "color">,
    VariantProps<typeof FormMessageVariant> {
  custom?: string;
}

type FormMessageRef = HTMLParagraphElement;

const FormMessageVariant = tv({
  base: "text-base mt-2",
  variants: {
    variant: {
      error: "text-destructive",
      muted: "text-muted",
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
  },
});

export const FormMessage = forwardRef<FormMessageRef, FormMessage>(
  (props, ref) => {
    return (
      <p
        className={FormMessageVariant({
          variant: props.variant,
          size: props.size,
          class: props.custom,
        })}
        {...props}
      >
        {props.children}
      </p>
    );
  }
);

FormMessage.displayName = "FormMessage";
