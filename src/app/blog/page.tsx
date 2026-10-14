import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { formatDate } from "@/components/blog/format-date";
import { PostBanner } from "@/components/blog/post-banner";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { MotionSection, StaggerGroup, StaggerItem } from "@/components/ui/motion";
import { domain } from "@/config";
import { blogPostOrder, blogPosts, type BlogSlug } from "@/data/blogs";

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

const posts = blogPostOrder.map((slug) => ({ slug, ...blogPosts[slug] }));
const topics = [...new Set(posts.flatMap((post) => post.tags))];
const totalMinutes = posts.reduce((sum, post) => sum + post.readingMinutes, 0);
const [featured, ...rest] = posts;

function PostMeta({ publishedAt, readingMinutes }: { publishedAt: string; readingMinutes: number }) {
  return (
    <div className="text-muted flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
      <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
      <span aria-hidden="true">·</span>
      <span>{readingMinutes} min read</span>
    </div>
  );
}

function Tags({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li
          key={tag}
          className="border border-slate-100 bg-slate-50 px-2.5 py-0.5 text-xs font-bold tracking-wide text-slate-600 uppercase"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

function PostCard({ slug }: { slug: BlogSlug }) {
  const post = blogPosts[slug];
  return (
    <article className="group relative flex h-full flex-col border border-slate-100 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <PostBanner slug={slug} className="aspect-2/1" />
      <div className="flex grow flex-col p-6">
        <div className="mb-3">
          <PostMeta publishedAt={post.publishedAt} readingMinutes={post.readingMinutes} />
        </div>
        <h3 className="text-primary mb-3 font-serif text-xl leading-snug font-bold transition-colors group-hover:text-blue-700">
          {/* Stretched link: the whole card is clickable, but only the title is announced */}
          <Link href={`/blog/${slug}/`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h3>
        {/* Grow on a wrapper: a growing line-clamped element shows a partial extra line */}
        <div className="mb-6 grow">
          <p className="text-body line-clamp-3 leading-relaxed">{post.description}</p>
        </div>
        <Tags tags={post.tags.slice(0, 3)} />
      </div>
    </article>
  );
}

export default function BlogIndex() {
  return (
    <div className="bg-background min-h-screen">
      <Navigation />
      <main>
        <header className="relative overflow-hidden border-b border-slate-100 bg-slate-50/60">
          <AnimatedBackground variant="dots" className="opacity-60" />
          <div className="relative z-10 container mx-auto px-6 pt-32 pb-16 md:px-12 md:pt-40 md:pb-20">
            <MotionSection>
              <p className="text-secondary mb-3 text-sm font-bold tracking-widest uppercase">Engineering Blog</p>
              <h1 className="text-primary mb-6 font-serif text-4xl font-bold md:text-6xl">Notes from the field</h1>
              <div className="bg-primary mb-6 h-1 w-20" aria-hidden="true" />
              <p className="text-body mb-10 max-w-2xl text-lg leading-relaxed">{description}</p>

              <dl className="flex flex-wrap gap-x-12 gap-y-6">
                {[
                  { label: "Articles", value: posts.length },
                  { label: "Minutes of reading", value: totalMinutes },
                  { label: "Topics", value: topics.length },
                ].map(({ label, value }) => (
                  <div key={label} className="flex flex-col-reverse">
                    <dt className="text-muted text-xs font-bold tracking-widest uppercase">{label}</dt>
                    <dd className="text-primary font-serif text-3xl font-bold md:text-4xl">{value}</dd>
                  </div>
                ))}
              </dl>
            </MotionSection>
          </div>
        </header>

        <div className="container mx-auto px-6 py-16 md:px-12 md:py-24">
          {featured && (
            <MotionSection className="mb-20">
              <p className="text-muted mb-6 text-xs font-bold tracking-widest uppercase">Latest article</p>
              <article className="group relative grid border border-slate-100 bg-white shadow-xs transition-all duration-300 hover:shadow-xl lg:grid-cols-2">
                <PostBanner slug={featured.slug} size="lg" className="aspect-video lg:aspect-auto lg:min-h-96" />
                <div className="flex flex-col justify-center p-8 md:p-12">
                  <div className="mb-4">
                    <PostMeta publishedAt={featured.publishedAt} readingMinutes={featured.readingMinutes} />
                  </div>
                  <h2 className="text-primary mb-4 font-serif text-3xl leading-tight font-bold transition-colors group-hover:text-blue-700 md:text-4xl">
                    <Link href={`/blog/${featured.slug}/`} className="after:absolute after:inset-0">
                      {featured.title}
                    </Link>
                  </h2>
                  <p className="text-body mb-8 text-lg leading-relaxed">{featured.description}</p>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <Tags tags={featured.tags} />
                    <span
                      className="text-secondary inline-flex items-center gap-1 text-sm font-bold"
                      aria-hidden="true"
                    >
                      Read article
                      <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </article>
            </MotionSection>
          )}

          <section aria-labelledby="more-articles">
            <h2
              id="more-articles"
              className="text-primary mb-8 flex items-center gap-4 font-serif text-2xl font-bold md:text-3xl"
            >
              More articles
              <span className="h-px grow bg-slate-200" aria-hidden="true" />
            </h2>
            <StaggerGroup slow>
              <ol className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {rest.map(({ slug }) => (
                  <li key={slug}>
                    <StaggerItem className="h-full">
                      <PostCard slug={slug} />
                    </StaggerItem>
                  </li>
                ))}
              </ol>
            </StaggerGroup>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
