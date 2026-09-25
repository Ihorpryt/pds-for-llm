# Modal

A dialog laid over the page to confirm an action, collect a small amount of input, or
show content that needs focus. Modal is a **pattern**, not a component: it is assembled
from the components in [`components/`](../../components) on a surface sized by
[`modal.css`](modal.css).

**Figma reference:** Consistency Test › `Edit Task`
([node `1:48009`](https://www.figma.com/design/hj5L9WCyVsGYa3U9BEKxNq/Consistency-Test?node-id=1-48009))
— a `.md` (500px) form modal. The structure, section, field and item measurements below
are taken from it.

**Surfaces:** Avianis WEB V2 › `Add Service (Fuelerlinx)`
([node `7288:86458`](https://www.figma.com/design/EVpOUjWdmWXGSQ3CazkzqM/Avianis-WEB-V2?node-id=7288-86458))
— the same `.md` dialog in dark mode, where the three zone fills are visible.

```html
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="patterns/modal/modal.css">

<dialog class="md" aria-labelledby="modal-title">
  <div class="psds-modal__header">
    <h2 class="psds-modal__title" id="modal-title">Title</h2>
    <button class="psds-modal__close" type="button" aria-label="Close">
      <span class="psds-icon" aria-hidden="true">&#xf00d;</span>
    </button>
  </div>
  <div class="psds-modal__body">
    <div class="psds-modal__row">…two fields side by side…</div>
    …stacked fields…
  </div>
  <div class="psds-modal__footer">…Cancel, then the confirming action…</div>
</dialog>
```

`modal.css` lays out the zones, so the header, content and footer need no page styles:

| Class | Does |
| --- | --- |
| `.psds-modal__header` | Title left, close button right; 16px padding, 15px below, full-width divider |
| `.psds-modal__title` | Base / Semibold title. An `<h1>`–`<h3>` directly in the header gets the same style |
| `.psds-modal__close` | Plain 20px close glyph, a real focusable button |
| `.psds-modal__body` | 16px padding, fields stacked 12px apart, scrolls when tall |
| `.psds-modal__row` | Two independent fields sharing the width, 16px apart |
| `.psds-modal__footer` | 16px padding, actions right-aligned 8px apart |

In a prototype that loads `psds.js`, put `data-psds-close` on the close and Cancel buttons
and `data-psds-open="dialog-id"` on the button that opens the dialog.

## Widths

Pick the smallest size that fits the content without horizontal scrolling.

| Class | Width | Use for |
| --- | --- | --- |
| `.sm` | 360px | Confirmations, short messages, a single field |
| `.md` | 500px | Standard forms and most dialogs |
| `.lg` | 800px | Multi-column forms, tables, rich content |
| `.xl` | 970px | Large previews or complex editors |

Height is not fixed; let the content define it and scroll the body when it exceeds the
viewport.

## Surfaces

The dialog is three tiers, not one flat fill. Light mode hides this — the shell and the
body are both white there and only the footer is tinted — so a modal painted in a single
colour looks correct in light and wrong in dark. `modal.css` paints all three.

| Zone | Token | Dark | Light |
| --- | --- | --- | --- |
| Shell + header | `--background-flyout-bg-color` | `#171717` | `#ffffff` |
| Content | `--background-content-bg-color` | `#26282c` | `#ffffff` |
| Footer | `--background-content-bg-color-alt1` | `#1f2124` | `#eeeff2` |

The header has no fill of its own: it shows the shell through, and the boundary between it
and the body is the header's bottom border. The footer has no top border at all — its own
fill is the separation.

Elevation is Figma `$Shadow-lg`:
`0 10px 15px -3px #0000001a, 0 4px 6px 2px #0000000d`. It is a literal in `modal.css`
because `tokens.css` declares no `--shadow-*` tokens.

## Related tokens

`modal.css` binds these:

| Token | Value | Use for |
| --- | --- | --- |
| `--background-overlay-bg-color` | `#6b7280bf` light, `#000000b3` dark | Backdrop behind the dialog (`dialog::backdrop`); dims the page in both themes |
| `--control-radius-modal-default-radius` | `--radius-8` | Dialog corner radius |
| `--control-radius-modal-bigger-radius` | `--radius-12` | Corner radius for `.lg` / `.xl` dialogs |

## Layout guidance

These rules apply at every width, `.sm` through `.xl`.

| Element | Rule | Token |
| --- | --- | --- |
| Content padding | 16px on all sides, regardless of modal size | `--spacing-16` |
| Stacked inputs | 12px vertical gap between fields | `--spacing-12` |
| Title | Base / Semibold, 16px / 24px | `--font-size-base`, `--line-height-base`, `--font-weight-semibold` |
| Header divider | 1px line under the header, full width | `--border` |
| Section dividers | 1px line between sections, inset 16px | `--border-light` |
| Controls | Small size | `--sm` |

- **Padding:** do not scale padding up for `.lg` or `.xl`; wider modals get more room for
  content, not more whitespace.
- **Stacking:** apply the 12px gap between each field wrapper (label, control and helper
  text together), not between the label and its control.
- **Title:** a single line of Base / Semibold text in the header. Do not use a larger
  heading size in larger modals.
- **Dividers:** the header divider is the stronger `--border`; the dividers *inside* the
  body are `--border-light`. The footer has no divider — its fill separates it. Note that
  `--border` and `--border-light` resolve to the same `#3a404b` in dark mode, so the
  distinction is only visible in light.
- **Controls:** use the `--sm` modifier on buttons, icon buttons, text boxes, text areas,
  dropdowns, checkboxes and toggles inside a modal. Each component's own `--sm` size
  table defines the resulting dimensions. The one exception is the action buttons inside
  [item cards](#item-cards), which are `--xs`.

## Structure

A modal has three zones. The header and footer stay fixed; only the content scrolls.

| Zone | Height | Contents |
| --- | --- | --- |
| Header | 56px | Title on the left; a plain 20px close icon on the right, 16px from the edge |
| Content | Grows with content, scrolls past the viewport | One or more [sections](#sections) |
| Footer | 64px | Actions aligned right: `--secondary` Cancel, then `--primary` confirm |

Neither height is declared. Both derive from 16px padding, so set the padding and let the
zone size itself — declaring a height *and* the padding is what produces a 78px footer.

| Zone | Derivation |
| --- | --- |
| Header | 16 + 24 title line + 15 + 1px divider = 56 |
| Footer | 16 + 32 `--sm` button + 16 = 64 |

The header's trailing padding is `--spacing-15` so the 1px divider lands the zone back on
the grid — the border compensation [`layout.md`](../../foundations/layout.md) sanctions the
odd spacing tokens for. Everything else uses `--spacing-16`.

The header divider runs the full width of the modal.

## Sections

Group related content into sections rather than one long list of fields.

**Figma reference:** Avianis WEB V2 › `Add Leg (Filled)`
([node `5171:41484`](https://www.figma.com/design/EVpOUjWdmWXGSQ3CazkzqM/Avianis-WEB-V2?node-id=5171-41484)).

```html
<div class="psds-modal__body">
  <div class="psds-modal__section">…primary fields, no label…</div>
  <div class="psds-modal__section">
    <p class="psds-modal__section-label">Commercial</p>
    …
  </div>
</div>
```

| Element | Class | Rule | Token |
| --- | --- | --- | --- |
| Section | `.psds-modal__section` | Items 12px apart; sections 16px apart | `--spacing-12`, `--spacing-16` |
| Section divider | *(automatic)* | Every section after the first opens with a 1px line and 16px of padding; inset by the body padding | `--border-light`, `--spacing-16` |
| Section label | `.psds-modal__section-label` | X-Small / Medium, 12px / 18px, uppercase, secondary text colour | `--font-size-xs`, `--font-weight-medium`, `--foreground-content-text-color-alt2` |

- The first section needs no label when it holds the modal's primary fields.
- Section dividers are inset; only the header divider is full width.
- `.psds-modal__divider` is still available for a one-off rule inside a section.

## Fields

| Element | Rule | Token |
| --- | --- | --- |
| Label | X-Small / Medium, 12px / 16px | `--font-size-xs`, `--line-height-xs`, `--font-weight-medium` |
| Label → control | 4px | `--spacing-4` |
| Labelled field height | 52px (16 label + 4 gap + 32 `--sm` control) | — |
| Two-column row | 16px between the columns, which share the width equally (`.psds-modal__row`) | `--spacing-16` |
| Compound row | 8px between controls in one row | `--spacing-8` |
| Rows | 12px vertical gap | `--spacing-12` |

- **Two-column rows** pair independent fields, such as *Assigned User* and *Assigned
  Group*, or *Start Date* and *Due Date*.
- **Compound rows** are controls that build one value or one action together, such as
  *Type* + *Record* + *Add*, or `1` + *Hours* + *Before* + *Due Date*. Their widths follow
  the content rather than splitting evenly.
- **Inline action buttons** in a row of labelled fields align to the bottom of the row, so
  the button lines up with the controls rather than the labels.

## Options: toggle, checkbox or nested

Pick the control for an on/off option by what it is, not by how it looks:

| The option is… | Use | Example |
| --- | --- | --- |
| A standalone behaviour whose effect needs explaining | [Setting row](#setting-rows) with a toggle | *Arrival FBO notification — Notify the arrival FBO when the aircraft departs* |
| A property of the record, alongside related ones | [Checkboxes](../../components/checkbox/checkbox.md) under a section label, short labels, no descriptions | *COMMERCIAL: Empty leg* |
| Only meaningful when another option is on | [Nested](#nested-options) directly after that option | *Publish to marketplaces* under *Empty leg* |

Don't turn every option into a setting row with a description: a column of toggles with
one-line explanations reads as a settings page, not a form. Don't nest by indenting a
row by hand; use `.psds-modal__nested`.

## Setting rows

A standalone setting that is switched on or off is a row, not a labelled field.

```html
<div class="psds-modal__setting">
  <div>
    <p class="psds-modal__setting-title" id="notify-title">Arrival FBO notification</p>
    <p class="psds-modal__setting-description" id="notify-desc">Notify the arrival FBO when the aircraft departs.</p>
  </div>
  <label class="psds-toggle psds-toggle--sm">
    <input class="psds-toggle__input" type="checkbox" checked
           aria-labelledby="notify-title" aria-describedby="notify-desc">
  </label>
</div>
```

| Element | Class | Rule |
| --- | --- | --- |
| Row | `.psds-modal__setting` | Text block fills the width; toggle 8px after it, centred against the text |
| Title | `.psds-modal__setting-title` | Small / Semibold, 14px / 20px, text colour |
| Description | `.psds-modal__setting-description` | X-Small / Normal, 12px / 18px, secondary text colour, 4px under the title |
| Toggle | [`.psds-toggle --sm`](../../components/toggle-switch/toggle-switch.md) | No visible label of its own; name it with `aria-labelledby` / `aria-describedby` |

Controls that the toggle reveals go in a `.psds-modal__nested` group straight after the row.

## Nested options

Options that only apply when another option is on sit directly after it, indented behind a
guide line. The group holds the dependent checkboxes *and* their fields.

```html
<label class="psds-checkbox psds-checkbox--sm">
  <input class="psds-checkbox__input" type="checkbox">
  <span class="psds-checkbox__text"><span class="psds-checkbox__label">Empty leg</span></span>
</label>
<div class="psds-modal__nested">
  <label class="psds-checkbox psds-checkbox--sm">…Publish to marketplaces…</label>
  <div class="psds-textbox psds-textbox--sm">…Target price…</div>
</div>
```

| Rule | Token |
| --- | --- |
| 16px indent behind a 1px guide line on the leading edge | `--spacing-16`, `--border-light` |
| Items 12px apart | `--spacing-12` |
| Hidden while the checkbox, toggle or setting row just before it is off | — |

Hiding needs no script: the group must be the **next sibling** of the controlling
`.psds-checkbox`, `.psds-toggle` or `.psds-modal__setting`.

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
- **Action icons:** every footer action carries a leading icon. See
  [footer action icons](#footer-action-icons).
- **Close:** a plain 20px close icon in the header, per the [structure](#structure):
  `<button class="psds-modal__close" aria-label="Close">`.
- **Fields:** use [`text-box`](../../components/text-box/text-box.md),
  [`text-area`](../../components/text-area/text-area.md),
  [`dropdown-list`](../../components/dropdown-list/dropdown-list.md),
  [`checkbox`](../../components/checkbox/checkbox.md) and
  [`toggle-switch`](../../components/toggle-switch/toggle-switch.md).
- **Tables:** a [`table`](../../components/table/table.md) inside a modal pages with
  [`pagination`](../../components/pagination/pagination.md) instead of scrolling, because
  the modal's height is limited. Put the pager under the table, `--spacing-16` below it,
  inside the content zone.
- **Inline feedback:** use [`alert-message`](../../components/alert-message/alert-message.md) inside the
  body, not a second modal.

### Footer action icons

**Figma reference:** Avianis WEB V2 › `Change Aircraft (Per Leg)`
([node `5171:38444`](https://www.figma.com/design/EVpOUjWdmWXGSQ3CazkzqM/Avianis-WEB-V2?node-id=5171-38444)).

Every button in the footer takes a leading icon — all of them or none of them, never a
mix. The glyph sits before the label and is separated from it by the `--sm` button's own
`--spacing-6` gap.

| Action | Glyph | Code point |
| --- | --- | --- |
| Cancel, and any other dismissing action | `circle-xmark` | `&#xf057;` |
| The confirming action (`--primary`) | `circle-check` | `&#xf058;` |
| The confirming action of a destructive dialog (`--danger`) | the verb's own glyph, e.g. `trash-can` | — |

- **Cut:** Regular, not Solid — `.psds-icon .psds-icon--regular`. The outline weight is
  what the Figma node uses, and it keeps a 14px glyph from crowding the label.
- **Size:** none. `.psds-icon` defaults to `1em`, which is the 14px the `--sm` button's
  `--font-size-sm` already sets — the same 14px box as Figma.
- **Colour:** none. `.psds-icon` paints with `currentColor`, so the glyph follows the
  label through every state and every button type. Do not bind an icon colour; in
  particular a `--secondary` button's icon is its label colour, not `--icon-color`.

```html
<div class="psds-modal__footer">
  <button class="psds-btn psds-btn--sm psds-btn--secondary" type="button">
    <span class="psds-icon psds-icon--regular" aria-hidden="true">&#xf057;</span>
    Cancel
  </button>
  <button class="psds-btn psds-btn--sm psds-btn--primary" type="submit">
    <span class="psds-icon psds-icon--regular" aria-hidden="true">&#xf058;</span>
    Save
  </button>
</div>
```

The icon is decorative — it repeats the label — so it is always `aria-hidden="true"` and
the label always stays. An icon never replaces the text of a footer action.

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
- `modal.css` paints the surfaces, the edges that define them, the radius, the elevation
  and the backdrop. Zone padding, typography and control sizing are not implemented
  there; follow the layout guidance above.
- The elevation is a literal. Figma declares `$Shadow-lg` and `$Shadow-sm` as effect
  variables, but `tokens.css` has no `--shadow-*` tokens to bind them to — `text-box` and
  `dropdown-list` hardcode `$Shadow-sm` for the same reason.
- `--border` and `--border-light` both resolve to `--cool-gray-600` (`#3a404b`) in dark
  mode, so the header divider and the section dividers are indistinguishable there.
- There is no `modal.html` gallery yet.
- The [footer action icons](#footer-action-icons) rule is taken from `Change Aircraft
  (Per Leg)` ([node `5171:38444`](https://www.figma.com/design/EVpOUjWdmWXGSQ3CazkzqM/Avianis-WEB-V2?node-id=5171-38444)).
  The two other surfaces this page cites — `Add Service (Fuelerlinx)` and `Edit Task` —
  still show bare footer actions and predate the rule; they need updating in Figma.
- In `5171:38444` the Cancel label and its icon are both an unbound `#29313d` rather than
  `Buttons/Secondary/secondary-text-color` (`#2a2a2a`). The icon there is the label's
  colour, which is what `currentColor` reproduces; the loose hex is a Figma-side fix.
- The 18px line height of the section description and item subtitle (Figma *Text-X
  Small/Normal*) has no token; `--line-height-xs` is 16px.
- The footer is 64px here against 62px in Figma. 62 does not derive from any on-grid
  padding — 8px around a 32px `--sm` button gives 48, and reaching 62 needs 15px, which
  [`layout.md`](../../foundations/layout.md) reserves for border compensation. 64 is
  16px padding on both sides, on the grid, and scales if the footer ever carries an
  `--md` control. The 2px is deliberate and needs a designer's sign-off.
