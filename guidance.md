# Sizing guidance

Use `Text-small` as the base font size for product UI.

Use the `--sm` size by default for buttons, dropdowns, and other components. Choose a different size only when the design has a clear hierarchy, accessibility, or interaction requirement that calls for it.

Use Font Awesome icons where an appropriate icon is available; use custom icons only when
Font Awesome cannot meet the need. See [`foundations/icons.md`](foundations/icons.md) for
the glyph set and the `.psds-icon` class.

## Foundations

| Foundation | Covers |
| --- | --- |
| [`foundations/layout.md`](foundations/layout.md) | Spacing: the 4px grid for paddings, margins and gaps, and the 2px grid for tight cases |
| [`foundations/typography.md`](foundations/typography.md) | Type: the Inter family, how it is loaded, the size scale (`.text-small` and friends) and weights |
| [`foundations/icons.md`](foundations/icons.md) | Icons: the self-hosted Font Awesome set, the `.psds-icon` box, sizes and colours |
| [`tokens.css`](tokens.css) | All design tokens: colours, `--spacing-*`, `--radius-*`, borders |

Components live in [`components/`](components); multi-component layouts such as the
[modal](patterns/modal/modal.md) live in [`patterns/`](patterns).
