# Badge

A small, static status marker — a count, a state word, or a bare dot. The component is a
styling layer over an inline `<span>`; every visual value resolves through a token declared
in [`tokens.css`](../../tokens.css), so light and dark themes need no component-level
overrides.

**Figma source:** UI Kit — Tailwind 3 Theme (Portside Edition) › `Badge`
([node `7521:1394`](https://www.figma.com/design/2JfMgeZuQOt4atDR58pLs9/UI-Kit---Tailwind-3-Theme--Portside-Edition-?node-id=7521-1394))
— 288 variants: 2 sizes × 8 types × 3 contrasts × 3 modes × 2 shapes.

```html
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="components/badge/badge.css">

<span class="psds-badge psds-badge--sm psds-badge--danger psds-badge--pill">99+</span>
```

## Class API

| Axis | Classes | Default |
| --- | --- | --- |
| Size | `--sm` `--lg` | `--sm` |
| Type | `--primary` `--secondary` `--info` `--success` `--warning` `--danger` `--light` `--dark` | — (required) |
| Contrast | *(none = Subtle)* `--ascent` `--outline` | Subtle |
| Mode | *(none = Word)* `--letter` `--dot` | Word |
| Shape | *(none = Rounded)* `--pill` | Rounded |

`.psds-badge` alone carries no colour; always pair it with a type. The badge ships no
interaction states — the source node defines none — so there are no hover, focus or
disabled rules.

Cascade order in the stylesheet is **Size → Type → Contrast → Mode → Shape**. Each block may
redefine `--psds-badge-radius`, and Shape is declared last so `--pill` always wins.

## Sizes

| Size | Height | Font | Line height | Padding&nbsp;X | Gap | Letter width | Dot |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `--sm` | `--spacing-20` 20 | `--font-size-xxs` 10 | `--line-height-xxs` 14 | `--spacing-8` | `--spacing-2` | `--spacing-24` 24 | `--spacing-12` 12 |
| `--lg` | `--spacing-24` 24 | `--font-size-xs` 12 | `--line-height-xs` 16 | `--spacing-8` | `--spacing-2` | 26 | `--spacing-14` 14 |

Label weight is `--font-weight-medium` and tracking `--letter-spacing-normal` at both sizes.

The Large Letter width of 26px has no matching spacing token, so it is written as
`calc(var(--spacing-24) + var(--spacing-2))`. Every other dimension is a token reference.

Figma draws the Outline stroke *inside* the frame, so an Outlined badge is the same overall
size as a Subtle one and its label still sits 8px from the outer edge. The border is always
declared here (transparent when not Outlined), so the padding gives that pixel back:
`padding-inline: calc(var(--psds-badge-padding) - var(--border-1))`.

## Modes

| Mode | Shape | Behaviour |
| --- | --- | --- |
| Word | any | Auto width, `--psds-badge-padding` on each side. Takes a label and an optional icon. |
| `--letter` | Rounded | Fixed `min-width`, no inline padding — a single-character counter. |
| `--letter` | `--pill` | `min-width` collapses to the height: a circle. |
| `--dot` | Rounded | A `--psds-badge-dot-size` square with a 4px radius, no content. |
| `--dot` | `--pill` | The same square, fully rounded. |

A Dot rides on top of other content, so it keeps a 1px ring in
`--background-content-bg-color` that separates it from whatever sits beneath. Outlined, the
ring becomes the type colour and the dot reads as hollow.

## Radii

The source node does not use one radius per shape — it varies by type and contrast:

| Shape | Accent types (Primary, Info, Success, Warning, Danger) | Neutral types (Secondary, Light, Dark) |
| --- | --- | --- |
| Rounded, Ascent / Subtle | `--radius-8` | `--radius-4` |
| Rounded, Outline | `--radius-4` | `--radius-4` |
| Rounded, `--dot` | `--radius-4` | `--radius-4` |
| `--pill` | `--radius-24` (20px) | `--radius-24` |

This is reproduced faithfully. Everything routes through the single
`--psds-badge-radius` custom property, so a consumer who wants one radius everywhere can
set it once on `.psds-badge`.

## Token map

Each type maps its tokens onto three channels, which the contrast rules consume:
`--psds-badge-ascent-bg` / `-fg`, `--psds-badge-subtle-bg` / `-fg`, and
`--psds-badge-accent` (the Outline border *and* label). Nothing is hard-coded; retheming
happens entirely in `tokens.css`.

| Type | Ascent surface | Ascent label | Subtle surface | Subtle label | Outline accent |
| --- | --- | --- | --- | --- | --- |
| `--primary` | `--primary` | `--primary-text-color` | `--primary-lighter` | `--primary` | `--primary` |
| `--info` | `--info-light` | `--info` | `--info-lighter` | `--info` | `--info` |
| `--success` | `--success-light` | `--success` | `--success-lighter` | `--success` | `--success` |
| `--warning` | `--warning-light` | `--warning` | `--warning-lighter` | `--warning` | `--warning` |
| `--danger` | `--danger-light` | `--danger` | `--danger-lighter` | `--danger` | `--danger` |
| `--secondary` | `--background-content-bg-color` | `--foreground-content-text-color-alt1` | `--background-content-bg-color-alt1` | `--foreground-content-text-color-alt1` | `--foreground-content-text-color-alt1` |
| `--light` | `--background-content-bg-color-alt1` | `--foreground-content-text-color-alt1` | `--background-content-bg-color-alt1` | `--foreground-content-text-color-alt1` | `--foreground-content-text-color-alt1` |
| `--dark` | `--foreground-content-text-color-alt2` | `--background-content-bg-color-alt2` | `--foreground-content-text-color-alt2` | `--background-content-bg-color-alt2` | `--foreground-content-text-color-alt2` |

Transparent surfaces use `--transparent`, not `transparent`, so the value stays a token.

### Quirks carried over from the source

These are reproduced as authored. Raise them with design before relying on them:

- **Primary Ascent is the only solid fill.** It is `--primary` with a white label; every
  other accent type's Ascent is a tinted surface (`-light`) with the accent as the label.
- **Light and Dark resolve Ascent and Subtle to the same pair**, so the two contrasts are
  visually identical for those types.
- **Secondary Ascent is `--background-content-bg-color`** — invisible on a default content
  surface. Use `--secondary` Subtle or Outline on white.
- **Primary Small Rounded Dot** is the one variant whose radius is a raw `2px` rather than a
  bound variable. It is implemented as `--radius-4`, like every other dot.

## Icons

Word and Letter badges accept a leading or trailing icon, which consumes the gap token
above. Wrap it in `.psds-badge__icon`, which is `1em` square — exactly the 10px (`--sm`) and
12px (`--lg`) icon sizes in Figma:

```html
<span class="psds-badge psds-badge--lg psds-badge--success psds-badge--pill">
  <span class="psds-badge__icon" aria-hidden="true"><svg viewBox="0 0 16 16">…</svg></span>
  12%
</span>
```

Use `currentColor` in the icon so it follows the label.

## Accessibility

- A badge is decoration *plus* content. Give it text that stands alone, or pair it with a
  visible label: `Inbox <span class="psds-badge …">99+</span>` reads as "Inbox 99+".
- `--dot` has no text. Either mark it `aria-hidden="true"` and convey the state in adjacent
  text, or give it `role="img"` and an `aria-label`.
- The badge is not focusable and carries no interaction states. If you need a clickable
  chip, use a `<button>` and the Button component instead.
- Subtle contrast on the accent types is a light tint behind a mid-tone label. It clears
  WCAG AA for the darker tokens (`--info`, `--success`, `--danger`) but `--warning` is
  marginal at `--sm`'s 10px; prefer `--lg` or Outline where the text matters.
- `--letter` truncates nothing — a two-character value will simply exceed the `min-width`.

## Notes

- `tokens.css` declares no font-family token, so the Inter stack from the Figma text style
  is held in `--psds-badge-font-family` on the component and is the one value not sourced
  from `tokens.css`. Promote it to a global token when one is added.
- `badge.html` is a live gallery of the full matrix, including a dark-theme toggle.
