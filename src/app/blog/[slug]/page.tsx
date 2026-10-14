import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { formatDate } from "@/components/blog/format-date";
import { PostBanner } from "@/components/blog/post-banner";
import { ReadingProgress } from "@/components/blog/reading-progress";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MotionSection, fadeIn } from "@/components/ui/motion";
import { postContent } from "@/content/blog";
import { domain } from "@/config";
import { blogPostOrder, blogPosts, caseStudies, isBlogSlug, personalInfo, SectionId, type BlogSlug } from "@/data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPostOrder.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!isBlogSlug(slug)) return {};
  const post = blogPosts[slug];

  const url = `${domain}/blog/${slug}/`;
  return {
    title: `${post.title} | Adil`,
    description: post.description,
    keywords: post.tags,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url,
      publishedTime: post.publishedAt,
      authors: [personalInfo.name],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

function AdjacentPost({ slug, label, align = "left" }: { slug: BlogSlug; label: string; align?: "left" | "right" }) {
  const post = blogPosts[slug];
  return (
    <Link href={`/blog/${slug}/`} className="group">
      <Card
        className={`h-full gap-0 overflow-hidden rounded-none border-slate-100 py-0 shadow-none transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg ${align === "right" ? "text-right" : ""}`}
      >
        <PostBanner slug={slug} size="sm" className="aspect-4/1" />
        <div className="flex flex-col gap-2 p-5">
          <span className="text-muted text-xs font-bold tracking-widest uppercase">{label}</span>
          <span className="text-primary font-serif font-bold transition-colors group-hover:text-blue-700">
            {post.title}
          </span>
        </div>
      </Card>
    </Link>
  );
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  if (!isBlogSlug(slug)) notFound();
  const post = blogPosts[slug];
  const Content = postContent[slug];

  const study = caseStudies.find((s) => s.id === slug);
  const index = blogPostOrder.indexOf(slug);
  const previous = blogPostOrder[index - 1];
  const next = blogPostOrder[index + 1];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    author: { "@type": "Person", name: personalInfo.name, url: domain },
    mainEntityOfPage: `${domain}/blog/${slug}/`,
    keywords: post.tags.join(", "),
  };

  return (
    <div className="bg-background min-h-screen">
      <ReadingProgress />
      <Navigation />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* Top padding clears the fixed navigation, whose dark text needs a light background behind it */}
      <main className="pt-20 md:pt-24">
        <article>
          <PostBanner slug={slug} size="hero">
            <header className="container mx-auto flex min-h-104 flex-col justify-end px-6 py-12 md:min-h-120 md:px-12 md:py-16">
              <MotionSection className="max-w-3xl">
                <Link
                  href="/blog/"
                  className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-white"
                >
                  <ArrowLeft size={16} aria-hidden="true" /> All articles
                </Link>
                <ul className="mb-6 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <li key={tag}>
                      <Badge
                        variant="outline"
                        className="rounded-none border-current/40 bg-slate-950/40 font-bold tracking-widest uppercase"
                        style={{ color: "var(--accent)" }}
                      >
                        {tag}
                      </Badge>
                    </li>
                  ))}
                </ul>
                <h1 className="mb-6 font-serif text-4xl leading-tight font-bold text-white md:text-5xl">
                  {post.title}
                </h1>
                <p className="mb-8 text-lg leading-relaxed text-slate-300 md:text-xl">{post.description}</p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-400">
                  <span className="font-semibold text-white">{personalInfo.name}</span>
                  <span aria-hidden="true">·</span>
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                  <span aria-hidden="true">·</span>
                  <span>{post.readingMinutes} min read</span>
                </div>
              </MotionSection>
            </header>
          </PostBanner>

          <div className="container mx-auto px-6 pt-12 pb-16 md:px-12 md:pt-16 md:pb-24">
            {study && (
              <MotionSection className="mb-12">
                <Card
                  className="gap-0 rounded-none border-slate-200 bg-slate-50 p-6 shadow-none md:p-8"
                  role="complementary"
                  aria-label="Key outcomes"
                >
                  <p className="text-primary mb-4 text-sm font-bold tracking-widest uppercase">At a glance</p>
                  <ul className="mb-6 space-y-3">
                    {study.results.map((result) => (
                      <li key={result} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-500" aria-hidden="true" />
                        <span className="text-body font-medium">{result}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {study.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="rounded-none bg-white font-bold text-slate-600">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </MotionSection>
            )}

            <MotionSection
              variants={fadeIn}
              className="prose prose-slate prose-lg prose-headings:font-serif prose-headings:text-primary prose-a:text-secondary prose-code:before:content-none prose-code:after:content-none prose-code:rounded-xs prose-code:bg-slate-100 prose-code:px-1 prose-code:py-0.5 prose-code:font-normal max-w-none"
            >
              <Content />
            </MotionSection>

            <footer className="mt-16 border-t border-slate-100 pt-10">
              <MotionSection className="mb-12 bg-slate-900 p-8 text-white md:p-10">
                <h2 className="mb-3 font-serif text-2xl font-bold">Facing a similar problem?</h2>
                <p className="mb-6 leading-relaxed text-slate-300">
                  I help teams design and scale backend systems, cloud infrastructure and delivery pipelines. Happy to
                  talk through what you&apos;re working on.
                </p>
                <Link
                  href={`/#${SectionId.CONTACT}`}
                  className="text-primary inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-bold transition-colors hover:bg-slate-100"
                >
                  Get in touch <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </MotionSection>

              <nav className="grid grid-cols-1 gap-6 sm:grid-cols-2" aria-label="More articles">
                {previous ? <AdjacentPost slug={previous} label="Previous" /> : <span />}
                {next && <AdjacentPost slug={next} label="Next" align="right" />}
              </nav>
            </footer>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
