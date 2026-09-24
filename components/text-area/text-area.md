# Text Area

A multi-line text input with an optional label, helper message and drag-to-resize corner.
The component is a thin styling layer over `<textarea>` — every visual value resolves
through a token declared in [`tokens.css`](../../tokens.css), so light and dark themes need
no component-level overrides.

**Figma source:** UI Kit — Tailwind 3 Theme (Portside Edition) › `Text Area`
([node `7939:4545`](https://www.figma.com/design/2JfMgeZuQOt4atDR58pLs9/UI-Kit---Tailwind-3-Theme--Portside-Edition-?node-id=7939-4545))
— 88 variants: 4 sizes × 11 states × 2 shapes. **Only the Rounded shape is implemented**;
the Line shape is intentionally left out, so there is no shape modifier.

```html
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="components/text-area/text-area.css">

<div class="psds-textarea psds-textarea--md">
  <label class="psds-textarea__label" for="message">Message</label>
  <div class="psds-textarea__control">
    <textarea class="psds-textarea__field" id="message" rows="3"
              placeholder="Write a message..."></textarea>
  </div>
  <p class="psds-textarea__alert">Helping Text</p>
</div>
```

## Class API

| Axis | Classes | Default |
| --- | --- | --- |
| Size | `--xs` `--sm` `--md` `--lg` | `--md` |
| Content | *(none)* `--filled` `--readonly` | — |
| Validation | `--info` `--success` `--warning` `--danger` | none |
| Resizer | *(none)* `--no-resizer` | on |

The forced-state helpers `.is-hover`, `.is-focus`, `.is-active` and `.is-disabled`
reproduce a state for documentation and visual-regression galleries — real interaction is
handled by `:focus-within`, `:active` and by `readonly` / `disabled` on the field.

### Elements

| Element | Role |
| --- | --- |
| `.psds-textarea` | Wrapper; owns the size and colour channels and the 4px column gap |
| `.psds-textarea__label` | Field label; `.psds-textarea__required` is the red `*` |
| `.psds-textarea__control` | The bordered box; its `::after` paints the resizer glyph |
| `.psds-textarea__field` | The `<textarea>` |
| `.psds-textarea__alert` | Helper text under the control |
| `.psds-textarea__glyph` | Generic icon box, sized by whichever row it sits in |

`.psds-textarea__glyph` inside `.psds-textarea__label` takes that row's icon token; the
same class inside `.psds-textarea__alert` picks up the smaller helper token instead, so one
class covers both slots.

## Sizes

| Size | Font | Line height | Radius | Padding | Min height | Resizer gutter |
| --- | --- | --- | --- | --- | --- | --- |
| `--xs` | `--font-size-xs` 12 | `--line-height-xs` 16 | `--control-radius-input-small-radius` 4 | `--spacing-8` | 88 | `--spacing-34` |
| `--sm` | `--font-size-sm` 14 | `--line-height-sm` 20 | `--control-radius-input-default-radius` 8 | `--spacing-12` | 100 | `--spacing-30` |
| `--md` | `--font-size-sm` 14 | `--line-height-sm` 20 | `--control-radius-input-default-radius` 8 | `--spacing-12` | 100 | `--spacing-34` |
| `--lg` | `--font-size-base` 16 | `--line-height-base` 24 | `--control-radius-input-bigger-radius` 8 | `--spacing-12` | 132 | `--spacing-36` |

Label, required marker and helper text step with the size, the same ramp
[`text-box`](../text-box/text-box.md) uses:

| Size | Label | Required `*` | Label icon | Helper text | Helper icon |
| --- | --- | --- | --- | --- | --- |
| `--xs` | `--font-size-xxs` 10 | `--font-size-xxs` | `--font-icon-12` | `--font-size-xxs` 10 | `--font-icon-10` |
| `--sm` | `--font-size-xs` 12 | `--font-size-xs` | `--font-icon-14` | `--font-size-xs` 12 | `--font-icon-12` |
| `--md` | `--font-size-sm` 14 | `--font-size-xs` | `--font-icon-14` | `--font-size-sm` 14 | `--font-icon-14` |
| `--lg` | `--font-size-sm` 14 | `--font-size-xs` | `--font-icon-14` | `--font-size-sm` 14 | `--font-icon-14` |

Block padding is `--spacing-8` at every size. The control pads its top and leading edges;
the trailing and bottom space is supplied by the field's own padding, so the caret reaches
the full box and wrapped text still clears the resizer. `min-height` reproduces the Figma
frame heights and is a floor, not a fixed height — `rows` and the user's drag both grow the
field past it.

## The resizer

The Figma *Icons/Resizer right* glyph is 12px, inset `--spacing-8` from the trailing and
bottom edges of the control at every size. It is painted as a mask on
`.psds-textarea__control::after`, so it follows the icon colour channel and needs no markup.

Two details make it behave rather than just look right:

- The glyph is `pointer-events: none`, and the platform handle underneath is made invisible
  with `::-webkit-resizer { background: transparent }` rather than removed — so Chrome and
  Safari keep the native drag while showing the Figma glyph. Firefox draws no handle of its
  own, so the glyph is decorative there and the corner still drags.
- `--no-resizer` is the Figma boolean prop `Resizer = false`: the glyph goes, the field
  gives back the gutter it was reserving, and `resize` turns off.

`resize` is `vertical`, not `both` — the control is a block that sizes to its container, and
horizontal dragging would break the surrounding layout.

## States

Figma models State as one axis of eleven values, mixing content, validation and
interaction. Here the first two become modifiers and the last resolve from interaction.

| State | Background | Border | Value text | Shadow |
| --- | --- | --- | --- | --- |
| Default | `content-bg-color` | `--border` 1px | `content-text-color` | `$Shadow-sm` |
| Hover | *identical to Default* | *identical* | *identical* | *identical* |
| Focus / Active | `content-bg-color` | `primary-border-color` **2px** | unchanged | `$Shadow-sm` |
| `--filled` | `content-bg-color` | `--border` 1px | `content-text-color` | `$Shadow-sm` |
| `--readonly` | `content-bg-color-alt2` | `--border` 1px | `content-text-color` | `$Shadow-sm` |
| Disabled | `content-bg-color-alt2` | `--border` 1px | `content-text-color-disabled` | `$Shadow-sm` |
| `--info` `--success` `--warning` `--danger` | `content-bg-color` | validation colour 1px | `content-text-color` | `$Shadow-sm` |

The resizer glyph is `--icon-color` in every state except Disabled, which takes
`--icon-color-disabled`.

The Figma *Focus* and *Active* variants are pixel-identical — a 2px border in
`Buttons/Primary/primary-border-color`. Because the control is `border-box`, the extra
border does not change its outer size, and the leading and top padding each give back a
pixel so the text does not shift when the field takes focus.

Three points where a real `<textarea>` does better than the single-axis Figma model:

- **Default vs. Filled is native.** The element separates its value from its placeholder on
  its own, so `--psds-textarea-fg` is always the content colour and `::placeholder` carries
  `--foreground-placeholder-text-color`. `--filled` is kept for parity with the Figma axis
  but is a no-op in practice.
- **Read Only and Disabled read the attributes.** `readonly` and `disabled` on the field are
  matched through `:has()`, so `--readonly` and `.is-disabled` are documentation helpers
  rather than the only way in. Disabled also turns `resize` off.
- **Validation survives focus.** A validation modifier writes its colour into both the rest
  and accent channels, so an errored field raises a 2px red border when focused rather than
  reverting to blue. Figma ships no combined variants for this.

## Token map

| Channel | Resolves to |
| --- | --- |
| `--psds-textarea-bg` | `--background-content-bg-color[-alt2]` |
| `--psds-textarea-border` | `--border` or `--buttons-{validation}-border-color` |
| `--psds-textarea-accent` | `--buttons-primary-border-color`, or the validation colour |
| `--psds-textarea-fg` | `--foreground-content-text-color[-disabled]` |
| `--psds-textarea-placeholder` | `--foreground-placeholder-text-color` |
| `--psds-textarea-icon-color` | `--icon-color[-disabled]` |
| `--psds-textarea-note-color` | `--foreground-content-text-color-alt1`, or the validation colour |

## Differences from Text Box

The two components come from the same kit and share a State axis, but the Text Area node
diverges in five places. All five are reproduced as authored rather than normalised:

1. **Radius is per size** — `input-small-radius` at `--xs`, `input-default-radius` at
   `--sm`/`--md`, `input-bigger-radius` at `--lg`. Text Box uses the default radius at all
   four. The last two tokens both resolve to 8px today, so only `--xs` looks different.
2. **Hover has no treatment.** The Figma Hover variant binds the same `Border/border` token
   as Default, where Text Box moves to `--border-hover`. No hover rule is invented here.
3. **Disabled keeps `$Shadow-sm`.** In Text Box, Disabled is the one state that drops it.
4. **The icon colour never shifts.** Every state binds `Icon/icon-color`; Text Box moves the
   icon to hover, pressed and disabled variants.
5. **The helper row gap is overridden.** Figma authors `spacing-0` between the message and
   its glyph, which left the glyph flush against the text. The CSS uses `--spacing-4` to
   match Text Box and Dropdown List.

Items 2 and 4 read as gaps in the source rather than decisions — worth confirming with
design before this ships.

## Accessibility

- Always pair the field with a `<label for>`, as in the snippet above. A `placeholder` is
  not a label; it disappears as soon as the user types.
- Point `aria-describedby` at the alert element so the helper or error text is announced
  with the field, and set `aria-invalid="true"` alongside `--danger`.
- `.psds-textarea__required` is decorative — mark the field `required` (or `aria-required`)
  as well.
- The resizer glyph is `pointer-events: none` and carries no role; resizing stays a native
  affordance, so it is keyboard-independent and needs no ARIA of its own.
- Transitions are disabled under `prefers-reduced-motion: reduce`.

## Notes

- `tokens.css` declares no font-family or shadow token. The Inter stack from the Figma text
  style is held in `--psds-textarea-font-family`, and the `$Shadow-sm` effect in
  `--psds-textarea-shadow`, whose one raw value is `#0000000d`. Both match Text Box.
- `text-area.html` is a live gallery of the size and state matrix, including a dark-theme
  toggle.
