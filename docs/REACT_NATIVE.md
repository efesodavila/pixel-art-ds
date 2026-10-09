# React Native usage

Pixel Art DS ships React Native-friendly design tokens. The token module is **flat, serializable, and DOM-free** — safe to import on the JS thread. The npm package surface is planned for a future release, so the examples below use the repository source directly.

## Install

```bash
# Copy tokens/tokens.js into your application, or import it by relative path.
expo install expo-font
```

## Load the font

Place `GeistMono.ttf` in `./assets/fonts/` then:

```jsx
import { useFonts } from 'expo-font';

export default function Root() {
  const [loaded] = useFonts({
    GeistMono: require('./assets/fonts/GeistMono.ttf'),
  });
  if (!loaded) return null;
  return <App />;
}
```

## Use tokens directly

```jsx
import { tokens, theme, pixelShadow, pixelBorder } from 'pixel-art-ds/tokens';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.light.bg.default,
    padding: tokens.spacing[16],
    ...pixelBorder(2, theme.light.border.default),
    ...pixelShadow('md', theme.light.border.default),
  },
  title: {
    fontFamily: tokens.typography.fontFamily.mono,
    fontSize: tokens.typography.fontSize.lg,
    fontWeight: tokens.typography.fontWeight.bold,
    color: theme.light.fg.default,
  },
});
```

## Theme switching

The token module is stateless. Choose a theme at render time:

```jsx
import { theme } from 'pixel-art-ds/tokens';

function useColors(mode) {
  return mode === 'dark' ? theme.dark : theme.light;
}
```

For runtime switching, lift `mode` to a Context and re-render. There is no global mutation.

## Customize the brand neutral

```jsx
import { buildAccessibleTheme } from 'pixel-art-ds/tokens';

const myTheme = buildAccessibleTheme('#7888A0');
// myTheme.light.fg.default auto-picked to clear AA against bg.default
```

## What's different from web?

| Concern | Web | React Native |
|---|---|---|
| Shadows | `boxShadow` string | `shadowOffset` + `elevation` |
| Border radius | 0 (CSS) | 0 (`borderRadius: 0`) |
| Fonts | `@font-face` | `expo-font` / linked TTF |
| CSS vars | yes | no — pull from `tokens.js` |
| `prefers-reduced-motion` | media query | `AccessibilityInfo.isReduceMotionEnabled()` |
| `aria-*` | direct attrs | `accessibilityRole`, `accessibilityLabel`, etc. |

## Components on RN

The visual components in `/src/PixelUI*.jsx` use `React.createElement('div', ...)` — these are **web-only**. To use the design language on RN, build your own components using the tokens:

```jsx
import { tokens, theme, pixelShadow, pixelBorder } from 'pixel-art-ds/tokens';

function PixelButton({ onPress, label, variant = 'primary' }) {
  const c = theme.light.interactive;
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={{
        paddingVertical: tokens.spacing[8],
        paddingHorizontal: tokens.spacing[16],
        backgroundColor: c[variant],
        ...pixelBorder(2, theme.light.border.default),
        ...pixelShadow('md', theme.light.border.default),
      }}
    >
      <Text style={{
        fontFamily: tokens.typography.fontFamily.mono,
        fontSize: tokens.typography.fontSize.md,
        fontWeight: tokens.typography.fontWeight.bold,
        color: c[variant + 'Fg'],
        textTransform: 'uppercase',
      }}>{label}</Text>
    </Pressable>
  );
}
```

A native component package (`@pixel-art-ds/native`) with pre-built RN components is on the roadmap (CHANGELOG `[Unreleased]`).

## Pixel-perfect rendering

```jsx
<Image source={...} style={{ /* RN auto-disables AA on Image */ }} />
```

For SVG icons, use `react-native-svg` and disable smoothing where supported. Bitmap assets should be served at 1×, 2×, 3× resolutions to stay crisp on every screen.
