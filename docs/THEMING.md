# Theming guide

Three ways to theme Pixel Art DS, from least to most invasive.

## 1. Toggle light / dark

```jsx
<ThemeProvider mode="dark">
  <App />
</ThemeProvider>
```

Both modes are WCAG AA verified out of the box.

## 2. Pick a different neutral

```jsx
<ThemeProvider mode="light" neutralBase="#7888A0">
  <App />
</ThemeProvider>
```

The full neutral scale (`50` → `950`) is regenerated from your base hex. Foregrounds are auto-corrected to maintain ≥ 4.5:1 against the new background.

Six curated presets ship in the docs site Tweaks panel:

| Preset | Hex | Vibe |
|--------|-----|------|
| Warm   | `#806050` | Default — coffee/parchment |
| Cool   | `#5A6B7C` | Slate-ish |
| Mono   | `#666666` | True greyscale |
| Rose   | `#7C5C5C` | Dusty pink |
| Sage   | `#5C7C5C` | Muted green |
| Slate  | `#4C5868` | Cool blue-grey |

## 3. Override semantic tokens

For full control, override semantic tokens via CSS variables (web) or the `theme` prop (RN).

### Web

```css
:root {
  --interactive-primary: #FF4444;
  --interactive-primary-fg: #FFFFFF;
}
```

### React Native

```jsx
import { theme } from 'pixel-art-ds/tokens';

const myTheme = {
  ...theme,
  light: {
    ...theme.light,
    interactive: {
      ...theme.light.interactive,
      primary: '#FF4444',
    },
  },
};
```

Make sure your override still passes `ensureContrast(bg, [fg, ...], 4.5)` — or use `buildAccessibleTheme()` to derive a guaranteed AA palette.

## Caveats

- Don't override primitives (`neutral.500`) — override semantics (`bg.default`).
- Keep border colors at ≥ 3:1 against `bg.default` (1.4.11).
- Test in both modes whenever you customize.
