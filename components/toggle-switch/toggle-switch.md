# Toggle Switch

Flips a single setting on or off, taking effect immediately. The component is a thin
styling layer over `<input type="checkbox">` — every visual value resolves through a token
declared in [`tokens.css`](../../tokens.css), so light and dark themes need no
component-level overrides.

**Figma source:** UI Kit — Tailwind 3 Theme (Portside Edition) › `Toggle Switch`
([node `4755:172855`](https://www.figma.com/design/2JfMgeZuQOt4atDR58pLs9/UI-Kit---Tailwind-3-Theme--Portside-Edition-?node-id=4755-172855))
— 160 variants: 4 sizes × 2 active states × 5 states × 2 captions × 2 text positions. The
caption variant (*Label = Yes*, ON/OFF text inside the track) is deliberately not
implemented: it added little and its white-on-green text failed contrast.

```html
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="components/toggle-switch/toggle-switch.css">

<label class="psds-toggle psds-toggle--sm">
  <input class="psds-toggle__input" type="checkbox">
  <span class="psds-toggle__text"><span class="psds-toggle__label">Label</span></span>
</label>
```

## Class API

| Axis | Classes | Default |
| --- | --- | --- |
| Size | `--xs` `--sm` `--md` `--lg` | `--sm` |
| Text position | *(none = Right)* `--label-start` | Right |

| Part | Role |
| --- | --- |
| `.psds-toggle` | The `<label>`; owns the size channel and the gap |
| `.psds-toggle__input` | The native checkbox, styled directly into the track |
| `.psds-toggle__text` | Label + optional `*` + optional trailing icon |
| `.psds-toggle__label` | The label text |
| `.psds-toggle__required` | The red `*` |
| `.psds-toggle__icon` | Optional trailing glyph (Figma *Icons/Circle info*) |

Active (OFF / ON) is the input's own `:checked` state, not a modifier. The forced-state
helpers `.is-active`, `.is-focus` and `.is-disabled` reproduce a state for documentation
and visual-regression galleries — real interaction is handled by `:active`,
`:focus-visible` and `[disabled]`.

## Sizes

| Size | Track | Thumb | Padding | Label font | Label gap | `*` font | Icon |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `--xs` | `--spacing-40` × `--spacing-20` | `--spacing-16` | `--spacing-2` | `--font-size-xs` 12 | `--spacing-8` | `--font-size-xs` | `--font-icon-12` |
| `--sm` | `--spacing-44` × `--form-mouse-small` 24 | `--spacing-20` | `--spacing-2` | `--font-size-sm` 14 | `--spacing-8` | `--font-size-xs` | `--font-icon-14` |
| `--md` | `--spacing-52` × `--spacing-28` | `--spacing-24` | `--spacing-2` | `--font-size-base` 16 | `--spacing-12` | `--font-size-base` | `--font-icon-16` |
| `--lg` | `--spacing-60` × `--form-mouse` 32 | `--spacing-28` | `--spacing-2` | `--font-size-base` 16 | `--spacing-16` | `--font-size-base` | `--font-icon-16` |

Label weight is `--font-weight-medium` and tracking `--letter-spacing-normal` at every
size. The thumb travels the free space inside the padding box, so the transform is derived
— `track − 2 × padding − thumb` — rather than authored per size.

## States

| State | Track (OFF) | Track (ON) | Thumb |
| --- | --- | --- | --- |
| Default | `--background-content-bg-color-alt3` | `--toggle-on-bg-color` | `--cool-gray-white` + shadow |
| Hover | *identical to Default* | *identical to Default* | *identical* |
| Active | Default + ring | Default + ring | *identical* |
| Focus | Default + ring | Default + ring | *identical* |
| Disabled | `--background-content-bg-color-alt2` | `--toggle-on-bg-color-disabled` | `--background-content-bg-color-disabled`, no shadow |

Two things about that table are deliberate rather than oversights:

- The Figma *Hover* variant is pixel-identical to *Default* at every size in both OFF and
  ON — it exports the same asset — so no hover treatment is invented here. Worth raising
  with design: a control this small benefits from a rest-to-hover cue.
- The Figma *Active* variant differs from *Default* only by carrying the focus ring, so
  `:active` raises the ring rather than shifting a colour.

### Focus ring

Reproduces the Figma `$shadow-focus-ring2` effect — the same ring the Button and Checkbox
use — a 2px ring in the content background that separates the control from a 4px ring in
`--primary`:

```css
box-shadow: 0 0 0 var(--border-2) var(--background-content-bg-color),
            0 0 0 var(--border-4) var(--primary);
```

It is declared last so the ring survives a simultaneous change of track colour, and it is
bound to `:focus-visible`, so pointer clicks do not raise it.

## Token map

The input maps the shared tokens onto four channels, which the track and thumb rules then
consume. Nothing is hard-coded; retheming happens entirely in `tokens.css`.

| Channel | OFF resolves to | ON resolves to |
| --- | --- | --- |
| `--psds-toggle-track` | `--background-content-bg-color-alt3` | `--toggle-on-bg-color` |
| `--psds-toggle-track-disabled` | `--background-content-bg-color-alt2` | `--toggle-on-bg-color-disabled` |
| `--psds-toggle-thumb-color` | `--cool-gray-white` | `--cool-gray-white` |
| `--psds-toggle-thumb-color-disabled` | `--background-content-bg-color-disabled` | `--background-content-bg-color-disabled` |

The ON track uses its own `--toggle-on-bg-color` (green, `--green-500`), as in Figma
Avianis WEB V2 › Add Leg ([node `5171:41484`](https://www.figma.com/design/EVpOUjWdmWXGSQ3CazkzqM/Avianis-WEB-V2?node-id=5171-41484)),
so an enabled setting reads differently from a checked checkbox. The focus ring stays on
`--primary`.

## Accessibility

- The `<label>` wraps the input, so the whole control — switch, label, `*` and icon — is
  one click target and one accessible name. A toggle with no visible label (as in a modal
  [setting row](../../patterns/modal/modal.md#setting-rows)) needs a name another way: an
  `.sr-only` span, `aria-label`, or `aria-labelledby`.
- A switch is right for a standalone setting that takes effect on its own. For properties
  of a record that are saved with a form, especially several related ones, use
  [checkboxes](../checkbox/checkbox.md) instead; see [modal options](../../patterns/modal/modal.md#options-toggle-checkbox-or-nested).
  Add `role="switch"` if you need on/off rather than checked/unchecked announced.
- Prefer the real `disabled` attribute over `.is-disabled`; the class is presentational and
  removes pointer events but not keyboard focus or the accessible disabled state.
- `--xs` is a 40 × 20 target and `--sm` a 44 × 24 one. Only `--sm` and larger meet the 24px
  minimum of WCAG 2.2 *Target Size (Minimum)* on both axes, so reserve `--xs` for dense
  layouts where the label is part of the target.
- `--psds-toggle-required` is decorative — mark the input `required` (or `aria-required`)
  as well.
- Transitions are disabled under `prefers-reduced-motion: reduce`.

## Notes

- The source node ships no *Line* variant, so none is implemented.
- `tokens.css` declares no font-family token, so the Inter stack from the Figma text style
  is held in `--psds-toggle-font-family`, matching Button and Checkbox. Promote it to a
  global token when one is added.
- `tokens.css` likewise declares no shadow token. The Figma `$Shadow-sm` effect that lifts
  the thumb is held in `--psds-toggle-shadow`, built from spacing tokens plus the one raw
  value in the component, `#0000000d`.
- The `*` sizes are read off the Figma text frames: 12px at `--xs`/`--sm`, 16px at
  `--md`/`--lg`. Note this is one step coarser than [`text-box`](../text-box/text-box.md),
  which drops to `--font-size-xxs` at its smallest size.
- `toggle-switch.html` is a live gallery of the full matrix, including a dark-theme toggle.
