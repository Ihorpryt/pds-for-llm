# Dropdown Button

A button that opens a menu. It is a [`Button`](../button/button.md) with a trailing
chevron and an optional leading icon — every visual value resolves through a token
declared in [`tokens.css`](../../tokens.css), so light and dark themes need no
component-level overrides.

**Figma source:** UI Kit — Tailwind 3 Theme (Portside Edition) › `Dropdown Button`
([node `336:602`](https://www.figma.com/design/2JfMgeZuQOt4atDR58pLs9/UI-Kit---Tailwind-3-Theme--Portside-Edition-?node-id=336-602))
— 720 variants: 4 sizes × 6 types × 2 shapes × 3 modes × 5 states.

```html
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="components/dropdown-button/dropdown-button.css">

<button class="psds-dropdown-btn psds-dropdown-btn--md psds-dropdown-btn--primary"
        type="button" aria-haspopup="menu" aria-expanded="false">
  <span class="psds-dropdown-btn__icon" aria-hidden="true"><svg viewBox="0 0 16 16">…</svg></span>
  Dropdown Button
  <span class="psds-dropdown-btn__chevron" aria-hidden="true"><svg viewBox="0 0 16 16">…</svg></span>
</button>
```

## Class API

| Axis | Classes | Default |
| --- | --- | --- |
| Size | `--xs` `--sm` `--md` `--lg` | `--md` |
| Type | `--primary` `--secondary` `--info` `--success` `--warning` `--danger` | — (required) |
| Mode | *(none = Filled)* `--outlined` `--flat` | Filled |
| Shape | *(none = Rounded)* `--pill` | Rounded |

| Element | Class | Required |
| --- | --- | --- |
| Leading icon | `.psds-dropdown-btn__icon` | optional |
| Trailing chevron | `.psds-dropdown-btn__chevron` | yes |

`.psds-dropdown-btn` alone carries no colour; always pair it with a type. The Figma mode
is named *Outline*; the class is `--outlined` to match [`Button`](../button/button.md).
The forced-state helpers `.is-hover`, `.is-active`, `.is-focus` and `.is-disabled`
reproduce a state for documentation and visual-regression galleries — real interaction is
handled by `:hover`, `:active`, `:focus-visible` and `[disabled]`.

## Sizes

| Size | Height | Font | Line height | Padding&nbsp;X | Gap | Icon | Radius |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `--xs` | `--form-mouse-small` 24 | `--font-size-xs` 12 | `--line-height-xs` 16 | `--spacing-8` | `--spacing-6` | `--font-icon-12` | `--control-radius-btn-default-radius` |
| `--sm` | `--form-mouse` 32 | `--font-size-sm` 14 | `--line-height-sm` 20 | `--spacing-10` | `--spacing-6` | `--font-icon-14` | `--control-radius-btn-default-radius` |
| `--md` | `--form-bigger-small` 36 | `--font-size-base` 16 | `--line-height-base` 24 | `--spacing-10` | `--spacing-6` | `--font-icon-16` | `--control-radius-btn-default-radius` |
| `--lg` | `--form-bigger` 40 | `--font-size-base` 16 | `--line-height-base` 24 | `--spacing-10` | `--spacing-8` | `--font-icon-16` | `--control-radius-btn-bigger-radius` |

Label weight is `--font-weight-medium` and tracking `--letter-spacing-normal` at every
size.

**The size ramp is not Button's.** Inline padding barely moves across it (8 / 10 / 10 / 10
against Button's 8 / 10 / 14 / 16) because the chevron is what gives the control its
width, and the icons are bound per size rather than scaling with the label — `--md` and
`--lg` share `--font-icon-16` despite `--lg` being the taller control. Do not share size
tokens between the two components.

`--pill` swaps the radius for `--radius-full` and, unlike Button, changes nothing else:
the Figma *Full Rounded* variants have exactly the same padding and width as *Rounded*.

> One source-file inconsistency: the *Large / Full Rounded* variants in Figma keep
> `--control-radius-btn-bigger-radius` instead of `--radius-full`. Extra Small, Small and
> Medium all bind `--radius-full`, so this file applies `--radius-full` at every size and
> treats Large as the outlier.

## States

Filled is the base treatment. **Outlined and Flat differ at rest and when disabled** — on hover and
active every mode collapses onto the filled treatment, as the Figma variants do.

| Mode | Enabled | Hover | Active | Focus | Disabled |
| --- | --- | --- | --- | --- | --- |
| Filled | filled | filled `-hover` | filled `-pressed` | filled `-focus` + ring | filled `-disabled` |
| Outlined | transparent + border | filled `-hover` | filled `-pressed` | transparent + `-focus` border + ring | transparent + `-disabled` border |
| Flat | transparent, no border | filled `-hover` | filled `-pressed` | filled `-focus` + ring | transparent, no border, `-disabled` accent label |

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

### Open state

The source node ships no open variant. This file adds one convention on top of it:
`[aria-expanded="true"]` rotates the chevron 180°. Authors who never set the attribute get
exactly the Figma behaviour.

## Token map

The type modifiers consume the **same** `--buttons-*` tokens as
[`Button`](../button/button.md), so the two components stay in step through any retheme.

| Channel | Resolves to | Used by |
| --- | --- | --- |
| `--psds-dropdown-btn-bg[-state]` | `--buttons-{type}-bg-color[-state]` | Filled surface |
| `--psds-dropdown-btn-border[-state]` | `--buttons-{type}-border-color[-state]` | All modes |
| `--psds-dropdown-btn-fg[-state]` | `--buttons-{type}-text[-state]` | Label on a filled surface |
| `--psds-dropdown-btn-accent` | `--buttons-{type}-accent` | Label on a transparent surface (Outlined / Flat) |
| `--psds-dropdown-btn-accent-disabled` | `--buttons-{type}-bg-color-disabled` | Disabled Outlined / Flat label |
| `--psds-dropdown-btn-outline` | `--buttons-{type}-accent` (Secondary: `-border-color`) | Outlined border at rest |

State suffixes are `-hover`, `-pressed`, `-focus` and `-disabled`.

Two deliberate exceptions, both taken from the Figma bindings:

- **Secondary** is the one type whose label token is authored as
  `--buttons-secondary-text-color…` rather than `--buttons-secondary-text…`, and its
  `accent` channel points at that text colour rather than at its background — Secondary's
  background is a surface, not an accent.
- Transparent surfaces use `--transparent`, not `transparent`, so the value stays a token.

## Icons

Both slots take the same per-size icon token, so a leading icon and the chevron are always
the same size. Use `currentColor` in the icon so it follows the label through every state.

```html
<button class="psds-dropdown-btn psds-dropdown-btn--sm psds-dropdown-btn--secondary" type="button">
  Sort by
  <span class="psds-dropdown-btn__chevron" aria-hidden="true"><svg viewBox="0 0 16 16">…</svg></span>
</button>
```

The chevron is not optional — it is what distinguishes a dropdown button from a
[`Button`](../button/button.md). If you need the same control without a menu, use a Button
instead of dropping the chevron.

## Accessibility

- Use `<button type="button">`; set `type` explicitly inside a `<form>` to avoid an
  accidental submit.
- Pair the control with `aria-haspopup="menu"` (or `listbox`/`dialog`, matching what
  actually opens) and keep `aria-expanded` in sync with the menu — the chevron rotation is
  driven by that attribute, so the visual and the semantics cannot drift apart.
- Mark both icon slots `aria-hidden="true"`. The chevron is decorative; the accessible
  name comes from the label and `aria-expanded` conveys the open state.
- Prefer the real `disabled` attribute over `.is-disabled`; the class is presentational and
  removes pointer events but not keyboard focus or the accessible disabled state.
- Every size meets the 24px minimum target of WCAG 2.2 *Target Size (Minimum)*; `--xs` sits
  exactly at it, so give it room in dense layouts.
- Flat dropdown buttons in their rest state read as text with a chevron. Keep them for
  tertiary menus where surrounding context makes the affordance obvious.
- Transitions are disabled under `prefers-reduced-motion: reduce`.

## Notes

- `tokens.css` declares no font-family token, so the Inter stack from the Figma text style
  is held in `--psds-dropdown-btn-font-family` on the component and is the one value not
  sourced from `tokens.css`. Promote it to a global token when one is added.
- `dropdown-button.html` is a live gallery of the full matrix, including a dark-theme
  toggle.
