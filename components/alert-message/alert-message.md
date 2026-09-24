# Alert Message

An inline banner that reports the outcome or state of something — a status line, an
optional description, an optional dismiss control and an optional button row. The
component is a styling layer over a `<div>`; every visual value resolves through a token
declared in [`tokens.css`](../../tokens.css), so light and dark themes need no
component-level overrides.

**Figma source:** UI Kit — Tailwind 3 Theme (Portside Edition) › `Alert Message`
([node `647:3190`](https://www.figma.com/design/2JfMgeZuQOt4atDR58pLs9/UI-Kit---Tailwind-3-Theme--Portside-Edition-?node-id=647-3190))
— 120 variants: 2 sizes × 3 modes × 5 types × 2 button positions × 2 shadows. The
icon, close control, title, description and button row are boolean properties on top of
that matrix, not variants.

```html
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="components/alert-message/alert-message.css">

<div class="psds-alert psds-alert--sm psds-alert--info" role="status">
  <div class="psds-alert__body">
    <span class="psds-alert__icon" aria-hidden="true"><svg viewBox="0 0 16 16">…</svg></span>
    <div class="psds-alert__content">
      <p class="psds-alert__title">New Message Notification</p>
    </div>
    <button class="psds-alert__close" type="button" aria-label="Dismiss">
      <svg viewBox="0 0 16 16" aria-hidden="true">…</svg>
    </button>
  </div>
</div>
```

## Class API

| Axis | Classes | Default |
| --- | --- | --- |
| Size | `--sm` `--lg` | `--sm` |
| Type | `--default` `--info` `--success` `--warning` `--danger` | — (required) |
| Mode | *(none = Subtle)* `--ascent` `--outline` | Subtle |
| Button position | *(none = Bottom Left)* `--actions-end` | Bottom Left |
| Shadow | *(none = OFF)* `--shadow` | OFF |

`.psds-alert` alone carries no colour; always pair it with a type. The alert ships no
interaction states — the source node defines none — so there are no hover, focus or
disabled rules on the container.

Cascade order in the stylesheet is **Size → Type → Mode → Shadow**.

## Anatomy

| Element | Required | Role |
| --- | --- | --- |
| `.psds-alert__body` | yes | The icon / text / close row. |
| `.psds-alert__icon` | no | Leading status glyph, centred on the first line of the title. |
| `.psds-alert__content` | yes | Title + description column; it takes the remaining width. |
| `.psds-alert__title` | yes | `--font-weight-medium`. |
| `.psds-alert__description` | no | Second line, `--font-weight-normal`. |
| `.psds-alert__close` | no | Dismiss button. |
| `.psds-alert__actions` | no | Button row, one gap below the body. |

## Sizes

| Size | Height (one line) | Font | Line height | Padding | Gap | Title↔description | Icon | Close slot | Radius |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `--sm` | 44 | `--font-size-sm` 14 | `--line-height-sm` 20 | `--spacing-12` / `--spacing-16` | `--spacing-12` | `--spacing-4` | `--font-icon-16` | `--spacing-12` | `--control-radius-message-default-radius` 6 |
| `--lg` | 56 | `--font-size-base` 16 | `--line-height-base` 24 | `--spacing-16` / `--spacing-18` | `--spacing-12` | `--spacing-6` | `--font-icon-18` | `--spacing-16` | `--control-radius-message-bigger-radius` 8 |

The padding column is *block and inline-start / inline-end*: the right step is one stop
larger than the other three, so the close glyph — which overhangs its slot, see below —
keeps a full padding step of clear space. The gap is the same 12px at both sizes; only
the padding, type scale and radius change.

Figma draws the stroke *inside* the frame, so the content sits exactly one padding step
from the outer edge in every mode and the overall height is 44 / 56 including the border.
The 1px is declared on every alert — `var(--transparent)` where the mode draws no stroke —
so the height never shifts between modes, and the padding gives that pixel back:
`padding: calc(var(--psds-alert-padding) - var(--border-1)) …`.

The icon slot is one line tall at `--sm` (20px) but **22px** at `--lg`, two below the
24px line box. That is what the source node authors, so it is reproduced as-is; the glyph
lands a pixel above the optical centre of the first line. The close slot keeps the full
line height at both sizes.

### The close slot

Figma parks the close glyph in a slot **narrower than the glyph itself** — a 12px slot
around a 16px icon at `--sm`, 16px around 18px at `--lg` — so the mark overhangs its slot
by a pixel or two on each side and the text column keeps its full width. The rule is
reproduced as-is. A 12px control is far below any target-size guidance, so
`.psds-alert__close::before` widens the *hit* area to `--form-mouse-small` (24px) without
moving the glyph.

## Modes

| Mode | Surface | Border | Text & icon | Figma suffix |
| --- | --- | --- | --- | --- |
| Subtle | tinted | none (`--transparent`) | type colour | *(none)* |
| `--ascent` | solid type colour | type colour | inverted | `-alt2` |
| `--outline` | `--transparent` | type colour | type colour | `-alt1` |

Subtle is **borderless**: the tint alone separates it from the page. The 1px is still
reserved as a transparent border so all three modes are the same height. The one exception
is `--shadow`, which restores the type border on Subtle — see below.

The close mark is the one channel that does **not** follow the text: in Subtle and Outline
it stays `--icon-color` (neutral grey) and only Ascent flips it to the inverted colour.

## Actions

The button row sits one gap below the body and is indented 26px from the content edge, so
the buttons start under the text column rather than under the icon. The indent is a flat
26px at both sizes in the source node — it is not derived from the icon size — and
`--actions-end` stretches the row to full width and pushes it right, Figma's
*Bottom Right*, keeping the same 26px on the left.

Use [`Button`](../button/button.md) at `--sm` inside a `--sm` alert and at `--lg` inside a
`--lg` alert, which is what the source node's *Message Button* atom does (a 32px primary +
secondary pair at `--sm`, 40px at `--lg`). Buttons are spaced `--spacing-12` apart.

```html
<div class="psds-alert psds-alert--sm psds-alert--warning psds-alert--actions-end">
  <div class="psds-alert__body">…</div>
  <div class="psds-alert__actions">
    <button class="psds-btn psds-btn--sm psds-btn--warning" type="button">Upgrade</button>
    <button class="psds-btn psds-btn--sm psds-btn--secondary" type="button">Later</button>
  </div>
</div>
```

## Shadow

`--shadow` applies the Figma `$Shadow-lg` effect, for alerts that float above content
rather than sitting in the flow. It also **restores the type border on Subtle** — a
floating card needs an edge against whatever it covers. Outline and Ascent already own
their border and are unaffected.

```css
box-shadow: 0 var(--spacing-10) var(--spacing-15) calc(-1 * var(--spacing-3)) #0000001a,
            0 var(--spacing-4)  var(--spacing-6)  var(--spacing-2)            #0000000d;
```

## Token map

Each type modifier maps the shared message tokens onto three sets of five channels, which
the mode rules then consume. Nothing is hard-coded; retheming happens entirely in
`tokens.css`.

| Channel | Resolves to |
| --- | --- |
| `--psds-alert-{mode}-bg` | `--message-{type}-bg-color[-alt1\|-alt2]` |
| `--psds-alert-{mode}-border` | `--message-{type}-border-color[…]` |
| `--psds-alert-{mode}-fg` | `--message-{type}-color[…]` |
| `--psds-alert-{mode}-icon` | `--message-{type}-icon-color[…]` |
| `--psds-alert-{mode}-close` | `--message-{type}-close-icon-color[…]` |

`{mode}` is `subtle` / `outline` / `ascent`, matching Figma's *(none)* / `-alt1` / `-alt2`.

Two things worth knowing about the source tokens:

- **Danger** is the one type whose Subtle surface and border are authored as raw hex in
  the Figma library (`#fff5f5` / `#fc8181`) rather than palette steps. `tokens.css`
  already carries both, so nothing is hard-coded in the component.
- The Outline surface is `--transparent`, not `transparent`, so the value stays a token.

## Accessibility

- Give the container a live-region role: `role="status"` (polite) for informational,
  success and warning messages, `role="alert"` (assertive) for errors that interrupt.
  Insert the element into the DOM *after* the region exists so the announcement fires.
- The close control is a real `<button type="button">` and needs an `aria-label` — the
  glyph carries no text. Its focus ring is the one state this component adds beyond the
  source node, reusing Button's `$shadow-focus-ring2` treatment so keyboard users can see
  where they are.
- Mark `.psds-alert__icon` `aria-hidden="true"`; it repeats what the text already says.
  Never rely on the type colour alone to carry meaning.
- Outline mode has no surface of its own, so it inherits whatever sits behind it. Keep it
  on `--background-content-bg-color` or a neutral alt; on a coloured panel the text
  contrast is no longer guaranteed.

## Icons

The source node ships **Circle info in every type** — the icon is a swappable instance,
not a per-type binding, so no glyph is baked into the CSS. The slot is
`--psds-alert-icon-size` wide and one line tall, and the icon should use `currentColor` so
it follows the mode:

```html
<span class="psds-alert__icon" aria-hidden="true">
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">…</svg>
</span>
```

Per [`guidance.md`](../../guidance.md), reach for a Font Awesome glyph first —
`circle-info`, `circle-check`, `triangle-exclamation`, `circle-exclamation` — and use a
custom mark only when none fits.

## Notes

- `tokens.css` declares no shadow token, so the two `$Shadow-lg` colours are the only
  values on this component not sourced from it. Promote them when a shadow scale is added.
- `tokens.css` declares no font-family token either; the Inter stack from the Figma text
  style is held in `--psds-alert-font-family`, matching Button.
- The description is hidden by default in the source variants, so its weight is read from
  the property default rather than a live binding: `--font-weight-normal`, keeping the
  title dominant. Size and line height match the title.
- Danger is the one type whose Subtle description is authored a shade lighter than its
  title (`--message-danger-color-alt1` vs `--message-danger-color`). The component keeps
  both lines on `--psds-alert-fg`; split the channel if that shade turns out to be
  deliberate rather than an authoring artefact.
- `tokens.css` has no `--spacing-26`, so the action-row indent is written as
  `calc(var(--spacing-24) + var(--spacing-2))`. Replace it when the token lands.
- In the source node, the *Small / Outline / Default* variant alone parks the description
  outside the text column as a full-width sibling of the icon row. Every other variant
  keeps it inside the column, which is what this component does.
- `alert-message.html` is a live gallery of the full matrix, including a dark-theme toggle.
