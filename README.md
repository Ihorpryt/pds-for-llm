# Portside Design System

Tokens, components and patterns for Portside internal products, packaged so product
managers (and their AI tools) can build interactive HTML prototypes that engineers use as a
reference.

## Start here

- **Building a prototype?** Read [`guidance.md`](guidance.md), then copy
  [`starter/index.html`](starter/index.html).
- **Handing one over?** Fill in [`handoff-template.md`](handoff-template.md) at the top of
  the file.
- **Looking up a component?** See the component index in [`guidance.md`](guidance.md#component-index);
  each folder in [`components/`](components) has docs (`.md`) and a live example (`.html`).

## Build

```bash
npm run build
```

Writes `dist/`:

| File | Use |
| --- | --- |
| `psds.js` | Everything in one script: styles with embedded icon fonts, Inter from Google Fonts, and component behaviour. Use this in prototypes, including Claude artifacts, which can load scripts but not stylesheets or fonts from a CDN. |
| `psds.css` + `icons/` | Styles only, for pages that can link a stylesheet. Keep `icons/` next to the CSS file. |

Sources: [`scripts/build.mjs`](scripts/build.mjs) bundles the CSS in load order;
[`src/behaviour.js`](src/behaviour.js) holds the shared behaviour.

## Claude skill

```bash
npm run build:skill
```

Writes `dist/portside-prototypes.zip`, the "Portside Prototypes" skill for Claude. It is
generated from [`skill/SKILL.md`](skill/SKILL.md) (the workflow), [`guidance.md`](guidance.md)
(the rules), the handoff template, the starter, every component and pattern doc and example,
and a list of every class the system styles. It points at the published `psds.js` for the
version in `package.json`.

## Releasing

1. Bump `version` in `package.json` (`0.1.0-beta.1`, `0.1.0`, …).
2. `npm publish` (add `--tag beta` for a pre-release). This rebuilds `dist/` first.
3. `npm run build:skill` and upload the new ZIP. Existing prototypes keep the version they
   were built with.

## Repository layout

| Path | Contents |
| --- | --- |
| `tokens.css` | Design tokens for light and dark themes |
| `foundations/` | Layout, typography and icons |
| `components/` | One folder per component: CSS, docs, live example |
| `patterns/` | Multi-component layouts: list page, modal |
| `starter/` | A working prototype to copy |
