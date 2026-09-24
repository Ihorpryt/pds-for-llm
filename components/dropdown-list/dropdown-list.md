# Dropdown List

Selects one value from a list. The component is a styling layer over a `<select>` or a
`<button>` trigger — every visual value resolves through a token declared in
[`tokens.css`](../../tokens.css), so light and dark themes need no component-level
overrides.

**Figma source:** UI Kit — Tailwind 3 Theme (Portside Edition) › `Dropdown List`
([node `27225:1406580`](https://www.figma.com/design/2JfMgeZuQOt4atDR58pLs9/UI-Kit---Tailwind-3-Theme--Portside-Edition-?node-id=27225-1406580))
— 88 variants: 4 sizes × 11 states × 2 shapes. **Only the Rounded shape is implemented**;
the Line shape is intentionally left out, so there is no shape modifier.

```html
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="components/dropdown-list/dropdown-list.css">

<div class="psds-dropdown psds-dropdown--md">
  <label class="psds-dropdown__label" for="veg">Vegetable</label>
  <div class="psds-dropdown__control">
    <select class="psds-dropdown__field" id="veg">…</select>
    <span class="psds-dropdown__toggle" aria-hidden="true"></span>
  </div>
</div>
```

## Class API

| Axis | Classes | Default |
| --- | --- | --- |
| Size | `--xs` `--sm` `--md` `--lg` | `--md` |
| Content | *(none = placeholder)* `--filled` `--readonly` | placeholder |
| Validation | `--info` `--success` `--warning` `--danger` | none |

The forced-state helpers `.is-hover`, `.is-focus`, `.is-active` and `.is-disabled`
reproduce a state for documentation and visual-regression galleries — real interaction is
handled by `:hover`, `:focus-within`, `:active` and `:disabled` on the field.

### Elements

| Element | Role |
| --- | --- |
| `.psds-dropdown` | Wrapper; owns the size and state channels and the 4px column gap |
| `.psds-dropdown__label` | Field label; `.psds-dropdown__required` is the red `*` |
| `.psds-dropdown__control` | The bordered box, and the positioning context for the menu |
| `.psds-dropdown__icon` | Leading icon slot inside the control |
| `.psds-dropdown__field` | `<select>` or `<button>`; carries the value text |
| `.psds-dropdown__toggle` | Chevron square, as wide as the control is tall |
| `.psds-dropdown__alert` | Helper text under the control |
| `.psds-dropdown__menu` | Flyout; `.psds-dropdown__group` headers and `.psds-dropdown__option` rows |
| `.psds-dropdown__glyph` | Generic icon box, sized by the size channel |

## Sizes

| Size | Height | Font | Line height | Padding&nbsp;X | Gap | Icon | Helper text |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `--xs` | `--form-mouse-small` 24 | `--font-size-xs` 12 | `--line-height-xs` 16 | `--spacing-8` | `--spacing-6` | `--font-icon-12` | `--font-size-xs` |
| `--sm` | `--form-mouse` 32 | `--font-size-sm` 14 | `--line-height-sm` 20 | `--spacing-8` | `--spacing-8` | `--font-icon-14` | `--font-size-xs` |
| `--md` | `--form-bigger-small` 36 | `--font-size-base` 16 | `--line-height-base` 24 | `--spacing-12` | `--spacing-10` | `--font-icon-16` | `--font-size-sm` |
| `--lg` | `--form-bigger` 40 | `--font-size-base` 16 | `--line-height-base` 24 | `--spacing-12` | `--spacing-10` | `--font-icon-16` | `--font-size-sm` |

All four sizes share `--control-radius-input-default-radius`, and the label is
`--font-size-xs` / `--font-weight-medium` at every size — only its icon scales. Inline
padding applies to the leading edge only; the chevron square supplies the trailing space.
A leading icon carries `--psds-dropdown-icon-inset` of extra inline padding
(`--spacing-2` at `--xs` / `--sm`, `--spacing-4` at `--md` / `--lg`), matching the
*Search* frame in the Figma node.

## States

Figma models State as one axis of eleven values, mixing content, validation and
interaction. Here the first two become modifiers and the last resolve from interaction.

| State | Background | Border | Value text | Icons |
| --- | --- | --- | --- | --- |
| Default | `content-bg-color` | `--border` 1px | `placeholder-text-color` | `--icon-color` |
| Hover | `content-bg-color` | `--border-hover` 1px | `placeholder-text-color` | `--icon-color-hover` |
| Focus / Active | `content-bg-color` | accent **2px** | unchanged | `--icon-color-pressed` |
| `--filled` | `content-bg-color` | `--border` 1px | `content-text-color` | `--icon-color-pressed` |
| `--readonly` | `content-bg-color-alt2` | `--border` 1px | `content-text-color` | `--icon-color-pressed` |
| Disabled | `content-bg-color-alt2` | `--border` 1px | `content-text-color-disabled` | `--icon-color-disabled` |
| `--info` `--success` `--warning` `--danger` | `content-bg-color` | validation colour 1px | `content-text-color` | `--icon-color-pressed` |

The Figma *Focus* and *Active* variants are pixel-identical — a 2px border in
`Buttons/Primary/primary-border-color` — so both resolve to the same rule. Because the
control keeps `box-sizing: border-box` and a fixed height, the extra border width does not
change the control's outer size.

Two deliberate extensions of the single-axis model, since Figma ships no combined
variants:

- **Validation survives hover.** A validation modifier writes its colour into both the
  rest and hover border channels, so an errored field keeps its red border under the
  pointer; only the icon takes the hover colour.
- **Focus adopts the validation colour.** `--psds-dropdown-accent` defaults to the primary
  border colour and is remapped by each validation modifier, so a focused danger field
  raises a 2px red border rather than reverting to blue.

Disabled is declared last and wins a simultaneous hover or focus. It is matched two ways —
`.psds-dropdown:has(.psds-dropdown__field:disabled)` for a real `disabled` attribute, and
`.psds-dropdown.is-disabled` for documentation.

## Menu

`.psds-dropdown__menu` is the Figma *Context Menu* instance, absolutely positioned
`--spacing-4` below the control and aligned to its border box. It is a presentation layer
only: opening, closing, selection and keyboard navigation are the consumer's job. Toggle
it with the `hidden` attribute.

| Part | Spec |
| --- | --- |
| Panel | `--background-flyout-bg-color`, `--border-light` 1px, `--radius-8`, `--spacing-4` block padding |
| Group header | min-height `--spacing-30` (`--xs` / `--sm`) or `--form-mouse` (`--md` / `--lg`), `--spacing-12` inline padding, `--foreground-content-text-color-alt2`, medium weight, hairline underneath |
| Option | min-height `--form-mouse` at every size, `--spacing-4` / `--spacing-12` padding, `--foreground-content-text-color` |
| Option hover | `--background-content-bg-color-hover` + `-hover` text |
| Option keyboard focus | Hover fill + 2px inset `--primary` ring, via `:focus-visible` or `.is-focus`; a focused selected option keeps its pressed fill |
| Option selected | `--background-content-bg-color-pressed` + `-pressed` text, via `[aria-selected="true"]` or `.is-selected` |

Option typography follows the control's font size; the group header follows the helper
text size. The Figma header also carries a Checkbox instance for multi-select — that is a
separate component and is not implemented here, but the header's gap leaves room for it.

## Token map

Every state modifier remaps the same six channels, which the structural rules then
consume. Nothing is hard-coded; retheming happens entirely in `tokens.css`.

| Channel | Resolves to | Used by |
| --- | --- | --- |
| `--psds-dropdown-bg` | `--background-content-bg-color[-alt2]` | Control surface |
| `--psds-dropdown-border` | `--border` or a validation colour | Control border at rest |
| `--psds-dropdown-border-hover` | `--border-hover` or a validation colour | Control border under the pointer |
| `--psds-dropdown-accent` | `--buttons-primary-border-color` or a validation colour | 2px border while focused or active |
| `--psds-dropdown-fg` | `--foreground-placeholder-text-color` / `-content-text-color[-disabled]` | Value text |
| `--psds-dropdown-icon-color` | `--icon-color[-hover|-pressed|-disabled]` | Leading icon and chevron |

Validation colours are bound as they are in Figma, to the button border tokens —
`--buttons-info-border-color`, `--buttons-success-border-color`,
`--buttons-warning-border-color`, `--buttons-danger-border-color`. `tokens.css` also
exposes `--border-info`, `--border-success`, `--border-warning` and `--border-error`; those
resolve to the same colours in the light theme but differ in dark, so switching to them is
a deliberate one-line change per modifier, not a cleanup.

## Accessibility

- Prefer a real `<select>`. It brings keyboard support, the platform picker and the
  accessible role for free, and `appearance: none` on `.psds-dropdown__field` is all the
  styling it needs. Reach for the `<button>` + `.psds-dropdown__menu` pair only when you
  need group headers, icons or multi-select — and then own the roving focus, `Escape`,
  `Home`/`End` and type-ahead behaviour yourself.
- `.psds-dropdown__field` clears its own outline because focus is drawn on the control as
  a 2px border. If you restyle the control, keep a visible focus indicator.
- Pair `.psds-dropdown__label` with the field through `for` / `id`. The `*` in
  `.psds-dropdown__required` is decorative — mark the field `required` (or
  `aria-required`) as well.
- Point `aria-describedby` at `.psds-dropdown__alert` so helper and error text reach
  assistive technology. Validation modifiers colour the border only; they do not announce
  anything, and per the Figma source they do not recolour the helper text either.
- Prefer the real `disabled` attribute over `.is-disabled`; the class is presentational and
  removes pointer events but not keyboard focus or the accessible disabled state. The
  `:has()` selector that reads the attribute needs a 2023-or-later browser.
- `--xs` is 24px tall, exactly the minimum target of WCAG 2.2 *Target Size (Minimum)*, so
  give it room in dense layouts.
- Transitions are disabled under `prefers-reduced-motion: reduce`.

## Icons

`.psds-dropdown__toggle` paints the Figma *Icons/Chevron down* glyph itself, as a
`mask-image` in `--psds-dropdown-chevron`, so the affordance costs no markup and follows
the icon colour channel. Placing an `<svg>` inside the toggle overrides it — the mask is
bound to `:empty`.

Every other icon slot is consumer-supplied through `.psds-dropdown__glyph`, which is a
square of the size channel's icon token:

```html
<span class="psds-dropdown__glyph psds-dropdown__icon">
  <svg viewBox="0 0 14 14" fill="currentColor">…</svg>
</span>
```

Use `currentColor` so icons follow the channel through every state.

## Notes

- `tokens.css` declares no font-family or shadow tokens, so the Inter stack from the Figma
  text style and the `$Shadow-sm` / flyout effects are held on the component in
  `--psds-dropdown-font-family`, `--psds-dropdown-shadow` and
  `--psds-dropdown-menu-shadow`. Promote them to global tokens when they exist.
- The menu radius is `--radius-8`, the raw radius the Figma node binds. The semantic
  `--control-radius-flyout-*` tokens resolve to 6 or 8 depending on size and were not used
  because the source does not vary the menu radius.
- `dropdown-list.html` is a live gallery of the full matrix, including a dark-theme toggle.
