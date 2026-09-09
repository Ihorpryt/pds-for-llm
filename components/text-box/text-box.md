# Text Box

A single-line text input with an optional label, leading glyph, trailing affix and helper
message. The component is a thin styling layer over `<input>` — every visual value resolves
through a token declared in [`tokens.css`](../../tokens.css), so light and dark themes need
no component-level overrides.

**Figma source:** UI Kit — Tailwind 3 Theme (Portside Edition) › `Text Box`
([node `3651:11047`](https://www.figma.com/design/2JfMgeZuQOt4atDR58pLs9/UI-Kit---Tailwind-3-Theme--Portside-Edition-?node-id=3651-11047))
— 88 variants: 4 sizes × 11 states × 2 shapes. **Only the Rounded shape is implemented**;
the Line shape is intentionally left out, so there is no shape modifier.

```html
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="components/text-box/text-box.css">

<div class="psds-textbox psds-textbox--md">
  <label class="psds-textbox__label" for="email">Email</label>
  <div class="psds-textbox__control">
    <input class="psds-textbox__field" id="email" type="email" placeholder="Placeholder">
    <button class="psds-textbox__affix psds-textbox__clear" type="button" aria-label="Clear"></button>
  </div>
  <p class="psds-textbox__alert">Helping Text</p>
</div>
```

## Class API

| Axis | Classes | Default |
| --- | --- | --- |
| Size | `--xs` `--sm` `--md` `--lg` | `--md` |
| Content | *(none)* `--filled` `--readonly` | — |
| Validation | `--info` `--success` `--warning` `--danger` | none |

The forced-state helpers `.is-hover`, `.is-focus`, `.is-active` and `.is-disabled`
reproduce a state for documentation and visual-regression galleries — real interaction is
handled by `:hover`, `:focus-within`, `:active` and by `readonly` / `disabled` on the field.

### Elements

| Element | Role |
| --- | --- |
| `.psds-textbox` | Wrapper; owns the size and colour channels and the 4px column gap |
| `.psds-textbox__label` | Field label; `.psds-textbox__required` is the red `*` |
| `.psds-textbox__control` | The bordered box |
| `.psds-textbox__field` | The `<input>` |
| `.psds-textbox__affix` | Trailing square, as wide as the control is tall |
| `.psds-textbox__clear` | An affix that paints the Figma *Icons/Close* glyph itself |
| `.psds-textbox__alert` | Helper text under the control |
| `.psds-textbox__glyph` | Generic icon box, sized by whichever row it sits in |

`.psds-textbox__glyph` placed directly in the control is the leading icon; it takes the
size channel's icon token and the gap to the field. The same class inside
`.psds-textbox__label` or `.psds-textbox__alert` picks up that row's smaller icon token
instead, so one class covers all three slots.

## Sizes

| Size | Height | Font | Line height | Padding&nbsp;X | Gap | Icon |
| --- | --- | --- | --- | --- | --- | --- |
| `--xs` | `--form-mouse-small` 24 | `--font-size-xs` 12 | `--line-height-xs` 16 | `--spacing-8` | `--spacing-6` | `--font-icon-12` |
| `--sm` | `--form-mouse` 32 | `--font-size-sm` 14 | `--line-height-sm` 20 | `--spacing-12` | `--spacing-8` | `--font-icon-16` |
| `--md` | `--form-bigger-small` 36 | `--font-size-sm` 14 | `--line-height-sm` 20 | `--spacing-12` | `--spacing-8` | `--font-icon-18` |
| `--lg` | `--form-bigger` 40 | `--font-size-base` 16 | `--line-height-base` 24 | `--spacing-12` | `--spacing-8` | `--font-icon-18` |

Unlike the [Dropdown List](../dropdown-list/dropdown-list.md), the label and helper text do
scale with the size — the Figma node steps all three together:

| Size | Label | Required `*` | Label icon | Helper text | Helper icon | Helper gap |
| --- | --- | --- | --- | --- | --- | --- |
| `--xs` | `--font-size-xxs` 10 | `--font-size-xxs` | `--font-icon-12` | `--font-size-xxs` 10 | `--font-icon-10` | `--spacing-2` |
| `--sm` | `--font-size-xs` 12 | `--font-size-xs` | `--font-icon-14` | `--font-size-xs` 12 | `--font-icon-12` | `--spacing-4` |
| `--md` | `--font-size-sm` 14 | `--font-size-xs` | `--font-icon-14` | `--font-size-sm` 14 | `--font-icon-14` | `--spacing-4` |
| `--lg` | `--font-size-sm` 14 | `--font-size-xs` | `--font-icon-14` | `--font-size-sm` 14 | `--font-icon-14` | `--spacing-4` |

The label is `--font-weight-medium` at every size and the value `--font-weight-normal`. All
four sizes share `--control-radius-input-default-radius`.

Inline padding applies to the leading edge only when a trailing affix is present — the
affix square supplies the trailing space, which is the `pr: 0` of the Figma node. A control
with no affix keeps symmetric padding. The switch is a `:has()` rule, so no extra class is
needed.

## States

Figma models State as one axis of eleven values, mixing content, validation and
interaction. Here the first two become modifiers and the last resolve from interaction.

| State | Background | Border | Value text | Icons | Shadow |
| --- | --- | --- | --- | --- | --- |
| Default | `content-bg-color` | `--border` 1px | `placeholder-text-color` | `--icon-color` | `$Shadow-sm` |
| Hover | `content-bg-color` | `--border-hover` 1px | unchanged | `--icon-color-hover` | `$Shadow-sm` |
| Focus / Active | `content-bg-color` | accent **2px** | unchanged | `--icon-color-pressed` | `$Shadow-sm` |
| `--filled` | `content-bg-color` | `--border` 1px | `content-text-color` | `--icon-color-pressed` | `$Shadow-sm` |
| `--readonly` | `content-bg-color-alt2` | `--border` 1px | `content-text-color` | `--icon-color-pressed` | `$Shadow-sm` |
| Disabled | `content-bg-color-alt2` | `--border` 1px | `content-text-color-disabled` | `--icon-color-disabled` | none |
| `--info` `--success` `--warning` `--danger` | `content-bg-color` | validation colour 1px | `content-text-color` | `--icon-color-pressed` | `$Shadow-sm` |

The Figma *Focus* and *Active* variants are pixel-identical — a 2px border in
`Buttons/Primary/primary-border-color` — so both resolve to the same rule. Because the
control keeps `box-sizing: border-box` and a fixed height, the extra border width does not
change its outer size. Disabled is the one state that drops `$Shadow-sm`, and it is
declared last so it wins a simultaneous hover or focus.

Three points where a real `<input>` does better than the single-axis Figma model:

- **Default vs. Filled is native.** The element separates its value from its placeholder on
  its own, so `--psds-textbox-fg` is always the content colour and `::placeholder` carries
  `--foreground-placeholder-text-color`. The `--filled` modifier is kept for parity with
  the Figma axis but only carries what the element cannot: the icon shift to
  `--icon-color-pressed`.
- **Read Only and Disabled read the attributes.** `readonly` and `disabled` on the field
  are matched through `:has()`, so `--readonly` and `.is-disabled` are documentation
  helpers rather than the only way in.
- **Validation survives hover, and focus adopts it.** A validation modifier writes its
  colour into the rest, hover *and* accent channels, so an errored field keeps its red
  border under the pointer and raises a 2px red border when focused rather than reverting
  to blue. Figma ships no combined variants for this.

## Token map

Every state modifier remaps the same channels, which the structural rules then consume.
Nothing is hard-coded; retheming happens entirely in `tokens.css`.

| Channel | Resolves to | Used by |
| --- | --- | --- |
| `--psds-textbox-bg` | `--background-content-bg-color[-alt2]` | Control surface |
| `--psds-textbox-border` | `--border` or a validation colour | Control border at rest |
| `--psds-textbox-border-hover` | `--border-hover` or a validation colour | Control border under the pointer |
| `--psds-textbox-accent` | `--buttons-primary-border-color` or a validation colour | 2px border while focused or active |
| `--psds-textbox-fg` | `--foreground-content-text-color[-disabled]` | Value text |
| `--psds-textbox-placeholder` | `--foreground-placeholder-text-color` | Placeholder |
| `--psds-textbox-icon-color` | `--icon-color[-hover\|-pressed\|-disabled]` | Leading glyph and affixes |
| `--psds-textbox-note-color` | `--foreground-content-text-color-alt1` or a validation colour | Helper text |

Border colours are bound as they are in Figma, to the button border tokens —
`--buttons-info-border-color`, `--buttons-success-border-color`,
`--buttons-warning-border-color`, `--buttons-danger-border-color`. Helper text is bound to
the semantic colour instead — `--info`, `--success`, `--warning`, `--danger` — which is
also how the Figma node binds it. `tokens.css` additionally exposes `--border-info`,
`--border-success`, `--border-warning` and `--border-error`; those resolve to the same
colours in the light theme but differ in dark, so switching to them is a deliberate
one-line change per modifier, not a cleanup.

## Accessibility

- Pair `.psds-textbox__label` with the field through `for` / `id`. The `*` in
  `.psds-textbox__required` is decorative — mark the field `required` (or `aria-required`)
  as well, and hide the glyph from assistive technology with `aria-hidden="true"`.
- Point `aria-describedby` at `.psds-textbox__alert` so helper and error text reach
  assistive technology, and set `aria-invalid="true"` alongside `--danger`. The validation
  modifiers are colour only; they announce nothing on their own.
- `.psds-textbox__field` clears its own outline because focus is drawn on the control as a
  2px border. If you restyle the control, keep a visible focus indicator.
- Give every affix button an `aria-label` — `.psds-textbox__clear` renders its glyph as a
  CSS mask, so it has no accessible name of its own. Because the affix sits inside the
  control, focusing it raises the same accent border as focusing the field.
- Prefer the real `readonly` and `disabled` attributes over `--readonly` and
  `.is-disabled`; the classes are presentational, and `.is-disabled` removes pointer events
  but not keyboard focus or the accessible disabled state. The `:has()` selectors that read
  the attributes need a 2023-or-later browser.
- `--xs` is 24px tall, exactly the minimum target of WCAG 2.2 *Target Size (Minimum)*, so
  give it room in dense layouts.
- Transitions are disabled under `prefers-reduced-motion: reduce`.

## Icons

`.psds-textbox__clear` paints the Figma *Icons/Close* glyph itself, as a `mask-image` in
`--psds-textbox-close`, so the affordance costs no markup and follows the icon colour
channel. Placing an `<svg>` inside overrides it — the mask is bound to `:empty`. Clearing
the field is the consumer's job; the class only draws the button.

Every other icon slot is consumer-supplied through `.psds-textbox__glyph`:

```html
<div class="psds-textbox__control">
  <span class="psds-textbox__glyph" aria-hidden="true"><svg viewBox="0 0 16 16">…</svg></span>
  <input class="psds-textbox__field" id="q" type="search" placeholder="Search">
</div>
```

Use `currentColor` so icons follow the channel through every state. The helper-text glyph
is the one slot that deliberately uses `currentColor` of the *message* rather than the icon
channel, so an errored field gets a red icon beside its red text — the Figma node ships the
alert icon as a flat asset and does not model this.

## Notes

- `tokens.css` declares no font-family or shadow tokens, so the Inter stack from the Figma
  text style and the `$Shadow-sm` effect are held on the component in
  `--psds-textbox-font-family` and `--psds-textbox-shadow`. Promote them to global tokens
  when they exist.
- The Figma trailing affix is `height − 2` wide (26 at `--xs`, 30 / 34 / 38 at the rest);
  here it is `align-self: stretch` and exactly as wide as the control is tall, which lands
  the glyph on the same centre without hard-coding four widths. The `--xs` variant is the
  one place the source is internally inconsistent — its affix is drawn 26px inside a 24px
  control.
- `text-box.html` is a live gallery of the full matrix, including a dark-theme toggle.
