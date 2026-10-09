# 0002 — WCAG 2.2 AA as a hard CI gate

- **Status**: Accepted
- **Date**: 2026-04-30
- **Deciders**: Lead maintainer + Accessibility Engineer

## Context

Pixel-art kits are notorious for sub-AA contrast. We refuse to ship that.

## Decision

WCAG 2.2 AA is a **non-negotiable, machine-checked invariant**:

1. Every (foreground, background) pair in `theme.light` and `theme.dark` is auto-checked in CI.
2. The CI job (`scripts/check-contrast.js`) **fails the build** if any pair falls below threshold.
3. `2xs` (9px) text size is removed from the scale. Body floor is **14px**.
4. User-customizable tokens go through `ensureContrast()` — there is no path for a consumer to ship sub-AA accidentally.
5. Component a11y (ARIA, keyboard, focus visible) is enforced via the PR checklist.

## Consequences

- A pretty palette that fails contrast cannot land. Period.
- Token color choices are constrained — some "vibey" hues are rejected for being too close to background.
- Future-proof: new components inherit AA-by-construction because they read from semantic tokens.
- The `2xs` removal is a breaking choice but it pre-empts a future major bump.
