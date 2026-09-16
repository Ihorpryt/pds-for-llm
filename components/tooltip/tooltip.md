# Tooltip

A small dark bubble that describes the element it points at. The component is a styling
layer plus a CSS-only positioning helper — every visual value resolves through a token
declared in [`tokens.css`](../../tokens.css), so light and dark themes need no
component-level overrides (the bubble inverts to a light surface in dark theme).

**Figma source:** UI Kit — Tailwind 3 Theme (Portside Edition) › `Tooltip`
([node `6678:184877`](https://www.figma.com/design/2JfMgeZuQOt4atDR58pLs9/UI-Kit---Tailwind-3-Theme--Portside-Edition-?node-id=6678-184877))
— 36 variants: Sizes = Small, Large × Pointer = None + 8 positions × Shadow = False, True;
with boolean Title, Icon, Close Icon and Description layers.

```html
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="components/tooltip/tooltip.css">

<span class="psds-tooltip-anchor">
  <button class="psds-btn psds-btn--sm psds-btn--secondary" type="button"
          aria-describedby="tip-copy">Copy</button>
  <span class="psds-tooltip psds-tooltip--sm psds-tooltip--arrow-top psds-tooltip--shadow"
        role="tooltip" id="tip-copy">Copy the link to your clipboard</span>
</span>
```

Link [`foundations/icons.css`](../../foundations/icons.css) as well when the tooltip has an
icon or a close button.

## Class API

| Axis | Classes | Default |
| --- | --- | --- |
| Size | `--sm` `--lg` | `--sm` |
| Pointer | *(none)* `--arrow-top-start` `--arrow-top` `--arrow-top-end` `--arrow-bottom-start` `--arrow-bottom` `--arrow-bottom-end` `--arrow-left` `--arrow-right` | None |
| Shadow | *(none)* `--shadow` | No shadow |

| Element | Class | Notes |
| --- | --- | --- |
| Bubble | `.psds-tooltip` | carries `role="tooltip"` and an `id` |
| Header | `.psds-tooltip__header` | optional row: icon + title + close |
| Icon | `.psds-tooltip__icon` | add to a `.psds-icon`; sized by the tooltip |
| Title | `.psds-tooltip__title` | medium weight |
| Description | `.psds-tooltip__description` | the body text; plain text directly in the bubble works too |
| Close | `.psds-tooltip__close` | a `<button>` wrapping an xmark `.psds-icon` |
| Anchor | `.psds-tooltip-anchor` | wraps the trigger and its tooltip; shows and places it |

| Anchor state | Class | Notes |
| --- | --- | --- |
| Open | *(`:hover`, `:focus-within`)* `.is-open` | `.is-open` forces the tooltip visible |
| Dismissed | `.is-dismissed` | hides it until hover / focus leave; set by script on <kbd>Escape</kbd> |

### Pointer names

The modifier names **the edge the pointer sits on**, as Figma does — not the side of the
trigger the tooltip opens on.

| Modifier | Figma | Pointer | Opens (inside an anchor) |
| --- | --- | --- | --- |
| *(none)* | None | — | below, centred |
| `--arrow-top-start` | Top Left | top edge, near the start | below, extending to the end |
| `--arrow-top` | Top Center | top edge, centred | below, centred |
| `--arrow-top-end` | Top Right | top edge, near the end | below, extending to the start |
| `--arrow-bottom-start` | Bottom Left | bottom edge, near the start | above, extending to the end |
| `--arrow-bottom` | Bottom Center | bottom edge, centred | above, centred |
| `--arrow-bottom-end` | Bottom Right | bottom edge, near the end | above, extending to the start |
| `--arrow-left` | Center Left | left edge, centred | to the right |
| `--arrow-right` | Center Right | right edge, centred | to the left |

## Sizes

| Size | Figma | Max width | Padding | Font | Line height | Title↔description | Header gap | Icon | Close | Radius |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `--sm` | Small | 260 | `--spacing-8` | `--font-size-xs` 12 | `--line-height-xs` 16 | `--spacing-8` | `--spacing-4` | `--font-icon-12` | `--font-icon-14` | `--control-radius-tooltip-default-radius` (4) |
| `--lg` | Large | 320 | `--spacing-12` | `--font-size-sm` 14 | `--line-height-sm` 20 | `--spacing-12` | `--spacing-6` | `--font-icon-14` | `--font-icon-14` | `--control-radius-tooltip-bigger-radius` (6) |

Description weight is `--font-weight-normal`, title weight `--font-weight-medium`, and
tracking `--letter-spacing-normal` at both sizes. `--sm` is the default per
[`guidance.md`](../../guidance.md).

Figma draws every variant at a fixed width (260 / 320). Here that width is a
`max-width` and the bubble is `width: max-content`, so a one-word tooltip shrinks to fit
while long text wraps at the Figma width.

## Pointer

| Size | Pointer (w × h) | Inset from the outer edge | Tip-to-trigger distance |
| --- | --- | --- | --- |
| `--sm` | 16 × 9.6 | 23 (`--spacing-22` + border) | 9.6 + `--spacing-4` |
| `--lg` | 18 × 11.49 | 31 (`--spacing-30` + border) | 11.49 + `--spacing-4` |

The pointer is a `::before` masked with the exact Figma polygon (a triangle with a rounded
tip) and painted with `--background-tooltip-bg-color`, so it follows the theme. Its base sits
on the inner edge of the 1px border, so the seam is invisible. `--shadow` is a
`filter: drop-shadow()`, not a `box-shadow`, so the pointer casts a shadow too.

## Showing and placing — `.psds-tooltip-anchor`

Not a Figma layer. Wrap a single trigger and its tooltip in `.psds-tooltip-anchor` and the
tooltip:

- is hidden until the anchor is hovered or holds focus (`:hover`, `:focus-within`), with a
  120ms fade that is removed under `prefers-reduced-motion: reduce`;
- opens on the side opposite its pointer, `--psds-tooltip-offset` away from the trigger;
- aims the pointer at the trigger's centre, including the `-start` / `-end` variants;
- stays open while the pointer crosses the gap to the bubble, so its content is hoverable.

It does **not** flip or shift to stay inside the viewport or a scrolling container, and it is
clipped by an `overflow: hidden` ancestor. When that matters, drop the anchor, position the
bubble with a library such as Floating UI, and set the pointer modifier from the placement it
resolves.

## States

The tooltip has no interactive states of its own in Figma. The close button gets the Button
`$shadow-focus-ring2` treatment on `:focus-visible` as an accessibility addition, and its hit
area is widened to 24px without moving the glyph.

## Token map

| Part | Resolves to |
| --- | --- |
| Surface + pointer | `--background-tooltip-bg-color` |
| Border | `--border-tooltip-border` (same colour as the surface) |
| Text, icon, close | `--foreground-tooltip-text-color` |
| Radius | `--control-radius-tooltip-default-radius` / `--control-radius-tooltip-bigger-radius` |
| Close focus ring | `--background-content-bg-color` + `--primary` |

The border is always present and the padding gives its pixel back, matching Figma's inside
stroke. Transparent surfaces use `--transparent`, not `transparent`, so the value stays a token.

## Content

| Figma layer | Markup |
| --- | --- |
| Description | text directly in `.psds-tooltip`, or `<p class="psds-tooltip__description">` when there is a header |
| Title | `<p class="psds-tooltip__title">` inside `.psds-tooltip__header` |
| Icon (Clock by default, swappable) | `<span class="psds-tooltip__icon psds-icon" aria-hidden="true">&#xf017;</span>` |
| Close Icon | `<button class="psds-tooltip__close" type="button" aria-label="Close"><span class="psds-icon" aria-hidden="true">&#xf00d;</span></button>` |

```html
<div class="psds-tooltip psds-tooltip--lg psds-tooltip--shadow psds-tooltip--arrow-top-start"
     role="dialog" aria-labelledby="tip-title">
  <div class="psds-tooltip__header">
    <span class="psds-tooltip__icon psds-icon" aria-hidden="true">&#xf017;</span>
    <p class="psds-tooltip__title" id="tip-title">Tooltip Header</p>
    <button class="psds-tooltip__close" type="button" aria-label="Close">
      <span class="psds-icon" aria-hidden="true">&#xf00d;</span>
    </button>
  </div>
  <p class="psds-tooltip__description">This sample demonstrates the smart positioning functionalities of the tooltip.</p>
</div>
```

## Which pattern to use

| Use | Markup | Opens on |
| --- | --- | --- |
| Short description of a control (text only) | `role="tooltip"` in a `.psds-tooltip-anchor`; trigger has `aria-describedby` | hover and focus |
| Rich content, or anything with a close button or a link | a non-modal `role="dialog"` toggled by a button with `aria-expanded` (a toggletip); render it without the anchor, or with `.is-open` | click |

A `role="tooltip"` is never focusable and must not contain interactive content, so a tooltip
with a close button is a toggletip, not a tooltip. The Figma *Close Icon* layer is for that
case.

## Accessibility

- Link the trigger to the tooltip with `aria-describedby`. Use `aria-labelledby` instead only
  when the tooltip is the trigger's *only* name — for example on an icon-only button with no
  `aria-label`.
- Keep the trigger focusable. A tooltip on a `<span>` or a disabled button never shows for
  keyboard users; wrap disabled controls or explain the state in visible text.
- WCAG 1.4.13 *Content on Hover or Focus*: the anchor keeps the tooltip open while it is
  hovered (hoverable) and until hover or focus leave (persistent). **Dismissible** needs script:
  add `.is-dismissed` to the open anchor on <kbd>Escape</kbd> and remove it on `mouseleave` /
  `focusout` — see `tooltip.html`.
- Never put essential information only in a tooltip; touch users cannot hover.
- Text on the tooltip surface meets 4.5:1 in both themes (cool-gray-50 on cool-gray-900 in light,
  cool-gray-800 on cool-gray-50 in dark).
- The close button's glyph is 14px, but its hit area is 24px, meeting WCAG 2.2 *Target Size
  (Minimum)*.

## Notes

- `tokens.css` declares no font-family token, so the Inter stack from the Figma text style is
  held in `--psds-tooltip-font-family`. Promote it to a global token when one is added.
- `tokens.css` declares no shadow tokens, so the Figma `$Shadow-md` effect is held in
  `--psds-tooltip-shadow` as the equivalent pair of `drop-shadow()` filters.
- `tokens.css` declares no width or pointer tokens, so the 260 / 320 max widths and the pointer
  size and polygon are component-level literals.
- **Radius:** Figma binds the Small variants inconsistently — most use
  `tooltip-bigger-radius`, while Small *Bottom Center*, *Bottom Right*, *Center Left* and
  *Center Right* use `tooltip-default-radius`. This file uses `default` for `--sm` and `bigger`
  for `--lg` throughout, so the radius never changes with pointer position. The Figma fallback
  for `tooltip-bigger-radius` is 8, but `tokens.css` resolves it to `--radius-6`; the token wins.
- The Figma Clock and Close icons are replaced by the Font Awesome `clock` (`f017`) and `xmark`
  (`f00d`) glyphs per [`guidance.md`](../../guidance.md).
- The pointer uses `mask-image` (with the `-webkit-` prefix) and the individual `translate` /
  `rotate` properties, supported in all current evergreen browsers.
- `tooltip.html` is a live gallery of both sizes, every pointer with and without shadow, the
  header layers, and working hover / focus / <kbd>Escape</kbd> triggers, including a
  dark-theme toggle.
