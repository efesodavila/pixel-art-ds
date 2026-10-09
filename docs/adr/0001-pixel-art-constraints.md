# 0001 — Pixel-art aesthetic constraints

- **Status**: Accepted
- **Date**: 2026-04-29
- **Deciders**: Lead maintainer + Visual Designer

## Context

Pixel-art is decorative shorthand for "retro" in many UI kits. Without rules it drifts into kitsch and breaks accessibility (illegible text, sub-AA contrast, micro hit targets).

## Decision

Pixel-art aesthetic is enforced as a system, not a vibe:

1. **2px solid borders only** — no double, no dashed in primitives, no rounded corners.
2. **Flat offset shadows** — `Xpx Ypx 0 color`. No blur, no spread.
3. **No anti-aliasing** — `image-rendering: pixelated` on bitmap content.
4. **No gradients** — except for explicit pixel-stripe patterns.
5. **Geist Mono** as the system typeface — monospaced bitmap-friendly.
6. **Spacing scale rounded to multiples of 4** — keeps the pixel grid intact.

## Consequences

- Components have a consistent "look" without each author re-deciding.
- Some modern conventions (rounded buttons, soft shadows) are forbidden — that is intentional.
- Pixel-perfect rendering needs a bitmap-aligned font; Geist Mono is the smallest opinionated choice.
- Designers customizing the system MUST choose colors via the auto-contrast helpers; raw hex is rejected by lint.
