# Date Picker

A single-line date input with a calendar toggle, an optional label and helper message, and
a calendar flyout. The field is a thin styling layer over `<input>` — every visual value
resolves through a token declared in [`tokens.css`](../../tokens.css), so light and dark
themes need no component-level overrides.

**Figma source:** UI Kit — Tailwind 3 Theme (Portside Edition) › `Date Picker`
([node `7919:127784`](https://www.figma.com/design/2JfMgeZuQOt4atDR58pLs9/UI-Kit---Tailwind-3-Theme--Portside-Edition-?node-id=7919-127784))
— 88 variants: 4 sizes × 11 states × 2 shapes. **Only the Rounded shape is implemented**;
the Line shape is intentionally left out, so there is no shape modifier.

```html
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="components/button/button.css">
<link rel="stylesheet" href="components/date-picker/date-picker.css">

<div class="psds-datepicker psds-datepicker--sm">
  <label class="psds-datepicker__label" for="due">Due date</label>
  <div class="psds-datepicker__control">
    <input class="psds-datepicker__field" id="due" type="text" placeholder="Choose date">
    <button class="psds-datepicker__affix psds-datepicker__toggle" type="button"
            aria-label="Choose due date" aria-haspopup="dialog" aria-expanded="false"></button>
  </div>
</div>
```

`button.css` is only needed for the *Today* button in the calendar footer.

## Class API

| Axis | Classes | Default |
| --- | --- | --- |
| Size | `--xs` `--sm` `--md` `--lg` | `--sm` |
| Content | *(none)* `--filled` `--readonly` | — |
| Validation | `--info` `--success` `--warning` `--danger` | none |

`--sm` is the default per [`guidance.md`](../../guidance.md). The forced-state helpers
`.is-hover`, `.is-focus`, `.is-active` and `.is-disabled` reproduce a state for
documentation and visual-regression galleries — real interaction is handled by `:hover`,
`:focus-within`, `:active` and by `readonly` / `disabled` on the field. `.is-selected` does
the same for a calendar day.

### Elements

| Element | Role |
| --- | --- |
| `.psds-datepicker` | Wrapper; owns the size and colour channels and the 4px column gap |
| `.psds-datepicker__label` | Field label; `.psds-datepicker__required` is the red `*` |
| `.psds-datepicker__control` | The bordered box, and the positioning context for the calendar |
| `.psds-datepicker__field` | The `<input>` |
| `.psds-datepicker__affix` | Trailing square, as wide as the control is tall |
| `.psds-datepicker__toggle` | An affix that paints the Figma *Icons/calendar* glyph itself |
| `.psds-datepicker__clear` | An optional affix that paints the Figma *Icons/Close* glyph |
| `.psds-datepicker__alert` | Helper text under the control |
| `.psds-datepicker__glyph` | Generic icon box — leading icon, label icon or helper icon |
| `.psds-datepicker__calendar` | Flyout panel; toggle it with `hidden` |
| `.psds-datepicker__header` | Month title (`__title`) and previous / next buttons (`__nav`, `__prev`, `__next`) |
| `.psds-datepicker__grid` | `<table>` of `__weekday` headers and `__day` buttons |
| `.psds-datepicker__day--outside` | A day from the previous or next month |
| `.psds-datepicker__footer` | Footer holding the *Today* button |

## Sizes

| Size | Height | Font | Line height | Padding&nbsp;X | Gap | Leading / clear icon |
| --- | --- | --- | --- | --- | --- | --- |
| `--xs` | `--form-mouse-small` 24 | `--font-size-xs` 12 | `--line-height-xs` 16 | `--spacing-8` | `--spacing-6` | `--font-icon-12` |
| `--sm` | `--form-mouse` 32 | `--font-size-sm` 14 | `--line-height-sm` 20 | `--spacing-12` | `--spacing-8` | `--font-icon-16` |
| `--md` | `--form-bigger-small` 36 | `--font-size-sm` 14 | `--line-height-sm` 20 | `--spacing-12` | `--spacing-8` | `--font-icon-18` |
| `--lg` | `--form-bigger` 40 | `--font-size-base` 16 | `--line-height-base` 24 | `--spacing-12` | `--spacing-8` | `--font-icon-18` |

The calendar glyph does not scale: it is drawn at 14px in a 16px box at every size, as in
the Figma instance.

| Size | Label | Required `*` | Label icon | Helper text | Helper icon | Helper gap |
| --- | --- | --- | --- | --- | --- | --- |
| `--xs` | `--font-size-xxs` 10 | `--font-size-xxs` | `--font-icon-12` | `--font-size-xxs` 10 | `--font-icon-10` | `--spacing-2` |
| `--sm` | `--font-size-xs` 12 | `--font-size-xs` | `--font-icon-14` | `--font-size-xs` 12 | `--font-icon-12` | `--spacing-2` |
| `--md` | `--font-size-sm` 14 | `--font-size-xs` | `--font-icon-14` | `--font-size-sm` 14 | `--font-icon-14` | `--spacing-4` |
| `--lg` | `--font-size-sm` 14 | `--font-size-xs` | `--font-icon-14` | `--font-size-sm` 14 | `--font-icon-14` | `--spacing-4` |

The label is `--font-weight-medium` in `--foreground-content-text-color-alt1`; the value
is `--font-weight-normal`. All four sizes share `--control-radius-input-default-radius`.

## States

| State | Background | Border | Value text | Icons | Shadow |
| --- | --- | --- | --- | --- | --- |
| Default | `content-bg-color` | `--border` 1px | `placeholder-text-color` | `--icon-color` | `$Shadow-sm` |
| Hover | `content-bg-color` | `--border-hover` 1px | unchanged | `--icon-color-hover` | `$Shadow-sm` |
| Focus / Active | `content-bg-color` | accent **2px** | unchanged | `--icon-color-pressed` | `$Shadow-sm` |
| `--filled` | `content-bg-color` | `--border` 1px | `content-text-color` | `--icon-color-pressed` | `$Shadow-sm` |
| `--readonly` | `content-bg-color-alt2` | `--border` 1px | `content-text-color` | `--icon-color-pressed` | `$Shadow-sm` |
| Disabled | `content-bg-color-alt2` | `--border` 1px | `content-text-color-disabled` | `--icon-color-disabled` | none |
| `--info` `--success` `--warning` `--danger` | `content-bg-color` | validation colour 1px | `content-text-color` | `--icon-color-pressed` | `$Shadow-sm` |

Disabled also dims the label and helper text to `--foreground-content-text-color-disabled`
and the required `*` to `--buttons-danger-bg-color-disabled`, as the Figma variant does.
Validation modifiers colour the helper text with `--info`, `--success`, `--warning` or
`--danger`.

As in [Text Box](../text-box/text-box.md), the value/placeholder split is native to the
`<input>`, `readonly` and `disabled` are read from the field through `:has()`, and a
validation colour survives hover and is adopted by the 2px focus border.

## Calendar

`.psds-datepicker__calendar` is the Figma *Calendar* flyout, absolutely positioned
`--spacing-4` below the control and aligned to its inline end. It is a presentation layer
only: opening, closing, month navigation, selection and keyboard handling are the
consumer's job — `date-picker.html` has a complete reference implementation.

```html
<div class="psds-datepicker__calendar" role="dialog" aria-label="Choose due date">
  <div class="psds-datepicker__header">
    <h3 class="psds-datepicker__title" id="cal-title" aria-live="polite">April 2024</h3>
    <div class="psds-datepicker__nav">
      <button class="psds-datepicker__prev" type="button" aria-label="Previous month"></button>
      <button class="psds-datepicker__next" type="button" aria-label="Next month"></button>
    </div>
  </div>
  <table class="psds-datepicker__grid" role="grid" aria-labelledby="cal-title">
    <thead><tr><th class="psds-datepicker__weekday" scope="col" abbr="Sunday">SU</th>…</tr></thead>
    <tbody>
      <tr>
        <td role="gridcell"><button class="psds-datepicker__day psds-datepicker__day--outside" type="button" tabindex="-1">31</button></td>
        <td role="gridcell"><button class="psds-datepicker__day" type="button" tabindex="-1">1</button></td>
        …
      </tr>
    </tbody>
  </table>
  <div class="psds-datepicker__footer">
    <button class="psds-btn psds-btn--sm psds-btn--primary" type="button">Today</button>
  </div>
</div>
```

| Size | Radius | Header padding | Title | Nav icon / gap | Grid inset | Cell | Weekday | Day | Footer padding | Today button |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `--xs` | `--control-radius-flyout-small-radius` | 8 / 12 / 8 | `--font-size-sm` / `-sm`, centred | 16 / `--spacing-8` | 8, bottom 8 | 28 | `--font-size-xxs` | `--font-size-xs` | 8 | `psds-btn--xs` |
| `--sm` | `--control-radius-flyout-default-radius` | 8 / 12 / 8 | `--font-size-base` / `-base`, centred | 20 / `--spacing-8` | 8, bottom 12 | 30 | `--font-size-xs` | `--font-size-sm` | 12 | `psds-btn--sm` |
| `--md` | `--control-radius-flyout-bigger-small-radius` | 10 / 10 / 12 | `--font-size-base` / `-base`, centred | 22 / `--spacing-12` | 12, bottom 12 | 34 | `--font-size-xs` | `--font-size-sm` | 12 × 16 | `psds-btn--md` |
| `--lg` | `--control-radius-flyout-bigger-radius` | 10 / 10 / 20 | `--font-size-lg` / `-lg`, start | 22 / `--spacing-12` | 12, bottom 12 | 36 | `--font-size-xs` | `--font-size-base` | 16 | `psds-btn--lg` |

Header padding reads top / bottom / inline. The panel is `--background-flyout-bg-color`
with a `--border-light` 1px border and the Figma flyout shadow; the title is
`--font-weight-medium` in `--foreground-content-text-color`; weekday headers are
`--font-weight-medium` in `--foreground-content-text-color-alt2`; the footer is
`--background-content-bg-color-alt1` with a `--border-light` top border.

| Day | Text | Surface / border |
| --- | --- | --- |
| In month | `--foreground-content-text-color-alt1` | transparent |
| `--outside` | `--foreground-content-text-color-alt2` | transparent |
| Today — `aria-current="date"` | `--foreground-content-text-color` | `--buttons-primary-border-color` 1px |
| Hover | unchanged | `--background-content-bg-color-hover` |
| Selected — `aria-selected="true"` / `.is-selected` | `--buttons-primary-text` | `--buttons-primary-bg-color` |
| Disabled | `--foreground-content-text-color-disabled` | transparent |
| Focus | unchanged | + focus ring |

Days are circles (`--radius-40`). **Hover, Selected and Disabled days are not drawn in the
Figma node** — only in-month, outside-month and today are — so they are mapped onto
existing tokens and should be checked against a future design.

## Token map

| Channel | Resolves to | Used by |
| --- | --- | --- |
| `--psds-datepicker-bg` | `--background-content-bg-color[-alt2]` | Control surface |
| `--psds-datepicker-border` | `--border` or a validation colour | Control border at rest |
| `--psds-datepicker-border-hover` | `--border-hover` or a validation colour | Control border under the pointer |
| `--psds-datepicker-accent` | `--buttons-primary-border-color` or a validation colour | 2px border while focused or active |
| `--psds-datepicker-fg` | `--foreground-content-text-color[-disabled]` | Value text |
| `--psds-datepicker-placeholder` | `--foreground-placeholder-text-color` | Placeholder |
| `--psds-datepicker-icon-color` | `--icon-color[-hover\|-pressed\|-disabled]` | Leading glyph and affixes |
| `--psds-datepicker-label-color` | `--foreground-content-text-color-alt1[-disabled]` | Label |
| `--psds-datepicker-required-color` | `--danger` / `--buttons-danger-bg-color-disabled` | Required `*` |
| `--psds-datepicker-note-color` | `--foreground-content-text-color-alt1` or a validation colour | Helper text |

Border colours are bound as they are in Figma, to the button border tokens —
`--buttons-danger-border-color` and its siblings — and helper text to the semantic colour.

## Accessibility

- Pair `.psds-datepicker__label` with the field through `for` / `id`, mark the field
  `required` alongside the decorative `*`, and point `aria-describedby` at
  `.psds-datepicker__alert`. Set `aria-invalid="true"` with `--danger`.
- Keep the field typeable. The calendar is a shortcut, not the only way in; state the
  expected format in the placeholder or helper text.
- Give the toggle an `aria-label`, `aria-haspopup="dialog"` and an `aria-expanded` that
  tracks the calendar. On open, move focus to the selected day (or today); on `Escape`,
  close and return focus to the toggle.
- Use the grid pattern for the days: one day at `tabindex="0"`, the rest at `-1`; arrow
  keys move by day and week, `Page Up` / `Page Down` by month, `Home` / `End` to the week's
  edges. Mark today with `aria-current="date"` and the selection with `aria-selected`.
- Label the month buttons (`Previous month`, `Next month`) and announce the month title with
  `aria-live="polite"`.
- If a custom calendar is not needed, `<input type="date">` in `.psds-datepicker__field`
  gives the platform picker and keyboard support for free; drop the toggle affix, since the
  browser draws its own.
- `--xs` is 24px tall, exactly the minimum target of WCAG 2.2 *Target Size (Minimum)*.
- Transitions are disabled under `prefers-reduced-motion: reduce`.

## Icons

- **Calendar** — the Figma *Icons/calendar* instance is the Font Awesome Regular `calendar`
  glyph (U+F133). `date-picker.css` repeats the Regular `@font-face` from
  [`foundations/icons.css`](../../foundations/icons.css) so it works standalone, and paints
  the glyph in `.psds-datepicker__toggle:empty::before`. Both declare the same family,
  weight and URL, so a page linking both downloads the font once. Put an `<svg>` inside the
  toggle to override the glyph.
- **Close, Chevron up, Chevron down** — exported from the Figma node and carried as
  data-URI masks in `--psds-datepicker-close`, `--psds-datepicker-chevron-up` and
  `--psds-datepicker-chevron-down`, so they follow the icon colour with no markup.
- Leading, label and helper icons are consumer-supplied through `.psds-datepicker__glyph`.
  Use `currentColor`.

## Notes

- `tokens.css` declares no font-family or shadow tokens, so the Inter stack, `$Shadow-sm`
  and the flyout shadow are held on the component in `--psds-datepicker-font-family`,
  `--psds-datepicker-shadow` and `--psds-datepicker-cal-shadow`.
- The `@font-face` URL is relative to `date-picker.css`. If the stylesheet is moved or
  bundled, update the path to `icons/fa-regular-400.woff2` — and the matching copy in
  [`foundations/icons.css`](../../foundations/icons.css) alongside it.
- Figma binds the control radius to `control-radius/btn-default-radius`; it is mapped to
  `--control-radius-input-default-radius`, which has the same value and is what the other
  inputs use.
- The Figma trailing affixes are `height − 2` wide; here they are exactly as wide as the
  control is tall, as in Text Box.
- The `--md` and `--lg` calendar headers are fixed 44px and 48px frames in Figma whose
  declared padding does not add up to that height; here they use `--spacing-10` block
  padding, which lands on the same heights.
- The Figma calendar sits at a fixed offset over the documentation frame. Here it opens
  `--spacing-4` below the control, like the Dropdown List menu.
- Only the Small Danger variant was inspected for validation; Info, Success and Warning
  follow the same bindings as Text Box.
- The Figma week header labels the last column `SU`; it is `SA` here.
- `date-picker.html` is a live gallery of the field matrix, the calendar at every size and a
  working picker, including a dark-theme toggle.
