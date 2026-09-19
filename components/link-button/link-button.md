# Link Button

A text-only action that reads as a link. The component is a thin styling layer over
`<button>` or `<a>` — every visual value resolves through a token declared in
[`tokens.css`](../../tokens.css), so light and dark themes need no component-level
overrides.

**Figma source:** UI Kit — Tailwind 3 Theme (Portside Edition) › `Link Button`
([node `11856:1737`](https://www.figma.com/design/2JfMgeZuQOt4atDR58pLs9/UI-Kit---Tailwind-3-Theme--Portside-Edition-?node-id=11856-1737))
— 4 sizes × 5 states, with optional leading and trailing icon slots.

```html
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="components/link-button/link-button.css">

<button class="psds-link-btn psds-link-btn--md" type="button">Link Button</button>
```

## Class API

| Axis | Classes | Default |
| --- | --- | --- |
| Size | `--xs` `--sm` `--md` `--lg` | `--md` |

Unlike [`Button`](../button/button.md) there is no type, mode or shape axis: the source
node ships a single primary treatment, so `.psds-link-btn` on its own is already complete
and the size modifier is the only thing to add. The forced-state helpers `.is-hover`,
`.is-active`, `.is-focus` and `.is-disabled` reproduce a state for documentation and
visual-regression galleries — real interaction is handled by `:hover`, `:active`,
`:focus-visible` and `[disabled]`.

## Sizes

| Size | Font | Line height | Gap | Icon | Icon padding&nbsp;Y |
| --- | --- | --- | --- | --- | --- |
| `--xs` | `--font-size-xs` 12 | `--line-height-xs` 16 | `--spacing-4` | `--font-icon-12` | `--spacing-3` |
| `--sm` | `--font-size-sm` 14 | `--line-height-sm` 20 | `--spacing-4` | `--font-icon-16` | `--spacing-2` |
| `--md` | `--font-size-base` 16 | `--line-height-base` 24 | `--spacing-6` | `--font-icon-18` | `--spacing-3` |
| `--lg` | `--font-size-base` 16 | `--line-height-base` 24 | `--spacing-6` | `--font-icon-20` | `--spacing-4` |

Label weight is `--font-weight-medium` and tracking `--letter-spacing-normal` at every
size. `--md` and `--lg` share a type ramp and differ only in icon size, exactly as the
Figma variants do — so the two sizes are interchangeable for label-only link buttons.

There is no height, no padding and no surface: a link button occupies exactly its content
box so it can sit inline in running text without disturbing the line box. The one
exception is the 1px border, which is always present and transparent — see below.

Figma's own component default is *Small*; `.psds-link-btn` defaults to `--md` instead so
it matches [`Button`](../button/button.md). Always state the size explicitly.

## States

| State | Label | Rule | Surface |
| --- | --- | --- | --- |
| Enabled | `--buttons-primary-bg-color` | none | transparent |
| Hover | `--buttons-primary-bg-color-hover` | `--buttons-primary-border-color-hover` | transparent |
| Active | `--buttons-primary-bg-color-pressed` | `--buttons-primary-border-color-pressed` | transparent |
| Focus | `--buttons-primary-bg-color-hover` | `--buttons-primary-border-color-hover` | `--background-content-bg-color` |
| Disabled | `--background-content-bg-color-alt5` | none | transparent |

The Figma *Active* state maps to the `-pressed` token suffix. Focus reuses the hover
colours and adds the content background, which is what lets the rule and the label stay
legible over any surrounding surface.

### The underline is a border, not `text-decoration`

In Figma the rule is a separate 1px line spanning the component's full border box — it
runs under the icons, not just the label. `text-decoration` cannot do that, so the rule is
the element's `border-bottom`:

```css
border      : var(--border-1) solid var(--transparent);
/* …and on hover / active / focus: */
border-bottom-color: var(--buttons-primary-border-color-hover);
```

The border is declared on all four sides at every state so the box never reflows when the
rule appears. `text-decoration: none` is set on the base for the `<a>` case.

### No focus ring

[`Button`](../button/button.md) raises the Figma `$shadow-focus-ring2` effect on
`:focus-visible`. The Link Button node carries no such effect — its focus affordance is
the colour shift plus the rule, which is a visible, non-colour-only change from the
enabled state. If your surface needs a stronger indicator, add the button's ring locally
rather than changing this file:

```css
.psds-link-btn:focus-visible {
  box-shadow: 0 0 0 var(--border-2) var(--background-content-bg-color),
              0 0 0 var(--border-4) var(--primary);
}
```

## Token map

| Channel | Resolves to |
| --- | --- |
| `--psds-link-btn-fg[-state]` | `--buttons-primary-bg-color[-state]` |
| `--psds-link-btn-rule-{hover,pressed}` | `--buttons-primary-border-color-{hover,pressed}` |
| `--psds-link-btn-fg-disabled` | `--background-content-bg-color-alt5` |

Two things are worth calling out, both taken straight from the Figma bindings:

- The **label** colour comes from the `-bg-color` family and the **rule** from the
  `-border-color` family. They resolve to the same value today; keeping them on separate
  channels means a retheme that splits them keeps working.
- **Disabled** is the one state that does not use a button token at all — Figma binds it
  to `--background-content-bg-color-alt5`, the neutral grey used for disabled content.
- Transparent surfaces use `--transparent`, not `transparent`, so the value stays a token.

## Icons

The source node ships optional leading and trailing icon slots. Wrap each in
`.psds-link-btn__icon`; the wrapper carries the per-size block padding and sizes the icon
from `--psds-link-btn-icon-size`:

```html
<button class="psds-link-btn psds-link-btn--md" type="button">
  <span class="psds-link-btn__icon" aria-hidden="true"><svg viewBox="0 0 12 12">…</svg></span>
  Link Button
</button>
```

Unlike the button, the icon does **not** scale with the label — each size binds an
explicit icon token, which is why `--md` (18) and `--lg` (20) differ despite sharing a font
size. Use `currentColor` in the icon so it follows the label through every state.

## Accessibility

- Use `<button type="button">` for actions and `<a href>` for navigation; both are styled
  identically. Set `type` explicitly inside a `<form>` to avoid an accidental submit.
- For `<button>` prefer the real `disabled` attribute. `<a>` cannot be disabled, so use
  `aria-disabled="true"` and drop the `href` — the CSS styles both, and removes pointer
  events, but neither the class nor `aria-disabled` removes keyboard focus.
- A link button has no padding, so its hit area is only as tall as its line box. At `--xs`
  that is 16px, well under the 24px minimum of WCAG 2.2 *Target Size (Minimum)*. Either
  give it 24px of spacing clearance from other targets, or use a
  [`Button`](../button/button.md) in `--flat` mode where a real target is needed.
- Disabled uses a grey that does not meet 4.5:1 against the content background. That is
  the Figma binding and is acceptable for a disabled control, which is exempt under WCAG
  1.4.3 — but do not reuse the token for enabled text.
- Transitions are disabled under `prefers-reduced-motion: reduce`.

## Notes

- `tokens.css` declares no font-family token, so the Inter stack from the Figma text style
  is held in `--psds-link-btn-font-family` on the component and is the one value not
  sourced from `tokens.css`. Promote it to a global token when one is added.
- `link-button.html` is a live gallery of the full matrix, including a dark-theme toggle.
