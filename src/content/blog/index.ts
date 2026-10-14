import { type ComponentType } from "react";
import { type BlogSlug } from "@/data";
import ArgoCdGitOps from "./argocd-gitops";
import CapsuleDesignSystem from "./capsule-design-system";
import LaravelOctane from "./laravel-octane";
import Lizard from "./lizard";
import Microservices from "./microservices";
import MinimaJs from "./minimajs";
import Observability from "./observability";
import ProxySqlHorizontalScaling from "./proxysql-horizontal-scaling";

/** Article bodies keyed by blog post slug; every post in `blogPosts` must have one. */
export const postContent: Record<BlogSlug, ComponentType> = {
  lizard: Lizard,
  minimajs: MinimaJs,
  "argocd-gitops": ArgoCdGitOps,
  "proxysql-horizontal-scaling": ProxySqlHorizontalScaling,
  "laravel-octane": LaravelOctane,
  observability: Observability,
  microservices: Microservices,
  "capsule-design-system": CapsuleDesignSystem,
};
