# Modal

A dialog laid over the page to confirm an action, collect a small amount of input, or
show content that needs focus. Modal is a **pattern**, not a component: it is assembled
from the components in [`components/`](../../components) on a surface sized by
[`modal.css`](modal.css).

**Figma reference:** Consistency Test › `Edit Task`
([node `1:48009`](https://www.figma.com/design/hj5L9WCyVsGYa3U9BEKxNq/Consistency-Test?node-id=1-48009))
— a `.md` (500px) form modal. The structure, section, field and item measurements below
are taken from it.

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
  table defines the resulting dimensions. The one exception is the action buttons inside
  [item cards](#item-cards), which are `--xs`.

## Structure

A modal has three zones. The header and footer stay fixed; only the content scrolls.

| Zone | Height | Contents |
| --- | --- | --- |
| Header | 56px — 16px padding around a 24px title line | Title on the left; a plain 20px close icon on the right, 16px from the edge |
| Content | Grows with content, scrolls past the viewport | One or more [sections](#sections) |
| Footer | 62px | Actions aligned right: `--secondary` Cancel, then `--primary` confirm |

The header divider runs the full width of the modal.

## Sections

Group related content into sections rather than one long list of fields.

| Element | Rule | Token |
| --- | --- | --- |
| Section padding | 16px on all sides | `--spacing-16` |
| Section divider | 1px line between sections, inset 16px from both modal edges | `--border-light` |
| Section title | Small / Semibold, 14px / 20px | `--font-size-sm`, `--line-height-sm`, `--font-weight-semibold` |
| Section description | X-Small / Normal, 12px / 18px, secondary text colour | `--font-size-xs`, `--font-weight-normal`, `--foreground-content-text-color-alt2` |
| Title → description | 4px | `--spacing-4` |
| Section header → controls | 16px | `--spacing-16` |

- The first section needs no title when it holds the modal's primary fields.
- Section dividers are inset; only the header divider is full width.

## Fields

| Element | Rule | Token |
| --- | --- | --- |
| Label | X-Small / Medium, 12px / 16px | `--font-size-xs`, `--line-height-xs`, `--font-weight-medium` |
| Label → control | 4px | `--spacing-4` |
| Labelled field height | 52px (16 label + 4 gap + 32 `--sm` control) | — |
| Two-column row | 16px between the columns, which share the width equally | `--spacing-16` |
| Compound row | 8px between controls in one row | `--spacing-8` |
| Rows | 12px vertical gap | `--spacing-12` |

- **Two-column rows** pair independent fields, such as *Assigned User* and *Assigned
  Group*, or *Start Date* and *Due Date*.
- **Compound rows** are controls that build one value or one action together, such as
  *Type* + *Record* + *Add*, or `1` + *Hours* + *Before* + *Due Date*. Their widths follow
  the content rather than splitting evenly.
- **Inline action buttons** in a row of labelled fields align to the bottom of the row, so
  the button lines up with the controls rather than the labels.

## Setting rows

A setting that is switched on or off is a row, not a labelled field:

- Section title and description on the left, filling the remaining width.
- An `--sm` [toggle](../../components/toggle-switch/toggle-switch.md) on the right, 8px
  (`--spacing-8`) from the text and centred vertically against the text block.
- Controls that the toggle reveals sit below the row, 16px (`--spacing-16`) under it.

## Item cards

Lists of linked records or attached files use item cards.

| Element | Rule | Token |
| --- | --- | --- |
| Card | 64px high, 12px padding, 1px border, 8px radius | `--spacing-12`, `--border`, `--control-radius-card-default-radius` |
| Between cards | 8px | `--spacing-8` |
| Leading icon tile | 40px, 12px gap to the text | `--spacing-40`, `--spacing-12` |
| Title | Small, 14px / 20px | `--font-size-sm`, `--line-height-sm` |
| Subtitle | X-Small, 12px / 18px, secondary text colour, 2px below the title | `--font-size-xs`, `--foreground-content-text-color-alt2`, `--spacing-2` |
| Actions | `--xs` buttons (24px), 8px apart, right-aligned and centred vertically | `--xs`, `--spacing-8` |

## Other spacing

| Between | Gap | Token |
| --- | --- | --- |
| Segment tabs and the inputs below | 12px | `--spacing-12` |
| Upload dropzone and the file list below | 12px | `--spacing-12` |

## Composition

- **Actions:** use [`button`](../../components/button/button.md) at the `--sm` size. One `--primary` action; the rest
  `--secondary`. Use `--danger` for the confirming action of a destructive dialog.
- **Close:** a plain 20px close icon in the header, per the [structure](#structure). It
  still needs to be a focusable `<button>` with `aria-label="Close"`.
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
- The 18px line height of the section description and item subtitle (Figma *Text-X
  Small/Normal*) has no token; `--line-height-xs` is 16px.
- The footer's background, top divider and internal padding were not confirmed from the
  Figma reference.
