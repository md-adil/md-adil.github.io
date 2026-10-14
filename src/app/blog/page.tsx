import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlogHeader } from "@/components/blog/blog-header";
import { Footer } from "@/components/footer";
import { formatDate } from "@/components/blog/format-date";
import { Badge } from "@/components/ui/badge";
import { MotionSection, StaggerGroup, StaggerItem } from "@/components/ui/motion";
import { domain } from "@/config";
import { blogPostOrder, blogPosts } from "@/data";

const description =
  "Long-form write-ups of real engineering work: database scaling, PHP performance, microservices, observability, GitOps and design systems.";

export const metadata: Metadata = {
  title: "Engineering Blog | Adil",
  description,
  alternates: { canonical: `${domain}/blog/` },
  openGraph: {
    title: "Engineering Blog | Adil",
    description,
    type: "website",
    url: `${domain}/blog/`,
  },
};

export default function BlogIndex() {
  return (
    <div className="bg-background min-h-screen">
      <BlogHeader />
      <main className="container mx-auto px-6 py-16 md:px-12 md:py-24">
        <MotionSection className="mb-16">
          <p className="text-secondary mb-3 text-sm font-bold tracking-widest uppercase">Engineering Blog</p>
          <h1 className="text-primary mb-6 font-serif text-4xl font-bold md:text-5xl">Notes from the field</h1>
          <div className="bg-primary mb-6 h-1 w-20" aria-hidden="true" />
          <p className="text-body max-w-2xl text-lg leading-relaxed">{description}</p>
        </MotionSection>

        <StaggerGroup slow>
          <ol className="divide-y divide-slate-100">
            {blogPostOrder.map((slug) => {
              const post = blogPosts[slug];
              return (
                <li key={slug} className="py-10 first:pt-0">
                  <StaggerItem>
                    <article className="group">
                      <div className="text-muted mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                        <span aria-hidden="true">·</span>
                        <span>{post.readingMinutes} min read</span>
                      </div>
                      <h2 className="text-primary mb-3 font-serif text-2xl leading-tight font-bold transition-colors group-hover:text-blue-700 md:text-3xl">
                        <Link href={`/blog/${slug}/`}>{post.title}</Link>
                      </h2>
                      <p className="text-body mb-5 leading-relaxed">{post.description}</p>
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <ul className="flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <li key={tag}>
                              <Badge variant="secondary" className="rounded-none font-bold text-slate-600">
                                {tag}
                              </Badge>
                            </li>
                          ))}
                        </ul>
                        <Link
                          href={`/blog/${slug}/`}
                          className="text-secondary inline-flex items-center gap-1 text-sm font-bold"
                          aria-label={`Read: ${post.title}`}
                        >
                          Read article
                          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </article>
                  </StaggerItem>
                </li>
              );
            })}
          </ol>
        </StaggerGroup>
      </main>
      <Footer />
    </div>
  );
}
