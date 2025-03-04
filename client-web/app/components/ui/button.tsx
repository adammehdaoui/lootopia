import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/lib/utils";

const buttonVariants = cva("  ", {
  variants: {
    variant: {
      default:
        " text-white border-2 bg-[#142247] hover:bg-white duration-500 hover:font-semibold rounded-full h-10 w-56 hover:text-[#142247] hover:w-72 md:text-xs lg:text-base md:px-2 md:py-1",
      noscale:
        "text-white border-2 bg-[#142247] hover:bg-white duration-500 hover:font-semibold rounded-full h-10 w-56 hover:text-[#142247]  md:text-xs lg:text-base md:px-2 md:py-1",
      crown:
        "flex h-10 sm:h-8 px-4 sm:px-3 text-white border-2 rounded-full items-center gap-2 hover:text-[#142247] hover:bg-white hover:font-semibold",
      secondary:
        "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline",
    },
    size: {
      default: "h-9 px-4 py-2",
      sm: "h-8 rounded-md px-3 text-xs",
      lg: "h-10 rounded-md px-8",
      icon: "h-9 w-9",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
