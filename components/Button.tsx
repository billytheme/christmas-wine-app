import React, { DetailedHTMLProps, HTMLAttributes } from "react";

interface ButtonProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

export default function Button({
  children,
  className,
  ...otherProps
}: ButtonProps) {
  return (
    <button
      className={
        "rounded-full bg-red-500 p-4 text-green-500 font-bold mx-auto " +
        className
      }
      {...otherProps}
    >
      {children}
    </button>
  );
}
