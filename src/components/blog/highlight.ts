import Prism from "prismjs";
// Language grammars register themselves on the global Prism instance, so order matters:
// php depends on markup-templating, tsx on jsx and typescript.
import "prismjs/components/prism-markup-templating";
import "prismjs/components/prism-php";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-json";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-yaml";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-tsx";

export type CodeLanguage = "bash" | "json" | "php" | "sql" | "tsx" | "typescript" | "yaml";

/** Highlights code at build time; returns HTML safe to inject (Prism escapes the source). */
export function highlight(code: string, language: CodeLanguage) {
  const grammar = Prism.languages[language];
  if (!grammar) throw new Error(`Prism grammar not loaded: ${language}`);
  return Prism.highlight(code, grammar, language);
}
