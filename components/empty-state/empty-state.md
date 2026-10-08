# Empty state

What a block shows when it has no data yet: an icon, a short title and one line that says
what will appear there. Use it inside a [widget](../../patterns/widget/widget.md) or any
other bounded block. A full-page results table keeps its own
[`.psds-table__empty`](../table/table.md) row instead.

**Figma source:** Avianis WEB V2 › `Invoice`, State = Empty
([node `8494:115104`](https://www.figma.com/design/EVpOUjWdmWXGSQ3CazkzqM/Avianis-WEB-V2?node-id=8494-115104)).
[`empty-state.html`](empty-state.html) is a live gallery.

```html
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="foundations/icons.css">
<link rel="stylesheet" href="components/empty-state/empty-state.css">

<div class="psds-empty">
  <span class="psds-empty__icon psds-empty__icon--invoices" aria-hidden="true"></span>
  <p class="psds-empty__title">No invoices</p>
  <p class="psds-empty__description">Invoices created for this trip will appear here</p>
</div>
```

## Class API

| Element | Class | Notes |
| --- | --- | --- |
| Root | `.psds-empty` | centred column, `--spacing-8` between icon and text |
| Icon | `.psds-empty__icon` | 48px box, 40px icon, `--icon-color` |
| Invoices illustration | `.psds-empty__icon--invoices` | built-in two-tone icon; leave the span empty |
| Title | `.psds-empty__title` | `Text-Small/Semibold` (14 / 20, 600), `--foreground-content-text-color` |
| Description | `.psds-empty__description` | `Text-Small/Normal` (14 / 20), `--foreground-content-text-color-alt1`, 2px under the title |

## In a widget

The empty state **replaces the table**: don't show an empty table with its header row.
Leave the count badge out of the widget header too.

```html
<div class="psds-widget__body" id="invoice-body">
  <div class="psds-empty">…</div>
</div>
```

Inside `.psds-widget__body` it sits 24px from the header rule and the bottom edge, and
16px from the sides, as in Figma.

## Icons

Only the invoices illustration is built in. For any other record type, put a `.psds-icon`
glyph in the slot; it is drawn at half strength to stay as quiet as the illustration.
Prefer the outline cut (`.psds-icon--regular`) where the icon has one:

```html
<span class="psds-empty__icon" aria-hidden="true">
  <span class="psds-icon psds-icon--regular">&#xf133;</span>   <!-- calendar -->
</span>
```

## Copy

- **Title:** "No" plus the plural noun: "No invoices", "No flight legs". No full stop.
- **Description:** one line saying when items will appear or what to do, e.g. "Invoices
  created for this trip will appear here". No full stop.

## Accessibility

- The icon is decorative: `aria-hidden="true"`.
- The title and description are plain paragraphs. If the block replaces content after a
  user action (a filter, a delete), put `aria-live="polite"` on its container.

## Notes

- Figma draws the icon with Font Awesome Duotone Thin, which is not bundled. The invoices
  illustration is embedded as an SVG mask; other record types fall back to a Free glyph
  until their illustrations are added.
- Figma's empty frame has no action button; add one below the description only when the
  request asks for it.
