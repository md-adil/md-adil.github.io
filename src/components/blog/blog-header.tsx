import Link from "next/link";
import { Layers } from "lucide-react";
import { personalInfo, SectionId } from "@/data";
import { Button } from "../ui/button";

export function BlogHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 py-4 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-6 md:px-12">
        <Link
          href="/"
          className="focus:ring-primary flex items-center gap-2 rounded-xs focus:ring-2 focus:ring-offset-2 focus:outline-hidden"
        >
          <Layers className="text-primary h-6 w-6" aria-hidden="true" />
          <span className="text-primary font-serif text-xl font-bold tracking-tight">{personalInfo.name}</span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/blog/" className="text-muted hover:text-primary text-sm font-medium transition-colors">
            Blog
          </Link>
          <Link
            href={`/#${SectionId.CASE_STUDIES}`}
            className="text-muted hover:text-primary hidden text-sm font-medium transition-colors sm:inline"
          >
            Case Studies
          </Link>
          <Button asChild rounded className="shadow-lg transition-all hover:shadow-xl">
            <Link href={`/#${SectionId.CONTACT}`}>Contact</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
