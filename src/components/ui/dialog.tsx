import * as React from "react";
import { VariantProps, tv } from "tailwind-variants";

interface DialogContext {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

//create context dialog
const DialogContext = React.createContext<DialogContext>({
  isActive: false,
  setIsActive: () => {},
});

//create context dialog dispatch
// const DialogDispatchContext = React.createContext();

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

export const AlertDialogTrigger = function ({
  children,
}: React.PropsWithChildren) {
  const { isActive, setIsActive } = React.useContext(DialogContext);

  return (
    <button
      id="dialog_trigger"
      className={alertDialogVariant()}
      onClick={() => setIsActive(!isActive)}
    >
      {children}
    </button>
  );
};

//alert dialog overlay
interface AlertDialogOverlay extends React.HTMLAttributes<HTMLDivElement> {}

type AlertDialogOverlayRef = HTMLDivElement;

const AlertDialogOverlay = React.forwardRef<
  AlertDialogOverlayRef,
  AlertDialogOverlay
>((props, ref) => {
  return (
    <div className="flex h-screen w-screen items-center fixed top-0 z-29 backdrop-blur-sm bg-white/30">
      {props.children}
    </div>
  );
});

AlertDialogOverlay.displayName = "AlertDialogOverlay";

//alert dialog content
interface AlertDialogContent
  extends React.DialogHTMLAttributes<HTMLDialogElement>,
    VariantProps<typeof alertDialogContentVariant> {}

type AlertDialogContentRef = HTMLDialogElement;

//alert dialog content variant

const alertDialogContentVariant = tv({
  base: "flex w-[300px] h-[300px] border rounded-md z-30",
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
            className={alertDialogContentVariant({ class: props.className })}
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
        class: props.className,
      })}
      {...props}
      onClick={() => void setIsActive(!isActive)}
      ref={ref}
      id="dialog_close_action"
    >
      {props.children}
    </button>
  );
});

AlertDialogClose.displayName = "AlertDialogClose";

/**
 * anatomy
 * -AlertDialog
 * |- AlertDialogTrigger
 * |- AlertDialogContent (include overlay)
 *   |- AlertDialogClose
 *
 */
