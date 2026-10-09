#!/usr/bin/env node
// Sanity-check tokens.json shape so consumers can rely on the contract.
import fs from 'node:fs';
import path from 'node:path';

const tokens = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'tokens', 'tokens.json'), 'utf8'));

const required = [
  ['color.primitive.neutral', tokens?.color?.primitive?.neutral],
  ['theme.light.bg.default',  tokens?.theme?.light?.bg?.default],
  ['theme.dark.bg.default',   tokens?.theme?.dark?.bg?.default],
  ['typography.fontSize.md',  tokens?.typography?.fontSize?.md],
  ['spacing.16',              tokens?.spacing?.['16']],
];

let missing = 0;
for (const [k, v] of required) {
  const ok = v !== undefined && v !== null;
  console.log(`  ${ok ? '✓' : '✗'} ${k}`);
  if (!ok) missing++;
}

// Hard rule: no body text below 14px in the semantic scale
if ((tokens.typography.fontSize.md ?? 0) < 14) {
  console.error('✗ typography.fontSize.md must be ≥ 14 (WCAG body min)');
  missing++;
}
// Hard rule: no 2xs in the scale
if (tokens.typography.fontSize['2xs'] !== undefined) {
  console.error('✗ typography.fontSize.2xs must be removed (failed legibility)');
  missing++;
}

if (missing) { console.error(`\n${missing} validation error(s).`); process.exit(1); }
console.log('\ntokens.json passes schema validation.');
