# Icon Button

A square button whose only content is a glyph. It shares
[`Button`](../button/button.md)'s colour model — the icon simply stands in for the label —
and every visual value resolves through a token declared in
[`tokens.css`](../../tokens.css), so light and dark themes need no component-level
overrides.

**Figma source:** UI Kit — Tailwind 3 Theme (Portside Edition) › `Icon Button`
([node `4755:58467`](https://www.figma.com/design/2JfMgeZuQOt4atDR58pLs9/UI-Kit---Tailwind-3-Theme--Portside-Edition-?node-id=4755-58467))
— 720 variants: 4 sizes × 6 types × 2 shapes × 3 modes × 5 states.

```html
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="components/icon-button/icon-button.css">

<button class="psds-icon-btn psds-icon-btn--md psds-icon-btn--primary"
        type="button" aria-label="Add item">
  <span class="psds-icon-btn__icon" aria-hidden="true"><svg viewBox="0 0 16 16">…</svg></span>
</button>
```

## Class API

| Axis | Classes | Default |
| --- | --- | --- |
| Size | `--xs` `--sm` `--md` `--lg` | `--md` |
| Type | `--primary` `--secondary` `--info` `--success` `--warning` `--danger` | — (required) |
| Mode | *(none = Filled)* `--outlined` `--flat` | Filled |
| Shape | *(none = Round)* `--circle` | Round |

`.psds-icon-btn` alone carries no colour; always pair it with a type. Figma names the
shape axis *Round* / *Full Round*; the modifier is `--circle` because on a square control
that is literally what it produces — the counterpart of Button's `--pill`. The
forced-state helpers `.is-hover`, `.is-active`, `.is-focus` and `.is-disabled` reproduce a
state for documentation and visual-regression galleries — real interaction is handled by
`:hover`, `:active`, `:focus-visible` and `[disabled]`.

## Sizes

| Size | Box | Icon | Radius |
| --- | --- | --- | --- |
| `--xs` | `--form-mouse-small` 24 | `--font-icon-12` | `--control-radius-btn-default-radius` 8 |
| `--sm` | `--form-mouse` 32 | `--font-icon-14` | `--control-radius-btn-default-radius` 8 |
| `--md` | `--form-bigger-small` 36 | `--font-icon-16` | `--control-radius-btn-bigger-small-radius` 6 |
| `--lg` | `--form-bigger` 40 | `--font-icon-16` | `--control-radius-btn-bigger-radius` 8 |

The control is a square with no padding: the box token sets both dimensions and the icon
is centred inside it. Icons are bound per size rather than scaled from a font size, so
`--md` and `--lg` share `--font-icon-16` despite `--lg` being the larger box.

> Two things in that table look like slips but are the Figma bindings. `--md` is the one
> size whose radius comes from `--control-radius-btn-bigger-small-radius` (6px) — the
> other three land on 8px. And the *Full Round* variants differ from *Round* by radius
> only, so `--circle` changes nothing else.

## States

Filled is the base treatment. **Outlined and Flat only differ at rest** — on hover and
active every mode collapses onto the filled treatment, as the Figma variants do.

| Mode | Enabled | Hover | Active | Focus | Disabled |
| --- | --- | --- | --- | --- | --- |
| Filled | filled | filled `-hover` | filled `-pressed` | filled `-focus` + ring | filled `-disabled` |
| Outlined | transparent + border | filled `-hover` | filled `-pressed` | transparent + `-focus` border + ring | transparent + `-disabled` border |
| Flat | transparent, no border | filled `-hover` | filled `-pressed` | filled `-focus` + ring | filled `-disabled` |

The Figma *Active* state maps to the `-pressed` token suffix.

### Focus ring

Reproduces the Figma `$shadow-focus-ring2` effect — a 2px ring in the content background
that separates the control from a 4px ring in `--primary`:

```css
box-shadow: 0 0 0 var(--border-2) var(--background-content-bg-color),
            0 0 0 var(--border-4) var(--primary);
```

It is declared last so the ring survives a simultaneous hover, and it is bound to
`:focus-visible`, so pointer clicks do not raise it.

## Token map

The type modifiers consume the **same** `--buttons-*` tokens as
[`Button`](../button/button.md), so the two components stay in step through any retheme.

| Channel | Resolves to | Used by |
| --- | --- | --- |
| `--psds-icon-btn-bg[-state]` | `--buttons-{type}-bg-color[-state]` | Filled surface |
| `--psds-icon-btn-border[-state]` | `--buttons-{type}-border-color[-state]` | All modes |
| `--psds-icon-btn-fg[-state]` | `--buttons-{type}-text[-state]` | Glyph on a filled surface |
| `--psds-icon-btn-accent[-state]` | `--buttons-{type}-bg-color[-state]` | Glyph on a transparent surface |

State suffixes are `-hover`, `-pressed`, `-focus` and `-disabled`.

Two deliberate exceptions, both taken from the Figma bindings:

- **Secondary** is the one type whose glyph token is authored as
  `--buttons-secondary-text-color…` rather than `--buttons-secondary-text…`, and its
  `accent` channel points at that text colour rather than at its background — Secondary's
  background is a surface, not an accent.
- Transparent surfaces use `--transparent`, not `transparent`, so the value stays a token.

## Icons

The glyph goes in `.psds-icon-btn__icon`, which is sized from
`--psds-icon-btn-icon-size`. Use `currentColor` in the icon so it follows the colour
channel through every state — that is how the Figma variants recolour the glyph between
Filled (`-text`) and Outlined/Flat (`-bg-color`).

```html
<button class="psds-icon-btn psds-icon-btn--sm psds-icon-btn--secondary psds-icon-btn--circle"
        type="button" aria-label="Close">
  <span class="psds-icon-btn__icon" aria-hidden="true">
    <svg viewBox="0 0 16 16" fill="currentColor"><path d="…"/></svg>
  </span>
</button>
```

Exactly one glyph belongs in the slot. For an icon plus a label use
[`Button`](../button/button.md); for an icon plus a menu use
[`Dropdown Button`](../dropdown-button/dropdown-button.md).

## Accessibility

- **The control has no visible text, so it needs an accessible name.** Give every icon
  button an `aria-label` (or `aria-labelledby`) describing the action, and mark the icon
  slot `aria-hidden="true"` so the glyph is not announced alongside it.
- Use `<button type="button">` for actions; set `type` explicitly inside a `<form>` to
  avoid an accidental submit.
- Prefer the real `disabled` attribute over `.is-disabled`; the class is presentational and
  removes pointer events but not keyboard focus or the accessible disabled state.
- Every size meets the 24px minimum target of WCAG 2.2 *Target Size (Minimum)*; `--xs` sits
  exactly at it, so give it room in dense layouts such as toolbars and table rows.
- A tooltip is not a substitute for the accessible name — it does not reach touch or
  keyboard users. Set the label whether or not a tooltip is present.
- Flat icon buttons in their rest state are a bare glyph. Keep them for toolbars and other
  contexts where the affordance is established by grouping.
- Transitions are disabled under `prefers-reduced-motion: reduce`.

## Notes

- Unlike its siblings this component sets no typography at all, so it needs no
  font-family value — the one token [`Button`](../button/button.md) cannot source from
  `tokens.css` simply does not arise here.
- `icon-button.html` is a live gallery of the full matrix, including a dark-theme toggle.
