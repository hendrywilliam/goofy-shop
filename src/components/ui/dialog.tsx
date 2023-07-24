"use client";

import * as React from "react";
import { type VariantProps, tv } from "tailwind-variants";
import { IconClose } from "../icons/icon-close";

interface DialogContext {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

//create context dialog
const DialogContext = React.createContext<DialogContext>({
  isActive: false,
  setIsActive: () => {},
});

//this will be the root (context.provider)
export const AlertDialog = function ({ children }: React.PropsWithChildren) {
  const [isActive, setIsActive] = React.useState(false);

  return (
    <DialogContext.Provider
      value={{ isActive: isActive, setIsActive: setIsActive }}
    >
      <div id="dialog_root" className="w-max h-max">
        {children}
      </div>
    </DialogContext.Provider>
  );
};

//alert dialog trigger variant

const alertDialogVariant = tv({
  base: "px-4 py-2 rounded-md hover:opacity-80 antialiased cursor-pointer",
  variants: {
    color: {
      primary: "bg-primary text-white",
      neutral: "bg-zinc-500 text-black dark:text-white",
      destructive: "bg-destructive text-white",
      ghost: "hover:bg-[#f9f9f9] border-none",
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

interface AlertDialogTrigger
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof alertDialogVariant> {
  custom?: string;
}

type AlertDialogTriggerRef = HTMLButtonElement;

export const AlertDialogTrigger = React.forwardRef<
  AlertDialogTriggerRef,
  AlertDialogTrigger
>((props, ref) => {
  const { isActive, setIsActive } = React.useContext(DialogContext);
  return (
    <button
      id="dialog_trigger"
      className={alertDialogVariant({ class: props.custom })}
      onClick={() => setIsActive(!isActive)}
      ref={ref}
    >
      {props.children}
    </button>
  );
});

AlertDialogTrigger.displayName = "AlertDialogTrigger";

//alert dialog overlay
interface AlertDialogOverlay extends React.HTMLAttributes<HTMLDivElement> {}

type AlertDialogOverlayRef = HTMLDivElement;

const AlertDialogOverlay = React.forwardRef<
  AlertDialogOverlayRef,
  AlertDialogOverlay
>((props, ref) => {
  React.useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div
      className="flex h-screen w-screen items-center fixed top-0 left-0 z-30 backdrop-blur-sm bg-white/30"
      ref={ref}
    >
      {props.children}
    </div>
  );
});

AlertDialogOverlay.displayName = "AlertDialogOverlay";

//alert dialog content
interface AlertDialogContent
  extends React.DialogHTMLAttributes<HTMLDialogElement>,
    VariantProps<typeof alertDialogContentVariant> {
  custom?: string;
}

type AlertDialogContentRef = HTMLDialogElement;

//alert dialog content variant

const alertDialogContentVariant = tv({
  base: "flex flex-col w-full h-full border rounded-md z-50 p-4 text-sm gap-2",
});

export const AlertDialogContent = React.forwardRef<
  AlertDialogContentRef,
  AlertDialogContent
>((props, ref) => {
  const { isActive } = React.useContext(DialogContext);

  return (
    <>
      {isActive && (
        <AlertDialogOverlay>
          <dialog
            className={alertDialogContentVariant({ class: props.custom })}
            open={isActive}
            id="dialog_content"
          >
            {props.children}
          </dialog>
        </AlertDialogOverlay>
      )}
    </>
  );
});

AlertDialogContent.displayName = "AlertDialogContent";

//alert dialog close button

interface AlertDialogClose
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof alertDialogCloseVariant> {
  custom?: string;
}

type AlertDialogCloseRef = HTMLButtonElement;

const alertDialogCloseVariant = tv({
  base: "p-2 h-max w-max rounded-md hover:opacity-80 antialiased cursor-pointer",
  variants: {
    color: {
      primary: "bg-primary text-white",
      neutral: "bg-zinc-500 text-black dark:text-white",
      destructive: "bg-destructive text-white",
      ghost: "hover:bg-[#f9f9f9] border-none",
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

export const AlertDialogClose = React.forwardRef<
  AlertDialogCloseRef,
  AlertDialogClose
>((props, ref) => {
  const { isActive, setIsActive } = React.useContext(DialogContext);

  return (
    <button
      className={alertDialogCloseVariant({
        color: props.color,
        size: props.size,
        class: props.custom,
      })}
      {...props}
      onClick={() => void setIsActive(!isActive)}
      ref={ref}
      id="dialog_close_action"
    >
      <IconClose />
    </button>
  );
});

AlertDialogClose.displayName = "AlertDialogClose";

//alert dialog header
interface AlertDialogHeader
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertDialogHeaderVariant> {
  custom?: string;
}

type AlertDialogHeaderRef = HTMLDivElement;

//variant alert dialog header
const alertDialogHeaderVariant = tv({
  base: "flex justify-between h-max w-full",
});

export const AlertDialogHeader = React.forwardRef<
  AlertDialogHeaderRef,
  AlertDialogHeader
>((props, ref) => {
  return (
    <div
      className={alertDialogHeaderVariant({ class: props.custom })}
      ref={ref}
    >
      {props.children}
    </div>
  );
});

AlertDialogHeader.displayName = "AlertDialogHeader";

/**
 * anatomy
 * -AlertDialog
 * |- AlertDialogTrigger
 * |- AlertDialogContent (include overlay)
 *  |- AlertDialogHeader
 *   |- AlertDialogClose
 *  |- AlertDialogMainContent
 *  |- AlertDialogFooter
 */
