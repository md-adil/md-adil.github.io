import { type BlogPost } from "./types";
import argocdGitops from "./blogs/argocd-gitops.json" with { type: "json" };
import capsuleDesignSystem from "./blogs/capsule-design-system.json" with { type: "json" };
import laravelOctane from "./blogs/laravel-octane.json" with { type: "json" };
import lizard from "./blogs/lizard.json" with { type: "json" };
import microservices from "./blogs/microservices.json" with { type: "json" };
import minimajs from "./blogs/minimajs.json" with { type: "json" };
import observability from "./blogs/observability.json" with { type: "json" };
import proxysqlHorizontalScaling from "./blogs/proxysql-horizontal-scaling.json" with { type: "json" };

/** Post metadata keyed by slug; each entry lives in `./blogs/<slug>.json`. */
export const blogPosts = {
  lizard,
  minimajs,
  "argocd-gitops": argocdGitops,
  "proxysql-horizontal-scaling": proxysqlHorizontalScaling,
  "laravel-octane": laravelOctane,
  observability,
  microservices,
  "capsule-design-system": capsuleDesignSystem,
} satisfies Record<string, BlogPost>;

export type BlogSlug = keyof typeof blogPosts;

/** Display order on /blog, and the sequence used for previous/next links. */
export const blogPostOrder: BlogSlug[] = [
  "lizard",
  "minimajs",
  "argocd-gitops",
  "proxysql-horizontal-scaling",
  "laravel-octane",
  "observability",
  "microservices",
  "capsule-design-system",
];

export function isBlogSlug(slug: string): slug is BlogSlug {
  return Object.hasOwn(blogPosts, slug);
}
