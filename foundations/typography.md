# Typography

Portside sets type in **Inter**. [`typography.css`](typography.css) loads the font and
defines a scale of size classes; [`tokens.css`](../tokens.css) holds the matching
`--font-size-*`, `--line-height-*` and `--font-weight-*` tokens.

```html
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="foundations/typography.css">

<p class="text-small">Body copy in the product UI default.</p>
```

## Font family

There is no font-family token. Set the stack once at the root rather than per component:

```css
body {
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
}
```

The fallbacks matter: if the webfont has not arrived — or has failed — the text lands on
the platform UI font rather than Times.

## Font smoothing

Smooth the type on the same rule that sets the family:

```css
body {
  font-family            : Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
  -webkit-font-smoothing : antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

Inter at product UI sizes renders heavy under macOS's default subpixel antialiasing — it
is what makes a 14px `--font-weight-normal` label read closer to medium, and it flattens
the difference between the [weights](#weights) the scale depends on.

Both properties belong together: `-webkit-font-smoothing` covers Chrome, Edge and Safari,
`-moz-osx-font-smoothing` covers Firefox. Neither does anything on Windows or Linux, so
this is a macOS correction rather than a cross-platform change.

Set it once on `body`, not per component — [`icons.css`](icons.css) is the one exception,
applying the same pair to the icon font so glyphs match the text they sit beside.

## Loading Inter

`typography.css` loads Inter from Google Fonts itself, so linking the stylesheet is
enough:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');
```

This is the variable font: roman and italic, optical size 14–32, weights 100–900. Unused
faces are not downloaded.

A CSS `@import` is only discovered after the stylesheet that contains it has been
downloaded and parsed, so the font request starts one round trip late. Where first paint
matters, drop the `@import` and put the request in the page head instead:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap">
```

The trade-off: the `@import` keeps the dependency inside the design system, so every page
that links `typography.css` gets Inter automatically. The `<link>` version paints sooner
but each consuming page has to remember it. Use one or the other, not both.

## Scale

| Class | Size / line height | Size token | Line-height token | Use for |
| --- | --- | --- | --- | --- |
| `.text-xx-small` | 10px / 14px | `--font-size-xxs` | `--line-height-xxs` | Dense metadata, badge letters |
| `.text-x-small` | 12px / 16px | `--font-size-xs` | `--line-height-xs` | Field labels, helper text, captions |
| `.text-small` | 14px / 20px | `--font-size-sm` | `--line-height-sm` | **Product UI default** — body copy, controls, table cells |
| `.text-base` | 16px / 24px | `--font-size-base` | `--line-height-base` | Modal and page titles, emphasised body copy |
| `.text-large` | 18px / 28px | `--font-size-lg` | `--line-height-lg` | Section headings above a modal title |
| `.text-xl` | 20px / 28px | `--font-size-xl` | `--line-height-xl` | Page headings |
| `.text-2xl` | 24px / 32px | `--font-size-2xl` | `--line-height-2xl` | Page headings |
| `.text-3xl` | 30px / 40px | `--font-size-3xl` | `--line-height-3xl` | Screen titles |
| `.text-4xl` | 36px / 44px | `--font-size-4xl` | `--line-height-4xl` | Marketing and empty states |
| `.text-5xl` – `.text-9xl` | 48px / 58px → 128px / 160px | `--font-size-5xl` … `--font-size-9xl` | `--line-height-5xl` … `--line-height-9xl` | Display type; rarely used in product UI |

Use `.text-small` as the base size for product UI, per
[`guidance.md`](../guidance.md). Step up only for a clear hierarchy reason, and
prefer a weight change over a size change for mild emphasis.

## Weights

| Token | Value | Use for |
| --- | --- | --- |
| `--font-weight-normal` | 400 | Body copy, control labels, values |
| `--font-weight-medium` | 500 | Field labels, subtle emphasis |
| `--font-weight-semibold` | 600 | Titles, section headings, table headers |
| `--font-weight-bold` | 700 | Rare — reserve for display type |

`--font-weight-thin` (100) through `--font-weight-black` (900) exist as tokens, but
product UI should stay within normal, medium and semibold.

## Pairing with spacing

Line height is leading, not spacing — do not use it to separate blocks. Gaps between text
and the elements around it follow the 4px grid in [`layout.md`](layout.md).

## Notes

- The size classes set `font-size` and `line-height` as literal pixel values rather than
  the equivalent `--font-size-*` / `--line-height-*` tokens. The numbers match today, but
  they can drift; the classes should be rewritten to consume the tokens.
- The classes set no `font-family`, `font-weight` or colour — set the family once on
  `body` and pick the weight per use.
- `tokens.css` has no font-family token, so the stack above is repeated literally in every
  page that needs it.
- There is no 18px line-height token. Figma's *Text-X Small/Normal* (12px / 18px), used by
  modal section descriptions and item subtitles, has no token to match it;
  `--line-height-xs` is 16px.
- The component galleries in [`components/`](../components) link `tokens.css` only, so they
  render in whatever Inter is installed locally rather than the webfont.
- There is no italic or letter-spacing guidance yet, though `--letter-spacing-*` tokens
  exist in `tokens.css`.
