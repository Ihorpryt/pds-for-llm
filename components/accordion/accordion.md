# Accordion

Collapsible sections with a small uppercase title and a chevron, used to group long lists
such as filters. It styles the native `<details>` / `<summary>` elements, so opening and
closing works without a script. Every visual value resolves through a token declared in
[`tokens.css`](../../tokens.css).

**Figma source:** Avianis WEB V2 › `Operations -> Flight Leg Search`
([node `2643:9982`](https://www.figma.com/design/EVpOUjWdmWXGSQ3CazkzqM/Avianis-WEB-V2?node-id=2643-9982)),
the filter sections (node `4547:42259`): TRIP, LEG DETAILS, ROUTE & AIRPORTS…

```html
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="components/accordion/accordion.css">

<div class="psds-accordion-group">
  <details class="psds-accordion" open>
    <summary class="psds-accordion__header">
      <span class="psds-accordion__title">Trip</span>
    </summary>
    <div class="psds-accordion__body">
      <!-- checkboxes, fields, any content -->
    </div>
  </details>
  <details class="psds-accordion">…</details>
</div>
```

## Class API

| Element | Class | Notes |
| --- | --- | --- |
| Group | `.psds-accordion-group` | optional wrapper; adds the rule above the first section |
| Section | `.psds-accordion` | a `<details>`; add `open` to start expanded |
| Header | `.psds-accordion__header` | the `<summary>`; the chevron is drawn by CSS |
| Title | `.psds-accordion__title` | the title text; written in any case, shown uppercase |
| Body | `.psds-accordion__body` | a column with a 10px gap between items |

Open and closed come from the `<details>` element's own `open` attribute. The forced-state
helpers `.is-hover` and `.is-focus` on the section are for documentation galleries.

## Layout

| Part | Value |
| --- | --- |
| Section padding | `--spacing-12` top and bottom, none at the sides |
| Section rule | 1px `--border-light` below each section (and above the first, inside a group) |
| Title | `--font-size-xxs` 10 / `--line-height-xxs` 14, `--font-weight-bold`, uppercase |
| Chevron | 16px (`--font-icon-16`), the Figma *Icons/Chevron down* glyph, `--icon-color` |
| Gap | `--spacing-10` between the header and the body, and between body items |

The section has no side padding. Its container supplies it (the filter panel uses 12px).

## States

| State | Title | Chevron |
| --- | --- | --- |
| Open | `--foreground-content-text-color-alt2` | points down |
| Closed | same | points right |
| Hover *(added)* | `--foreground-content-text-color` | `--icon-color-hover` |
| Focus *(added)* | `--foreground-content-text-color` + the standard focus ring | — |

Figma only shows the open, resting state. Closed, hover and focus are additions.

## Accessibility

- `<summary>` is already a button for keyboard and screen-reader users. It announces the
  title and whether the section is expanded. Don't add extra roles.
- Keep the title short and unique. Screen readers read it as written in the HTML, not in
  uppercase, so write it in normal case ("Route & Airports").
- If a script hides whole sections (e.g. while searching filters), set `hidden` on the
  `<details>`; the stylesheet respects it.
- Transitions are turned off under `prefers-reduced-motion: reduce`.

## Notes

- **Title colour.** In Figma the last two sections (AIRCRAFT, TRIP & STATUS) use the SF Pro
  font in `--foreground-content-text-color-alt3`. That looks like a leftover, so every
  title here uses Inter in `alt2`, like the first three sections.
- The chevron is the exported Figma glyph, drawn as a CSS mask so it follows the colour
  token.
- `accordion.html` shows filter sections and every state, with a dark-theme toggle.
