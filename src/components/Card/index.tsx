import { HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export function Card({ children, className, ...restProps }: CardProps) {
  return (
    <div
      className={twMerge(
        "dark:bg-background2-dark w-fit h-fit rounded-lg shadow-xl p-4",
        className
      )}
      {...restProps}
    >
      {children}
    </div>
  );
}
