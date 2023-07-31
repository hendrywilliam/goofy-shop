import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";

//card root interface & type
interface Card
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardRootVariants> {
  custom?: string;
}
type CardRef = HTMLDivElement;

//card root variant
const cardRootVariants = tv({
  base: "h-[400px] w-full text-sm",
});

const Card = React.forwardRef<CardRef, Card>((props, ref) => {
  return (
    <div
      className={cardRootVariants({ class: props.custom })}
      {...props}
      ref={ref}
    >
      {props.children}
    </div>
  );
});

Card.displayName = "Card";

//card header interface & type
interface CardHeader
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardHeaderVariants> {
  custom?: string;
}

type CardHeaderRef = HTMLDivElement;

//card header variant
const cardHeaderVariants = tv({
  base: "w-full h-max",
});

const CardHeader = React.forwardRef<CardHeaderRef, CardHeader>((props, ref) => {
  return (
    <div
      className={cardHeaderVariants({ class: props.custom })}
      {...props}
      ref={ref}
    >
      {props.children}
    </div>
  );
});

CardHeader.displayName = "CardHeader";

//card content interfaces
interface CardContent
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardContentVariants> {
  custom?: string;
}

type CardContentRef = HTMLDivElement;

//card header variant
const cardContentVariants = tv({
  base: "w-full h-max",
});

const CardContent = React.forwardRef<CardContentRef, CardContent>(
  (props, ref) => {
    return (
      <div className={cardContentVariants({ class: props.custom })} ref={ref}>
        {props.children}
      </div>
    );
  }
);

CardContent.displayName = "CardContent";

//card footer interfaces
interface CardFooter
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardContentVariants> {
  custom?: string;
}

type CardFooterRef = HTMLDivElement;

//card header variant
const cardFooterVariants = tv({
  base: "w-full h-max",
});

const CardFooter = React.forwardRef<CardFooterRef, CardFooter>((props, ref) => {
  return (
    <div className={cardFooterVariants({ class: props.custom })} ref={ref}>
      {props.children}
    </div>
  );
});

CardFooter.displayName = "CardFooter";

/**
 * anatomy
 * |- Card
 * |---CardHeader
 * |---CardContent
 * |---CardFooter
 */

export { Card, CardHeader, CardContent, CardFooter };
