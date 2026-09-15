# Modal

A dialog laid over the page to confirm an action, collect a small amount of input, or
show content that needs focus. Modal is a **pattern**, not a component: it is assembled
from the components in [`components/`](../../components) on a surface sized by
[`modal.css`](modal.css).

```html
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="patterns/modal/modal.css">

<dialog class="md" aria-labelledby="modal-title">
  <h2 id="modal-title">Title</h2>
  …
</dialog>
```

## Widths

`modal.css` currently defines only the dialog width. Pick the smallest size that fits the
content without horizontal scrolling.

| Class | Width | Use for |
| --- | --- | --- |
| `.sm` | 360px | Confirmations, short messages, a single field |
| `.md` | 500px | Standard forms and most dialogs |
| `.lg` | 800px | Multi-column forms, tables, rich content |
| `.xl` | 970px | Large previews or complex editors |

Height is not fixed; let the content define it and scroll the body when it exceeds the
viewport.

## Related tokens

These tokens exist in [`tokens.css`](../../tokens.css) for the parts of the modal that
`modal.css` does not yet style:

| Token | Value | Use for |
| --- | --- | --- |
| `--background-overlay-bg-color` | `#6b7280bf` | Backdrop behind the dialog (`dialog::backdrop`) |
| `--control-radius-modal-default-radius` | `--radius-8` | Dialog corner radius |
| `--control-radius-modal-bigger-radius` | `--radius-12` | Corner radius for `.lg` / `.xl` dialogs |

## Layout guidance

These rules apply at every width, `.sm` through `.xl`.

| Element | Rule | Token |
| --- | --- | --- |
| Content padding | 16px on all sides, regardless of modal size | `--spacing-16` |
| Stacked inputs | 12px vertical gap between fields | `--spacing-12` |
| Title | Base / Semibold, 16px / 24px | `--font-size-base`, `--line-height-base`, `--font-weight-semibold` |
| Dividers | 1px line between header, body and footer | `--border-light` |
| Controls | Small size | `--sm` |

- **Padding:** do not scale padding up for `.lg` or `.xl`; wider modals get more room for
  content, not more whitespace.
- **Stacking:** apply the 12px gap between each field wrapper (label, control and helper
  text together), not between the label and its control.
- **Title:** a single line of Base / Semibold text in the header. Do not use a larger
  heading size in larger modals.
- **Dividers:** use `border: 1px solid var(--border-light)` (or `border-block-*`) so the
  line follows the light and dark themes.
- **Controls:** use the `--sm` modifier on buttons, icon buttons, text boxes, text areas,
  dropdowns, checkboxes and toggles inside a modal. Each component's own `--sm` size
  table defines the resulting dimensions.

## Composition

- **Actions:** use [`button`](../../components/button/button.md) at the `--sm` size. One `--primary` action; the rest
  `--secondary`. Use `--danger` for the confirming action of a destructive dialog.
- **Close:** use [`icon-button`](../../components/icon-button/icon-button.md) in the header.
- **Fields:** use [`text-box`](../../components/text-box/text-box.md),
  [`text-area`](../../components/text-area/text-area.md),
  [`dropdown-list`](../../components/dropdown-list/dropdown-list.md),
  [`checkbox`](../../components/checkbox/checkbox.md) and
  [`toggle-switch`](../../components/toggle-switch/toggle-switch.md).
- **Inline feedback:** use [`alert-message`](../../components/alert-message/alert-message.md) inside the
  body, not a second modal.

## Accessibility

- Use a native `<dialog>` opened with `showModal()`, which provides the backdrop, traps
  focus and closes on <kbd>Esc</kbd>.
- Give the dialog an accessible name with `aria-labelledby` pointing at its title.
- Move focus to the first meaningful control on open, and return it to the triggering
  element on close.
- Always provide a visible way to close the dialog besides <kbd>Esc</kbd>.

## Notes

- The width classes are unprefixed (`.sm`, `.md`, …) and will collide with other
  stylesheets. Components use a `psds-` prefix (`.psds-btn--md`); these should be renamed
  to match, e.g. `.psds-modal--sm`.
- Widths are literal pixel values, not tokens. `tokens.css` has no modal width tokens.
- Surface, header, body, footer, padding, shadow and backdrop are not styled in
  `modal.css` yet; follow the layout guidance and tokens above when adding them.
- There is no `modal.html` gallery yet.
