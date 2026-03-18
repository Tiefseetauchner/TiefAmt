# @tiefamt/styles

> Let's quickly vibe code a little UI library!

Well turns out, quickly, UI library and vibe coding have circles in the venn diagram that are so far apart, the influence of gravity on each other is negligable.

Compiled CSS presets for `@tiefamt/core`. Pick a national identity (or don't), import it once, never think about it again. That's the whole package.

---

## Install

```bash
bun add @tiefamt/styles bootstrap
```

You need Bootstrap installed — it's a peer dependency. The presets compile Bootstrap's SCSS with TiefAmt's overrides baked in, so you get everything in one import.

---

## Usage

Import exactly one preset. Not two. One.

```ts
import '@tiefamt/styles/presets/austria'
import '@tiefamt/styles/presets/eu'
import '@tiefamt/styles/presets/neutral'
```

That's it. No configuration, no theme object, no `ThemeProvider`. Colors are a compile-time concern. If you need a different government's colors, build a new preset — don't add a `useState`.

---

## Presets

### `austria` — Republik Österreich

Pantone 186 C red. Warm cream background. Transitional serif body font (Source Serif 4) — because the Austrian federal government has been using serif type since long before anyone thought "sans-serif" was a personality trait. Anthracite text, warm-shifted borders.

```ts
import '@tiefamt/styles/presets/austria'
```

Danger (`$danger`) is intentionally darker and less saturated than the primary red. You're welcome — distinguishing error states from brand color is a solved problem and we solved it.

### `eu` — European Union

Pantone 286 C blue. Pure white background, no warmth. Source Sans 3 / Arial throughout — EU documents are stark and sans-serif, as God and Brussels intended. Heavier heading weight than the Austrian preset.

```ts
import '@tiefamt/styles/presets/eu'
```

The EU gold (Pantone 116 C) is **not** mapped to `$warning`. Gold is decorative identity — not a semantic state. It's exposed as a CSS custom property instead:

```css
--gov-eu-gold: #FFCC00;
```

Use it for star motifs, decorative rules, header accents. Do not use it to indicate that something needs attention.

### `neutral` — Generic Government

No national identity. Desaturated navy primary. System font stack — zero web font loading, zero flash of unstyled text, zero opinions about which foundry deserves a network request. Safe for internal tooling, white-label products, or any context where Austria/EU branding would be inappropriate.

```ts
import '@tiefamt/styles/presets/neutral'
```

If you're unsure which preset to use, use this one. It will not embarrass you in front of anyone.

---

## Presets vs. base styles

This package contains themed presets — each one compiles Bootstrap + all TiefAmt variable overrides into a single CSS file for a specific identity.

If you want the base TiefAmt look without any national theming, use the base styles from `@tiefamt/core` directly:

```ts
import '@tiefamt/core/styles'
```

That gives you the dark navy default palette, flat geometry, and density tokens — nothing country-specific.

---

## No runtime switching

Presets are compile-time only. There is no `setPreset()` function, no context value, no dynamic import trick to switch themes at runtime. If you need two themes on the same page, build two pages. This is a government UI kit, not a consumer product with a dark mode toggle.
