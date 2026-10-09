# Accessibility

Pixel Art DS is **WCAG 2.2 AA verified** end-to-end. This document explains how we achieve and maintain that.

## Targets

| Criterion | Requirement | Implementation |
|---|---|---|
| 1.4.3 Contrast (Minimum) | 4.5:1 normal text, 3:1 large/UI | All semantic pairs verified; CI gate |
| 1.4.4 Resize Text | Up to 200% without loss | px-based, scales with browser zoom |
| 1.4.11 Non-Text Contrast | 3:1 for borders/icons | 2px borders use `border.default` |
| 1.4.12 Text Spacing | line-height ≥ 1.5 for body | `lineHeight.normal = 1.55` |
| 2.1.1 Keyboard | All interactives reachable | Tab/Enter/Space/Esc/Arrows on every component |
| 2.4.7 Focus Visible | 3px focus ring, 2px offset | Applied via `outline` on all `:focus-visible` |
| 2.5.8 Target Size | ≥ 24×24 css px | Smallest hit target audited at 24px |
| 4.1.2 Name/Role/Value | Programmatic identity | ARIA on Modal, Tabs, Switch, Checkbox, Radio, Slider, Progress, Alert, Tooltip, Drawer |

## Type scale

| Token | Size | Use |
|---|---|---|
| `xs`  | 12px | Labels (uppercase, bold required) |
| `sm`  | 13px | Captions, metadata |
| `md`  | **14px** | **Body default** |
| `base`| 16px | Long-form text |
| `lg`+ | 18px+ | Headings |

The `2xs` (9px) size has been **removed** — it failed the legibility threshold. Anything below 12px is forbidden.

## Auto-contrast engine

When a user customizes a color (e.g., the neutral base) the `ensureContrast()` helper re-derives foregrounds so every pair still clears 4.5:1.

```js
const fg = ensureContrast(userBg, [scale[950], scale[900], scale[800], '#000000']);
```

If no candidate passes, the highest-contrast option is returned rather than throwing — the system **never** delivers a sub-AA result, but it also never breaks.

## Components — ARIA wiring

| Component | Role / ARIA |
|---|---|
| `<PixelModal>` | `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, focus trap, Esc closes |
| `<PixelDrawer>` | Esc closes, `role="dialog"` semantics |
| `<PixelTabs>` | `role="tablist"` / `role="tab"`, `aria-selected`, ←/→ navigation, roving tabIndex |
| `<PixelSwitch>` | `role="switch"`, `aria-checked` |
| `<PixelCheckbox>` | Native input + `aria-checked` (`mixed` for indeterminate) |
| `<PixelRadio>` | Native input + label association |
| `<PixelSlider>` | `role="slider"` + `aria-valuenow/min/max` |
| `<PixelProgress>` | `role="progressbar"` + values |
| `<PixelAlert>` | `role="alert"` (errors) or `role="status"`; `aria-live` |
| `<PixelTooltip>` | `aria-describedby` via React `useId()` |

## Motion

All decorative animations check `prefers-reduced-motion`. Typewriter effects in `<PixelDialogBox>` and stripe animations in `<PixelXPBar>` collapse to instant when the user has reduced motion enabled.

## Live audit

Open the docs (`index.html`) and navigate to **Accessibility → Contrast Audit**. The page calculates ratios live for the current theme + neutral base.

## CI gate

Every PR runs `scripts/check-contrast.js` which fails the build if any of these pairs drops below threshold:

- `fg.default → bg.default` (4.5:1)
- `fg.subtle → bg.default` (4.5:1)
- `fg.muted → bg.default` (4.5:1)
- `interactive.primaryFg → interactive.primary` (4.5:1)
- `interactive.secondaryFg → interactive.secondary` (4.5:1)
- `border.default → bg.default` (3:1)

…in **both** light and dark modes.

## Reporting an a11y issue

Use the [a11y issue template](../.github/ISSUE_TEMPLATE/a11y.md). These are P0 — we aim to land a fix within 48 hours of triage.
