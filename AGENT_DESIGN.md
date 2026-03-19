# TiefAmt — User-Defined Design Principles

These principles have been stated explicitly by the user. Do not add principles that were not
stated by the user — inferred conventions, best practices, or stylistic preferences that were
not explicitly requested do not belong here.

---

## Component API design

- **The library provides models; users supply the data.** Ship generic primitives and
  utilities that users compose with their own values. Never hardcode domain-specific keys,
  labels, or state machines in the library.

- **Optional behaviour is enabled by the presence of a property, not by a flag.** If a
  feature is conditional on some content (a message, a URL, a callback), test for that
  property being defined. A separate boolean flag alongside the property is redundant and
  wrong.

- **Components should be reasonably generic.** Use TypeScript generics where they add value.
  Users are expected to understand TypeScript.

- **Define once, use everywhere.** Configuration that applies across multiple components
  (e.g. a workflow definition) should be definable in one place in the user's app and passed
  to whichever components need it, rather than re-specified per use site.

- **Variants are semantic, not domain-specific.** Variant names like `info`, `warning`,
  `success`, `danger` are universally understood. Domain terms (`erlass`, `pflichthinweis`)
  belong to the consuming application, not the library. A consumer can apply whatever
  meaning they like to a semantic variant.

- **Custom content is passed as children, not as configuration.** When a component renders
  content supplied by the user, it should accept `children: React.ReactNode`. Props are for
  behaviour and structure; children are for content.

- **Styling switches are either props or classes, depending on discoverability intent.**
  If optional styling is something the component author is explicitly offering and the user
  should know about, it is a component prop (e.g. `accent` on `GovAlert`). If it is a
  utility the user can apply themselves without library guidance, it is a plain CSS class.
  Either way, the switch is explicit — never encoded as a domain-specific variant name.

---

## Architecture

- **Visibility is the consumer's concern.** The library never decides when a component
  should or should not render based on environment, feature flags, or application state.
  If a component should be hidden in development, the consumer wraps it in a condition.
  The library always renders when mounted.


- **Components do not own business logic.** No API calls, no state management, no workflow
  transitions inside components. Components render state and fire callbacks — nothing else.

- **Hardcoded strings belong to the user, not the library.** Labels, status names, action
  names, and similar strings are user-supplied. The library should not force a German or any
  other language on these.
