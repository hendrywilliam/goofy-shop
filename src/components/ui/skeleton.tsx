import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";

interface Skeleton
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  custom?: string;
}
type SkeletonRef = HTMLDivElement;

const skeletonVariants = tv({
  base: "h-4 w-[100px] bg-slate-200 animate-pulse rounded-md",
});

const Skeleton = React.forwardRef<SkeletonRef, Skeleton>((props, ref) => {
  return (
    <div
      className={skeletonVariants({
        class: props.custom,
      })}
      ref={ref}
    >
      {props.children}
    </div>
  );
});

Skeleton.displayName = "Skeleton";

export { Skeleton };
