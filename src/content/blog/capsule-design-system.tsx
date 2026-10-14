import { CodeBlock } from "@/components/blog/article-elements";

export default function CapsuleDesignSystem() {
  return (
    <>
      <p>
        Count the buttons in a company&apos;s products and you learn a lot about how its teams work. When several teams
        build interfaces in parallel without shared foundations, each one solves the same small problems in its own way:
        a slightly different blue, a different focus ring, a different idea of how a disabled state should look. None of
        these decisions is wrong. Together they produce an inconsistent product, and they are paid for many times over.
      </p>
      <p>
        That was the situation at Bajaj Finserv Health before we built <strong>Capsule</strong>, a design system in
        React and TypeScript. It was eventually used across the organisation. Frontend work became two to three times
        faster, and products built on it reached a Lighthouse score of 99. This article is less about the components
        themselves than about the decisions underneath them, which are what make a design system worth having.
      </p>

      <h2>The economics of duplication</h2>
      <p>
        It helps to see the problem as arithmetic. Suppose five product teams each build their own date picker. You have
        paid for five implementations, five rounds of accessibility fixes (if they happen at all), five sets of bugs,
        and five things to change when the brand evolves. The cost grows with the number of teams multiplied by the
        number of components.
      </p>
      <p>
        A shared component turns that product into a sum. You pay once, carefully, and every team benefits. The catch is
        that the shared version must be genuinely better than what a team would build alone, or teams will route around
        it. Most of what follows is about earning that.
      </p>

      <h2>Tokens: naming decisions</h2>
      <p>
        The idea of <em>design tokens</em> came out of Salesforce&apos;s design system work in the mid-2010s. A token is
        a named design decision: a colour, a spacing step, a font size, a radius, a shadow, a duration. The value
        matters less than the name, because the name is what designers and engineers share. When a designer specifies{" "}
        <code>space.4</code> and <code>color.text.muted</code>, the engineer builds exactly that, and the conversation
        about whether something is &quot;about 15 pixels&quot; never happens.
      </p>
      <p>
        The important choice is between naming tokens after <em>values</em> and naming them after <em>intent</em>. A
        token called <code>gray600</code> says what it is. A token called <code>text.muted</code> says what it is for.
        Intent-based names are what make change cheap: a dark theme or a rebrand changes the values behind the names,
        and no component needs to be edited.
      </p>
      <CodeBlock language="typescript" title="tokens.ts (simplified example)">{`
const palette = {
  blue600: "#1D4ED8",
  blue700: "#1E40AF",
  slate900: "#0F172A",
  slate600: "#475569",
  white: "#FFFFFF",
} as const;

// Components only ever see the semantic layer.
export const tokens = {
  color: {
    action: { primary: palette.blue600, primaryHover: palette.blue700 },
    text: { default: palette.slate900, muted: palette.slate600, inverse: palette.white },
    focus: palette.blue600,
  },
  space: { 1: "4px", 2: "8px", 3: "12px", 4: "16px", 6: "24px", 8: "32px" },
  radius: { sm: "4px", md: "8px" },
} as const;
`}</CodeBlock>
      <p>
        The two layers in that example are the point. The palette is private; components consume only the semantic
        tokens. TypeScript&apos;s <code>as const</code> makes every token a literal type, so a typo is a compile error
        rather than a missing colour in production.
      </p>

      <h2>Layers above the tokens</h2>
      <p>
        Brad Frost&apos;s <em>Atomic Design</em> offers a vocabulary for what sits on top: small primitives combined
        into larger patterns. We kept the structure simpler. <em>Primitives</em> are the accessible building blocks:
        buttons, inputs, checkboxes, dialogs. <em>Patterns</em> combine them for recurring product needs, such as a form
        field with label, hint and error, or an empty state. Alongside both sits a set of <em>hooks</em> for behaviour
        that has no fixed appearance, such as managing focus, responding to media queries, or handling form state. Hooks
        turned out to be one of the most widely adopted parts of the system, because a team could use them even where
        its visual design differed from the standard.
      </p>

      <h2>Accessibility belongs at the bottom of the stack</h2>
      <p>
        Accessibility is usually discussed as a compliance task. In a design system it is better understood as leverage.
        A fix made in a shared component is made in every product that uses it, which makes the design system the
        cheapest place in the organisation to get it right.
      </p>
      <p>
        Much of it comes down to respecting what the browser already provides. A native <code>&lt;button&gt;</code> is
        focusable, announces itself to screen readers as a button, and activates on both Enter and Space. A{" "}
        <code>&lt;div&gt;</code> with a click handler does none of that. Recreating it requires a <code>role</code>, a{" "}
        <code>tabIndex</code> and key handlers, and teams that build their own controls routinely miss one of the three.
      </p>
      <CodeBlock language="tsx" title="Button.tsx (simplified)">{`
import styled from "@emotion/styled";
import { tokens } from "../tokens";

type Variant = "primary" | "secondary";

const StyledButton = styled.button<{ variant: Variant }>(({ variant }) => ({
  padding: \`\${tokens.space[2]} \${tokens.space[4]}\`,
  borderRadius: tokens.radius.md,
  border: \`1px solid \${tokens.color.action.primary}\`,
  background: variant === "primary" ? tokens.color.action.primary : "transparent",
  color: variant === "primary" ? tokens.color.text.inverse : tokens.color.action.primary,
  "&:focus-visible": {
    outline: \`2px solid \${tokens.color.focus}\`,
    outlineOffset: "2px",
  },
  "&:disabled": { opacity: 0.5, cursor: "not-allowed" },
}));

export function Button({
  variant = "primary",
  type = "button",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <StyledButton type={type} variant={variant} {...props} />;
}
`}</CodeBlock>
      <p>
        Two small details in that component are deliberate. The default <code>type</code> is{" "}
        <code>&quot;button&quot;</code>, because the HTML default inside a form is <code>&quot;submit&quot;</code>, and
        an icon button that submits a form by accident is a classic bug. And the focus style uses{" "}
        <code>:focus-visible</code>, which shows the ring to keyboard users without showing it on every mouse click.
        Without that, designers tend to ask for focus rings to be removed entirely.
      </p>
      <p>
        Colour contrast is best handled at the token level. WCAG asks for a contrast ratio of at least 4.5:1 for body
        text and 3:1 for large text and interface components. If the approved text and background pairs are checked
        once, every component built from them inherits the result.
      </p>

      <h2>Storybook as the shared reference</h2>
      <p>
        Every component lived in Storybook, with a story for each meaningful state: default, hover, focus, disabled,
        loading, error. That one practice served several audiences at once. Engineers built components in isolation,
        without running a product. Designers reviewed real, interactive components rather than static mock-ups. Product
        teams read usage guidance next to a live example, with a props table generated from the TypeScript types.
        Automated accessibility checks ran against every story.
      </p>
      <p>
        A design system without that kind of reference tends to be known only to the people who built it, and adoption
        stalls the moment they are busy.
      </p>

      <h2>Performance is multiplied too</h2>
      <p>
        The same leverage that makes a design system good for accessibility makes it dangerous for performance. Its code
        is on every page, so every kilobyte and every millisecond is paid everywhere.
      </p>
      <p>
        Lighthouse&apos;s performance score is a weighted combination of measured metrics, including Largest Contentful
        Paint, Total Blocking Time and Cumulative Layout Shift. A design system influences all three. Shipping ES
        modules with per-component entry points and <code>&quot;sideEffects&quot;: false</code> lets bundlers drop
        everything a product doesn&apos;t import. Emotion gives token-driven, themeable styles, but CSS-in-JS does real
        work at runtime, so static styles should be defined outside render functions and dynamic props kept to what is
        actually needed. Components that reserve their space (images with dimensions, skeletons sized like their
        content) keep layout shift near zero. And each new dependency deserves the question of whether the system could
        do without it.
      </p>

      <h2>Adoption is the product</h2>
      <p>
        A design system nobody uses is an elegant side project. Adoption has to be designed as carefully as the
        components. That means semantic versioning with changelogs people actually read, migration notes for every
        breaking change, a clear route for product teams to propose new components, and time spent pairing with teams on
        their first integration. Above all, it means treating the product teams as customers, whose reasons for not
        adopting something are information rather than resistance.
      </p>

      <h2>What changed</h2>
      <p>
        Teams stopped rebuilding the same components and started assembling screens from tested, accessible parts, and
        UI development became two to three times faster. Capsule spread across the organisation. Products built on it
        reached a Lighthouse score of 99. Design reviews moved away from pixel-level corrections and towards product
        questions, which is where designers&apos; time is best spent.
      </p>
      <p>
        If there is a general lesson, it is that a design system is an agreement before it is a library. The tokens
        record decisions the organisation has made, the components make those decisions easy to follow, and the
        documentation makes them easy to find. The code is only the most visible part of that agreement.
      </p>

      <h2>Further reading</h2>
      <ul>
        <li>
          Brad Frost, <em>Atomic Design</em>, 2016.
        </li>
        <li>W3C, Web Content Accessibility Guidelines (WCAG) 2.2.</li>
        <li>W3C Design Tokens Community Group, Design Tokens Format Module.</li>
        <li>Chrome for Developers, &quot;Lighthouse performance scoring&quot;.</li>
      </ul>
    </>
  );
}
