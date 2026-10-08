# Widget

A titled card that holds one block of a detail page: the invoices of a trip, the legs of a
quote, a short summary. It is a **pattern**, built from components in
[`components/`](../../components) plus the layout in [`widget.css`](widget.css).

Use it whenever a table is *part of* a page rather than the page itself. The body has 16px
of padding on every side, and the table inside it is a
[contained table](../../components/table/table.md#contained), so the table never touches
the card's edges. When the table *is* the page, use the [list page](../list-page/list-page.md)
instead.

**Figma reference:** Avianis WEB V2 › `Invoice`
([node `8534:114799`](https://www.figma.com/design/EVpOUjWdmWXGSQ3CazkzqM/Avianis-WEB-V2?node-id=8534-114799)).
[`widget.html`](widget.html) is a working copy.

```text
┌ .psds-widget ──────────────────────────────────────────────┐
│ .psds-widget__header                                  44px │
│  __heading: title · count        __actions: button · ⌃     │
├────────────────────────────────────────────────────────────┤
│ .psds-widget__body                            16px padding │
│  ┌ .psds-table.psds-table--contained ───────────────────┐  │
│  │ header row 32px                                      │  │
│  │ body rows 40px, a rule under each                    │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────┘
```

```html
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="foundations/icons.css">
<link rel="stylesheet" href="components/button/button.css">
<link rel="stylesheet" href="components/icon-button/icon-button.css">
<link rel="stylesheet" href="components/badge/badge.css">
<link rel="stylesheet" href="components/table/table.css">
<link rel="stylesheet" href="patterns/widget/widget.css">

<section class="psds-widget" aria-labelledby="invoice-title">
  <div class="psds-widget__header">
    <div class="psds-widget__heading">
      <h2 class="psds-widget__title" id="invoice-title">Invoice</h2>
      <span class="psds-badge psds-badge--sm psds-badge--secondary psds-badge--pill">5</span>
    </div>
    <div class="psds-widget__actions">
      <button class="psds-btn psds-btn--xs psds-btn--secondary" type="button">
        <span class="psds-btn__icon" aria-hidden="true"><span class="psds-icon psds-icon--plus"></span></span>Add New
      </button>
      <button class="psds-widget__toggle" type="button" aria-expanded="true"
              aria-controls="invoice-body" aria-label="Invoice section"></button>
    </div>
  </div>
  <div class="psds-widget__body" id="invoice-body">
    <table class="psds-table psds-table--contained">
      <caption class="sr-only">Invoices</caption>
      <colgroup>
        <col style="width: 80px"><col style="width: 110px"><col style="width: 110px">
        <col><col style="width: 40px">
      </colgroup>
      <thead>
        <tr>
          <th scope="col">Number</th><th scope="col">Status</th><th scope="col">Due Date</th>
          <th scope="col" class="psds-table__num">Total</th>
          <th scope="col"><span class="sr-only">Actions</span></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><a class="psds-table__link" href="/invoices/2812">2812</a></td>
          <td><span class="psds-badge psds-badge--lg psds-badge--info psds-badge--pill">Open</span></td>
          <td>07/02/2026</td>
          <td class="psds-table__num">$18,450.00</td>
          <td class="psds-table__actions">
            <button class="psds-icon-btn psds-icon-btn--xs psds-icon-btn--secondary" type="button" aria-label="Edit invoice 2812">
              <span class="psds-icon-btn__icon" aria-hidden="true"><span class="psds-icon psds-icon--pen"></span></span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</section>
```

## Class API

| Element | Class | Notes |
| --- | --- | --- |
| Card | `.psds-widget` | 1px `--border-light`, `--control-radius-card-default-radius` 8, small shadow; takes the width of its container |
| Header | `.psds-widget__header` | 44px, `--spacing-16` side padding, 1px bottom rule |
| Heading | `.psds-widget__heading` | the title and its count, `--spacing-8` apart |
| Title | `.psds-widget__title` | `Text-Small/Semibold` (14 / 20, 600); use the heading level that fits the page |
| Actions | `.psds-widget__actions` | right-hand cluster, `--spacing-16` gaps; the toggle goes last |
| Toggle | `.psds-widget__toggle` | plain 16px chevron button; optional. Leave it empty: the CSS draws the chevron |
| Body | `.psds-widget__body` | `--spacing-16` padding; stacks its children `--spacing-16` apart |

## Header

- Icons are the outline ones from [`icons.md`](../../foundations/icons.md#outline-icons):
  `.psds-icon--plus` on "Add New", `.psds-icon--pen` on row edit buttons.
- The count is a Small, Secondary, Subtle, pill [badge](../../components/badge/badge.md).
  Leave it out when the widget doesn't hold a list.
- Header buttons are `--xs` (24px) and **Secondary**: the widget is one of several blocks
  on the page, so its action must not compete with the page's primary button.
- The title sits on the left and the chevron on the far right, after the actions.

## Collapse

`psds.js` handles the toggle: a click flips `aria-expanded` and sets `hidden` on the body
named by `aria-controls`. The chevron points up while open and down when collapsed. To
start collapsed, write `aria-expanded="false"` on the toggle and `hidden` on the body.
Leave the toggle out for a widget that is always open.

## What goes in the body

- **A table:** always `.psds-table--contained`. Don't wrap it in `.psds-table-view` or
  `.psds-table-scroll`, and don't put a full-bleed `.psds-table` straight into the card.
- **No data:** keep the table and its header, with one `.psds-table__empty` cell
  ("No invoices yet.").
- **Loading or error:** a spinner glyph or an [alert](../../components/alert-message/alert-message.md)
  in the body, in place of the table.
- Anything else (a summary, fields) sits directly in the body and gets the same padding.

## Accessibility

- Use a `<section>` with `aria-labelledby` pointing at the title, so the widget is a named
  region.
- The toggle needs `aria-expanded`, `aria-controls` and an `aria-label` that names the
  section ("Invoice section"); the expanded state says whether it is open.
- Row action buttons are icon-only, so each needs an `aria-label` that names its row
  ("Edit invoice 2812"). Give their header cell a visually hidden "Actions" label.

## Notes

- The shadow (`0 1px 2px` at 5% black) is written literally in `widget.css`, because
  `tokens.css` has no shadow tokens yet.
- Figma draws the Total amounts at 12px and the dates at 14px. Body cells here all use the
  table's 14px.
- Figma shows only the open state. The collapsed state (header alone, no bottom rule) and
  the hover and focus styles of the toggle are additions.
