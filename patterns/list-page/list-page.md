# List page

A filter panel next to a results table: the layout for searching and browsing records
(flight legs, trips, crew…). It is a **pattern**, built from components in
[`components/`](../../components) plus the layout in [`list-page.css`](list-page.css).

App navigation (headers, tab bars, side menus) is **not** part of this pattern. Place
`.psds-list-page` inside whatever frame the app uses and give it a height.

**Figma reference:** Avianis WEB V2 › `Operations -> Flight Leg Search`
([node `2643:9982`](https://www.figma.com/design/EVpOUjWdmWXGSQ3CazkzqM/Avianis-WEB-V2?node-id=2643-9982)),
the area below the navigation. [`list-page.html`](list-page.html) is a working copy.

```text
┌ .psds-list-page ───────────────────────────────────────────────────────┐
│ .psds-filter-panel │ .psds-list-page__main > .psds-table-view          │
│  search            │  .psds-table-toolbar                         42px │
│  match all / any   │  .psds-table (sticky header, 32px rows)            │
│  preset            │                                                   │
│  accordions        │                                                   │
│  ── footer ──      │                                                   │
│  Search            │                                                   │
│  Save · Reset      │                                                   │
└────────────────────┴───────────────────────────────────────────────────┘
   250px
```

```html
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="foundations/icons.css">
<link rel="stylesheet" href="components/button/button.css">
<link rel="stylesheet" href="components/icon-button/icon-button.css">
<link rel="stylesheet" href="components/text-box/text-box.css">
<link rel="stylesheet" href="components/dropdown-list/dropdown-list.css">
<link rel="stylesheet" href="components/segmented-controls/segmented-controls.css">
<link rel="stylesheet" href="components/checkbox/checkbox.css">
<link rel="stylesheet" href="components/badge/badge.css">
<link rel="stylesheet" href="components/accordion/accordion.css">
<link rel="stylesheet" href="components/table/table.css">
<link rel="stylesheet" href="patterns/list-page/list-page.css">

<div class="psds-list-page" style="height: 100%">
  <aside class="psds-filter-panel" id="filters" aria-label="Filters">…</aside>
  <main class="psds-list-page__main">
    <div class="psds-table-view">…</div>
  </main>
</div>
```

Only the filter list and the table scroll; the page itself doesn't.

## Filter panel

A 250px column: `--background-content-bg-color-alt2`, 1px `--border-light` on the right.

```html
<aside class="psds-filter-panel" id="filters" aria-label="Filters">
  <div class="psds-filter-panel__body">
    <div class="psds-textbox psds-textbox--sm">…search…</div>
    <div class="psds-segmented psds-segmented--sm psds-segmented--block" role="radiogroup" aria-label="Match">…</div>
    <div class="psds-dropdown psds-dropdown--sm">…preset…</div>
    <div class="psds-accordion-group">
      <details class="psds-accordion" open>…checkboxes…</details>
    </div>
  </div>
  <div class="psds-filter-panel__footer">
    <button class="psds-btn psds-btn--sm psds-btn--primary" type="button">…Search</button>
    <div class="psds-filter-panel__row">
      <button class="psds-btn psds-btn--xs psds-btn--secondary" type="button">Save</button>
      <button class="psds-btn psds-btn--xs psds-btn--secondary" type="button" disabled>Reset</button>
    </div>
  </div>
</aside>
```

| Part | Spec |
| --- | --- |
| Body | `--spacing-8` / `--spacing-12` padding, `--spacing-10` gap, scrolls on its own |
| Search | [text box](../../components/text-box/text-box.md) `--sm`, full width, `magnifying-glass` affix |
| Match All / Any | [segmented controls](../../components/segmented-controls/segmented-controls.md) `--sm --block` |
| Preset | [dropdown list](../../components/dropdown-list/dropdown-list.md) `--sm`, full width |
| Sections | [accordion](../../components/accordion/accordion.md) in a group, holding [checkboxes](../../components/checkbox/checkbox.md) `--sm` |
| Footer | pinned; `--background-content-bg-color`, 1px `--border-light` on top, `--spacing-12` padding, `--spacing-8` gap |
| Search button | [button](../../components/button/button.md) `--sm --primary`, full width, `magnifying-glass` icon |
| Save / Reset | two `--xs --secondary` buttons sharing the width; Reset stays disabled until a filter is set |

Hide the panel with the `hidden` attribute. The table toolbar's first icon button toggles
it (`aria-controls="filters"`, `aria-expanded`).

## Results

`.psds-list-page__main` holds a [table view](../../components/table/table.md): the
toolbar and the scrolling table. The Figma column widths for flight legs are
150 · 170 · 170 · 170 · 170 · 170 · 250 · rest.

## Accessibility

- Use `<aside aria-label="Filters">` for the panel and `<main>` for the results.
- Give fields without a visible label a visually hidden `<label>`. The search boxes and the
  preset dropdown in the Figma frame have none.
- Announce the result count with `aria-live="polite"` when filters or search change it.

## Notes

- The panel width (250px) is a layout size, not a token, like the widths in the
  [modal pattern](../modal/modal.md).
- Where the operating system shows classic scrollbars, the filter list's scrollbar takes
  space from its controls (214px wide instead of 226px). The list uses a thin scrollbar
  to reduce this.
- The fixed "Toggle dark theme" button in `list-page.html` is only there for the demo.
