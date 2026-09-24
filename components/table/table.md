# Table

A dense data table for lists of records, with an optional toolbar above it: 32px rows, a
striped body, and light rules between every cell. It styles a native `<table>`. Every
visual value resolves through a token declared in [`tokens.css`](../../tokens.css), so
light and dark themes need no component-level overrides.

**Figma source:** Avianis WEB V2 › `Operations -> Flight Leg Search`
([node `2643:9982`](https://www.figma.com/design/EVpOUjWdmWXGSQ3CazkzqM/Avianis-WEB-V2?node-id=2643-9982)),
the results area (node `2643:9586`). For the whole page around it, see the
[list page pattern](../../patterns/list-page/list-page.md).

```html
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="components/badge/badge.css">
<link rel="stylesheet" href="components/table/table.css">

<div class="psds-table-view">
  <div class="psds-table-toolbar">
    <div class="psds-table-toolbar__group">…</div>
    <div class="psds-table-toolbar__group">
      <span class="psds-table-toolbar__count">11 flight legs</span>
      …
    </div>
  </div>
  <div class="psds-table-scroll">
    <table class="psds-table">
      <caption class="sr-only">Flight legs</caption>
      <colgroup>
        <col style="width: 150px">
        <col style="width: 170px">
        <col>
      </colgroup>
      <thead>
        <tr><th scope="col">Route</th><th scope="col">Aircraft</th><th scope="col">Leg Status</th></tr>
      </thead>
      <tbody>
        <tr>
          <td><a class="psds-table__link" href="/legs/123">CYUL → CYYZ</a></td>
          <td>N34T0</td>
          <td><span class="psds-badge psds-badge--lg psds-badge--info psds-badge--pill">Active</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

## Class API

| Element | Class | Notes |
| --- | --- | --- |
| View | `.psds-table-view` | optional column frame: toolbar on top, table below; give it a height |
| Toolbar | `.psds-table-toolbar` | 42px bar with a light bottom rule |
| Toolbar group | `.psds-table-toolbar__group` | a cluster of controls with 8px gaps; use two, one at each end |
| Result count | `.psds-table-toolbar__count` | muted 12px text, e.g. "11 flight legs" |
| Scroll area | `.psds-table-scroll` | scrolls both ways; the header row stays pinned |
| Table | `.psds-table` | a native `<table>` |
| Interactive rows | `.psds-table--interactive` | rows tint on hover (not in Figma) |
| Link | `.psds-table__link` | the primary-coloured record link (the Route column) |
| Empty cell | `.psds-table__empty` | one `<td colspan="…">` for "no results" |

## Layout

| Part | Value |
| --- | --- |
| Row height (header and body) | `--form-mouse` 32, including the 1px bottom rule |
| Cell padding | `--spacing-8` left and right |
| Cell rules | 1px `--border-light`, right and bottom of every cell |
| Toolbar | 42px, `--spacing-8` / `--spacing-12` padding, `--spacing-8` gap, 1px `--border-light` bottom rule |

**Column widths** come from a `<colgroup>`. The table uses `table-layout: fixed`, so the
widths are exact and long text is cut off with an ellipsis instead of widening the column.
Leave the last `<col>` without a width so it takes the remaining space, as in Figma. The
Figma widths are 150px for Route, 170px for most columns, 250px for Crew, and the rest for
the last column.

A badge in a cell is `.psds-badge--lg` (24px) with `--pill`, which sits inside the 32px
row with 4px above and below.

## Styles

| Part | Background | Text |
| --- | --- | --- |
| Header row | `--background-content-bg-color-alt2` | `--font-size-xs` 12 / `--line-height-xs`, `--font-weight-normal`, `--foreground-content-text-color-alt2` |
| Odd body rows | `--background-content-bg-color` | `--font-size-sm` 14 / `--line-height-sm`, `--font-weight-normal`, `--foreground-content-text-color` |
| Even body rows | `--background-content-bg-color-alt1` | same |
| Link | — | `--font-weight-medium`, `--buttons-primary-bg-color`; underlined `-pressed` on hover |
| Toolbar | `--background-content-bg-color` | count: `--font-size-xs`, `--foreground-content-text-color-alt2` |

The link's hover style and the `--interactive` row tint (`--background-content-bg-color-hover`)
are additions; Figma shows only the resting state.

## Toolbar

The Figma toolbar is built from existing components, all at their smallest size:

| Left group | Right group |
| --- | --- |
| Filter-panel toggle: [icon button](../icon-button/icon-button.md) `--xs --secondary --flat` with `table-columns` (`f0db`) | Result count: `.psds-table-toolbar__count` |
| **Columns**: [button](../button/button.md) `--xs --secondary --outlined --pill` | Search: [text box](../text-box/text-box.md) `--xs`, 230px wide, with a `magnifying-glass` (`f002`) affix |
| | Export: icon button `--xs --secondary` with `download` (`f019`) |
| | **Create**: button `--xs --primary` with a `plus` (`2b`) icon |

Figma's toggle glyph is the Font Awesome Pro `sidebar` icon, which the free set doesn't
include. `table-columns` is the closest free icon.

## Pagination

A regular table doesn't paginate. It scrolls in `.psds-table-scroll`, with the header
row pinned.

The exception is a table inside a [modal](../../patterns/modal/modal.md). A modal's height
is limited, so page it with a [pagination](../pagination/pagination.md) bar under the
table, `--spacing-16` below it.

## Accessibility

- Use real table markup: `<th scope="col">` for column headers and a `<caption>` that
  names the table. The caption can be visually hidden; the system has no utility class for
  that, so `sr-only` in the examples is the page's own class.
- Make the record link a real `<a href>`, so it can be opened in a new tab and reached
  with the keyboard. Don't make the whole row clickable with a script alone.
- Put `aria-live="polite"` on the result count if it changes as the user types in the
  search box.
- Icon-only toolbar buttons need an `aria-label`. If a button shows or hides the filter
  panel, also set `aria-expanded` and `aria-controls`.
- Status badges carry their meaning in words (Active, Arrived), not only in colour.

## Notes

- Figma draws a hidden filter (funnel) icon in each header cell. Sorting and per-column
  filters aren't built yet.
- The empty state is not in Figma. It is a single muted, centred cell four rows tall.
- `tokens.css` has no font-family token, so the Inter font stack is kept in
  `--psds-table-font-family`.
- `table.html` shows the table view with a scrolling body, a plain table, interactive rows
  and the empty state, with a dark-theme toggle.
