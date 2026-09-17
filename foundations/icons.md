# Icons

Portside uses **Font Awesome 7 Free 7.3.1**, self-hosted from [`icons/`](../icons).
[`icons.css`](icons.css) declares the two faces and the `.psds-icon` box that sizes and
colours a glyph from [`tokens.css`](../tokens.css).

```html
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="foundations/icons.css">

<span class="psds-icon" aria-hidden="true">&#xf002;</span>
```

The glyph goes in the markup as its Unicode escape. There is no name-to-codepoint map —
look the value up on [fontawesome.com/icons](https://fontawesome.com/icons) (it is shown
next to the icon, e.g. `f002`) and confirm the icon is Free rather than Pro.

Write it as an HTML entity, `&#xf002;`, not as the raw character — the character itself is
invisible in most editors and does not survive copy-paste reliably.

## Sizes

The default is `1em`, so an icon with no size modifier matches the text around it. That is
the right choice inside a button, badge or link.

| Modifier | Size | Token | Use for |
| --- | --- | --- | --- |
| *(none)* | `1em` | — | Inside a button, badge, link or any text run |
| `--xs` | 12px | `--font-icon-12` | Dense rows, `--xs` controls |
| `--sm` | 14px | `--font-icon-14` | Alongside `.text-small`, the product UI default |
| `--md` | 16px | `--font-icon-16` | Standalone action icons, field affixes |
| `--lg` | 20px | `--font-icon-20` | Modal close, toolbar actions |
| `--xl` | 24px | `--font-icon-24` | Empty states, item card tiles |

## Colours

The base class paints with `currentColor`, so an icon inside a button or link follows its
label through hover, active and disabled with no extra class. **Leave it alone in those
places.** The modifiers are for an icon that stands alone and has no label colour to
inherit.

| Modifier | Token |
| --- | --- |
| `--muted` | `--icon-color` — the default standalone icon colour |
| `--disabled` | `--icon-color-disabled` |
| `--primary` `--info` `--success` `--warning` `--danger` | the matching semantic token |

`--muted` also picks up `--icon-color-hover` and `--icon-color-pressed` from a hovered or
pressed ancestor, which is what an icon in a table row or list item hangs off.

## Solid and regular

`.psds-icon` draws the Solid cut, which is the default treatment throughout the system.
`.psds-icon--regular` switches to the outline cut, but only **169 of the 1,422** Free icons
have one — the rest draw a **missing-glyph box**, not nothing. If an outline icon looks
wrong, that is why. Check on fontawesome.com before reaching for it.

## Busy states

`.psds-icon--spin` rotates once per second and is disabled under
`prefers-reduced-motion: reduce`. Pair it with the spinner glyph, `f110`.

```html
<button class="psds-btn psds-btn--sm psds-btn--primary" type="button" disabled>
  <span class="psds-icon psds-icon--spin" aria-hidden="true">&#xf110;</span>
  Saving…
</button>
```

## Common glyphs

Enough to build most screens without a lookup. Everything else is on fontawesome.com.

| Icon | Code | Icon | Code | Icon | Code |
| --- | --- | --- | --- | --- | --- |
| magnifying-glass | `f002` | plus | `2b` | check | `f00c` |
| xmark | `f00d` | pen-to-square | `f044` | trash | `f1f8` |
| chevron-up | `f077` | chevron-down | `f078` | chevron-left | `f053` |
| chevron-right | `f054` | arrow-left | `f060` | arrow-right | `f061` |
| bars | `f0c9` | ellipsis | `f141` | ellipsis-vertical | `f142` |
| gear | `f013` | filter | `f0b0` | download | `f019` |
| circle-check | `f058` | circle-xmark | `f057` | circle-info | `f05a` |
| triangle-exclamation | `f071` | circle-exclamation | `f06a` | spinner | `f110` |
| user | `f007` | users | `f0c0` | calendar | `f133` |
| envelope | `f0e0` | bell | `f0f3` | clock | `f017` |
| file | `f15b` | folder | `f07b` | paperclip | `f0c6` |
| eye | `f06e` | eye-slash | `f070` | lock | `f023` |

Every code above was checked against the cmap of the two bundled font files.

## Custom icons

Per [`guidance.md`](../guidance.md), reach for a Font Awesome glyph first. When there is no
suitable one, put an `<svg>` inside `.psds-icon` — it is sized to the box and inherits the
same size and colour modifiers:

```html
<span class="psds-icon psds-icon--md" aria-hidden="true">
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75">…</svg>
</span>
```

Use `currentColor` in the SVG so it follows the label through every state.

## Accessibility

- **Decorative icons need `aria-hidden="true"`.** An icon beside a text label is
  decorative — the label already names the control. Without it, some screen readers
  announce the private-use character.
- **An icon that is the only content of a control needs a name on the control**, not on the
  icon: `<button aria-label="Delete">`. Keep `aria-hidden="true"` on the glyph.
- Never use an icon as the sole carrier of meaning — pair status icons with text or a
  label, since colour and shape alone fail for colour-blind and low-vision users.
- The glyphs are private-use characters. `.psds-icon` sets `user-select: none` so they do
  not end up in copied text.
- `.psds-icon--spin` respects `prefers-reduced-motion: reduce`.

## Notes

- Both faces are declared under one family, `"Font Awesome 7 Free"`, with the weight
  selecting the cut — the way Font Awesome ships them.
- `font-display: block` keeps the box empty until the font arrives rather than flashing a
  fallback character. Icon fonts have no sensible fallback, so blank beats wrong.
- A wrong codepoint fails silently as a blank or missing-glyph box rather than an error.
  Look at the rendered icon rather than trusting the number.
- [`date-picker.css`](../components/date-picker/date-picker.css) repeats the Regular
  `@font-face` so it works standalone. Same family, weight and URL, so a page linking both
  downloads the font once — keep the two in step.
- The `@font-face` URLs are relative to `icons.css`. Moving or bundling the stylesheet
  means updating them.
- Font Awesome **Brands** is a third font that is not bundled, so brand marks are
  unavailable. Add `fa-brands-400.woff2` and a matching face if one is ever needed.
- Licence: the icons are CC BY 4.0 and the fonts SIL OFL 1.1, both requiring attribution.
