# Architecture

This document describes how Pixel Art DS is organized internally.

## Goals

1. **One source of truth** for design decisions (`tokens.json`).
2. **Two consumption shapes**: CSS variables (web) + JS module (web + React Native).
3. **Three layers** of tokens to make refactors safe.
4. **WCAG AA by construction** — auto-correction baked in.
5. **Zero runtime dependencies** beyond React (peer).

## Layers

```
┌─────────────────────────────────────────────────────────┐
│  3. COMPONENTS  (PixelButton, PixelCard, ...)           │
│     read from theme via useTheme()                      │
├─────────────────────────────────────────────────────────┤
│  2. SEMANTIC TOKENS  (bg.default, interactive.primary)  │
│     intent-based, switchable per theme                  │
├─────────────────────────────────────────────────────────┤
│  1. PRIMITIVE TOKENS  (neutral.500, red.700, ...)       │
│     raw values — never used directly in components      │
└─────────────────────────────────────────────────────────┘
```

A component **must not** import from layer 1. Layer 2 is its only ingress.

## Theme runtime

```
ThemeProvider (React context)
  └─ buildThemeColors(mode, neutralBase)
       ├─ scale = generateNeutralScale(neutralBase)
       ├─ light/dark interactive colors
       └─ ensureContrast(bg, candidates, 4.5)  ← auto AA
```

The `ensureContrast()` walker iterates a list of candidate hex values in priority order and returns the first that satisfies the requested ratio. If none pass, it returns the highest-contrast option as a graceful fallback. This guarantees that any user-customized neutral still produces an AA theme.

## Cross-platform parity

| Concept | Web | React Native |
|---|---|---|
| Tokens | `tokens.css` (custom properties) | `tokens.js` (object literal) |
| Shadows | `box-shadow: Xpx Ypx 0 color` | `shadowOffset/Color/Opacity + elevation` |
| Borders | `border: 2px solid` | `borderWidth: 2 + borderColor` |
| Fonts | `@font-face` | `expo-font` / linked TTF |
| Theme switch | toggle CSS class on `<html>` | re-render with new theme prop |

## File map

```
tokens/
  tokens.json   — source of truth (W3C DTCG)
  tokens.css    — generated CSS variables
  tokens.js     — generated ES module + helpers
src/
  PixelUI.jsx   — foundation + forms + display + theme
  PixelUI2.jsx  — advanced forms + nav + overlay
  PixelUI3.jsx  — extra display + RPG components
  *Page.jsx     — documentation pages
  App.jsx       — sidebar + router shell
scripts/
  validate-tokens.js  — schema check
  check-contrast.js   — AA gate (CI hard fail)
.github/
  workflows/ci.yml    — runs the gates
```

## Why no build step?

The docs site loads each `*.jsx` via Babel Standalone in the browser. This keeps:
- The repo runnable from a clone with zero install
- Component sources directly viewable / editable
- Reviews focused on logic, not tooling

For NPM consumers, a future `prepublishOnly` script will produce ESM + CJS bundles via `tsup` or similar. The 1.0 release ships the source `.jsx` directly; consumers who want pre-compiled output can swap in their own bundler.

## Data flow on theme change

```
User toggles dark mode (Tweak panel)
  → setTweak('dark', true)
  → __edit_mode_set_keys posted to host
  → ThemeProvider re-renders
  → buildThemeColors rebuilds c
  → useTheme() returns new c
  → all components re-render with new colors
  → CSS variables on :root updated for non-React content
```

## What we explicitly do **not** do

- Polyfill old browsers (we target evergreen)
- Ship a CSS-in-JS runtime (inline styles + variables only)
- Reach into `document` from RN-shared modules
- Embed business logic in tokens
