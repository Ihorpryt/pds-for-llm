# Layout

Spacing in Portside follows a **4px grid**. Every padding, margin and gap should be a
multiple of 4px, taken from the `--spacing-*` tokens in
[`tokens.css`](../tokens.css).

## The 4px grid

Use these values for all normal spacing:

| Value | Token | Typical use |
| --- | --- | --- |
| 4px | `--spacing-4` | Label → control, title → description |
| 8px | `--spacing-8` | Controls inside one compound row, icon → text |
| 12px | `--spacing-12` | Stacked fields, list items, card padding |
| 16px | `--spacing-16` | Container and section padding, column gaps |
| 20px | `--spacing-20` | Occasional step between 16 and 24 |
| 24px | `--spacing-24` | Space between sections or grouped blocks |
| 32px | `--spacing-32` | Page-level separation between major regions |
| 40px+ | `--spacing-40`, `--spacing-48`, `--spacing-64`, `--spacing-80` | Page margins, empty states, large vertical rhythm |

- Prefer the smaller value when two feel equally right; density is a Portside default.
- Step up the scale rather than inventing an intermediate value — go 16 → 24, not 16 → 18.
- Apply the grid to `padding`, `margin`, `gap`, `row-gap` and `column-gap` alike.

## The 2px grid (tight situations)

Where 4px is too coarse — optical alignment, dense rows, small badges, nudging an icon
against text — drop to a 2px grid:

| Value | Token |
| --- | --- |
| 2px | `--spacing-2` |
| 4px | `--spacing-4` |
| 6px | `--spacing-6` |

Treat this as the exception. If a layout needs several 2px steps to work, the problem is
usually the layout, not the grid.

## Off-grid values

Odd values (`--spacing-3`, `--spacing-5`, `--spacing-7`, …) exist in `tokens.css` because
they were imported wholesale. They are not part of the spacing system — use them only for
a specific, deliberate reason, such as:

- Compensating for a 1px border so a control's total size stays on the grid
  (7px padding + 1px border = 8px).
- Matching the optical centre of an icon that is not drawn on a square canvas.

Anything else off the grid should be fixed rather than tokenised.

## What the grid does not cover

- **Component dimensions** — heights, widths and hit areas come from each component's own
  size table (`--xs`, `--sm`, `--md`, …), not from the spacing scale.
- **Radii** — use the `--radius-*` and `--control-radius-*` tokens.
- **Line heights** — use the type scale in [`typography.css`](typography.css); leading is
  not spacing.
- **Border widths** — 1px hairlines are correct and are not an off-grid violation.

## Notes

- `tokens.css` contains every integer value from 0 to 20 plus a coarser scale above it, so
  the grid is a convention this document enforces, not something the tokens prevent you
  from breaking.
- Use the token, not the literal: `gap: var(--spacing-12)`, not `gap: 12px`.
