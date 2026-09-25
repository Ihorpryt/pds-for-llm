# Handoff notes template

Put this directly after `<!doctype html>`, and fill in each section. The doctype must stay
the very first line: tools such as Claude Desktop treat a file that starts with anything
else as a fragment and render it without standards mode. Delete a section's placeholder line
only when it genuinely has nothing to say; write "None" rather than leaving it empty.

Write for the engineer who will build the feature: what it should do, not how the prototype
does it.

```html
<!doctype html>
<!--
HANDOFF NOTES
Feature:        <one line: what this screen lets the user do>
Design system:  portside-pds <version>
Last updated:   <YYYY-MM-DD>

WHAT IT DOES
- <each user action and its result, e.g. "Create opens a form; Save adds the leg to the top of the list">

STATES SHOWN
- <empty, loading, error, success, disabled… and how to see each one in the prototype>

VALIDATION
- <field: rule and message, e.g. "Route: required — 'Enter a route.'">

MOCKED
- <what is fake: sample data, saving, search, permissions, API calls>

COMPONENTS USED
- <component: variant/size, e.g. "Table with toolbar; Button --sm primary; Date picker --sm">

PROPOSED ADDITIONS
- <anything built with proto- classes that the design system doesn't have yet, and why>

OPEN QUESTIONS
- <decisions the PM still needs to make or confirm with engineering>
-->
```

## Example

```html
<!doctype html>
<!--
HANDOFF NOTES
Feature:        Browse flight legs and create a new one
Design system:  portside-pds 0.1.0
Last updated:   2026-09-25

WHAT IT DOES
- Tabs filter the table by leg status; the search box filters by any column.
- Create opens a form in a modal; Save adds the leg to the top of the list as "In Review"
  and shows a success message.
- Filters on the left are visual only.

STATES SHOWN
- Empty: search for "zzz".
- Validation error: press Save with the form empty.
- Success: save a valid form.

VALIDATION
- Route: required — "Enter a route."
- Departure date: required — "Choose a departure date."

MOCKED
- All data is sample data in the LEGS array; nothing is saved after a reload.
- Filter checkboxes and saved searches do nothing.

COMPONENTS USED
- List page pattern; Tabs --sm; Table (interactive) with toolbar; Badge --lg pill.
- Modal .md with Text box, Dropdown list, Date picker, Text area and Toggle, all --sm.
- Alert message --sm success as a toast.

PROPOSED ADDITIONS
- Toast position (bottom right, fixed): proto-toast. The system has no toast placement yet.

OPEN QUESTIONS
- Should new legs start as "In Review" or "Active"?
- Is Arrival date required for international legs?
-->
```
