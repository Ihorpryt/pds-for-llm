# Tabs

Switches between panels of related content that share one place on the page. This is the
**horizontal** tab bar only — an underline marks the selected tab. Every visual value
resolves through a token declared in [`tokens.css`](../../tokens.css), so light and dark
themes need no component-level overrides.

**Figma source:** UI Kit — Tailwind 3 Theme (Portside Edition) › `Tab`
([node `5140:240641`](https://www.figma.com/design/2JfMgeZuQOt4atDR58pLs9/UI-Kit---Tailwind-3-Theme--Portside-Edition-?node-id=5140-240641)),
built from `_Atom / Tabs`
([node `5140:240678`](https://www.figma.com/design/2JfMgeZuQOt4atDR58pLs9/UI-Kit---Tailwind-3-Theme--Portside-Edition-?node-id=5140-240678)).
Only `Type = Horizontal` / `Line Position = Bottom` is implemented: 2 sizes × selected
on/off × 5 states. The Vertical type and the Top, Left and Right line positions are out of
scope. A [Glass](#glass) variant covers tabs on a coloured background.

```html
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="components/tabs/tabs.css">

<div class="psds-tabs psds-tabs--sm">
  <div class="psds-tabs__list" role="tablist" aria-label="Vessel call">
    <button class="psds-tabs__tab" role="tab" id="t-overview"
            aria-controls="p-overview" aria-selected="true">
      <span class="psds-tabs__label">Overview</span>
    </button>
    <button class="psds-tabs__tab" role="tab" id="t-cargo"
            aria-controls="p-cargo" aria-selected="false" tabindex="-1">
      <span class="psds-tabs__label">Cargo</span>
    </button>
  </div>
</div>
<div role="tabpanel" id="p-overview" aria-labelledby="t-overview">…</div>
<div role="tabpanel" id="p-cargo" aria-labelledby="t-cargo" hidden>…</div>
```

The stylesheet only draws the tabs. Switching panels, moving focus and scrolling need a
small script — [`tabs.html`](tabs.html) has a complete one to copy.

### Tabs or something else?

| Need | Use |
| --- | --- |
| Separate sections of a page or record | **Tabs** |
| Tabs on a coloured or dark bar (e.g. the secondary navigation) | **Tabs** `--glass` |
| A compact switch that changes a view in place (Day / Week / Month) | [Segmented controls](../segmented-controls/segmented-controls.md) |
| Picking a value in a form | [Radio buttons](../radio/radio.md) |
| Moving to a different page | Links, not tabs |

## Class API

| Axis | Classes | Default |
| --- | --- | --- |
| Size | `--sm` `--lg` | `--sm` |
| Variant | *(none = underline)* `--glass` | underline |

| Element | Class | Notes |
| --- | --- | --- |
| Bar | `.psds-tabs` | the full-width 1px bottom rule; holds the list and any scroll buttons |
| List | `.psds-tabs__list` | `role="tablist"`; scrolls sideways when the tabs don't fit |
| Tab | `.psds-tabs__tab` | `<button role="tab">` |
| Icon | `.psds-tabs__icon` | optional, before the label (Figma *Icons/Menu* slot) |
| Label | `.psds-tabs__label` | |
| Badge | `.psds-badge` | optional count (Figma *Badge* slot) — see [Slots](#slots) |
| Affix | `.psds-tabs__affix` | optional, after the label (Figma *chevron-down* / *Icons/Close*) |
| Close affix | `.psds-tabs__affix--close` | adds a pointer cursor to a close affix |
| Scroll button | `.psds-tabs__scroll` | optional, before and after the list (Figma *scroll*) |

Selection is not a modifier: it is `aria-selected="true"` on the tab, so the DOM stays the
source of truth. Disabled is the `disabled` attribute or `aria-disabled="true"`.

The forced-state helpers `.is-selected`, `.is-hover`, `.is-active`, `.is-focus` and
`.is-disabled` on a tab reproduce a state for documentation and visual-regression
galleries.

## Sizes

| Size | Figma | Tab height | Gap between tabs | Tab padding X | Font | Line height | Scroll button |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `--sm` | Small | `--spacing-48` 48 | `--spacing-16` | `--spacing-8` | `--font-size-sm` 14 | `--line-height-sm` 20 | `--spacing-28` wide, `--font-icon-14` glyph |
| `--lg` | Large | `--spacing-56` 56 | `--spacing-20` | `--spacing-12` | `--font-size-base` 16 | `--line-height-base` 24 | `--spacing-32` wide, `--font-icon-16` glyph |

The same at both sizes: label weight `--font-weight-medium`, tracking
`--letter-spacing-normal`, `--spacing-8` between items inside a tab, a 2px underline
(`--border-2`), a 20px icon box and 18px affix boxes.

`--sm` is the default per [`guidance.md`](../../guidance.md), and is also the default
variant of the Figma component set.

The tab's 2px underline sits on top of the bar's 1px `--border-light` rule, so the bar
is exactly one tab tall: 48px or 56px.

## States

| State | Unselected label / icon | Selected label | Selected icon | Underline |
| --- | --- | --- | --- | --- |
| Default | `--foreground-content-text-color-alt2` / `--icon-color` | `--foreground-content-text-color` | `--primary` | selected only: `--primary` |
| Hover | `--primary` | *unchanged* | *unchanged* | unchanged |
| Active | `--primary` | *unchanged* | *unchanged* | unchanged |
| Focus | `--primary` + ring | *unchanged* + ring | *unchanged* | unchanged |
| Disabled | `--foreground-content-text-color-disabled` / `--icon-color-disabled` | `--buttons-primary-bg-color-disabled` | same | selected only: `--buttons-primary-bg-color-disabled` |

**A selected tab does not react to hover or press.** Figma draws those variants the same
as Default. Hover, Active and Focus all look the same on an unselected tab too.

On a disabled tab the badge fades to 50% opacity, as in Figma.

### Focus ring

Figma's Focus variant only turns an unselected label primary, and changes nothing on a
selected tab. That isn't a visible enough focus indicator, so a 2px `--primary` ring is
added, drawn **inside** the tab:

```css
box-shadow: inset 0 0 0 var(--border-2) var(--primary);
```

It is drawn inside because the list hides its horizontal overflow, which would cut off an
outside ring. It is bound to `:focus-visible`, so mouse clicks don't show it.

## Slots

Figma's tab atom has optional items around the label. Use any combination, in this order:

```html
<button class="psds-tabs__tab" role="tab" aria-selected="false" tabindex="-1">
  <span class="psds-tabs__icon" aria-hidden="true"><span class="psds-icon">&#xf0c9;</span></span>
  <span class="psds-tabs__label">Cargo</span>
  <span class="psds-badge psds-badge--sm psds-badge--primary psds-badge--pill">12</span>
  <span class="psds-tabs__affix" aria-hidden="true"><span class="psds-icon">&#xf078;</span></span>
</button>
```

| Slot | Box | Content |
| --- | --- | --- |
| Icon | `--font-icon-20` | a Font Awesome glyph at 16px, or an `<svg>` / `<img>` |
| Badge | — | [`.psds-badge`](../badge/badge.md) `--primary --pill`, with `--sm` on Small tabs and `--lg` on Large tabs |
| Chevron | `--font-icon-18` | `chevron-down` (`f078`) at 14px — the tab opens a menu |
| Close | `--font-icon-18` | `xmark` (`f00d`) at 14px, with `.psds-tabs__affix--close` |

Icons and affixes use the tab's icon colour, so they change with it on hover and when
disabled. Load [`foundations/icons.css`](../../foundations/icons.css) for `.psds-icon`
and [`badge.css`](../badge/badge.css) for the badge.

A **close** affix sits inside the tab button, and a button can't contain another button.
Keep the affix `aria-hidden` and handle its click with a script (stop the click from
also selecting the tab). Also let <kbd>Delete</kbd> close the focused tab, so keyboard
users can close it too.

## Scrolling

When the tabs are wider than the bar, the list scrolls sideways with its scrollbar hidden.
To show arrow buttons, put a `.psds-tabs__scroll` on each side of the list:

```html
<div class="psds-tabs psds-tabs--sm">
  <button class="psds-tabs__scroll" type="button" tabindex="-1" aria-hidden="true">
    <span class="psds-icon">&#xf053;</span>
  </button>
  <div class="psds-tabs__list" role="tablist" aria-label="…">…</div>
  <button class="psds-tabs__scroll" type="button" tabindex="-1" aria-hidden="true">
    <span class="psds-icon">&#xf054;</span>
  </button>
</div>
```

The script sets `hidden` on them when nothing overflows, and `disabled` at either end.
They are mouse-only (`tabindex="-1"`, `aria-hidden`), because arrow keys already move
through the tabs and scroll the focused tab into view.

## Glass

`.psds-tabs--glass` is the Figma **Glass Tab**
([node `52466:112915`](https://www.figma.com/design/2JfMgeZuQOt4atDR58pLs9/UI-Kit---Tailwind-3-Theme--Portside-Edition-?node-id=52466-112915)),
built from `_Atom / Glass Tabs`. It draws compact, see-through pills instead of an
underline, and is meant for a **coloured or high-contrast background** such as the app's
blue secondary navigation bar. On a plain surface its white text can't be read, so use
the default underline tabs there.

```html
<div class="psds-tabs psds-tabs--glass">
  <div class="psds-tabs__list" role="tablist" aria-label="Operations">
    <button class="psds-tabs__tab" role="tab" aria-selected="false" tabindex="-1">
      <span class="psds-tabs__label">Trip Search</span>
    </button>
    <button class="psds-tabs__tab" role="tab" aria-selected="true">
      <span class="psds-tabs__label">Flight Leg Search</span>
    </button>
  </div>
</div>
```

The markup, ARIA and script are the same as for the underline tabs; only the modifier
changes. Glass has a single size, so don't add `--sm` / `--lg`. The bar has no bottom
line and no scroll buttons are drawn.

| Property | Value |
| --- | --- |
| Tab height | `--spacing-24` 24 |
| Tab padding X | `--spacing-6` |
| Gap between tabs | `--spacing-8` |
| Radius | `--control-radius-btn-default-radius` 8 |
| Font | `--font-size-xs` 12 / `--line-height-xs` 16, `--font-weight-medium` |

| State | Text | Background |
| --- | --- | --- |
| Unselected | `--foreground-glass-text-color` (white 75%) | transparent |
| Selected | `--primary-text-color` (white) | `--background-glass-bg-color-alt1` (white 25%) |
| Hover *(added)* | `--primary-text-color` | unchanged |
| Focus *(added)* | `--primary-text-color` + 2px white inset ring | unchanged |
| Disabled *(added)* | unchanged | unchanged, whole tab at 50% opacity |

Figma defines only Selected on / off. The three states marked *added* are not in the
design: they give feedback on hover and keyboard focus, and a disabled look that matches
the badge fade in the underline tabs. Change or remove them once Figma adds these states.

The glass tokens have no dark-theme values in `tokens.css`, so Glass looks the same in
both themes. That is expected, because the background behind it doesn't change with the
theme either. Don't use the icon, badge or affix slots on glass tabs, since their colours
are tuned for a light surface.

## Token map

| Channel | Unselected | Selected |
| --- | --- | --- |
| `--psds-tabs-fg` | `--foreground-content-text-color-alt2` | `--foreground-content-text-color` |
| `--psds-tabs-fg-hover` | `--primary` | `--foreground-content-text-color` |
| `--psds-tabs-fg-disabled` | `--foreground-content-text-color-disabled` | `--buttons-primary-bg-color-disabled` |
| `--psds-tabs-icon-color` | `--icon-color` | `--primary` |
| `--psds-tabs-icon-color-hover` | `--primary` | `--primary` |
| `--psds-tabs-icon-color-disabled` | `--icon-color-disabled` | `--buttons-primary-bg-color-disabled` |
| `--psds-tabs-line-color` | `--transparent` | `--primary` |
| `--psds-tabs-line-color-disabled` | `--transparent` | `--buttons-primary-bg-color-disabled` |

The size channel (`--psds-tabs-height`, `-gap`, `-padding`, `-font-size`, `-line-height`,
`-scroll`, `-scroll-icon`) is set on the bar by `--sm` / `--lg`.

## Accessibility

- Use the full ARIA tabs pattern: `role="tablist"` with an `aria-label` on the list,
  `role="tab"` with `aria-selected` and `aria-controls` on each tab, and `role="tabpanel"`
  with `aria-labelledby` on each panel.
- Use a roving `tabindex`: the selected tab has `tabindex="0"` and the others `-1`, so
  <kbd>Tab</kbd> goes into the list once and then on to the panel. Inside the list,
  <kbd>←</kbd> / <kbd>→</kbd> move between tabs, <kbd>Home</kbd> / <kbd>End</kbd> jump to
  the first / last tab, and disabled tabs are skipped.
- For a disabled tab, prefer `aria-disabled="true"` over `disabled`, so screen readers
  still announce the tab. The styles treat both the same way.
- `.is-disabled` is visual only. It blocks mouse clicks but not keyboard focus, and it
  doesn't tell screen readers the tab is disabled.
- Tabs are 48px or 56px tall, well above the 24px minimum target size in WCAG 2.2.
- Transitions and smooth scrolling are turned off under `prefers-reduced-motion: reduce`.

## Notes

- **Small tab padding is normalised to 8px.** In Figma a Small tab has 4px side padding
  when unselected and 8px when selected, so selecting a tab would shift everything after
  it by 8px. Both states use 8px here. Large tabs use 12px in both states in Figma too.
- **Line position.** Only the bottom underline is built. The Top / Left / Right line
  positions and the Vertical type in Figma are not.
- The underline is a 2px bottom border on the tab, with a matching transparent top border
  so the label stays vertically centred.
- `tokens.css` has no `--tabs-*` colour tokens. The Figma file uses `--primary` for the
  underline and the primary **button** disabled colour for a disabled selected tab, and
  those are used here as-is.
- Tab heights 48 / 56 and scroll-button widths 28 / 32 are fixed numbers in Figma, not
  variables. Here they use the `--spacing-*` tokens with the same values.
- `tokens.css` has no font-family token, so the Inter font stack from the Figma text style
  is kept in `--psds-tabs-font-family` on the component.
- `tabs.html` shows every size and state, all the slots, the Glass variant on a coloured
  bar, a dark-theme toggle, and a working tab list with panels, keyboard support and
  scroll buttons. The blue bar behind the Glass demo is page styling, not a token.
