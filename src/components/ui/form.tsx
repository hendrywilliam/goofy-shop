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
    FormInputVariant {}

type FormInputRef = HTMLInputElement;

//form input variant
const FormInputVariant = tv({
  base: "border",
  variants: {
    color: {
      error: "border-destructive",
    },
  },
});

type FormInputVariant = VariantProps<typeof FormInputVariant>;

export const FormInput = forwardRef<FormInputRef, FormInput>((props, ref) => {
  return <input {...props} ref={ref} />;
});

FormInput.displayName = "FormInput";

/** form message (error message)
 * HTML Attributes <T> extends AriaAttributes, DOMAttributes
 * DOM Attributes contain children
 */
export interface FormMessage
  extends Omit<HTMLAttributes<HTMLParagraphElement>, "color">,
    VariantProps<typeof FormMessageVariant> {}

type FormMessageRef = HTMLParagraphElement;

const FormMessageVariant = tv({
  base: "text-base",
  variants: {
    color: {
      error: "text-destructive",
    },
  },
});

export const FormMessage = forwardRef<FormMessageRef, FormMessage>(
  (props, ref) => {
    return <p {...props}>{props.children}</p>;
  }
);

FormMessage.displayName = "FormMessage";

/**
 * DisplayName allows you to name your component. This name is used by React in debugging messages.
 * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/display-name.md
 */
