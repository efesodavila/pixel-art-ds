# Tokens

Three layers, one source of truth.

## Source of truth

`tokens/tokens.json` follows the [W3C Design Tokens Community Group](https://www.w3.org/community/design-tokens/) spec.

```json
{
  "color": {
    "primitive": {
      "neutral": { "500": "#806050" },
      "red":     { "500": "#C02830" }
    }
  },
  "theme": {
    "light": {
      "bg":  { "default": "#F4EDD9" },
      "fg":  { "default": "#160C04" }
    }
  }
}
```

## Layer 1 — Primitives

Raw values. Never used directly by components.

| Family | Shades |
|--------|--------|
| neutral | 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950 |
| red, blue, amber, green, teal | 50, 100, 300, 500, 700, 900 |

## Layer 2 — Semantic

Intent-based. Components read these.

| Group | Tokens |
|-------|--------|
| `bg.*` | default, subtle, strong, inverse |
| `fg.*` | default, subtle, muted, inverse |
| `border.*` | default, subtle, focus |
| `interactive.*` | primary, primaryHover, primaryFg, secondary, secondaryHover, secondaryFg |
| `status.*` | success, warning, error, info + matching `*Bg` |

## Layer 3 — Component

Component-specific overrides live inline in the component file. Promote to layer 2 if reused.

## Adding a token

1. Edit `tokens/tokens.json` (source of truth).
2. Mirror in `tokens/tokens.css` (CSS variable).
3. Mirror in `tokens/tokens.js` (ES module).
4. Run `npm run tokens:validate` and `npm run tokens:check-contrast`.
5. Document in `docs/TOKENS.md` (this file).
6. Update `CHANGELOG.md`.

## Auto-contrast guarantee

`ensureContrast(bg, candidates, minRatio)` walks `candidates` in order and returns the first that clears `minRatio` against `bg`. Default `minRatio` is `4.5` (WCAG AA body text). If none pass, the highest-contrast candidate is returned (graceful fallback).

```js
import { ensureContrast } from 'pixel-art-ds/tokens';

const fg = ensureContrast('#C02830', ['#FFFFFF', '#160C04']);
// → '#FFFFFF' (5.20:1)
```

## Generating an AA-safe theme from any base hex

```js
import { buildAccessibleTheme } from 'pixel-art-ds/tokens';

const t = buildAccessibleTheme('#7888A0');
// t.light.fg.default is auto-picked to clear 4.5:1 vs t.light.bg.default
// t.dark.* derived symmetrically
```

## Naming conventions

- Lower camelCase keys (`primaryHover`, not `primary_hover`).
- Intent over visual (`interactive.primary`, not `red500Button`).
- No version suffixes (`md`, not `mdV2`).
- Group by surface (`bg.*`) before by state (`hover`).
