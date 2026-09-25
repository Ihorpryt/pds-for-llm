---
name: portside-prototypes
description: Build interactive HTML prototypes of Portside internal product screens with the Portside Design System (PDS). Use whenever someone asks to prototype, mock up, sketch or demo a Portside screen, page, form, table, dialog or flow — for example "prototype a crew list with filters", "mock up the edit trip modal", "show an empty state for this page" — or asks to change a prototype built this way. Produces one self-contained HTML artifact that loads PDS from a single script, uses only existing PDS components, and starts with handoff notes for engineers.
---

# Portside prototypes

You build **reference prototypes**: a single interactive HTML page that shows a product
manager's idea using the real Portside Design System. Engineers rebuild it in production,
so it must look like Portside, show the intended behaviour and states, and state its
assumptions.

The rules live in [`guidance.md`](guidance.md). It is the source of truth; this file only
adds the workflow.

## Workflow

1. **Read [`guidance.md`](guidance.md) in full** before writing anything, every time.
2. **Choose a starting point.**
   - A list, search or browse screen, or anything with a create or edit form: copy
     [`starter/index.html`](starter/index.html) and change it.
   - Otherwise, start from the closest pattern in [`patterns/`](patterns).
3. **Read the docs for every component you use**: its `.md`, then its `.html` example for
   markup. Don't rely on memory of other design systems.
4. **Check class names.** Every `psds-` class you write must appear in
   [`classes.txt`](classes.txt). If it doesn't, you invented it: find the right class, or
   build the element with a `proto-` class and list it under Proposed additions.
5. **Build one HTML artifact.**
   - Load the system with exactly this tag, and nothing else from outside:
     `<script src="{{CDN_URL}}"></script>`
   - No other external stylesheets, scripts or fonts; the artifact environment blocks them.
   - Don't copy `<link rel="stylesheet">` tags or `<svg><use href="#…">` sprites from the
     `.html` examples; they depend on files in the design-system repository.
   - Page styles go in one `<style>` block; sample data in one array at the top of the
     page script.
6. **Write the handoff notes** as a comment directly after `<!doctype html>` (which must
   stay the first line), using [`handoff-template.md`](handoff-template.md), and repeat
   them at the end of your reply.
7. **Check before you finish:**
   - every `psds-` class is in `classes.txt`;
   - empty, error and success states exist where the screen has them;
   - every field has a label, and icon-only buttons have an `aria-label`;
   - nothing is hard-coded to one theme (no hex colours in page styles);
   - the file starts with `<!doctype html>`;
   - the handoff notes match what the prototype does.

## Changing an existing prototype

- Keep the same script tag and version.
- Update the handoff notes in the same edit: what changed, new states, new open questions.
- If the person asks for something the design system doesn't have, build it as a `proto-`
  element and say so in your reply, rather than restyling an existing component.

## When the request is vague

Don't stop to ask more than one question. Make reasonable product assumptions, build the
prototype, and list the assumptions under **Open questions** in the handoff notes.
