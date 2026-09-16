# Multiselect

Picks several values from a list. Each chosen value shows as a removable chip, next to a
text input that filters the menu. The component is a styling layer over an
`<input role="combobox">` and a `role="listbox"` menu. Every visual value resolves through a
token declared in [`tokens.css`](../../tokens.css), so light and dark themes need no
component-level overrides.

**Figma source:** UI Kit — Tailwind 3 Theme (Portside Edition) › `Multi Select Dropdown`
([node `27254:1456608`](https://www.figma.com/design/2JfMgeZuQOt4atDR58pLs9/UI-Kit---Tailwind-3-Theme--Portside-Edition-?node-id=27254-1456608))
— 88 variants: 4 sizes × 11 states × 2 shapes. **Only the Rounded shape is implemented**;
the Line shape is intentionally left out, so there is no shape modifier.

```html
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="components/multiselect/multiselect.css">

<div class="psds-multiselect psds-multiselect--sm">
  <label class="psds-multiselect__label" for="veg">Vegetables</label>
  <div class="psds-multiselect__control">
    <ul class="psds-multiselect__values" aria-label="Selected vegetables">
      <li class="psds-multiselect__chip">
        <span class="psds-multiselect__chip-label">Pumpkins</span>
        <button class="psds-multiselect__chip-remove" type="button" aria-label="Remove Pumpkins"></button>
      </li>
      <li style="display:contents">
        <input class="psds-multiselect__input" id="veg" type="text" placeholder="type..."
               role="combobox" aria-expanded="false" aria-controls="veg-menu"
               aria-autocomplete="list" autocomplete="off">
      </li>
    </ul>
    <button class="psds-multiselect__clear" type="button" aria-label="Clear all vegetables"></button>
    <div class="psds-multiselect__menu" id="veg-menu" role="listbox"
         aria-multiselectable="true" aria-label="Vegetables" hidden>…</div>
  </div>
</div>
```

Also link [`foundations/icons.css`](../../foundations/icons.css) for icon glyphs, and
[`checkbox.css`](../checkbox/checkbox.css) when menu group headers have a checkbox.

## Class API

| Axis | Classes | Default |
| --- | --- | --- |
| Size | `--xs` `--sm` `--md` `--lg` | `--sm` |
| Content | *(none)* `--readonly` | editable |
| Validation | `--info` `--success` `--warning` `--danger` | none |
| Layout | *(none = one line)* `--wrap` | one line |

The forced-state helpers `.is-hover`, `.is-focus`, `.is-active` and `.is-disabled`
reproduce a state for documentation and visual-regression galleries. Real interaction is
handled by `:hover`, `:focus-within`, `:active` and `:disabled` on the input.

### Elements

| Element | Role |
| --- | --- |
| `.psds-multiselect` | Wrapper; owns the size and state channels and the 4px column gap |
| `.psds-multiselect__label` | Field label; `.psds-multiselect__required` is the red `*` |
| `.psds-multiselect__control` | The bordered box, and the positioning context for the menu |
| `.psds-multiselect__icon` | Leading icon slot inside the control (add to a `__glyph`) |
| `.psds-multiselect__values` | The `<ul>` of chips plus the input; one scrolling row |
| `.psds-multiselect__chip` | One selected value (`<li>`) |
| `.psds-multiselect__chip-label` | Chip text; truncates with an ellipsis |
| `.psds-multiselect__chip-remove` | The chip's `×` button |
| `.psds-multiselect__input` | The filter input; carries `role="combobox"` |
| `.psds-multiselect__clear` | Optional "clear all" square at the inline end |
| `.psds-multiselect__alert` | Helper text under the control |
| `.psds-multiselect__menu` | Flyout (`role="listbox"`); the last child of the control |
| `.psds-multiselect__group` | Menu group header: optional checkbox, icon, uppercase name |
| `.psds-multiselect__option` | Menu row (`role="option"`) |
| `.psds-multiselect__glyph` | Generic icon box, sized by the size channel |

## Sizes

| Size | Height | Radius | Padding&nbsp;start | Gap | Input font | Icon / clear glyph |
| --- | --- | --- | --- | --- | --- | --- |
| `--xs` | `--form-mouse-small` 24 | `--control-radius-input-bigger-radius` 8 | `--spacing-3` | `--spacing-6` | `--font-size-xs` 12 | `--font-icon-12` |
| `--sm` | `--form-mouse` 32 | `--control-radius-input-default-radius` 8 | `--spacing-4` | `--spacing-8` | `--font-size-sm` 14 | `--font-icon-14` |
| `--md` | `--form-bigger-small` 36 | `--control-radius-input-bigger-small-radius` 6 | `--spacing-12` | `--spacing-10` | `--font-size-base` 16 | `--font-icon-16` |
| `--lg` | `--form-bigger` 40 | `--control-radius-input-bigger-radius` 8 | `--spacing-12` | `--spacing-10` | `--font-size-base` 16 | `--font-icon-16` |

| Size | Chip height | Chip radius | Chip `×` | Chip gap | Label | Helper text |
| --- | --- | --- | --- | --- | --- | --- |
| `--xs` | `--spacing-18` | `--control-radius-chip-small-radius` 4 | `--font-icon-12` | `--spacing-4` | `--font-size-xs` | `--font-size-xs` |
| `--sm` | `--form-mouse-small` 24 | `--control-radius-chip-default-radius` 6 | `--font-icon-14` | `--spacing-4` | `--font-size-xs` | `--font-size-xs` |
| `--md` | `--spacing-28` | `--control-radius-chip-default-radius` 6 | `--font-icon-14` | `--spacing-8` | `--font-size-sm` | `--font-size-sm` |
| `--lg` | `--form-mouse` 32 | `--control-radius-chip-default-radius` 6 | `--font-icon-14` | `--spacing-8` | `--font-size-base` | `--font-size-sm` |

Chips use Text-X Small/Medium (`--font-size-xs`, `--font-weight-medium`) at every size, with
`--spacing-8` inline padding and a `--spacing-4` gap between the label and the `×`. Each chip
is centred with equal space above and below it. The label is `--font-weight-medium`. The
required `*` is `--font-size-xs`, or `--font-size-xxs` at `--xs`. The leading icon gets
extra start padding: `--spacing-2` at `--xs` / `--sm`, `--spacing-4` at `--md` / `--lg`.

The radius differs between sizes because Figma binds a different input radius token to each
one. Only `--md` resolves to 6. The `--sm` label is `--font-size-xs`, as in the Figma Default
variant, although some other `--sm` states in Figma draw it at `--font-size-sm`.

The clear button has no modifier. Include the `.psds-multiselect__clear` button to show the square,
which is as wide as the control is tall. Without it, the control gets matching inline-end
padding.

### Overflow and `--wrap`

The Figma control has a fixed height and clips its content. Here the chip row keeps the
fixed height and scrolls sideways, with its scrollbar hidden. Tabbing to a chip's `×` scrolls
that chip into view. After adding a chip, set `values.scrollLeft = values.scrollWidth` so the
input stays visible, as `multiselect.html` does.

`--wrap` is **not a Figma variant**. It lets chips wrap onto new lines and the control grow.
The single-line height becomes a minimum, and the leading icon and clear button stay pinned
to the first row. Use it when people typically pick more than a few values.

## States

Figma models State as one axis of eleven values. Here Read Only and validation are
modifiers, and the interaction states come from the browser.

| State | Background | Border | Chips | Icons |
| --- | --- | --- | --- | --- |
| Default | `content-bg-color` | `--border` 1px | primary | `--icon-color` |
| Hover | `content-bg-color` | `--border-hover` 1px | primary | `--icon-color-hover` |
| Focus / Active | `content-bg-color` | accent **2px** | primary | `--icon-color-pressed` |
| `--readonly` | `content-bg-color-alt2` | `--border` 1px | primary | `--icon-color-pressed` |
| Disabled | `content-bg-color-alt2` | `--border` 1px | primary `-disabled`, no `×`, no shadow | `--icon-color-disabled` |
| `--info` `--success` `--warning` `--danger` | `content-bg-color` | validation colour 1px | primary | `--icon-color-pressed` |

- **Filled has no modifier.** In Figma it is pixel-identical to Default, since both show a
  chip plus the placeholder.
- **Focus and Active are the same.** Both draw a 2px border in
  `Buttons/Primary/primary-border-color`. The control's height is fixed, so the thicker
  border doesn't change its size.
- **Focus covers the whole field.** It is bound to `:focus-within`, so the input, a chip's
  `×` button and an open menu all raise it.
- **Hover ignores the menu.** It is bound to the control but excludes its menu, so pointing
  at an open menu doesn't restyle the field.
- **Validation survives hover, and focus takes the validation colour**, the same as Dropdown
  List.
- **Disabled fades the whole field.** The label, required mark and helper text fade too, and
  the chip `×` and clear buttons are hidden, as in Figma. Disabled is declared last. It
  matches `.psds-multiselect:has(.psds-multiselect__input:disabled)` for a real attribute,
  and `.is-disabled` for documentation.
- **Read Only keeps the chip `×` in Figma.** Leave the remove buttons out of the markup and
  set `readonly` on the input, so nothing can be removed.

## Menu

The menu is the Figma *Context Menu* instance. Put it as the **last child of the control**.
It sits `--spacing-4` below the control's border box and matches its width. A label or helper
text never moves it. It scrolls past 320px. It is a presentation layer only: opening,
filtering, selection and keyboard navigation are the consumer's job. Toggle it with the
`hidden` attribute.

| Size | Panel padding | Row inline padding | Group header | Header font | Option min-height | Option font | Row gap | Group checkbox |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `--xs` | `--spacing-4` | `--spacing-8` | 24 | `--font-size-xxs` | 24, `--spacing-2` block | `--font-size-xs` | `--spacing-8` | `.psds-checkbox--xs` (14) |
| `--sm` | `--spacing-4` | `--spacing-12` | 30 | `--font-size-xs` | 32, `--spacing-4` block | `--font-size-sm` | `--spacing-8` | `.psds-checkbox--sm` (16) |
| `--md` | `--spacing-4` | `--spacing-12` | 32 | `--font-size-sm` | 32, `--spacing-4` block | `--font-size-base` | `--spacing-12` | `.psds-checkbox--sm` (16) |
| `--lg` | `--spacing-6` | `--spacing-16` | 36 | `--font-size-sm` | 40, `--spacing-4` block | `--font-size-base` | `--spacing-12` | `.psds-checkbox--md` (20) |

| Part | Spec |
| --- | --- |
| Panel | `--background-flyout-bg-color`, `--border-light` 1px, `--radius-8`, flyout shadow |
| Group header | uppercase, `--font-weight-medium`, `--foreground-content-text-color-alt2`, `--border-light` hairline underneath; icon in `--icon-color` |
| Option hover / `.is-active` | `--background-content-bg-color-hover` + `-hover` text |
| Option selected | `--background-content-bg-color-pressed` + `-pressed` text, via `[aria-selected="true"]` or `.is-selected` |
| Keyboard-active option | `.is-active` also adds a 2px `--primary` bar on the inline start, so it stays visible on a selected row |

Selected options carry no checkmark in Figma. Selection shows only through the pressed
surface, plus the chips in the control.

Wrap each group's header and options in `<div role="group" aria-labelledby="…">`. The group
checkbox is the [Checkbox](../checkbox/checkbox.md) component. Set `indeterminate` on it when
only part of the group is selected.

## Token map

| Channel | Resolves to | Used by |
| --- | --- | --- |
| `--psds-multiselect-bg` | `--background-content-bg-color[-alt2]` | Control surface |
| `--psds-multiselect-border` / `-border-hover` | `--border` / `--border-hover`, or a validation colour | Control border |
| `--psds-multiselect-accent` | `--buttons-primary-border-color`, or a validation colour | 2px border while focused |
| `--psds-multiselect-fg` / `-placeholder` | `--foreground-content-text-color`, `--foreground-placeholder-text-color`, `-disabled` | Typed text, placeholder |
| `--psds-multiselect-icon-color` | `--icon-color[-hover\|-pressed\|-disabled]` | Leading, label, helper and clear icons |
| `--psds-multiselect-chip-bg` / `-border` / `-fg` | `--buttons-primary-bg-color`, `-border-color`, `-text` (and `-disabled`) | Chips |
| `--psds-multiselect-label-color` / `-required-color` / `-note-color` | content text, `--danger`, `content-text-color-alt1` (disabled: `-disabled`, `--buttons-danger-bg-color-disabled`) | Label row and helper text |

Validation colours are bound to the button border tokens, as in Figma and Dropdown List.
Chips are bound to the **primary button** tokens, as in Figma, and that binding is kept
rather than aliased.

## Accessibility

- **Roles.** The input is an ARIA 1.2 combobox: `role="combobox"`, `aria-expanded`,
  `aria-controls` pointing at the menu, and `aria-autocomplete="list"`. The menu is
  `role="listbox"` with `aria-multiselectable="true"`. Options are `role="option"` with
  `aria-selected`.
- **Active option.** Keep focus in the input and point `aria-activedescendant` at the active
  option. Arrow keys move it, <kbd>Enter</kbd> toggles it, and <kbd>Escape</kbd> closes the
  menu. <kbd>Backspace</kbd> in an empty input removes the last chip. `multiselect.html`
  implements all of this.
- **Menu clicks.** Call `preventDefault()` on `mousedown` inside the menu, so clicking an
  option doesn't take focus away from the input.
- **Chips.** They form a labelled `<ul>`. Every `×` needs an `aria-label` naming the value,
  such as "Remove Pumpkins". The `×` and clear glyphs are drawn as masks on empty buttons, so
  they have no text of their own.
- **Group checkbox.** A checkbox can't live inside a listbox, so the gallery marks it
  `aria-hidden="true"` and `tabindex="-1"`. It is a pointer shortcut: keyboard and
  screen-reader users select the options one by one. If whole-group selection must be
  keyboard-accessible, add a real "Select all in group" option row instead.
- **Label and help text.** Pair the label with the input through `for` / `id`, and point
  `aria-describedby` at the helper text. The `*` is decorative, so mark the input
  `required` too. Validation modifiers only colour the border.
- **Announcements.** Announce added and removed values through a polite live region if your
  product needs it; the gallery doesn't.
- **Disabled.** Prefer the real `disabled` attribute on the input over `.is-disabled`, which
  is presentational only.
- **Focus rings.** The chip `×` and clear buttons get a 2px `--primary` outline on
  `:focus-visible`, added for accessibility. Figma defines no states for them.
- **Target size.** The chip `×` is 12–14px, and its hit area is widened by 4px on every side.
  `--xs` is 24px tall, exactly the minimum target of WCAG 2.2 *Target Size (Minimum)*.
- **Motion.** Transitions are disabled under `prefers-reduced-motion: reduce`.

## Notes

- **Missing tokens.** `tokens.css` declares no font-family or shadow tokens, so the Inter
  stack, `$Shadow-sm` and the flyout shadow are held on the component. The Figma close glyph
  is held on the component too, and is the same path Text Box uses.
- **Menu height.** The 320px maximum is a component-level literal. Figma draws the menu at
  its natural height.
- **Chip `×` padding.** The Figma remove slot adds `--spacing-4` of start padding on top of
  the chip's `--spacing-4` gap. Here the two are folded into the single gap.
- **No chip component.** The repo has no standalone Chip component yet, so the chip is an
  element of this component. Extract it when a second consumer appears.
- **Browser support.** `:has()` drives disabled, hover exclusion and the no-clear padding.
  It needs a 2023-or-later browser.
- **Gallery.** `multiselect.html` shows every size and state, the wrap layout, the open menu
  at each size and a working filterable combobox, with a dark-theme toggle.
