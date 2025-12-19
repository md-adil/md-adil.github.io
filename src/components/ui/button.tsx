"use client";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Download, Eye, ChevronDown, File } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu";
import { twMerge } from "tailwind-merge";
import { type PropsWithChildren } from "react";
import { toast } from "sonner";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        // destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-white text-black border border-gray-200 hover:bg-gray-50 hover:shadow-none shadow-xs",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
      rounded: {
        true: "rounded-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
}

export function Button({ className, variant, size, rounded, asChild = false, ref, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={twMerge(buttonVariants({ variant, size, rounded }), className)} ref={ref} {...props} />;
}

interface DownloadButtonProps extends PropsWithChildren {
  url: string;
  name: string;
  filename: string;
}

export function DownloadButton({ url, name, children, filename }: DownloadButtonProps) {
  const copyLink = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Link copied!");
  };

  return (
    <div className="flex gap-0">
      <Button variant="secondary" className="h-auto flex-1 rounded-r-none border-r-0 bg-white px-8 py-4" asChild>
        <a href={url} download={filename}>
          <Download size={18} className="mr-2" />
          {children}
        </a>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" className="h-auto rounded-l-none px-3 py-4">
            <ChevronDown size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem asChild>
            <Button asChild variant="outline" className="flex cursor-pointer items-center bg-white">
              <a href={url} target="_blank" rel="noopener noreferrer">
                <Eye size={18} className="mr-2" />
                <span>View {name}</span>
              </a>
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Button asChild variant="outline" className="flex w-full cursor-pointer items-center bg-white">
              <button onClick={() => copyLink(url)} rel="noopener noreferrer">
                <File size={18} className="mr-2" />
                <span>Copy Link</span>
              </button>
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
