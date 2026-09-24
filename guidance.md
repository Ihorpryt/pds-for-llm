# Portside Design System — guidance for prototypes

Read this first when building a prototype with the Portside Design System (PDS), whether
you are a person or an AI tool.

Prototypes built with PDS are **references, not production code**. Product managers use
them to show a feature; engineers rebuild it in the production codebase. So a prototype
must:

- **look like Portside**: built from the existing components, never restyled;
- **show the intended behaviour**, including loading, empty, error and success states, not
  only the happy path;
- **say what it assumes**, through the [handoff notes](#handoff-notes) at the top of the
  file.

## Load the system

One script loads everything: tokens, component styles, the Inter and Font Awesome fonts,
and the behaviour of interactive components.

```html
<script src="https://cdn.jsdelivr.net/npm/portside-pds@VERSION/dist/psds.js"></script>
```

Keep that exact version for the life of a prototype, so a later release cannot change a
prototype that has already been reviewed.
<!-- repo-only -->
Inside this repository, run `npm run build` and use `dist/psds.js` instead. `VERSION` is
filled in when the skill package is built.
<!-- /repo-only -->

The component docs show `<link rel="stylesheet" href="tokens.css">` and similar lines.
Those are for working inside this repository. **In a prototype, the script replaces all of
them.** Do not add those links.

Then set up the page once:

```html
<style>
  body {
    margin: 0;
    background: var(--background-content-bg-color);
    color: var(--foreground-content-text-color);
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
    font-size: var(--font-size-sm);
    line-height: var(--line-height-sm);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
```

## Start from

- [`starter/index.html`](starter/index.html) — a working list page with filters, search,
  tabs, a create form in a modal, validation and a success message. Copy it and change it,
  rather than starting from a blank page.
- [`patterns/list-page`](patterns/list-page/list-page.md) — searching and browsing records.
- [`patterns/modal`](patterns/modal/modal.md) — dialogs, forms in dialogs, confirmations.

## Rules

1. **Compose from what exists.** Use the components and patterns in the
   [index](#component-index). Before using a component, read its `.md` for markup, sizes,
   states and accessibility, and copy the markup from its `.html` example.
2. **Never invent a `psds-` class.** A class that is not in the system is not styled; it
   will look broken. If you check a class and it does not exist, do not use it.
3. **Mark anything new.** When the screen needs something the system does not have, build
   it with page styles, prefix its classes with `proto-`, and list it under **Proposed
   additions** in the handoff notes.
4. **Keep page styles to layout.** Put prototype CSS in one `<style>` block: page layout,
   spacing between blocks, and `proto-` elements. Never override a component's colours,
   sizes or radii.
5. **Use tokens, not raw values.** Colours come from `tokens.css` variables
   (`var(--foreground-content-text-color)`), spacing from the 4px grid
   (`var(--spacing-16)`; see [`layout.md`](foundations/layout.md)). No hex colours in page
   styles.
6. **Default sizes.** Use `Text-small` (`.text-small`, 14px) as the base font size. Use the
   `--sm` size for buttons, dropdowns and other controls. Choose a different size only when
   the design has a clear hierarchy, accessibility or interaction reason.
7. **Icons.** Use Font Awesome through `<span class="psds-icon" aria-hidden="true">&#xf002;</span>`,
   written as an HTML entity. [`icons.md`](foundations/icons.md) lists common code points;
   use custom icons only when Font Awesome cannot meet the need. Where a component doc
   shows an inline `<svg>` in an icon slot, a `.psds-icon` glyph works there too. Some
   `.html` examples use `<svg><use href="#…">` sprites defined inside that example page;
   don't copy those, because the sprite won't exist in your prototype.
8. **Light and dark.** Both themes work automatically through tokens. Don't hard-code a
   theme. `PSDS.setTheme('dark')` switches it for checking.
9. **States.** Show what happens when there is no data (`.psds-table__empty`), when
   something fails (an alert or a field error), while waiting (the `spinner` glyph), and
   after success (a success alert).
10. **Accessibility basics.** Every field has a label (use `.sr-only` to hide one visually);
    actions are `<button>`s; links are `<a>`; dialogs have `aria-labelledby`; decorative
    icons are `aria-hidden="true"`.
11. **Sample data.** Use realistic aviation data (routes, tail numbers, crew names), and
    keep it in one array at the top of the page script so it is easy to find and replace.

## Behaviour

`psds.js` wires these automatically, including for markup your script adds later:

| Component | What is handled | Your markup needs |
| --- | --- | --- |
| Dropdown list (custom menu) | Open, close, select, arrow keys, Escape, click outside | `.psds-dropdown__field` button + `.psds-dropdown__menu[hidden]` with `.psds-dropdown__option[role=option]` |
| Dropdown list (`<select>`) | Native | `<select class="psds-dropdown__field">` |
| Tabs, segmented tabs | Select on click, arrow keys, Home/End, show the panel named by `aria-controls` | `[role=tablist]` with `[role=tab]` buttons |
| Date picker | Calendar, month navigation, keyboard, Today, fills `YYYY/MM/DD` | `.psds-datepicker__field` + `.psds-datepicker__toggle` |
| Text box clear | Empties the field | `.psds-textbox__clear` button |
| Alert close | Removes the alert | `.psds-alert__close` button |
| Tooltip | Escape hides it (hover and focus show it through CSS) | `.psds-tooltip-anchor` |
| Modal | `showModal()`, focus trap, Escape, backdrop click | `<button data-psds-open="dialog-id">`; `data-psds-close` on buttons inside the `<dialog>` |

Listen for results rather than reading the DOM:

- `psds:change` — fired on a dropdown, date picker or tab when its value changes;
  `event.detail.value` holds the value (a dropdown option's `data-value`, or its text).
- `psds:dismiss` — fired on an alert just before its close button removes it.

Helpers:

- `PSDS.setFieldState(fieldRoot, 'danger', 'Enter a route.')` shows a validation message on
  a text box, text area, dropdown, date picker or multiselect; `PSDS.setFieldState(fieldRoot, null)`
  clears it. A helper hint already in the field's markup is shown again when the error
  clears. The form decides the rules; this only draws the result.
- `PSDS.setTheme('light' | 'dark' | null)`.

**Your page script owns:** data, filtering, sorting, saving, and anything `psds.js` does
not list above. That includes the multiselect, pagination, removable chips, dropdown-button
menus and the list page's filter-panel toggle. Each component's `.html` example has a
working reference script to adapt.

## Component index

Production mapping says which production component and props each one corresponds to.
None have been confirmed with engineering yet, so every entry reads **unverified**.
Engineers fill these in as they confirm them.

| Component | Use for | Root class | Behaviour | Production mapping |
| --- | --- | --- | --- | --- |
| [Accordion](components/accordion/accordion.md) | Collapsible groups, such as filter sections | `.psds-accordion` on `<details>` | Native | Unverified |
| [Alert message](components/alert-message/alert-message.md) | Inline status, errors, success messages | `.psds-alert` | psds.js (close) | Unverified |
| [Avatar](components/avatar/avatar.md) | A person or account: photo, initials, count | `.psds-avatar` | None | Unverified |
| [Badge](components/badge/badge.md) | Static status word, count or dot | `.psds-badge` | None | Unverified |
| [Button](components/button/button.md) | Actions | `.psds-btn` | Native | Unverified |
| [Checkbox](components/checkbox/checkbox.md) | Multiple choices, single opt-in | `.psds-checkbox` | Native | Unverified |
| [Chip](components/chip/chip.md) | Values, filters, people, tags; removable | `.psds-chip` | Page script (remove) | Unverified |
| [Date picker](components/date-picker/date-picker.md) | Choosing a date | `.psds-datepicker` | psds.js | Unverified |
| [Dropdown button](components/dropdown-button/dropdown-button.md) | A button that opens a menu of actions | `.psds-dropdown-btn` | Page script | Unverified |
| [Dropdown list](components/dropdown-list/dropdown-list.md) | Choosing one value from a list | `.psds-dropdown` | psds.js / native `<select>` | Unverified |
| [Icon button](components/icon-button/icon-button.md) | Icon-only actions (needs `aria-label`) | `.psds-icon-btn` | Native | Unverified |
| [Link button](components/link-button/link-button.md) | Text-only actions that read as links | `.psds-link-btn` | Native | Unverified |
| [Multiselect](components/multiselect/multiselect.md) | Choosing several values, with search | `.psds-multiselect` | Page script | Unverified |
| [Pagination](components/pagination/pagination.md) | Paging a table inside a modal | `.psds-pagination` | Page script | Unverified |
| [Radio](components/radio/radio.md) | Exactly one choice from a small set | `.psds-radio` | Native | Unverified |
| [Segmented controls](components/segmented-controls/segmented-controls.md) | A small set of options or views | `.psds-segmented` | Native radios / psds.js (tabs) | Unverified |
| [Table](components/table/table.md) | Lists of records, with a toolbar | `.psds-table`, `.psds-table-toolbar` | None | Unverified |
| [Tabs](components/tabs/tabs.md) | Panels of related content in one place | `.psds-tabs` | psds.js | Unverified |
| [Text area](components/text-area/text-area.md) | Multi-line text | `.psds-textarea` | Native | Unverified |
| [Text box](components/text-box/text-box.md) | Single-line text, search | `.psds-textbox` | Native / psds.js (clear) | Unverified |
| [Toggle switch](components/toggle-switch/toggle-switch.md) | A setting that takes effect immediately | `.psds-toggle` | Native | Unverified |
| [Tooltip](components/tooltip/tooltip.md) | Short description of a control | `.psds-tooltip` | CSS / psds.js (Escape) | Unverified |

| Pattern | Use for | Root |
| --- | --- | --- |
| [List page](patterns/list-page/list-page.md) | Filter panel beside a results table | `.psds-list-page` |
| [Modal](patterns/modal/modal.md) | Dialogs and forms over the page | `<dialog class="md">` (`.sm`, `.md`, `.lg`, `.xl`) with `.psds-modal__header`, `__title`, `__close`, `__body`, `__row`, `__footer` |

## Foundations

| Foundation | Covers |
| --- | --- |
| [`foundations/layout.md`](foundations/layout.md) | Spacing: the 4px grid for paddings, margins and gaps, and the 2px grid for tight cases |
| [`foundations/typography.md`](foundations/typography.md) | Type: the Inter family, how it is loaded, font smoothing, the size scale (`.text-small` and friends) and weights |
| [`foundations/icons.md`](foundations/icons.md) | Icons: the self-hosted Font Awesome set, the `.psds-icon` box, sizes, colours and common code points |
| [`tokens.css`](tokens.css) | All design tokens: colours, `--spacing-*`, `--radius-*`, borders |

## Handoff notes

Every prototype starts with handoff notes: an HTML comment at the very top of the file,
filled in from [`handoff-template.md`](handoff-template.md). When an AI tool builds the
prototype, it also repeats the notes in its reply. Keep them short and specific; update
them whenever the prototype changes.

## Known gaps

Work around these in the prototype and mention them in the handoff notes when they matter:

- **Modal widths** use unprefixed classes (`.sm`, `.md`, `.lg`, `.xl`). Don't use those
  class names for anything else on the page.
