# 0003 — Web + React Native parity via flat token module

- **Status**: Accepted
- **Date**: 2026-05-01
- **Deciders**: Lead maintainer + RN Engineer

## Context

We want one design system, two runtimes (Web and React Native). CSS-in-JS solutions impose a runtime cost on RN; CSS variables don't exist on RN. We need a shape that works for both without duplication.

## Decision

1. **Source of truth**: `tokens/tokens.json` (W3C DTCG).
2. **Web consumption**: `tokens/tokens.css` (CSS custom properties).
3. **Cross-platform consumption**: `tokens/tokens.js` (flat ES module).
4. **No DOM access** in any export of `tokens.js`. Everything is a plain literal or a pure function.
5. **Helpers** (`pixelShadow`, `pixelBorder`, `ensureContrast`, `buildAccessibleTheme`) return plain objects compatible with both `style={}` (web) and `StyleSheet.create()` (RN).

## Consequences

- The token module can be `require()`'d on the JS thread of RN with no shimming.
- Components in `/src/PixelUI*.jsx` are explicitly **web-only** (they call `React.createElement('div', ...)`).
- A native component package (`@pixel-art-ds/native`) is roadmapped but not blocking 1.0 — RN consumers can build their own components against the tokens today.
- Theme switching is consumer-managed (re-render with new theme) rather than a global mutation, which keeps the module pure.
