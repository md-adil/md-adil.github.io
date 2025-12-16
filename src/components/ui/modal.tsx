"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { Button } from "./button";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function Modal({ open, onOpenChange, title, children, className }: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        {/* Backdrop with blur */}
        <Dialog.Overlay className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm" />

        {/* Modal content */}
        <Dialog.Content
          className={twMerge(
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-top-[2%] data-[state=open]:slide-in-from-top-[2%] fixed top-1/2 left-1/2 z-50 max-h-[90vh] w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg bg-white shadow-2xl duration-300 sm:w-full sm:max-w-7xl",
            className,
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 p-4 sm:px-6 sm:py-4">
            <Dialog.Title className="text-primary font-serif text-lg font-semibold sm:text-xl">{title}</Dialog.Title>
            <Dialog.Close asChild>
              <Button
                variant="ghost"
                size="icon"
                className="ml-auto aspect-square cursor-pointer rounded-full hover:bg-slate-100"
                aria-label="Close modal"
              >
                <X size={20} />
              </Button>
            </Dialog.Close>
          </div>

          {/* Content */}
          <div className="max-h-[calc(90vh-5rem)] overflow-y-auto p-4 sm:px-6 sm:py-6">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
