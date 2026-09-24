# Button

Triggers an action. The component is a thin styling layer over `<button>` — every visual
value resolves through a token declared in [`tokens.css`](../../tokens.css), so light and
dark themes need no component-level overrides.

**Figma source:** UI Kit — Tailwind 3 Theme (Portside Edition) › `Button`
([node `6613:261420`](https://www.figma.com/design/2JfMgeZuQOt4atDR58pLs9/UI-Kit---Tailwind-3-Theme--Portside-Edition-?node-id=6613-261420))
— 720 variants: 4 sizes × 6 types × 2 shapes × 3 modes × 5 states.

```html
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="components/button/button.css">

<button class="psds-btn psds-btn--md psds-btn--primary" type="button">Button</button>
```

## Class API

| Axis | Classes | Default |
| --- | --- | --- |
| Size | `--xs` `--sm` `--md` `--lg` | `--md` |
| Type | `--primary` `--secondary` `--info` `--success` `--warning` `--danger` | — (required) |
| Mode | *(none = Filled)* `--outlined` `--flat` | Filled |
| Shape | *(none = Rounded)* `--pill` | Rounded |

`.psds-btn` alone carries no colour; always pair it with a type. The forced-state helpers
`.is-hover`, `.is-active`, `.is-focus` and `.is-disabled` reproduce a state for
documentation and visual-regression galleries — real interaction is handled by `:hover`,
`:active`, `:focus-visible` and `[disabled]`.

## Sizes

| Size | Height | Font | Line height | Padding&nbsp;X | Padding&nbsp;X&nbsp;(pill) | Gap | Radius |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `--xs` | `--form-mouse-small` 24 | `--font-size-xs` 12 | `--line-height-xs` 16 | `--spacing-8` | `--spacing-10` | `--spacing-6` | `--control-radius-btn-default-radius` |
| `--sm` | `--form-mouse` 32 | `--font-size-sm` 14 | `--line-height-sm` 20 | `--spacing-10` | `--spacing-12` | `--spacing-6` | `--control-radius-btn-default-radius` |
| `--md` | `--form-bigger-small` 36 | `--font-size-base` 16 | `--line-height-base` 24 | `--spacing-14` | `--spacing-16` | `--spacing-10` | `--control-radius-btn-default-radius` |
| `--lg` | `--form-bigger` 40 | `--font-size-base` 16 | `--line-height-base` 24 | `--spacing-16` | `--spacing-18` | `--spacing-10` | `--control-radius-btn-bigger-radius` |

Label weight is `--font-weight-medium` and tracking `--letter-spacing-normal` at every
size. `--pill` swaps the radius for `--radius-full` and adds 2px of inline padding per
side, matching the Figma *Full Rounded* variants.

## States

Filled is the base treatment. **Outlined and Flat differ at rest and when disabled** — on hover and
active every mode collapses onto the filled treatment, as the Figma variants do.

| Mode | Enabled | Hover | Active | Focus | Disabled |
| --- | --- | --- | --- | --- | --- |
| Filled | filled | filled `-hover` | filled `-pressed` | filled `-focus` + ring | filled `-disabled` |
| Outlined | transparent + border | filled `-hover` | filled `-pressed` | transparent + `-focus` border + ring | transparent + `-disabled` border |
| Flat | transparent, no border | filled `-hover` | filled `-pressed` | filled `-focus` + ring | transparent, no border, `-disabled` accent label |

The Figma *Active* state maps to the `-pressed` token suffix.

### Focus ring

Reproduces the Figma `$shadow-focus-ring2` effect — a 2px ring in the content background
that separates the control from a 4px ring in `--primary`:

```css
box-shadow: 0 0 0 var(--border-2) var(--background-content-bg-color),
            0 0 0 var(--border-4) var(--primary);
```

It is declared last so the ring survives a simultaneous hover, and it is bound to
`:focus-visible`, so pointer clicks do not raise it.

Forced-colours modes (Windows High Contrast) drop `box-shadow`, so the rule also sets
`outline: var(--border-2) solid var(--transparent)`. It is invisible normally and repainted
in the system highlight colour when colours are forced. Every component's focus rule does
the same; text fields, whose focus is a border change, add a `forced-colors` outline on the
control instead.

## Token map

Each type modifier maps the shared button tokens onto four channels, which the mode rules
then consume. Nothing is hard-coded; retheming happens entirely in `tokens.css`.

| Channel | Resolves to | Used by |
| --- | --- | --- |
| `--psds-btn-bg[-state]` | `--buttons-{type}-bg-color[-state]` | Filled surface |
| `--psds-btn-border[-state]` | `--buttons-{type}-border-color[-state]` | All modes |
| `--psds-btn-fg[-state]` | `--buttons-{type}-text[-state]` | Label on a filled surface |
| `--psds-btn-accent` | `--buttons-{type}-accent` | Label on a transparent surface (Outlined / Flat) |
| `--psds-btn-accent-disabled` | `--buttons-{type}-bg-color-disabled` | Disabled Outlined / Flat label |
| `--psds-btn-outline` | `--buttons-{type}-accent` (Secondary: `-border-color`) | Outlined border at rest |

State suffixes are `-hover`, `-pressed`, `-focus` and `-disabled`.

`--buttons-{type}-accent` is the type colour painted straight onto a surface. In light it
equals the fill; in dark it is the lighter semantic colour (`--primary`, `--success`, …), so
Outlined and Flat labels stay readable while the filled surface is dark enough for a white
label. Inputs, chips, links and table links use the same token for validation borders and
text.

Two deliberate exceptions, both taken from the Figma bindings:

- **Secondary** is the one type whose label token is authored as
  `--buttons-secondary-text-color…` rather than `--buttons-secondary-text…`, and its
  `accent` channel points at that text colour rather than at its background — Secondary's
  background is a surface, not an accent.
- Transparent surfaces use `--transparent`, not `transparent`, so the value stays a token.

## Accessibility

- Use `<button type="button">` for actions; `<a class="psds-btn">` is styled identically
  for navigation. Set `type` explicitly inside a `<form>` to avoid an accidental submit.
- Prefer the real `disabled` attribute over `.is-disabled`; the class is presentational and
  removes pointer events but not keyboard focus or the accessible disabled state.
- Every size meets the 24px minimum target of WCAG 2.2 *Target Size (Minimum)*; `--xs` sits
  exactly at it, so give it room in dense layouts.
- Flat buttons in their rest state read as text. Keep them for tertiary actions where
  surrounding context makes the affordance obvious.
- Transitions are disabled under `prefers-reduced-motion: reduce`.

## Icons

The referenced Figma node ships label-only variants; the per-size `gap` token above is what
a leading or trailing icon consumes. Wrap icons in `.psds-btn__icon`, which is `1em` square
and scales with the label:

```html
<button class="psds-btn psds-btn--md psds-btn--primary" type="button">
  <span class="psds-btn__icon" aria-hidden="true"><svg viewBox="0 0 16 16">…</svg></span>
  Add item
</button>
```

Use `currentColor` in the icon so it follows the label through every state. Icon-only
buttons are not defined in the source node and are intentionally not implemented here.

## Notes

- `tokens.css` declares no font-family token, so the Inter stack from the Figma text style
  is held in `--psds-btn-font-family` on the component and is the one value not sourced
  from `tokens.css`. Promote it to a global token when one is added.
- `button.html` is a live gallery of the full matrix, including a dark-theme toggle.
