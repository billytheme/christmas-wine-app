import React, { ReactNode, DetailedHTMLProps, HTMLAttributes } from "react";

interface CardProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export default function Card({
  className,
  children,
  ...otherProps
}: CardProps) {
  return (
    <div
      className={className + " rounded border border-black m-2 p-3"}
      {...otherProps}
    >
      {children}
    </div>
  );
}
