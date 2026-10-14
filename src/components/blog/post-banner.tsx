import type { CSSProperties, ReactNode } from "react";
import { Activity, Boxes, Braces, DatabaseZap, GitBranch, Network, Palette, Zap, type LucideIcon } from "lucide-react";
import type { BlogSlug } from "@/data/blogs";
import { cn } from "@/lib/utils";

type Pattern = "grid" | "dots" | "diagonal" | "rings";

interface BannerTheme {
  icon: LucideIcon;
  /** Hex accent used for the glow, icon and label. */
  accent: string;
  pattern: Pattern;
  label: string;
}

/** Generated cover art for each post: no image files, just an accent, a pattern and an icon. */
const themes: Record<BlogSlug, BannerTheme> = {
  lizard: { icon: DatabaseZap, accent: "#34d399", pattern: "grid", label: "AI · Databases" },
  minimajs: { icon: Braces, accent: "#a78bfa", pattern: "dots", label: "Open Source" },
  "argocd-gitops": { icon: GitBranch, accent: "#fb923c", pattern: "diagonal", label: "GitOps" },
  "proxysql-horizontal-scaling": { icon: Network, accent: "#38bdf8", pattern: "rings", label: "MySQL" },
  "laravel-octane": { icon: Zap, accent: "#f87171", pattern: "diagonal", label: "Performance" },
  observability: { icon: Activity, accent: "#fbbf24", pattern: "grid", label: "SRE" },
  microservices: { icon: Boxes, accent: "#2dd4bf", pattern: "dots", label: "Architecture" },
  "capsule-design-system": { icon: Palette, accent: "#e879f9", pattern: "rings", label: "Design Systems" },
};

const patterns: Record<Pattern, CSSProperties> = {
  grid: {
    backgroundImage:
      "linear-gradient(to right, rgb(255 255 255 / 0.07) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255 / 0.07) 1px, transparent 1px)",
    backgroundSize: "28px 28px",
  },
  dots: {
    backgroundImage: "radial-gradient(rgb(255 255 255 / 0.18) 1px, transparent 1px)",
    backgroundSize: "18px 18px",
  },
  diagonal: {
    backgroundImage: "repeating-linear-gradient(135deg, rgb(255 255 255 / 0.06) 0 1px, transparent 1px 14px)",
  },
  rings: {
    backgroundImage:
      "repeating-radial-gradient(circle at 85% 60%, rgb(255 255 255 / 0.08) 0 1px, transparent 1px 22px)",
  },
};

const iconSizes = {
  sm: "right-4 bottom-4 h-10 w-10",
  md: "right-6 bottom-6 h-16 w-16",
  lg: "right-8 bottom-8 h-24 w-24 md:right-12 md:bottom-12 md:h-36 md:w-36",
  // Sits behind the overlaid text on small screens, beside it from md up.
  hero: "right-6 bottom-8 h-28 w-28 opacity-25 md:top-1/2 md:right-12 md:bottom-auto md:h-44 md:w-44 md:-translate-y-1/2 md:opacity-100 lg:right-24 lg:h-56 lg:w-56",
};

const echoSizes = {
  sm: "-right-6 -bottom-8 h-28 w-28",
  md: "-right-8 -bottom-10 h-44 w-44",
  lg: "-right-10 -bottom-16 h-72 w-72 md:h-96 md:w-96",
  hero: "-right-16 -bottom-24 h-80 w-80 md:h-[32rem] md:w-[32rem]",
};

export function PostBanner({
  slug,
  size = "md",
  className,
  children,
}: {
  slug: BlogSlug;
  size?: keyof typeof iconSizes;
  className?: string;
  /** Content laid over the art (the hero uses it for the article header); replaces the topic label.
      It can colour itself with `var(--accent)`. */
  children?: ReactNode;
}) {
  const { icon: Icon, accent, pattern, label } = themes[slug];

  return (
    <div
      className={cn("relative overflow-hidden bg-slate-950", className)}
      style={{ "--accent": accent } as CSSProperties}
    >
      <div className="absolute inset-0" aria-hidden="true">
        {/* Accent glows */}
        <div
          className="absolute inset-0 opacity-70 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            backgroundImage:
              "radial-gradient(circle at 85% 70%, color-mix(in srgb, var(--accent) 45%, transparent), transparent 55%), radial-gradient(circle at 0% 0%, color-mix(in srgb, var(--accent) 18%, transparent), transparent 45%)",
          }}
        />
        {/* Pattern, faded towards the top-left so the label stays legible */}
        <div
          className="absolute inset-0"
          style={{
            ...patterns[pattern],
            maskImage: "linear-gradient(to bottom right, transparent 10%, black 70%)",
          }}
        />

        {!children && size !== "sm" && (
          <span
            className={cn(
              "absolute top-0 left-0 font-mono font-bold tracking-widest uppercase",
              size === "lg" ? "m-6 text-xs md:m-8 md:text-sm" : "m-5 text-[0.7rem]",
            )}
            style={{ color: accent }}
          >
            {label}
          </span>
        )}

        <Icon
          className={cn(
            "absolute transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6",
            iconSizes[size],
          )}
          style={{ color: accent }}
          strokeWidth={1.25}
        />
        {/* Echo of the icon, larger and faint, for depth */}
        <Icon className={cn("absolute text-white/5", echoSizes[size])} strokeWidth={1} />

        {/* Accent rule along the bottom edge */}
        <div className="absolute inset-x-0 bottom-0 h-1" style={{ backgroundColor: accent }} />
      </div>

      {children && <div className="relative">{children}</div>}
    </div>
  );
}
