#!/usr/bin/env node
// CI gate: every (fg, bg) pair in semantic theme must clear AA.
import fs from 'node:fs';
import path from 'node:path';

const tokens = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'tokens', 'tokens.json'), 'utf8'));

function lum(hex) {
  const h = hex.replace('#','');
  const rgb = [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)];
  const lin = rgb.map(v => { v/=255; return v<=0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4); });
  return lin[0]*0.2126 + lin[1]*0.7152 + lin[2]*0.0722;
}
function ratio(a, b) {
  const L1 = lum(a), L2 = lum(b);
  const [hi, lo] = L1 > L2 ? [L1, L2] : [L2, L1];
  return (hi + 0.05) / (lo + 0.05);
}

let failures = 0;
for (const mode of ['light','dark']) {
  const t = tokens.theme[mode];
  const pairs = [
    ['fg.default → bg.default', t.fg.default, t.bg.default, 4.5],
    ['fg.subtle  → bg.default', t.fg.subtle,  t.bg.default, 4.5],
    ['fg.muted   → bg.default', t.fg.muted,   t.bg.default, 4.5],
    ['interactive.primaryFg → interactive.primary',     t.interactive.primaryFg,   t.interactive.primary,   4.5],
    ['interactive.secondaryFg → interactive.secondary', t.interactive.secondaryFg, t.interactive.secondary, 4.5],
    ['border.default → bg.default (UI)', t.border.default, t.bg.default, 3],
  ];
  for (const [name, fg, bg, min] of pairs) {
    const r = ratio(fg, bg);
    const ok = r >= min;
    console.log(`[${mode}] ${name}  ${r.toFixed(2)}:1  min ${min}  ${ok ? '✓' : '✗ FAIL'}`);
    if (!ok) failures++;
  }
}
if (failures) {
  console.error(`\n${failures} contrast pair(s) below threshold — failing CI.`);
  process.exit(1);
}
console.log('\nAll semantic pairs pass WCAG AA.');
