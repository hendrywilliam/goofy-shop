import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";

//menu root
interface DropdownContext {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const DropdownContext = React.createContext<DropdownContext>({
  isActive: false,
  setIsActive: () => {},
});

const dropdownMenuRootVariant = tv({
  base: "w-max h-max relative inline-block",
});

interface DropdownMenuRoot
  extends React.PropsWithChildren,
    VariantProps<typeof dropdownMenuRootVariant> {
  custom?: string;
}

const DropdownMenuRoot = function ({ children, custom }: DropdownMenuRoot) {
  const [isActive, setIsActive] = React.useState(false);
  const dropdownMenu = React.useRef<HTMLDivElement>(null!);

  return (
    <DropdownContext.Provider value={{ isActive, setIsActive }}>
      <div
        className={dropdownMenuRootVariant({ class: custom })}
        ref={dropdownMenu}
        id="dropdown_menu_root"
      >
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

//trigger
interface DropdownMenuTrigger
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  custom?: string;
}

type DropdownMenuTriggerRef = HTMLButtonElement;

const dropdownTriggerVariant = tv({
  base: "p-2 border w-24 rounded-md",
});

const DropdownMenuTrigger = React.forwardRef<
  DropdownMenuTriggerRef,
  DropdownMenuTrigger
>((props, ref) => {
  const { isActive, setIsActive } = React.useContext(DropdownContext);

  return (
    <button
      className={dropdownTriggerVariant({ class: props.custom })}
      {...props}
      ref={ref}
      onClick={() => setIsActive(!isActive)}
    >
      {props.children}
    </button>
  );
});

DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

//drop down menu content
interface DropdownMenuContent
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dropdownMenuContentVariant> {
  custom?: string;
}

type DropdownMenuContentRef = HTMLDivElement;

const dropdownMenuContentVariant = tv({
  base: "flex flex-col h-max w-max z-30 absolute right-0 border mt-2 rounded-md bg-white p-2",
});

const DropdownMenuContent = React.forwardRef<
  DropdownMenuContentRef,
  DropdownMenuContent
>((props, ref) => {
  const { isActive } = React.useContext(DropdownContext);

  return (
    <>
      {isActive && (
        <div
          className={dropdownMenuContentVariant({
            class: props.custom,
          })}
          ref={ref}
          id="dropdown_menu_content"
        >
          {props.children}
        </div>
      )}
    </>
  );
});

DropdownMenuContent.displayName = "DropdownMenuContent";

//dropdown menu header
interface DropdownMenuHeader
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dropdownMenuHeaderVariant> {
  custom?: string;
}

type DropdownMenuHeaderRef = HTMLDivElement;

//dropdown menu header variant
const dropdownMenuHeaderVariant = tv({
  base: "flex w-full border-b",
});

const DropdownMenuHeader = React.forwardRef<
  DropdownMenuHeaderRef,
  DropdownMenuHeader
>((props, ref) => {
  return (
    <div
      className={dropdownMenuHeaderVariant({ class: props.custom })}
      ref={ref}
    >
      {props.children}
    </div>
  );
});

DropdownMenuHeader.displayName = "DropdownMenuHeader";

//dropdown menu main content

export {
  DropdownMenuTrigger,
  DropdownMenuRoot,
  DropdownMenuContent,
  DropdownMenuHeader,
};

/**
 * anatomy
 * |--DropdownMenuRoot
 * |--DropdownMenuTrigger
 * |----DropdownMenuContent
 * |----DropdownMenuHeader
 * |----MainContent (any tag, e.g <div>)
 */

//not a big fan of portal🗿
