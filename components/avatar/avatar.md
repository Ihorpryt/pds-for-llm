# Avatar

Represents a person (or an account) with a photo, initials or an icon, optionally with a
notification count, an online dot and their name beside it. Every visual value resolves
through a token declared in [`tokens.css`](../../tokens.css).

**Figma source:** UI Kit — Tailwind 3 Theme (Portside Edition) › `Avatar`
([node `7530:2112`](https://www.figma.com/design/2JfMgeZuQOt4atDR58pLs9/UI-Kit---Tailwind-3-Theme--Portside-Edition-?node-id=7530-2112))
— 90 variants: 5 sizes × 3 shapes × 6 modes, plus optional badge, status and text.

```html
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="foundations/icons.css">
<link rel="stylesheet" href="components/avatar/avatar.css">

<!-- Initials -->
<span class="psds-avatar psds-avatar--sm">
  <span class="psds-avatar__figure">EC</span>
</span>

<!-- Photo, online, with a name -->
<span class="psds-avatar psds-avatar--md">
  <span class="psds-avatar__figure">
    <img class="psds-avatar__image" src="emily.jpg" alt="">
    <span class="psds-avatar__status" role="img" aria-label="Online"></span>
  </span>
  <span class="psds-avatar__text">
    <span class="psds-avatar__name">Emily Carter</span>
    <span class="psds-avatar__meta">Captain · N34T0</span>
  </span>
</span>
```

## Class API

| Axis | Classes | Default |
| --- | --- | --- |
| Size | `--xs` `--sm` `--md` `--lg` `--xl` | `--sm` |
| Shape | *(none = Circle)* `--rounded` `--square` | Circle |

| Element | Class | Notes |
| --- | --- | --- |
| Root | `.psds-avatar` | `<span>`, or `<a>` / `<button>` when it does something |
| Figure | `.psds-avatar__figure` | the coloured shape; holds the content below |
| Photo | `.psds-avatar__image` | an `<img>` that fills the figure |
| Icon | `.psds-avatar__icon` | a glyph, usually with `.psds-icon` |
| Count | `.psds-avatar__count` | a `+` icon followed by a number |
| Badge | `.psds-avatar__badge` | notification count, inside the figure |
| Status | `.psds-avatar__status` | online dot, inside the figure |
| Text | `.psds-avatar__text` | name block after the figure |
| Name / Meta | `.psds-avatar__name` / `.psds-avatar__meta` | first and second line |

## Modes

The Figma **Mode** axis is chosen by what you put in the figure:

| Figma mode | Figure content |
| --- | --- |
| Letter | initials as text: `EC` |
| Words | a short word as text: `User` (fits only from `--sm` up) |
| Avatar | `<img class="psds-avatar__image" src="…" alt="">` |
| Icon | `<span class="psds-avatar__icon psds-icon" aria-hidden="true">&#xf007;</span>` (`user`) |
| Add | the same with `plus` (`&#x2b;`), on a `<button>` root |
| Count | `<span class="psds-avatar__count"><span class="psds-icon" aria-hidden="true">&#x2b;</span>5</span>` |

## Sizes

| Size | Figure | Initials | Icon box | Count `+` | Status dot | Gap to text | Name / Meta |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `--xs` | `--form-mouse-small` 24 | `--font-size-xxs` 10 / 14 | 16 | 10 | 8 | `--spacing-8` | 12 / 10 |
| `--sm` | `--form-mouse` 32 | `--font-size-xs` 12 / 16 | 18 | 12 | 10 | `--spacing-8` | 14 / 12 |
| `--md` | `--form-bigger` 40 | `--font-size-sm` 14 / 20 | 24 | 14 | 12 | `--spacing-12` | 14 / 12 |
| `--lg` | `--spacing-48` 48 | `--font-size-lg` 18 / 28 | 30 | 16 | 12 | `--spacing-12` | 16 / 14 |
| `--xl` | `--spacing-56` 56 | `--font-size-lg` 18 / 28 | 34 | 18 | 16 | `--spacing-12` | 16 / 14 |

- The glyph is drawn at 75% of its icon box, so it has some space around it.
- At `--lg` and `--xl`, there is a 2px gap between the name and meta lines, and between
  the count's `+` and its number.
- `--sm` is the default per [`guidance.md`](../../guidance.md).

## Style

| Part | Value |
| --- | --- |
| Figure | `--primary` fill, `--primary-text-color` content, `--font-weight-medium` |
| Shape | Circle `--radius-full`, Rounded `--radius-6` (every size), Square `--radius-0` |
| Badge | 18px, `--danger` fill, `--danger-light` text, `--font-size-xxs` medium; 11px above and 4px past the right edge (`--xs`–`--md`), 6px and 2px (`--lg`, `--xl`) |
| Status | `--success` fill, 1px `--background-content-bg-color` ring, a white `check` glyph, bottom-right corner |
| Name | `--foreground-content-text-color`, normal weight |
| Meta | `--foreground-content-text-color-alt1`, normal weight |

A photo covers the figure completely. The `--primary` fill only shows while it loads.

## Interactive avatars

Figma has no hover or focus states; these are additions. When the root is an `<a>` or
`<button>` (opening a profile, the **Add** mode, a **Count** that opens the full list):

- On hover, the figure changes to `--buttons-primary-bg-color-pressed`. On a photo the
  change is hidden behind the image.
- On keyboard focus, the figure gets the standard focus ring.

## Accessibility

- If the name is shown in `.psds-avatar__text`, give the photo `alt=""`. Otherwise, name
  the person: use `alt="Emily Carter"` on the photo, or `aria-label` on the root when it
  shows initials.
- A link or button avatar needs an accessible name: "Emily Carter", "Add crew member",
  "5 more crew members".
- Give the status dot `role="img"` and `aria-label="Online"`. The badge text is read as
  it is, so add context nearby if "9" alone is unclear.
- `--xs` (24px) is the smallest target size allowed by WCAG 2.2. Leave space between
  clickable avatars placed in a row.

## Notes

- **Icons.** The Figma icons (*Person identity*, *Plus*, *Check small*) couldn't be
  exported: the Figma asset server returned "not found". The Font Awesome `user`, `plus`
  and `check` icons are used instead, as [`guidance.md`](../../guidance.md) recommends.
  The Figma person icon is an outline figure, so it looks slightly different from the
  solid `user` glyph.
- **Badge size.** At `--xs`, Figma is inconsistent: the code says 20px and the layer says
  18px. 18px is used at every size.
- The [chip](../chip/chip.md) avatar slot and this component are separate. A chip still
  takes a plain `<img class="psds-chip__avatar">`.
- `avatar.html` shows every size × mode, the shapes, the badge and status, the name block
  and a clickable group, with a dark-theme toggle.
