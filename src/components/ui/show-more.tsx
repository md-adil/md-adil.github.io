"use client";

import { ChevronDown } from "lucide-react";
import { useState, ReactNode, useRef, useEffect, Children } from "react";
import { Button } from "./button";

interface ShowMoreProps {
  children: ReactNode;
  initialCount?: number;
  className?: string;
  buttonClassName?: string;
  showMoreText?: string;
  showLessText?: string;
}

export function ShowMore({
  children,
  initialCount = 3,
  className = "",
  buttonClassName = "",
  showMoreText = "Show More",
  showLessText = "Show Less",
}: ShowMoreProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [collapsedHeight, setCollapsedHeight] = useState<number | null>(null);
  const [expandedHeight, setExpandedHeight] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Show button only if there are more items than initialCount
  const shouldShowButton = Children.count(children) > initialCount;

  // Calculate collapsed and expanded heights on mount and when initialCount changes
  useEffect(() => {
    if (!containerRef.current || !shouldShowButton) return;

    const calculateHeight = () => {
      const container = containerRef.current;
      if (!container) return;

      // Temporarily expand to measure
      const originalMaxHeight = container.style.maxHeight;
      const originalOverflow = container.style.overflow;
      container.style.maxHeight = "none";
      container.style.overflow = "visible";

      // Get direct children
      const children = Array.from(container.children);

      // For collapsed height: hide items beyond initialCount and measure
      for (let i = 0; i < children.length; i++) {
        const child = children[i] as HTMLElement;
        if (i >= initialCount) {
          child.style.display = "none";
        }
      }

      // Force reflow and measure collapsed height
      void container.offsetHeight; // Force reflow
      const collapsedH = container.scrollHeight;

      // Show all items and measure expanded height
      for (let i = 0; i < children.length; i++) {
        const child = children[i] as HTMLElement;
        child.style.display = "";
      }

      // Force reflow and measure expanded height
      void container.offsetHeight; // Force reflow
      const expandedH = container.scrollHeight;

      // Restore original state
      container.style.maxHeight = originalMaxHeight;
      container.style.overflow = originalOverflow;

      setCollapsedHeight(collapsedH);
      setExpandedHeight(expandedH);
    };

    // Calculate on mount and when window resizes
    calculateHeight();
    window.addEventListener("resize", calculateHeight);

    return () => window.removeEventListener("resize", calculateHeight);
  }, [initialCount, shouldShowButton]);

  return (
    <>
      {/* All content is rendered for SEO, CSS controls visibility with animation */}
      <div
        ref={containerRef}
        className={`${className} overflow-y-hidden transition-all duration-500 ease-in-out`}
        style={{
          maxHeight: isExpanded
            ? expandedHeight
              ? `${expandedHeight}px`
              : "none"
            : collapsedHeight
              ? `${collapsedHeight}px`
              : undefined,
        }}
      >
        {children}
      </div>

      {shouldShowButton && (
        <div className="mt-8 flex justify-center">
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`group flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-6 py-3 font-medium text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-100 ${buttonClassName}`}
            aria-expanded={isExpanded}
            aria-label={isExpanded ? showLessText : showMoreText}
          >
            <span>{isExpanded ? showLessText : showMoreText}</span>
            <ChevronDown size={18} className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
          </Button>
        </div>
      )}
    </>
  );
}
