# Radio Button

Picks exactly one option from a small set. The component is a thin styling layer over
`<input type="radio">` — every visual value resolves through a token declared in
[`tokens.css`](../../tokens.css), so light and dark themes need no component-level
overrides.

**Figma source:** UI Kit — Tailwind 3 Theme (Portside Edition) › `Radio Button`
([node `6724:1859`](https://www.figma.com/design/2JfMgeZuQOt4atDR58pLs9/UI-Kit---Tailwind-3-Theme--Portside-Edition-?node-id=6724-1859))
— 80 variants: 4 sizes × 2 checked states × 5 states × 2 text positions.

```html
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="components/radio/radio.css">

<fieldset>
  <legend>Berth assignment</legend>
  <label class="psds-radio psds-radio--sm">
    <input class="psds-radio__input" type="radio" name="berth" value="auto" checked>
    <span class="psds-radio__text">
      <span class="psds-radio__label">Automatic</span>
    </span>
  </label>
  <label class="psds-radio psds-radio--sm">
    <input class="psds-radio__input" type="radio" name="berth" value="manual">
    <span class="psds-radio__text">
      <span class="psds-radio__label">Manual</span>
    </span>
  </label>
</fieldset>
```

The root is the `<label>`, so the whole control — circle, label and trailing icon — is one
click target and one hover target, matching the Figma variant, which is the whole frame.
Radios that belong together share a `name`; that is what makes them mutually exclusive
and gives them arrow-key navigation.

Use a radio group when the options are few, all worth seeing at once, and the choice is
submitted with a form. For switching a view in place, use
[segmented controls](../segmented-controls/segmented-controls.md); for a long list, use a
[dropdown list](../dropdown-list/dropdown-list.md); for an on/off setting, use a
[checkbox](../checkbox/checkbox.md) or [toggle switch](../toggle-switch/toggle-switch.md).

## Class API

| Axis | Classes | Default |
| --- | --- | --- |
| Size | `--xs` `--sm` `--md` `--lg` | `--sm` |
| Text position | *(none = Right)* `--label-start` | Right |

| Element | Class | Notes |
| --- | --- | --- |
| Root | `.psds-radio` | `<label>` |
| Circle | `.psds-radio__input` | the native `<input type="radio">`, styled directly |
| Text group | `.psds-radio__text` | label + optional trailing icon |
| Label | `.psds-radio__label` | |
| Icon | `.psds-radio__icon` | optional, Figma *Icons/Circle info* slot |

The Figma **Checked** axis is not a modifier: ON and OFF are the input's own `:checked`
state, so the DOM stays the source of truth.

The forced-state helpers `.is-hover`, `.is-active`, `.is-focus` and `.is-disabled` on the
root reproduce a state for documentation and visual-regression galleries — real
interaction is handled by `:hover`, `:active`, `:focus-visible` and `[disabled]`.

## Sizes

| Size | Circle | Checked ring | Dot | Font | Line height | Gap | Text gap | Trailing icon |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `--xs` | `--spacing-12` 12 | `--border-4` | 4 | `--font-size-xs` 12 | `--line-height-xs` 16 | `--spacing-8` | `--spacing-4` | `--font-icon-12` |
| `--sm` | `--spacing-16` 16 | `--border-5` | 6 | `--font-size-sm` 14 | `--line-height-sm` 20 | `--spacing-8` | `--spacing-4` | `--font-icon-14` |
| `--md` | `--spacing-20` 20 | `--border-6` | 8 | `--font-size-base` 16 | `--line-height-base` 24 | `--spacing-12` | `--spacing-6` | `--font-icon-16` |
| `--lg` | `--spacing-24` 24 | `--border-7` | 10 | `--font-size-base` 16 | `--line-height-base` 24 | `--spacing-12` | `--spacing-6` | `--font-icon-18` |

The label is `--font-weight-medium` at every size (all four Figma sizes bind a
**/Medium** text style) and tracking is `--letter-spacing-normal`. Unlike the checkbox,
the gaps grow with size: `--md` and `--lg` use 12 / 6 rather than 8 / 4.

`--sm` is the default per [`guidance.md`](../../guidance.md), and is also the default
variant of the Figma component set.

## Checked

| Checked | Circle | Border |
| --- | --- | --- |
| OFF | `--background-content-bg-color` | 1px `--border` |
| ON | `--background-content-bg-color` | size's ring width in `--buttons-primary-bg-color` |

Figma draws ON as a circle with a thick primary stroke and a white centre. That is
reproduced literally: checking widens the border from 1px to the ring width, and the
surface left in the middle *is* the dot. There is no pseudo-element, and the dot always
matches the content surface in both themes.

## States

| State | OFF | ON | Label |
| --- | --- | --- | --- |
| Default | `--border` | `--buttons-primary-bg-color` | `--foreground-content-text-color` |
| Hover | *unchanged* | `-hover` | unchanged |
| Active | *unchanged* | `-pressed` | unchanged |
| Focus | unchanged + ring | `-focus` + ring | unchanged |
| Disabled | `--border-light`, surface `-disabled` | `-disabled` | `--foreground-content-text-color-disabled` |

The Figma *Active* state maps to the `-pressed` token suffix.

**OFF has no hover or active treatment.** The Figma Hover and Active variants for OFF are
pixel-identical to Default, so those channels point at the same tokens rather than
inventing a difference. In the light theme ON is also unchanged on hover, because
`--buttons-primary-bg-color-hover` and `--buttons-primary-bg-color` both resolve to
`--light-blue-600`; the dark theme does separate them.

### Focus ring

Reproduces the Figma `$shadow-focus-ring2` effect — the same ring the button and checkbox
use — a 2px ring in the content background that separates the control from a 4px ring in
`--primary`. On a circle the ring follows the border radius, so it is round too:

```css
box-shadow: 0 0 0 var(--border-2) var(--background-content-bg-color),
            0 0 0 var(--border-4) var(--primary);
```

It is declared last so the ring survives a simultaneous hover, and it is bound to
`:focus-visible`, so pointer clicks do not raise it.

## Token map

The size modifiers set a size channel on the root; the colour channels are set on the
input, where `:checked` can redefine them. Nothing is hard-coded; retheming happens
entirely in `tokens.css`.

| Channel | OFF resolves to | ON resolves to |
| --- | --- | --- |
| `--psds-radio-bg[-disabled]` | `--background-content-bg-color`, disabled `--background-content-bg-color-disabled` | same |
| `--psds-radio-border[-state]` | `--border`, disabled `--border-light` | `--buttons-primary-bg-color[-state]` |
| `--psds-radio-border-width` | `--border-1` | `--psds-radio-ring` (from the size) |

State suffixes are `-hover`, `-pressed`, `-focus` and `-disabled`.

## Icons

The trailing `.psds-radio__icon` is the optional icon of the Figma *Text* group. It is a
fixed square in the size channel's icon token and takes an `<svg>` or `<img>`:

```html
<span class="psds-radio__text">
  <span class="psds-radio__label">Label</span>
  <span class="psds-radio__icon" aria-hidden="true"><svg viewBox="0 0 14 14">…</svg></span>
</span>
```

Use `currentColor` in the icon so it follows `--icon-color` and dims to
`--icon-color-disabled` with the rest of the control.

## Accessibility

- Wrap a group in `<fieldset>` with a `<legend>` so screen readers announce the question
  along with each option. Give every radio in the group the same `name`.
- The `<label>` wrapper gives each input its accessible name and makes the label text part
  of the click target. If the label must live elsewhere in the DOM, use `for`/`id` and put
  the modifier classes on a wrapping element instead.
- Pre-select a sensible default where one exists; a group with nothing checked cannot be
  returned to that state by the user.
- Prefer the real `disabled` attribute over `.is-disabled`; the class is presentational and
  removes pointer events but not keyboard focus or the accessible disabled state.
- Only `--lg` meets the 24px minimum target of WCAG 2.2 *Target Size (Minimum)* on the
  circle alone; `--xs` is 12px. The label enlarges the target, so always label small radios.
- Transitions are disabled under `prefers-reduced-motion: reduce`.

## Notes

- `tokens.css` declares no font-family token, so the Inter stack from the Figma text style
  is held in `--psds-radio-font-family` on the component. Promote it to a global token
  when one is added.
- `tokens.css` has no `--radio-*` colour tokens; the Figma node draws the ring in the
  primary **button** colours, and that binding is reproduced here, as in the checkbox.
- Circle sizes 12 / 16 / 20 / 24 and ring widths 4 / 5 / 6 / 7 are literals in Figma, not
  variables; they map onto the `--spacing-*` and `--border-*` tokens of the same value.
- The root uses `align-items: center`, as the Figma frames do. A label that wraps to two
  lines will centre the circle against the whole block rather than the first line.
- `radio.html` is a live gallery of the full matrix, including a dark-theme toggle and a
  working radio group.
