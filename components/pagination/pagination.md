# Pagination

A pager for tables inside modals ([when to use](#when-to-use)): **Previous**, page numbers and **Next** on the left, a
page and item count on the right. Every visual value resolves through a token declared in
[`tokens.css`](../../tokens.css), so light and dark themes need no component-level
overrides.

**Figma source:** Avianis WEB V2 › `Add Attachment`
([node `5193:53571`](https://www.figma.com/design/EVpOUjWdmWXGSQ3CazkzqM/Avianis-WEB-V2?node-id=5193-53571)),
the pager under the table (node `I5184:34976;27873:39138;5192:39399`) — an `.lg`
[modal](../../patterns/modal/modal.md) with a [table](../table/table.md).

```html
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="foundations/icons.css">
<link rel="stylesheet" href="components/pagination/pagination.css">

<nav class="psds-pagination" aria-label="Pagination">
  <ul class="psds-pagination__pages">
    <li><button class="psds-pagination__step" type="button" disabled>
      <span class="psds-icon" aria-hidden="true">&#xf053;</span>Previous
    </button></li>
    <li><button class="psds-pagination__page" type="button" aria-current="page">1</button></li>
    <li><button class="psds-pagination__page" type="button">2</button></li>
    <li><button class="psds-pagination__page" type="button">3</button></li>
    <li><span class="psds-pagination__gap" aria-hidden="true">…</span></li>
    <li><button class="psds-pagination__page" type="button">7</button></li>
    <li><button class="psds-pagination__step" type="button">
      Next<span class="psds-icon" aria-hidden="true">&#xf054;</span>
    </button></li>
  </ul>
  <p class="psds-pagination__summary">1 of 7 pages (70 items)</p>
</nav>
```

## Class API

| Element | Class | Notes |
| --- | --- | --- |
| Bar | `.psds-pagination` | a `<nav>`; pager left, summary right, wraps on narrow widths |
| Pager | `.psds-pagination__pages` | a `<ul>`; items sit flush, with no gap |
| Previous / Next | `.psds-pagination__step` | label plus a chevron: `chevron-left` (`f053`) before, `chevron-right` (`f054`) after |
| Page number | `.psds-pagination__page` | mark the current page with `aria-current="page"` |
| Ellipsis | `.psds-pagination__gap` | `…` between page ranges; not interactive |
| Summary | `.psds-pagination__summary` | "1 of 7 pages (70 items)" |

Controls can be `<button>` (client-side paging) or `<a href>` (a page per URL). Disable a
`<button>` with `disabled`. A link has no disabled state: drop its `href` and add
`aria-disabled="true"`.

## Layout

| Part | Value |
| --- | --- |
| Height | `--form-mouse` 32 for every control |
| Previous / Next | `--spacing-10` side padding, `--spacing-6` to the chevron, `--control-radius-btn-default-radius` |
| Chevron | `--font-size-xs` 12 glyph in the 14px Figma box |
| Page number | 32px square (`min-width: --form-mouse`, `--spacing-4` padding for 3+ digits), `--radius-4` |
| Ellipsis | 32px square |
| Between items | none |
| Pager → summary | `justify-content: space-between`; `--spacing-8` minimum when wrapped |

## Styles

| Part | Background | Border | Text |
| --- | --- | --- | --- |
| Previous / Next, page, ellipsis | `--transparent` | `--transparent` | `--font-size-sm` / `--line-height-sm`, `--font-weight-medium`, `--foreground-content-text-color-alt1` |
| Current page | `--buttons-primary-bg-color` | `--buttons-primary-border-color` | `--buttons-primary-text` |
| Disabled Previous / Next | `--transparent` | — | `--buttons-secondary-text-color-disabled` |
| Summary | — | — | `--font-size-sm` / `--line-height-sm`, `--font-weight-normal`, `--foreground-content-text-color-alt3` |

| State | Treatment |
| --- | --- |
| Hover | `--background-content-bg-color-hover`; current page goes to `--buttons-primary-bg-color-hover` |
| Focus | the `.psds-btn` focus ring, `$shadow-focus-ring2` |

Hover is an addition; Figma shows resting states only.

## Which pages to show

Show the first page, the last page, the current page and one page either side of it.
Replace each run of skipped pages with one `.psds-pagination__gap`.

Figma's `1 2 3 5 … 7` is placeholder content that skips page 4 without a gap; don't copy
it.

| Current | Pager (of 12) |
| --- | --- |
| 1 | `1 2 … 12` |
| 5 | `1 … 4 5 6 … 12` |
| 12 | `1 … 11 12` |

At the first page, disable Previous; at the last, disable Next. Keep both in place so
the pager doesn't shift.

## When to use

Use pagination for a **table inside a [modal](../../patterns/modal/modal.md)**. A modal's
height is limited by the viewport, so a long table would push the rest of the dialog out
of view.

Don't paginate a regular page table. Let it scroll in
[`.psds-table-scroll`](../table/table.md), with the header row pinned.

## Placement

- Put the bar directly under the table, `--spacing-16` below it. That is the gap
  the `Add Attachment` modal uses.
- The pager sits inside the modal's content zone, not in the footer.
- Pick a page size that fits the modal without scrolling the body. `Add Attachment`
  shows 9 rows per page in an `.lg` dialog.

## Accessibility

- Wrap it in a `<nav>` with an `aria-label` ("Pagination", or "Attachments pages" when
  there is more than one on the page).
- Mark the current page with `aria-current="page"`; colour alone doesn't identify it.
- The ellipsis is `aria-hidden="true"`; it carries no information for a screen reader.
- If the page number is the only content of a control, the number is its name. Add an
  `aria-label` such as "Page 3" if the context needs it.
- Put `aria-live="polite"` on the summary when paging happens in place, and move focus to
  the new current page so keyboard users don't lose their place.

## Notes

- Figma's Previous / Next are an `--sm` flat secondary [button](../button/button.md), but
  `.psds-btn:disabled` paints `--buttons-secondary-bg-color-disabled`, which shows as a
  box on a tinted or dark surface. The step control is built here with a transparent
  disabled state instead.
- Figma's disabled Previous has an empty 14px chevron slot; the chevron is drawn here so
  both states match.
- The Next label is `--foreground-content-text-color-alt1` (`#3a404b`) in Figma, not the
  secondary button's `#2a2a2a`, so it matches the page numbers.
- In Figma the ellipsis carries 16px side padding inside a 32px max width. It renders as a
  32px square; the padding is not reproduced.
- `--foreground-content-text-color-alt3` resolves to `--cool-gray-100` in dark mode, so
  the summary is brighter than the page numbers there. That is the token's value, not a
  component override.
- A page-size selector ("10 per page") is not in Figma and isn't built.
- `pagination.html` shows the Figma state, forced hover and focus states, and a working
  pager, with a dark-theme toggle.
