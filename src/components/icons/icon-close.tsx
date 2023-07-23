import { SVGProps } from "react";

export function IconClose(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width ?? "1em"}
      height={props.height ?? "1em"}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill={props.fill ?? "currentColor"}
        d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41z"
      ></path>
    </svg>
  );
}
