// Builds the portable bundle into dist/:
//   dist/psds.css        every stylesheet in load order; icon fonts from ./icons/
//   dist/icons/*.woff2   the Font Awesome files psds.css points at
//   dist/psds.js         self-contained: injects the same CSS (fonts embedded as data: URLs),
//                        loads Inter from Google Fonts, and wires up component behaviour
//
// Run with `node scripts/build.mjs` (or `npm run build`). No dependencies.

import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const DIST = path.join(ROOT, 'dist');
const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));

const INTER = 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap';
const FONTS = [
  { file: 'fa-regular-400.woff2', weight: 400 },
  { file: 'fa-solid-900.woff2', weight: 900 },
];

const read = (rel) => fs.readFileSync(path.join(ROOT, rel), 'utf8');
const list = (dir, ext) => fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => `${dir}/${d.name}/${d.name}${ext}`)
  .filter((rel) => fs.existsSync(path.join(ROOT, rel)))
  .sort();

// Load order: tokens, foundations, components, then patterns (which compose components).
const SOURCES = [
  'tokens.css',
  'foundations/typography.css',
  'foundations/icons.css',
  ...list('components', '.css'),
  ...list('patterns', '.css'),
];

// Removes comments while leaving quoted strings (data: URLs) untouched, then collapses
// whitespace. Deliberately small: the sources are hand-written and well-formed.
function minify(css) {
  const strings = [];
  let out = '';
  for (let i = 0; i < css.length; i++) {
    const c = css[i];
    if (c === '"' || c === "'") {
      let end = i + 1;
      while (end < css.length && css[end] !== c) end += css[end] === '\\' ? 2 : 1;
      if (end >= css.length) throw new Error(`Unclosed ${c} near: ${css.slice(i, i + 80)}`);
      out += `\u0000${strings.push(css.slice(i, end + 1)) - 1}\u0000`;
      i = end;
    } else if (c === '/' && css[i + 1] === '*') {
      const end = css.indexOf('*/', i + 2);
      if (end < 0) throw new Error(`Unclosed comment near: ${css.slice(i, i + 80)}`);
      i = end + 1;
    } else {
      out += c;
    }
  }
  return out
    .replace(/\s+/g, ' ')
    .replace(/\s*([{};,>])\s*/g, '$1')
    .replace(/;}/g, '}')
    .replace(/\u0000(\d+)\u0000/g, (_, n) => strings[n])
    .trim();
}

// Every source loses its own @import and @font-face rules; the bundle declares them once.
const strip = (css) => css
  .replace(/@import\s+url\([^)]*\)[^;]*;/g, '')
  .replace(/@font-face\s*{[^}]*}/g, '');

const fontFaces = (src) => FONTS.map(({ file, weight }) =>
  `@font-face{font-family:"Font Awesome 7 Free";src:url("${src(file)}") format("woff2");` +
  `font-weight:${weight};font-style:normal;font-display:block}`).join('');

// Small utility the component markup relies on (e.g. toggle-switch labels).
const UTILITIES = '.sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}';

const body = SOURCES.map((rel) => `/* ${rel} */\n` + strip(read(rel))).join('\n');
const core = minify(body) + UTILITIES;
const banner = `/*! Portside Design System ${pkg.version} */`;

fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(path.join(DIST, 'icons'), { recursive: true });

// dist/psds.css — for pages that can link stylesheets and fonts normally.
for (const { file } of FONTS) fs.copyFileSync(path.join(ROOT, 'icons', file), path.join(DIST, 'icons', file));
const css = `${banner}\n@import url('${INTER}');\n${fontFaces((f) => `./icons/${f}`)}${core}\n`;
fs.writeFileSync(path.join(DIST, 'psds.css'), css);

// dist/psds.js — for environments that only allow a script (e.g. Claude artifacts).
const dataUrl = (f) => 'data:font/woff2;base64,' + fs.readFileSync(path.join(ROOT, 'icons', f)).toString('base64');
const inlineCss = fontFaces(dataUrl) + core;
const behaviour = read('src/behaviour.js');
const js = `${banner}
(function () {
  if (window.PSDS) return;
  var head = document.head || document.documentElement;
  if (!document.querySelector('link[data-psds-font]')) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = ${JSON.stringify(INTER)};
    link.setAttribute('data-psds-font', '');
    head.appendChild(link);
  }
  var style = document.createElement('style');
  style.setAttribute('data-psds', ${JSON.stringify(pkg.version)});
  style.textContent = ${JSON.stringify(inlineCss)};
  // First in <head> so a prototype's own styles still override the system's.
  head.insertBefore(style, head.firstChild);
})();
${behaviour.replace('__VERSION__', pkg.version)}`;
fs.writeFileSync(path.join(DIST, 'psds.js'), js);

const kb = (s) => (Buffer.byteLength(s) / 1024).toFixed(0) + ' KB';
console.log(`psds.css ${kb(css)} · psds.js ${kb(js)} · ${SOURCES.length} stylesheets`);
