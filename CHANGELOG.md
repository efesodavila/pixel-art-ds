# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] — 2026-05-05

### Added
- 60+ components across Foundation, Forms, Navigation, Overlay, Display, and Game categories
- Three-layer token architecture: primitive → semantic → component
- W3C DTCG-aligned `tokens.json` source of truth
- React Native helpers: `pixelShadow()`, `pixelBorder()`, `buildAccessibleTheme()`
- Live documentation site (no build required)
- Tweaks panel for live theme customization
- Live WCAG accessibility audit page
- Auto-contrast engine: `ensureContrast(bg, candidates, minRatio)`
- Six neutral presets + custom hex picker
- Light + Dark mode (both WCAG 2.2 AA verified)

### Accessibility
- All text/UI pairs verified ≥ 4.5:1 (AA) in both modes
- Body text minimum raised to 14px
- `2xs (9px)` size removed from the scale
- Focus rings 3px / 2px offset
- Hit targets ≥ 24×24
- `prefers-reduced-motion` respected
- Removed: `--text-2xs` (9px) — failed legibility threshold

### Changed
- `interactive.primary`: `#D43840` → `#C02830` (for AA on cream bg)
- `interactive.secondary`: `#3A78A0` → `#245878`
- `status.warning`: `#E08820` → `#A05808`
- `status.success`: `#2A9848` → `#1E7838`
- Dark mode `fg.muted`: `#604838` → `#A89070`
- Body line-height: `1.5` → `1.55` (WCAG 1.4.12)

### Documentation
- Added README with quickstart for Web and React Native
- Added CONTRIBUTING.md with component checklist
- Added CODE_OF_CONDUCT.md (Contributor Covenant 2.1)
- Added LICENSE (MIT)

## [Unreleased]

### Planned
- NPM packages (`pixel-art-ds`, `@pixel-art-ds/native`)
- Storybook stories
- Visual regression tests
- TypeScript declarations
- Figma plugin
