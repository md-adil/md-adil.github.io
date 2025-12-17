"use client";

import { ChevronDown } from "lucide-react";
import { useState, type ReactElement, cloneElement } from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "./button";
import { Modal } from "./modal";

interface ExpandableProps {
  children: ReactElement<{ className?: string }>[];
  count?: number;
  className?: string;
  buttonClassName?: string;
  showMoreText?: string;
  title: string;
  modalClassName?: string;
}

export function Expandable({
  children,
  count: count = 3,
  className = "",
  buttonClassName = "",
  showMoreText = "Show All",
  title,
  modalClassName,
}: ExpandableProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const shouldShowButton = children.length > count || true;

  return (
    <>
      <div className={className}>
        {children.map((child, index) =>
          cloneElement(child, {
            className: twMerge(child.props.className, index >= count && "hidden"),
            key: index,
          }),
        )}
      </div>

      {/* Show More button */}
      {shouldShowButton && (
        <div className="mt-8 flex justify-center">
          <Button
            onClick={() => setIsModalOpen(true)}
            variant="secondary"
            rounded
            className={twMerge("group flex cursor-pointer items-center gap-2 bg-white", buttonClassName)}
            aria-label={showMoreText}
          >
            <span>{showMoreText}</span>
            <ChevronDown size={18} className="transition-transform duration-300 group-hover:translate-y-0.5" />
          </Button>
        </div>
      )}

      {/* Modal with all items */}
      <Modal open={isModalOpen} onOpenChange={setIsModalOpen} title={title} className={modalClassName}>
        <div className={className}>{children}</div>
      </Modal>
    </>
  );
}
