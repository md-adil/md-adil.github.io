import { highlight, type CodeLanguage } from "./highlight";

/** A labelled, syntax-highlighted code listing. Highlighting runs at build time. */
export function CodeBlock({ title, language, children }: { title?: string; language: CodeLanguage; children: string }) {
  return (
    <figure className="not-prose my-8 overflow-hidden rounded-sm border border-slate-800 bg-slate-900">
      {title && (
        <figcaption className="flex items-center justify-between border-b border-slate-800 px-4 py-2 font-mono text-xs tracking-wide text-slate-400">
          <span>{title}</span>
          <span className="text-slate-500 uppercase">{language}</span>
        </figcaption>
      )}
      <pre className={`language-${language} overflow-x-auto p-4 text-sm leading-relaxed text-slate-100`}>
        <code
          className={`language-${language}`}
          dangerouslySetInnerHTML={{ __html: highlight(children.trim(), language) }}
        />
      </pre>
    </figure>
  );
}
