# Chip

A compact label for a value, filter, person or tag. A chip can be static, clickable, or
removable. It uses the same colour model as [Button](../button/button.md). Every visual
value resolves through a token declared in [`tokens.css`](../../tokens.css), so light and
dark themes need no component-level overrides.

**Figma source:** UI Kit — Tailwind 3 Theme (Portside Edition) › `Chips`
([node `4755:125901`](https://www.figma.com/design/2JfMgeZuQOt4atDR58pLs9/UI-Kit---Tailwind-3-Theme--Portside-Edition-?node-id=4755-125901))
— 720 variants: 4 sizes × 6 types × 2 shapes × 3 modes × 5 states.

```html
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="foundations/icons.css">
<link rel="stylesheet" href="components/chip/chip.css">

<!-- Static -->
<span class="psds-chip psds-chip--sm psds-chip--primary">
  <span class="psds-chip__label">Booked</span>
</span>

<!-- Clickable -->
<button class="psds-chip psds-chip--sm psds-chip--secondary psds-chip--outlined" type="button">
  <span class="psds-chip__label">Charter</span>
</button>

<!-- Removable -->
<span class="psds-chip psds-chip--sm psds-chip--primary psds-chip--outlined">
  <span class="psds-chip__label">Status: Active</span>
  <button class="psds-chip__remove" type="button" aria-label="Remove Status: Active">
    <span class="psds-icon" aria-hidden="true">&#xf00d;</span>
  </button>
</span>
```

### Chip, badge or button?

| Need | Use |
| --- | --- |
| A value, tag, person or applied filter, possibly removable | **Chip** |
| A quick filter or suggestion the user clicks | **Chip** as a `<button>` |
| A status word or count that never changes on interaction | [Badge](../badge/badge.md) |
| An action ("Save", "Export") | [Button](../button/button.md) |
| Picking several values from a list | [Multiselect](../multiselect/multiselect.md) (it has its own chips) |

## Class API

| Axis | Classes | Default |
| --- | --- | --- |
| Size | `--xs` `--sm` `--md` `--lg` | `--sm` |
| Type | `--primary` `--secondary` `--info` `--success` `--warning` `--danger` | — (required) |
| Mode | *(none = Filled)* `--outlined` `--flat` | Filled |
| Shape | *(none = Rounded)* `--pill` | Rounded |

`.psds-chip` alone has no colour, so always add a type.

| Element | Class | Notes |
| --- | --- | --- |
| Root | `.psds-chip` | `<span>` when static, `<button>` or `<a>` when clickable |
| Avatar | `.psds-chip__avatar` | optional `<img>`, first child, flush against the start edge |
| Icon | `.psds-chip__icon` | optional glyph before the label (Figma *Left Icon*) |
| Label | `.psds-chip__label` | truncates with an ellipsis when the chip is too narrow |
| Remove | `.psds-chip__remove` | optional `<button>` after the label (Figma *Right Icon*, `Icons/Close`) |

The forced-state helpers `.is-hover`, `.is-active`, `.is-focus` and `.is-disabled` on the
root reproduce a state for documentation and visual-regression galleries.

## Sizes

| Size | Figma | Height | Radius | Padding X | Gap | Icon | Font | Line height |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `--xs` | Extra Small | `--spacing-20` 20 | `--control-radius-chip-small-radius` 4 | `--spacing-8` | `--spacing-4` | `--font-icon-12` | `--font-size-xs` 12 | `--line-height-xs` 16 |
| `--sm` | Small | `--form-mouse-small` 24 | `--control-radius-chip-default-radius` 6 | `--spacing-8` | `--spacing-4` | `--font-icon-14` | `--font-size-xs` 12 | `--line-height-xs` 16 |
| `--md` | Medium | `--spacing-28` 28 | `--control-radius-chip-bigger-small-radius` 6 | `--spacing-8` | `--spacing-6` | `--font-icon-16` | `--font-size-sm` 14 | `--line-height-sm` 20 |
| `--lg` | Large | `--form-mouse` 32 | `--control-radius-chip-bigger-radius` 6 | `--spacing-12` | `--spacing-8` | `--font-icon-16` | `--font-size-sm` 14 | `--line-height-sm` 20 |

The label is `--font-weight-medium` with `--letter-spacing-normal` at every size. **Gap**
is the space between the icon, the label and the remove button. `--pill` only changes
the radius to `--radius-full`; the padding stays the same (unlike the button, whose pill
shape adds 2px).

`--sm` is the default per [`guidance.md`](../../guidance.md), and is also the default
variant of the Figma component set.

## Types and modes

The six types use the matching `--buttons-<type>-*` tokens, exactly like the button:

| Mode | Background | Border | Label |
| --- | --- | --- | --- |
| Filled | `-bg-color` | `-border-color` | `-text` (Secondary: `-text-color`) |
| `--outlined` | transparent | `-border-color` | `-bg-color` (Secondary: `-text-color`) |
| `--flat` | transparent | transparent | `-bg-color` (Secondary: `-text-color`) |

Secondary is the neutral chip: white with a grey border when Filled, and dark text when
Outlined or Flat.

## States

| State | Filled | Outlined | Flat |
| --- | --- | --- | --- |
| Hover | `-hover` fill | **fills** with `-hover` | **fills** with `-hover` |
| Active | `-pressed` fill | **fills** with `-pressed` | **fills** with `-pressed` |
| Focus | `-focus` fill + ring | **fills** with `-focus` + ring | **fills** with `-focus` + ring |
| Disabled | `-disabled` fill | transparent, `-border-color-disabled`, label `-bg-color-disabled` | transparent, no border, label `-bg-color-disabled` |

The Figma *Active* state maps to the `-pressed` token suffix. Every mode turns into a
filled chip on hover, press and focus, as in Figma. A disabled chip's avatar fades to 50%.

Two things differ from the button, following Figma:

- An Outlined chip **fills** when focused. An Outlined button stays transparent.
- A Flat chip **stays transparent** when disabled. A Flat button fills with the disabled
  colour.

### When states apply

Hover and press only show when the chip itself does something:

- On a **clickable** chip (`<button>` or `<a>`), they respond to the whole chip.
- On a **static** `<span>`, the chip shows them only while its remove button is hovered or
  pressed. The chip lights up to show what will be removed, while the rest of the chip
  doesn't look clickable.
- Focus works the same way. A clickable chip shows the ring when it is focused. A static
  chip shows it when its remove button is focused.
- A chip counts as disabled when it has `disabled` or `aria-disabled="true"`, or when its
  remove button is `disabled`.

### Focus ring

It is the Figma `$shadow-focus-ring2` effect, the same ring the button uses:

```css
box-shadow: 0 0 0 var(--border-2) var(--background-content-bg-color),
            0 0 0 var(--border-4) var(--primary);
```

## Slots

```html
<span class="psds-chip psds-chip--sm psds-chip--secondary psds-chip--pill">
  <img class="psds-chip__avatar" src="emily.jpg" alt="">
  <span class="psds-chip__icon" aria-hidden="true"><span class="psds-icon">&#xf2c2;</span></span>
  <span class="psds-chip__label">Emily Carter</span>
  <button class="psds-chip__remove" type="button" aria-label="Remove Emily Carter">
    <span class="psds-icon" aria-hidden="true">&#xf00d;</span>
  </button>
</span>
```

- **Avatar:** fills the chip's inner height (20 / 22 / 26 / 30px) and sits flush against the
  start edge. The chip drops its start padding, so the label is still one padding away
  from the avatar. The avatar has a 6px radius, or a circle on `--pill`. Use `alt=""` when
  the label already names the person.
- **Icon:** a square box in the size's icon token. Use a Font Awesome glyph
  (see [`foundations/icons.md`](../../foundations/icons.md)), or an `<svg>` / `<img>`. It
  uses the label colour.
- **Remove:** a bare `xmark` (`f00d`) glyph button in the same icon box, using the label
  colour. It is a real `<button>`, so it can be focused and needs an `aria-label` that
  names what it removes.

## Removable chips

A button can't contain another button, so a removable chip must be a static `<span>`
root with its own `.psds-chip__remove`. Don't also make it clickable. If the chip needs a
main action as well, put that action somewhere else.

When a chip is removed, move focus to the next chip's remove button (or the previous one,
or a nearby control if none are left). Otherwise keyboard focus is lost.
[`chip.html`](chip.html) has a working example.

## Token map

| Channel | Resolves to |
| --- | --- |
| `--psds-chip-bg[-state]` | `--buttons-<type>-bg-color[-state]` |
| `--psds-chip-border[-state]` | `--buttons-<type>-border-color[-state]` |
| `--psds-chip-fg[-state]` | `--buttons-<type>-text[-state]` (Secondary: `-text-color[-state]`) |
| `--psds-chip-accent` | `--buttons-<type>-accent` |
| `--psds-chip-accent-disabled` | `--buttons-<type>-bg-color-disabled` (Secondary: `-text-color-disabled`) |
| `--psds-chip-outline` | `--buttons-<type>-accent` (Secondary: `-border-color`) |

State suffixes are `-hover`, `-pressed`, `-focus` and `-disabled`. The size channel
(`--psds-chip-height`, `-radius`, `-padding`, `-gap`, `-icon`, `-font-size`,
`-line-height`) is set by the size modifiers.

## Accessibility

- A static chip is plain text. Don't add `tabindex` or click handlers to a `<span>`;
  use a `<button>` for anything clickable.
- A group of related clickable chips (quick filters) goes in an element with
  `role="group"` and an `aria-label`. A list of applied filters works well as a `<ul>`.
- If a chip toggles something on and off, add `aria-pressed` to the `<button>`. Figma has
  no selected state, so show the difference with the mode (e.g. Outlined when off, Filled
  when on).
- The remove button needs an `aria-label` such as "Remove Status: Active". The glyph
  inside it is `aria-hidden`.
- The remove button is only 12–16px, below the 24px minimum target size in WCAG 2.2.
  Leave space around removable chips, and consider a larger size for touch screens.
- Prefer the real `disabled` attribute over `.is-disabled`. The class is visual only: it
  blocks mouse clicks but not keyboard focus, and doesn't tell screen readers the chip is
  disabled.
- Transitions are disabled under `prefers-reduced-motion: reduce`.

## Notes

- **Avatar size.** In Figma the avatar box is 20 / 22 / 28 / 32px, but the chip frame clips
  it, so only the inner height shows. Here it is sized to the inner height directly.
- The multiselect component still draws its own chips (`.psds-multiselect__chip`). They
  look like a Filled Primary chip but are a separate implementation.
- `tokens.css` has no `--chip-*` colour tokens. The Figma file uses the **button** tokens
  for chips, and those are used here as-is. The four `--control-radius-chip-*` tokens do
  exist and are used for the radius.
- Heights 20 and 28 are fixed numbers in Figma, not variables. Here they use the
  `--spacing-*` tokens with the same values.
- `tokens.css` has no font-family token, so the Inter font stack from the Figma text style
  is kept in `--psds-chip-font-family` on the component.
- `chip.html` shows every size, type × mode, mode × state and slot, with a dark-theme
  toggle, clickable filter chips and a working list of removable chips.
