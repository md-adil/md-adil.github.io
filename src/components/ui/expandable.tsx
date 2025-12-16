"use client";

import { ChevronDown } from "lucide-react";
import { useState, ReactElement, cloneElement } from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "./button";
import { Modal } from "./modal";

interface ExpandableProps {
  children: ReactElement<{ className?: string }>[];
  initialCount?: number;
  className?: string;
  buttonClassName?: string;
  showMoreText?: string;
  title: string;
  modalClassName?: string;
}

export function Expandable({
  children,
  initialCount = 3,
  className = "",
  buttonClassName = "",
  showMoreText = "Show All",
  title: modalTitle,
  modalClassName,
}: ExpandableProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Show button only if there are more items than initialCount
  const shouldShowButton = children.length > initialCount;

  return (
    <>
      {/* All items rendered for SEO, CSS controls visibility */}
      <div className={className}>
        {children.map((child, index) =>
          cloneElement(child, {
            className: twMerge(child.props.className, index >= initialCount && "hidden"),
            key: index,
          }),
        )}
      </div>

      {/* Show More button */}
      {shouldShowButton && (
        <div className="mt-8 flex justify-center">
          <Button
            onClick={() => setIsModalOpen(true)}
            variant="outline"
            className={twMerge("group flex cursor-pointer items-center gap-2", buttonClassName)}
            aria-label={showMoreText}
          >
            <span>{showMoreText}</span>
            <ChevronDown size={18} className="transition-transform duration-300 group-hover:translate-y-0.5" />
          </Button>
        </div>
      )}

      {/* Modal with all items */}
      <Modal open={isModalOpen} onOpenChange={setIsModalOpen} title={modalTitle} className={modalClassName}>
        <div className={className}>{children}</div>
      </Modal>
    </>
  );
}
