import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const chipVariants = cva("inline-flex items-center text-sm font-medium transition-colors", {
  variants: {
    variant: {
      default: "px-4 py-2 bg-slate-50 text-slate-700 border border-slate-100 hover:border-slate-200 hover:bg-slate-100",
      primary: "px-4 py-2 bg-blue-50 text-blue-700 border border-accent hover:border-blue-200 hover:bg-accent",
      outlined: "px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface ChipProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof chipVariants> {}

function Chip({ className, variant, ...props }: ChipProps) {
  return <div className={twMerge(chipVariants({ variant }), className)} {...props} />;
}

export { Chip };
