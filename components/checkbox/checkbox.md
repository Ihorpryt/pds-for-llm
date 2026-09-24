# Checkbox

Selects one or more options, or toggles a single setting. The component is a thin styling
layer over `<input type="checkbox">` — every visual value resolves through a token declared
in [`tokens.css`](../../tokens.css), so light and dark themes need no component-level
overrides.

**Figma source:** UI Kit — Tailwind 3 Theme (Portside Edition) › `Checkbox`
([node `4755:174067`](https://www.figma.com/design/2JfMgeZuQOt4atDR58pLs9/UI-Kit---Tailwind-3-Theme--Portside-Edition-?node-id=4755-174067))
— 120 variants: 4 sizes × 3 types × 5 states × 2 text positions.

```html
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="components/checkbox/checkbox.css">

<label class="psds-checkbox psds-checkbox--sm">
  <input class="psds-checkbox__input" type="checkbox">
  <span class="psds-checkbox__text">
    <span class="psds-checkbox__label">Label</span>
  </span>
</label>
```

The root is the `<label>`, so the whole control — box, label and trailing icon — is one
click target and one hover target, matching the Figma variant, which is the whole frame.

## Class API

| Axis | Classes | Default |
| --- | --- | --- |
| Size | `--xs` `--sm` `--md` `--lg` | `--sm` |
| Text position | *(none = Right)* `--label-start` | Right |

| Element | Class | Notes |
| --- | --- | --- |
| Root | `.psds-checkbox` | `<label>` |
| Box | `.psds-checkbox__input` | the native `<input type="checkbox">`, styled directly |
| Text group | `.psds-checkbox__text` | label + optional trailing icon |
| Label | `.psds-checkbox__label` | |
| Icon | `.psds-checkbox__icon` | optional, Figma *Icons/Circle info* slot |

The Figma **Type** axis is not a modifier: Unchecked, Checked and Intermediate are the
input's own `:checked` and `:indeterminate` states, so the DOM stays the source of truth.
`indeterminate` is a DOM property with no HTML attribute, so `.is-indeterminate` on the
root mirrors it for static markup and galleries; set the property in JavaScript for real
tri-state behaviour. As in the DOM, Intermediate wins when both are set.

The forced-state helpers `.is-hover`, `.is-active`, `.is-focus` and `.is-disabled` on the
root reproduce a state for documentation and visual-regression galleries — real
interaction is handled by `:hover`, `:active`, `:focus-visible` and `[disabled]`.

## Sizes

| Size | Box | Radius | Glyph | Font | Line height | Weight | Trailing icon |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `--xs` | `--spacing-14` 14 | `--control-radius-checkbox-small-radius` | `--font-icon-8` | `--font-size-xs` 12 | `--line-height-xs` 16 | `--font-weight-medium` | `--font-icon-12` |
| `--sm` | `--spacing-16` 16 | `--control-radius-checkbox-default-radius` | `--font-icon-10` | `--font-size-sm` 14 | `--line-height-sm` 20 | `--font-weight-normal` | `--font-icon-14` |
| `--md` | `--spacing-20` 20 | `--control-radius-checkbox-bigger-small-radius` | `--font-icon-12` | `--font-size-base` 16 | `--line-height-base` 24 | `--font-weight-medium` | `--font-icon-16` |
| `--lg` | `--spacing-24` 24 | `--control-radius-checkbox-bigger-radius` | `--font-icon-14` | `--font-size-base` 16 | `--line-height-base` 24 | `--font-weight-medium` | `--font-icon-18` |

Gaps are the same at every size: `--spacing-8` between the box and the text, `--spacing-4`
between the label and the trailing icon. Tracking is `--letter-spacing-normal` throughout.
All four radius tokens currently resolve to `--radius-4`; they are kept distinct so a
retheme can separate them.

`--sm` is the default per [`guidance.md`](../../guidance.md), and is also the default
variant of the Figma component set.

Label weight follows the Figma text styles, which are not uniform: `--sm` binds
*Text-Small/Normal* (weight 400) while the other three bind a **/Medium** style (weight
500). That is reproduced as authored rather than normalised.

## Types

| Type | Box | Border | Glyph |
| --- | --- | --- | --- |
| Unchecked | `--background-content-bg-color` | `--border` | — |
| Checked | `--buttons-primary-bg-color` | tracks the fill | *Icons/Check large* |
| Intermediate | `--buttons-primary-bg-color` | tracks the fill | *Icons/Remove* |

Checked and Intermediate share one filled treatment and differ only in the glyph. Figma
draws the filled box with no border; here the border is kept and coloured to match the
fill, so the 1px box model is identical in all three types and the box never shifts by a
pixel when it is ticked.

## States

| State | Unchecked | Checked / Intermediate | Label |
| --- | --- | --- | --- |
| Default | surface + `--border` | `--buttons-primary-bg-color` | `--foreground-content-text-color` |
| Hover | *unchanged* | `-hover` | unchanged |
| Active | *unchanged* | `-pressed` | unchanged |
| Focus | unchanged + ring | `-focus` + ring | unchanged |
| Disabled | surface + `--border-light` | `-disabled` | `--foreground-content-text-color-disabled` |

The Figma *Active* state maps to the `-pressed` token suffix.

**Unchecked has no hover or active treatment.** The Figma Hover and Active variants for
Unchecked are pixel-identical to Default, so those channels point at the same tokens rather
than inventing a difference; `--border-hover` and `--border-pressed` exist in `tokens.css`
if a future revision wants one. Checked darkens on hover in both themes:
`--buttons-primary-bg-color-hover` resolves to `--light-blue-700`, darker than the
rest colour (`--light-blue-600` light, `--light-blue-500` dark).

### Focus ring

Reproduces the Figma `$shadow-focus-ring2` effect — the same ring the button uses — a 2px
ring in the content background that separates the control from a 4px ring in `--primary`:

```css
box-shadow: 0 0 0 var(--border-2) var(--background-content-bg-color),
            0 0 0 var(--border-4) var(--primary);
```

It is declared last so the ring survives a simultaneous hover, and it is bound to
`:focus-visible`, so pointer clicks do not raise it.

## Token map

The size modifiers set a size channel on the root; the colour channels are set on the
input, where `:checked` / `:indeterminate` can redefine them. Nothing is hard-coded;
retheming happens entirely in `tokens.css`.

| Channel | Unchecked resolves to | Checked / Intermediate resolves to |
| --- | --- | --- |
| `--psds-checkbox-bg[-state]` | `--background-content-bg-color`, disabled `--background-content-bg-color-disabled` | `--buttons-primary-bg-color[-state]` |
| `--psds-checkbox-border[-state]` | `--border`, disabled `--border-light` | `--buttons-primary-bg-color[-state]` |
| `--psds-checkbox-glyph-color` | `--transparent` | `--primary-text-color` |
| `--psds-checkbox-glyph-image` | `none` | `--psds-checkbox-check` / `--psds-checkbox-remove` |

State suffixes are `-hover`, `-pressed`, `-focus` and `-disabled`. The label colour is not
a channel — it has one enabled value and one disabled value, so it is applied directly.

Hiding the glyph is done with a transparent fill token rather than `display: none`, so the
`::before` square keeps its box and only its paint changes.

## Icons

The two box glyphs are the exported Figma *Icons/Check large* and *Icons/Remove* paths,
carried as data-URI masks in `--psds-checkbox-check` and `--psds-checkbox-remove` — the
same technique `text-box.css` uses for its clear affix — so both follow
`--psds-checkbox-glyph-color` and scale to `--psds-checkbox-glyph` with no markup cost.

The trailing `.psds-checkbox__icon` is the optional icon of the Figma *Text* group. It is a
fixed square in the size channel's icon token and takes an `<svg>` or `<img>`:

```html
<span class="psds-checkbox__text">
  <span class="psds-checkbox__label">Label</span>
  <span class="psds-checkbox__icon" aria-hidden="true"><svg viewBox="0 0 14 14">…</svg></span>
</span>
```

Use `currentColor` in the icon so it follows `--icon-color` and dims to
`--icon-color-disabled` with the rest of the control.

## Accessibility

- The `<label>` wrapper gives the input its accessible name and makes the label text part
  of the click target. If the label must live elsewhere in the DOM, use `for`/`id` and put
  the modifier classes on a wrapping element instead.
- A checkbox with no visible label still needs one: add `aria-label` to the input.
- Prefer the real `disabled` attribute over `.is-disabled`; the class is presentational and
  removes pointer events but not keyboard focus or the accessible disabled state.
- `indeterminate` is visual and does not change the accessible state on its own. For a
  tri-state parent, set `aria-checked="mixed"` on the input, or use the parent/children
  pattern shown in `checkbox.html`, where the property is derived from the children.
- Only `--lg` meets the 24px minimum target of WCAG 2.2 *Target Size (Minimum)* on the box
  alone. The label enlarges the target, so a labelled `--xs` or `--sm` checkbox is still
  usable — but give an unlabelled one room, or size it up.
- Transitions are disabled under `prefers-reduced-motion: reduce`.

## Notes

- `tokens.css` declares no font-family token, so the Inter stack from the Figma text style
  is held in `--psds-checkbox-font-family` on the component and is the one value not sourced
  from `tokens.css`. Promote it to a global token when one is added.
- `tokens.css` has no `--checkbox-*` colour tokens; the Figma node binds the box to the
  primary **button** tokens, and that binding is reproduced here rather than aliased.
- Box sizes 14 / 16 / 20 / 24 are literals in Figma, not variables; they map onto the
  `--spacing-*` tokens of the same value.
- The root uses `align-items: center`, as the Figma frames do. A label that wraps to two
  lines will centre the box against the whole block rather than the first line.
- `checkbox.html` is a live gallery of the full matrix, including a dark-theme toggle and a
  working tri-state parent.
