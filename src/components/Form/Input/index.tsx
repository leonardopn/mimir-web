import { HTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export interface InputProps extends HTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...restProps }, ref) => {
    return (
        <input
            ref={ref}
            className={twMerge(
                "bg-transparent border focus:outline-0 h-10 p-2 rounded-md focus:border-2 focus:border-purple",
                className
            )}
            {...restProps}
        ></input>
    );
});

Input.displayName = "Input";
