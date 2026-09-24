// Builds the "Portside Prototypes" skill for Claude from this repository:
//   dist/skill/portside-prototypes/   the skill folder
//   dist/portside-prototypes.zip      the same folder, ready to upload
//
// guidance.md stays the single source of rules; skill/SKILL.md only adds the workflow.
// The skill points at the published psds.js for this package version on jsDelivr, so
// publish that version to npm before handing the ZIP to anyone.
//
// Run with `npm run build:skill` (runs `npm run build` first). Needs the `zip` command.

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const DIST = path.join(ROOT, 'dist');
const NAME = 'portside-prototypes';
const OUT = path.join(DIST, 'skill', NAME);
const ZIP = path.join(DIST, `${NAME}.zip`);

const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
const CDN_URL = `https://cdn.jsdelivr.net/npm/${pkg.name}@${pkg.version}/dist/psds.js`;

const read = (rel) => fs.readFileSync(path.join(ROOT, rel), 'utf8');
const write = (rel, text) => {
  const file = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, text);
};
const copy = (rel) => write(rel, read(rel));

if (!fs.existsSync(path.join(DIST, 'psds.css'))) throw new Error('Run `npm run build` first.');

fs.rmSync(path.join(DIST, 'skill'), { recursive: true, force: true });
fs.rmSync(ZIP, { force: true });

// SKILL.md: the workflow, with the pinned script URL.
write('SKILL.md', read('skill/SKILL.md').replaceAll('{{CDN_URL}}', CDN_URL));

// guidance.md: repository-only notes removed, the real URL filled in.
const guidance = read('guidance.md')
  .replace(/<!-- repo-only -->[\s\S]*?<!-- \/repo-only -->\n?/g, '')
  .replaceAll(`${pkg.name}@VERSION`, `${pkg.name}@${pkg.version}`);
if (guidance.includes('@VERSION')) throw new Error('guidance.md still contains @VERSION');
write('guidance.md', guidance);

copy('handoff-template.md');

// The starter, loading the published script instead of the local build.
const starter = read('starter/index.html')
  .replace('<script src="../dist/psds.js"></script>', `<script src="${CDN_URL}"></script>`)
  .replace(/(Design system:\s+)\S+ \S+/, `$1${pkg.name} ${pkg.version}`);
if (!starter.includes(CDN_URL)) throw new Error('starter/index.html: script tag not found');
write('starter/index.html', starter);

// Docs and live examples, in the same layout so relative links in the docs still work.
for (const dir of ['foundations', 'components', 'patterns']) {
  const walk = (rel) => {
    for (const entry of fs.readdirSync(path.join(ROOT, rel), { withFileTypes: true })) {
      const child = `${rel}/${entry.name}`;
      if (entry.isDirectory()) walk(child);
      else if (/\.(md|html)$/.test(entry.name)) copy(child);
    }
  };
  walk(dir);
}

// Every class the system styles, so the model can check it isn't inventing one.
const css = fs.readFileSync(path.join(DIST, 'psds.css'), 'utf8').replace(/"[^"]*"|'[^']*'/g, '');
const classes = [...new Set(css.match(/\.-?[_a-zA-Z][\w-]*/g).map((c) => c.slice(1)))]
  .filter((c) => !/^\d/.test(c))
  .sort();
write('classes.txt',
  `# Every class styled by ${pkg.name} ${pkg.version}. A psds- class not listed here does not exist.\n` +
  classes.join('\n') + '\n');

execFileSync('zip', ['-qr', ZIP, NAME], { cwd: path.join(DIST, 'skill') });

const files = execFileSync('find', [OUT, '-type', 'f']).toString().trim().split('\n').length;
console.log(`${NAME}: ${files} files, ${classes.length} classes → ${path.relative(ROOT, ZIP)}`);
console.log(`Script URL: ${CDN_URL}`);
