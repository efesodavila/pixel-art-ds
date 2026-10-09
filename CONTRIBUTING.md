# Contributing to Pixel Art DS

Thanks for considering a contribution! This document defines the rules of the road.

## Ground rules

1. **Pixel-art discipline.** No anti-aliasing, no rounded corners, no smooth gradients. Borders are 2px solid. Shadows are flat offsets (`Xpx Ypx 0 color`).
2. **WCAG 2.2 AA, no exceptions.** Every text/UI color pair must clear 4.5:1 (or 3:1 for ≥18px / UI). The CI runs the contrast checker — it's a hard gate.
3. **Tokens before hex.** No raw hex values in components. Always reach into `useTheme()` (or `tokens.color.*`).
4. **Web parity with React Native.** New tokens MUST work in both. RN doesn't have CSS variables — keep `tokens.js` flat and serializable.
5. **Component API consistency.** All components accept `size`, `variant`, `disabled` where applicable, and forward refs.

## Component-design checklist

A new component is **not** ready until **all** of these pass:

- [ ] Renders without props (sensible defaults)
- [ ] Light + dark mode tested
- [ ] Auto-contrast passes for every accent color
- [ ] Body text ≥ 14px / metadata ≥ 12px
- [ ] Keyboard navigable: Tab order, Enter/Space activate, Esc dismiss
- [ ] `aria-*` and `role` set when native semantics aren't enough
- [ ] Focus ring visible (3px outline, 2px offset)
- [ ] Hit target ≥ 24×24
- [ ] `prefers-reduced-motion` respected
- [ ] No console warnings/errors
- [ ] Documented in the live docs (`*Page.jsx`)
- [ ] Tokens used (no inline hex)
- [ ] React Native equivalent or RN-compatibility note
- [ ] Snapshot test
- [ ] Visual regression baseline

## Workflow

1. Open an issue describing the problem before opening a PR.
2. Fork → branch (`feat/<component>` or `fix/<bug>`) → PR against `main`.
3. PRs MUST update `CHANGELOG.md` (under `[Unreleased]`).
4. PR title follows [Conventional Commits](https://www.conventionalcommits.org/): `feat: add PixelDataGrid`.
5. At least one approval from a maintainer is required to merge.

## Code style

- Components in `src/PixelUI*.jsx` use `React.createElement` (no JSX dependency for the docs site).
- Prefer functional components + hooks.
- Use named style objects scoped per component (`const buttonStyles = {...}`) — never a global `styles`.
- Keep files under 1000 lines; split when growing.

## Reporting bugs

Use the [bug report template](.github/ISSUE_TEMPLATE/bug_report.md). Include:
- Browser + version (or React Native version)
- Theme mode (light/dark) and any custom neutral
- Minimal repro

## Reporting accessibility issues

Use the [a11y issue template](.github/ISSUE_TEMPLATE/a11y.md) — these are P0 for us.

## License

By contributing you agree your work is released under the MIT license.
