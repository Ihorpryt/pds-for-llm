# Segmented Controls

Switches between a small set of mutually exclusive options, or between views of the same
content. The component is a styling layer over native radios (or `role="tab"` buttons) —
every visual value resolves through a token declared in [`tokens.css`](../../tokens.css),
so light and dark themes need no component-level overrides.

**Figma source:** UI Kit — Tailwind 3 Theme (Portside Edition) › `Segment Tabs`
([node `52442:37223`](https://www.figma.com/design/2JfMgeZuQOt4atDR58pLs9/UI-Kit---Tailwind-3-Theme--Portside-Edition-?node-id=52442-37223))
— 2 variants: Size = Small, Large; built from the `_Atom / Segment Tabs` segment
([node `52438:29738`](https://www.figma.com/design/2JfMgeZuQOt4atDR58pLs9/UI-Kit---Tailwind-3-Theme--Portside-Edition-?node-id=52438-29738):
Size × State = Default, Hover, Focus, Disabled × Selected = Yes / No).

```html
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="components/segmented-controls/segmented-controls.css">

<div class="psds-segmented psds-segmented--sm" role="radiogroup" aria-label="View">
  <label class="psds-segmented__item">
    <input class="psds-segmented__input" type="radio" name="view" value="day" checked>Day
  </label>
  <label class="psds-segmented__item">
    <input class="psds-segmented__input" type="radio" name="view" value="week">Week
  </label>
</div>
```

## Class API

| Axis | Classes | Default |
| --- | --- | --- |
| Size | `--xs` `--sm` | `--sm` |
| Layout | *(none = fit content)* `--block` | Fit content |

| Element | Class | Notes |
| --- | --- | --- |
| Track | `.psds-segmented` | the bordered grey container; carries `role="radiogroup"` or `role="tablist"` |
| Segment | `.psds-segmented__item` | a `<label>` wrapping a radio, or a `<button role="tab">` |
| Radio | `.psds-segmented__input` | the native `<input type="radio">`, transparent and stretched over the segment |

Selection is not a modifier: it is the radio's own `:checked`, or `aria-selected="true"` on
a tab, so the DOM stays the source of truth. The forced-state helpers `.is-selected`,
`.is-hover`, `.is-focus` and `.is-disabled` on a segment reproduce a state for
documentation and visual-regression galleries — real interaction is handled by `:checked`,
`[aria-selected]`, `:hover`, `:focus-visible` and `:disabled` / `[aria-disabled="true"]`.

## Sizes

| Size | Figma | Track height | Track padding | Gap | Segment height | Padding&nbsp;X | Font | Line height |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `--xs` | Small | `--form-mouse-small` 24 | `--spacing-2` | `--spacing-2` | 20 | `--spacing-9` | `--font-size-xs` 12 | `--line-height-xs` 16 |
| `--sm` | Large | `--form-mouse` 32 | `--spacing-2` | `--spacing-2` | 28 | `--spacing-9` | `--font-size-sm` 14 | `--line-height-sm` 20 |

Label weight is `--font-weight-semibold` and tracking `--letter-spacing-normal` at both
sizes. Track padding, the gap between segments and the segment's inline padding are the
same at both sizes. The track has a 1px `--border` and a `--radius-8` radius; segment
radius is `--control-radius-btn-bigger-small-radius` (6).

The Figma sizes are named *Small* and *Large*. They map onto `--xs` and `--sm` because
their heights match the other controls at those sizes — so a segmented control lines up
with a `--sm` button, text box or dropdown in the same row. `--sm` is the default per
[`guidance.md`](../../guidance.md), although the Figma component set defaults to Small.

### Block

`--block` stretches the track to its container and gives every segment an equal share of
the width. It is not a Figma variant; it reproduces the full-width *Relative Time /
Specific Date/Time* switch in the [modal pattern](../../patterns/modal/modal.md) reference.
Keep labels short — segments do not wrap or truncate.

## States

| State | Unselected | Selected |
| --- | --- | --- |
| Default | no surface, `--foreground-content-text-color-alt2` | `--segmented-thumb` + shadow, `--foreground-content-text-color-hover` |
| Hover | label `--foreground-content-text-color-hover` | *unchanged* |
| Focus | + ring | + ring (replaces the shadow) |
| Disabled | `--foreground-content-text-color-disabled` | thumb and shadow kept, label `--foreground-content-text-color-disabled` |

Figma draws Default, Hover, Focus and Disabled. There is no Active state, so pressing a
segment has no treatment of its own.

### Focus ring

Figma draws focus as a 2px outside stroke in `--primary` that hugs the segment, with no
gap between the two. That differs from the two-step ring the button uses:

```css
box-shadow: 0 0 0 var(--border-2) var(--primary);
```

It is declared last, raises the focused segment above its neighbours so the ring is not
covered by them, and is bound to `:focus-visible`, so pointer clicks do not raise it.

## Token map

| Part | Resolves to |
| --- | --- |
| Track surface | `--segmented-track` (`--background-content-bg-color-alt3` light, `-alt2` dark) |
| Track border | `--border` |
| Selected surface (thumb) | `--segmented-thumb` (`--background-content-bg-color` light, `-alt3` dark) |
| Unselected label | `--foreground-content-text-color-alt2` |
| Selected and hovered label | `--foreground-content-text-color-hover` |
| Disabled label | `--foreground-content-text-color-disabled` |
| Focus ring | `--primary` |

`--segmented-track` and `--segmented-thumb` are the component's own tokens, mirroring the
Figma `Segmented/…` variables. Transparent surfaces use `--transparent`, not `transparent`,
so the value stays a token.

Figma draws the track border as an inside stroke, so the track's padding is reduced by
`--border-1` and segments sit exactly where Figma puts them. A segment has no border of
its own: the thumb's hairline is part of its shadow, so nothing shifts on selection.

## Which markup to use

| Use | Markup | Keyboard |
| --- | --- | --- |
| Choosing a value (a filter, a unit, a mode that changes a form) | `role="radiogroup"` + `<label>` / `<input type="radio">` | <kbd>Tab</kbd> into the group, arrows move the selection — native, no script |
| Switching panels of content | `role="tablist"` + `<button role="tab" aria-selected aria-controls>` | Roving `tabindex`; arrows, <kbd>Home</kbd>, <kbd>End</kbd> — needs script, see `segmented-controls.html` |

Prefer the radio group. It works in a `<form>` with no JavaScript, and a segmented control
that only changes which fields are shown is still choosing a value.

## Accessibility

- Give the track an accessible name with `aria-label` or `aria-labelledby`.
- Radios: give every radio in one control the same `name`. The radio is transparent and
  stretched over its segment, not `display: none`, so it keeps keyboard focus and its
  accessible state.
- Tabs: point each tab at its panel with `aria-controls`, label each panel with
  `aria-labelledby`, and keep exactly one tab at `tabindex="0"`.
- Prefer the real `disabled` attribute over `.is-disabled`; the class is presentational and
  removes pointer events but not keyboard focus or the accessible disabled state.
- Only `--sm` meets the 24px minimum target of WCAG 2.2 *Target Size (Minimum)*; an `--xs`
  segment is 20px high, so give it room in dense layouts or size it up.
- Unselected labels rely on colour alone to differ from the selected one; the selected
  segment's surface and shadow carry the distinction.
- Transitions are disabled under `prefers-reduced-motion: reduce`.

## Notes

- `tokens.css` declares no font-family token, so the Inter stack from the Figma text style
  is held in `--psds-segmented-font-family` on the component. Promote it to a global token
  when one is added.
- `tokens.css` declares no shadow tokens, so the thumb's Figma effect
  (`0 0 0 1px #0000000f, 0 1px 2px #0000001f`) is held in `--psds-segmented-shadow` on the
  component.
- The Figma track radius is bound to `border/border-8`, a border-width variable; it is
  mapped to `--radius-8`, which has the same value.
- The segment reserves a `--spacing-6` gap for an icon, but the Figma node has no icon slot,
  so no icon element is defined.
- Selected, focus and disabled use `:has()`, supported in all current evergreen browsers.
- `segmented-controls.html` is a live gallery of both sizes, the block layout, every state,
  a working radio group and a working tab list, including a dark-theme toggle.
