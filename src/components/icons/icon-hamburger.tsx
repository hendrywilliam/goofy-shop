import { SVGProps } from "react";

export function IconHamburger(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width ?? "1em"}
      height={props.height ?? "1em"}
      viewBox="0 0 256 256"
      {...props}
    >
      <path
        fill={props.fill ?? "currentColor"}
        d="M222 128a6 6 0 0 1-6 6H40a6 6 0 0 1 0-12h176a6 6 0 0 1 6 6ZM40 70h176a6 6 0 0 0 0-12H40a6 6 0 0 0 0 12Zm176 116H40a6 6 0 0 0 0 12h176a6 6 0 0 0 0-12Z"
      ></path>
    </svg>
  );
}
