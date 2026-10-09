/**
 * PIXEL ART DS — Shared UI Components
 * Exports to window.PX for use across all page scripts
 */

// ─── DESIGN TOKENS (JS) — WCAG 2.2 AA verified ────────────
const T = {
  light: {
    bg: '#F4EDD9', bgSubtle: '#E4D9BC', bgStrong: '#CCBA90', bgInverse: '#160C04',
    fg: '#160C04', fgSubtle: '#604838', fgMuted: '#604838', fgInverse: '#F4EDD9',
    border: '#160C04', borderSubtle: '#604838', borderFocus: '#245878',
    primary: '#C02830', primaryHover: '#8C1018', primaryFg: '#FFFFFF',
    secondary: '#245878', secondaryHover: '#14405C', secondaryFg: '#FFFFFF',
    accent: '#A05808',
    success: '#1E7838', successBg: '#EEFAEE',
    warning: '#A05808', warningBg: '#FEF6E0',
    error: '#C02830', errorBg: '#FEF0F0',
    info: '#245878', infoBg: '#F0F5FA',
    disabled: '#A89070', disabledBg: '#E4D9BC',
  },
  dark: {
    bg: '#18100A', bgSubtle: '#241A10', bgStrong: '#302018', bgInverse: '#F4EDD9',
    fg: '#F4EDD9', fgSubtle: '#C8B090', fgMuted: '#A89070', fgInverse: '#18100A',
    border: '#A89070', borderSubtle: '#403020', borderFocus: '#88B8D8',
    primary: '#E04848', primaryHover: '#F07070', primaryFg: '#18100A',
    secondary: '#88B8D8', secondaryHover: '#B0D0E8', secondaryFg: '#18100A',
    accent: '#F0C060',
    success: '#70C880', successBg: '#082818',
    warning: '#F0C060', warningBg: '#3C2000',
    error: '#F07070', errorBg: '#500810',
    info: '#88B8D8', infoBg: '#102840',
    disabled: '#604838', disabledBg: '#241A10',
  },
};

// ─── WCAG CONTRAST UTILITIES ──────────────────────────────
function _luminance(hex) {
  const h = hex.replace('#','');
  const rgb = [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)];
  const lin = rgb.map(v => { v/=255; return v<=0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4); });
  return lin[0]*0.2126 + lin[1]*0.7152 + lin[2]*0.0722;
}
function contrastRatio(a, b) {
  const L1 = _luminance(a), L2 = _luminance(b);
  const [hi, lo] = L1 > L2 ? [L1, L2] : [L2, L1];
  return (hi + 0.05) / (lo + 0.05);
}
function wcagGrade(r, large=false) {
  if (r >= (large ? 4.5 : 7)) return 'AAA';
  if (r >= (large ? 3 : 4.5)) return 'AA';
  if (r >= 3) return 'AA-LG';
  return 'FAIL';
}
// Returns the foreground (#FFFFFF or #000000 or #160C04 / #F4EDD9) that maximizes contrast on bg
function getContrastFg(bg, options) {
  const opts = options || ['#FFFFFF', '#160C04'];
  let best = opts[0], bestR = 0;
  for (const o of opts) { const r = contrastRatio(bg, o); if (r > bestR) { bestR = r; best = o; } }
  return best;
}
window.contrastRatio = contrastRatio;
window.wcagGrade = wcagGrade;
window.getContrastFg = getContrastFg;

// ─── COLOR UTILITIES ──────────────────────────────────────
function hexToHsl(hex) {
  let r = parseInt(hex.slice(1,3),16)/255;
  let g = parseInt(hex.slice(3,5),16)/255;
  let b = parseInt(hex.slice(5,7),16)/255;
  const max = Math.max(r,g,b), min = Math.min(r,g,b);
  let h = 0, s = 0, l = (max+min)/2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d/(2-max-min) : d/(max+min);
    switch(max) {
      case r: h = ((g-b)/d + (g<b?6:0))/6; break;
      case g: h = ((b-r)/d + 2)/6; break;
      case b: h = ((r-g)/d + 4)/6; break;
    }
  }
  return [h*360, s*100, l*100];
}

function hslToHex(h, s, l) {
  h /= 360; s /= 100; l /= 100;
  let r,g,b;
  if (s === 0) { r = g = b = l; }
  else {
    const hue2rgb = (p,q,t) => {
      if(t<0)t+=1; if(t>1)t-=1;
      if(t<1/6)return p+(q-p)*6*t;
      if(t<1/2)return q;
      if(t<2/3)return p+(q-p)*(2/3-t)*6;
      return p;
    };
    const q = l<0.5 ? l*(1+s) : l+s-l*s, p = 2*l-q;
    r = hue2rgb(p,q,h+1/3); g = hue2rgb(p,q,h); b = hue2rgb(p,q,h-1/3);
  }
  return '#'+[r,g,b].map(x=>Math.round(x*255).toString(16).padStart(2,'0')).join('');
}

function generateNeutralScale(hex) {
  const [h, s] = hexToHsl(hex);
  const sat = Math.min(s * 0.55, 14);
  return {
    50:  hslToHex(h, sat*0.6, 97),
    100: hslToHex(h, sat,     92),
    200: hslToHex(h, sat*0.9, 84),
    300: hslToHex(h, sat*0.8, 73),
    400: hslToHex(h, sat*0.7, 60),
    500: hslToHex(h, sat*0.6, 47),
    600: hslToHex(h, sat*0.5, 37),
    700: hslToHex(h, sat*0.4, 27),
    800: hslToHex(h, sat*0.3, 16),
    900: hslToHex(h, sat*0.3,  8),
    950: hslToHex(h, sat*0.2,  4),
  };
}

function buildThemeColors(scale) {
  // Dark bg: use hue from scale but keep very dark
  const [h] = hexToHsl(scale[500] || '#806050');
  const darkBg     = hslToHex(h, 8,  7);
  const darkSubtle = hslToHex(h, 8, 11);
  const darkStrong = hslToHex(h, 7, 16);
  return {
    light: {
      ...T.light,
      bg: scale[100], bgSubtle: scale[200], bgStrong: scale[300], bgInverse: scale[900],
      fg: scale[900], fgSubtle: scale[600], fgMuted: scale[500], fgInverse: scale[100],
      border: scale[900], borderSubtle: scale[600],
      disabled: scale[400], disabledBg: scale[200],
    },
    dark: {
      ...T.dark,
      bg: darkBg, bgSubtle: darkSubtle, bgStrong: darkStrong, bgInverse: scale[100],
      fg: scale[100], fgSubtle: scale[400], fgMuted: scale[600], fgInverse: darkBg,
      border: scale[700], borderSubtle: scale[800],
      disabled: scale[600], disabledBg: darkSubtle,
    },
  };
}

// ─── THEME CONTEXT ────────────────────────────────────────
const ThemeCtx = React.createContext({
  mode: 'light', c: T.light, toggle: () => {},
  neutralBase: '#A89070', setNeutralBase: () => {}, neutralScale: null,
});
const useTheme = () => React.useContext(ThemeCtx);

const NEUTRAL_PRESETS = [
  { name: 'Warm',  hex: '#A89070' },
  { name: 'Cool',  hex: '#8090A8' },
  { name: 'Rose',  hex: '#A87888' },
  { name: 'Sage',  hex: '#809080' },
  { name: 'Slate', hex: '#7888A0' },
  { name: 'Mono',  hex: '#888888' },
];

function ThemeProvider({ children }) {
  const [mode, setMode] = React.useState(() => localStorage.getItem('px-theme') || 'light');
  const [neutralBase, setNeutralBaseRaw] = React.useState(() => localStorage.getItem('px-neutral') || '#A89070');
  const [customTheme, setCustomTheme] = React.useState(() => {
    const saved = localStorage.getItem('px-neutral');
    if (saved) {
      const scale = generateNeutralScale(saved);
      return buildThemeColors(scale);
    }
    return null;
  });

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
    localStorage.setItem('px-theme', mode);
  }, [mode]);

  const setNeutralBase = React.useCallback((hex) => {
    setNeutralBaseRaw(hex);
    localStorage.setItem('px-neutral', hex);
    const scale = generateNeutralScale(hex);
    const built = buildThemeColors(scale);
    setCustomTheme(built);
    // Also update CSS variables for non-React styles
    const root = document.documentElement;
    Object.entries(scale).forEach(([shade, val]) => {
      root.style.setProperty(`--color-neutral-${shade}`, val);
    });
    const lt = built.light, dk = built.dark;
    const vars = mode === 'light' ? [
      ['--bg-default',lt.bg],['--bg-subtle',lt.bgSubtle],['--bg-strong',lt.bgStrong],
      ['--fg-default',lt.fg],['--fg-subtle',lt.fgSubtle],['--fg-muted',lt.fgMuted],
      ['--border-default',lt.border],['--border-subtle',lt.borderSubtle],
    ] : [
      ['--bg-default',dk.bg],['--bg-subtle',dk.bgSubtle],['--bg-strong',dk.bgStrong],
      ['--fg-default',dk.fg],['--fg-subtle',dk.fgSubtle],['--fg-muted',dk.fgMuted],
      ['--border-default',dk.border],['--border-subtle',dk.borderSubtle],
    ];
    vars.forEach(([k,v]) => root.style.setProperty(k, v));
  }, [mode]);

  // Re-apply CSS vars when mode switches
  React.useEffect(() => {
    if (customTheme) {
      const t2 = mode === 'light' ? customTheme.light : customTheme.dark;
      const root = document.documentElement;
      [['--bg-default',t2.bg],['--bg-subtle',t2.bgSubtle],['--bg-strong',t2.bgStrong],
       ['--fg-default',t2.fg],['--fg-subtle',t2.fgSubtle],['--fg-muted',t2.fgMuted],
       ['--border-default',t2.border],['--border-subtle',t2.borderSubtle],
      ].forEach(([k,v]) => root.style.setProperty(k,v));
    }
  }, [mode, customTheme]);

  const toggle = () => setMode(m => m === 'light' ? 'dark' : 'light');
  const c = customTheme ? customTheme[mode] : T[mode];
  const neutralScale = customTheme ? generateNeutralScale(neutralBase) : generateNeutralScale('#A89070');

  return React.createElement(ThemeCtx.Provider,
    { value: { mode, c, toggle, neutralBase, setNeutralBase, neutralScale } },
    children
  );
}

// ─── BASE HELPERS ─────────────────────────────────────────
const px = (n) => `${n}px`;
const raised = (color) => `3px 3px 0px ${color}`;
const pressed = () => 'none';

// ─── PIXEL BUTTON ─────────────────────────────────────────
function PixelButton({
  children, variant = 'primary', size = 'md',
  disabled = false, loading = false, fullWidth = false,
  icon, iconRight, onClick, style = {}, type = 'button', 'aria-label': ariaLabel
}) {
  const { c } = useTheme();
  const [active, setActive] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);

  const variants = {
    primary:   { bg: c.primary,   fg: c.primaryFg,   border: c.border,        hoverBg: c.primaryHover },
    secondary: { bg: c.secondary, fg: c.secondaryFg, border: c.border,        hoverBg: c.secondaryHover },
    accent:    { bg: c.accent,    fg: c.fgInverse,   border: c.border,        hoverBg: '#B05E10' },
    outline:   { bg: 'transparent', fg: c.fg,        border: c.border,        hoverBg: c.bgSubtle },
    ghost:     { bg: 'transparent', fg: c.fg,        border: 'transparent',   hoverBg: c.bgSubtle },
    danger:    { bg: c.error,     fg: '#F4EDD9',     border: c.border,        hoverBg: c.primaryHover },
    success:   { bg: c.success,   fg: '#F4EDD9',     border: c.border,        hoverBg: '#186830' },
  };

  const sizes = {
    sm: { padding: '4px 8px',  fontSize: '12px', gap: '4px',  minHeight: '24px' },
    md: { padding: '8px 16px', fontSize: '12px', gap: '8px',  minHeight: '32px' },
    lg: { padding: '12px 24px',fontSize: '14px', gap: '8px',  minHeight: '40px' },
    xl: { padding: '16px 32px',fontSize: '16px', gap: '12px', minHeight: '48px' },
  };

  const v = variants[variant] || variants.primary;
  const s = sizes[size] || sizes.md;
  const isDisabled = disabled || loading;
  const bg = (!isDisabled && hovered) ? v.hoverBg : v.bg;

  const baseStyle = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    gap: s.gap, padding: s.padding, minHeight: s.minHeight,
    fontFamily: '"Geist Mono", monospace', fontSize: s.fontSize,
    fontWeight: '700', letterSpacing: '0.05em', textTransform: 'uppercase',
    color: isDisabled ? c.disabled : v.fg,
    background: isDisabled ? c.disabledBg : bg,
    border: `2px solid ${isDisabled ? c.disabled : v.border}`,
    boxShadow: (active || isDisabled) ? 'none' : raised(isDisabled ? c.disabled : v.border),
    transform: active ? 'translate(3px, 3px)' : 'none',
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    userSelect: 'none', outline: 'none', transition: 'none',
    width: fullWidth ? '100%' : 'auto',
    ...style,
  };

  return React.createElement('button', {
    style: baseStyle, disabled: isDisabled,
    onClick, onMouseEnter: () => setHovered(true),
    onMouseLeave: () => { setHovered(false); setActive(false); },
    onMouseDown: () => setActive(true), onMouseUp: () => setActive(false),
  },
    loading && React.createElement(PixelSpinner, { size: 10, color: v.fg }),
    icon && !loading && React.createElement('span', { style: { display: 'flex' } }, icon),
    React.createElement('span', null, children),
    iconRight && React.createElement('span', { style: { display: 'flex' } }, iconRight),
  );
}

// ─── PIXEL SPINNER ────────────────────────────────────────
function PixelSpinner({ size = 12, color, label = 'Loading' }) {
  const { c } = useTheme();
  const clr = color || c.fg;
  const [frame, setFrame] = React.useState(0);
  const frames = ['▖', '▘', '▝', '▗'];
  React.useEffect(() => {
    const t = setInterval(() => setFrame(f => (f + 1) % 4), 150);
    return () => clearInterval(t);
  }, []);
  return React.createElement('span', { style: { fontSize: size, color: clr, lineHeight: 1, display: 'inline-block', width: size, textAlign: 'center', fontFamily: 'monospace' } }, frames[frame]);
}

// ─── PIXEL INPUT ──────────────────────────────────────────
function PixelInput({ label, placeholder, type = 'text', error, hint, disabled, value, onChange, prefix, suffix, size = 'md' }) {
  const { c } = useTheme();
  const [focused, setFocused] = React.useState(false);

  const sizes = { sm: { padding: '4px 8px', fontSize: '13px' }, md: { padding: '8px 12px', fontSize: '12px' }, lg: { padding: '12px 16px', fontSize: '14px' } };
  const s = sizes[size] || sizes.md;

  const wrapStyle = {
    display: 'flex', alignItems: 'center', gap: 0,
    background: disabled ? c.disabledBg : c.bg,
    border: `2px solid ${error ? c.error : focused ? c.borderFocus : c.border}`,
    boxShadow: focused ? `0 0 0 2px ${error ? c.error : c.borderFocus}40` : 'inset 2px 2px 0px rgba(0,0,0,0.12)',
    outline: 'none', transition: 'none',
  };

  const inputStyle = {
    flex: 1, background: 'transparent', border: 'none', outline: 'none',
    padding: s.padding, fontFamily: '"Geist Mono", monospace', fontSize: s.fontSize,
    color: disabled ? c.disabled : c.fg, cursor: disabled ? 'not-allowed' : 'text',
    '::placeholder': { color: c.fgMuted },
  };

  const labelStyle = { display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: c.fgSubtle, fontFamily: '"Geist Mono", monospace' };
  const hintStyle = { fontSize: '12px', color: error ? c.error : c.fgMuted, marginTop: '4px', fontFamily: '"Geist Mono", monospace' };
  const affixStyle = { padding: s.padding, color: c.fgMuted, fontSize: s.fontSize, fontFamily: '"Geist Mono", monospace', borderRight: prefix ? `1px solid ${c.border}` : 'none', borderLeft: suffix ? `1px solid ${c.border}` : 'none', background: c.bgSubtle };

  return React.createElement('div', { style: { display: 'flex', flexDirection: 'column', width: '100%' } },
    label && React.createElement('label', { style: labelStyle }, label),
    React.createElement('div', { style: wrapStyle },
      prefix && React.createElement('span', { style: affixStyle }, prefix),
      React.createElement('input', { type, placeholder, disabled, value, onChange, style: inputStyle, onFocus: () => setFocused(true), onBlur: () => setFocused(false) }),
      suffix && React.createElement('span', { style: { ...affixStyle, borderLeft: `1px solid ${c.border}`, borderRight: 'none' } }, suffix),
    ),
    (error || hint) && React.createElement('span', { style: hintStyle }, error || hint),
  );
}

// ─── PIXEL TEXTAREA ───────────────────────────────────────
function PixelTextarea({ label, placeholder, error, hint, disabled, value, onChange, rows = 4 }) {
  const { c } = useTheme();
  const [focused, setFocused] = React.useState(false);
  const style = {
    width: '100%', background: disabled ? c.disabledBg : c.bg,
    border: `2px solid ${error ? c.error : focused ? c.borderFocus : c.border}`,
    boxShadow: focused ? `0 0 0 2px ${c.borderFocus}40` : 'inset 2px 2px 0px rgba(0,0,0,0.12)',
    padding: '8px 12px', fontFamily: '"Geist Mono", monospace', fontSize: '12px',
    color: disabled ? c.disabled : c.fg, resize: 'vertical', outline: 'none',
    cursor: disabled ? 'not-allowed' : 'text', display: 'block', rows,
  };
  const labelStyle = { display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: c.fgSubtle, fontFamily: '"Geist Mono", monospace' };
  return React.createElement('div', { style: { width: '100%' } },
    label && React.createElement('label', { style: labelStyle }, label),
    React.createElement('textarea', { placeholder, disabled, value, onChange, rows, style, onFocus: () => setFocused(true), onBlur: () => setFocused(false) }),
    (error || hint) && React.createElement('span', { style: { fontSize: '12px', color: error ? c.error : c.fgMuted, marginTop: '4px', display: 'block', fontFamily: '"Geist Mono", monospace' } }, error || hint),
  );
}

// ─── PIXEL SELECT ─────────────────────────────────────────
function PixelSelect({ label, options = [], value, onChange, disabled, error, hint }) {
  const { c } = useTheme();
  const [focused, setFocused] = React.useState(false);
  const wrapStyle = {
    position: 'relative', display: 'flex', alignItems: 'center',
    background: disabled ? c.disabledBg : c.bg,
    border: `2px solid ${error ? c.error : focused ? c.borderFocus : c.border}`,
    boxShadow: 'inset 2px 2px 0px rgba(0,0,0,0.12)',
  };
  const selStyle = {
    appearance: 'none', background: 'transparent', border: 'none', outline: 'none',
    padding: '8px 40px 8px 12px', fontFamily: '"Geist Mono", monospace', fontSize: '12px',
    color: disabled ? c.disabled : c.fg, cursor: disabled ? 'not-allowed' : 'pointer', width: '100%',
  };
  const arrowStyle = { position: 'absolute', right: '12px', pointerEvents: 'none', color: c.fgSubtle, fontSize: '12px', fontFamily: 'monospace' };
  const labelStyle = { display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: c.fgSubtle, fontFamily: '"Geist Mono", monospace' };
  return React.createElement('div', { style: { width: '100%' } },
    label && React.createElement('label', { style: labelStyle }, label),
    React.createElement('div', { style: wrapStyle },
      React.createElement('select', { value, onChange, disabled, style: selStyle, onFocus: () => setFocused(true), onBlur: () => setFocused(false) },
        options.map(o => React.createElement('option', { key: o.value ?? o, value: o.value ?? o }, o.label ?? o))
      ),
      React.createElement('span', { style: arrowStyle }, '▼'),
    ),
    (error || hint) && React.createElement('span', { style: { fontSize: '12px', color: error ? c.error : c.fgMuted, marginTop: '4px', display: 'block', fontFamily: '"Geist Mono", monospace' } }, error || hint),
  );
}

// ─── PIXEL CHECKBOX ───────────────────────────────────────
function PixelCheckbox({ label, checked, onChange, disabled, indeterminate }) {
  const { c } = useTheme();
  const [hov, setHov] = React.useState(false);
  const boxStyle = {
    width: '16px', height: '16px', flexShrink: 0,
    border: `2px solid ${disabled ? c.disabled : c.border}`,
    background: checked || indeterminate ? (disabled ? c.disabled : c.primary) : (hov ? c.bgSubtle : c.bg),
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: disabled ? 'not-allowed' : 'pointer', boxShadow: 'inset 2px 2px 0px rgba(0,0,0,0.12)',
    transition: 'none',
  };
  return React.createElement('label', { style: { display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: disabled ? 'not-allowed' : 'pointer', fontFamily: '"Geist Mono", monospace', fontSize: '12px', color: disabled ? c.disabled : c.fg, userSelect: 'none' }, onMouseEnter: () => setHov(true), onMouseLeave: () => setHov(false) },
    React.createElement('input', { type: 'checkbox', checked, onChange, disabled, 'aria-label': typeof label==='string'?label:undefined, 'aria-checked': indeterminate?'mixed':checked, style: { position:'absolute', opacity:0, width:'16px', height:'16px', cursor: disabled?'not-allowed':'pointer', margin:0 } }),
    React.createElement('span', { style: boxStyle, 'aria-hidden': true }, (checked && !indeterminate) ? React.createElement('span', { style: { color: c.primaryFg, fontSize: '12px', lineHeight: 1, fontWeight: '700' } }, '✓') : indeterminate ? React.createElement('span', { style: { color: c.primaryFg, fontSize: '12px', lineHeight: 1 } }, '—') : null),
    label,
  );
}

// ─── PIXEL RADIO ──────────────────────────────────────────
function PixelRadio({ label, checked, onChange, disabled, name, value }) {
  const { c } = useTheme();
  const boxStyle = {
    width: '16px', height: '16px', flexShrink: 0,
    border: `2px solid ${disabled ? c.disabled : c.border}`,
    background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: disabled ? 'not-allowed' : 'pointer', boxShadow: 'inset 2px 2px 0px rgba(0,0,0,0.12)',
  };
  return React.createElement('label', { style: { display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: disabled ? 'not-allowed' : 'pointer', fontFamily: '"Geist Mono", monospace', fontSize: '12px', color: disabled ? c.disabled : c.fg, userSelect: 'none' } },
    React.createElement('input', { type: 'radio', name, value, checked, onChange, disabled, 'aria-label': typeof label==='string'?label:undefined, style: { position:'absolute', opacity:0, width:'16px', height:'16px', cursor: disabled?'not-allowed':'pointer', margin:0 } }),
    React.createElement('span', { style: boxStyle, 'aria-hidden': true }, checked && React.createElement('span', { style: { width: '8px', height: '8px', background: disabled ? c.disabled : c.primary, display: 'block' } })),
    label,
  );
}

// ─── PIXEL SWITCH ─────────────────────────────────────────
function PixelSwitch({ checked, onChange, disabled, label, size = 'md' }) {
  const { c } = useTheme();
  const [hov, setHov] = React.useState(false);
  const sizes = { sm: { w: 28, h: 14, thumb: 10 }, md: { w: 40, h: 20, thumb: 14 }, lg: { w: 52, h: 26, thumb: 18 } };
  const s = sizes[size];
  const trackStyle = {
    width: s.w, height: s.h, background: checked ? (disabled ? c.disabled : c.primary) : (disabled ? c.disabledBg : c.bgStrong),
    border: `2px solid ${disabled ? c.disabled : c.border}`, position: 'relative',
    cursor: disabled ? 'not-allowed' : 'pointer', display: 'inline-block', flexShrink: 0,
    boxShadow: 'inset 2px 2px 0px rgba(0,0,0,0.15)',
  };
  const thumbStyle = {
    position: 'absolute', top: '1px',
    left: checked ? `${s.w - s.thumb - 5}px` : '1px',
    width: s.thumb, height: s.thumb,
    background: disabled ? c.fgMuted : c.fgInverse,
    border: `1px solid ${disabled ? c.disabled : c.border}`, transition: 'none',
  };
  return React.createElement('label', { style: { display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: disabled ? 'not-allowed' : 'pointer', userSelect: 'none', fontFamily: '"Geist Mono", monospace', fontSize: '12px', color: disabled ? c.disabled : c.fg } },
    React.createElement('input', { type: 'checkbox', role: 'switch', checked, onChange, disabled, 'aria-checked': checked, 'aria-label': typeof label==='string'?label:undefined, style: { position:'absolute', opacity:0, width: s.w+'px', height: s.h+'px', cursor: disabled?'not-allowed':'pointer', margin:0 } }),
    React.createElement('span', { style: trackStyle, 'aria-hidden': true, onMouseEnter: () => setHov(true), onMouseLeave: () => setHov(false) },
      React.createElement('span', { style: thumbStyle }),
    ),
    label,
  );
}

// ─── PIXEL CARD ───────────────────────────────────────────
function PixelCard({ children, title, subtitle, footer, interactive, padding = '16px', style = {} }) {
  const { c } = useTheme();
  const [hov, setHov] = React.useState(false);
  const cardStyle = {
    background: c.bg, border: `2px solid ${c.border}`,
    boxShadow: (interactive && hov) ? `5px 5px 0px ${c.border}` : `3px 3px 0px ${c.border}`,
    transform: (interactive && hov) ? 'translate(-2px,-2px)' : 'none',
    cursor: interactive ? 'pointer' : 'default', transition: 'none',
    display: 'flex', flexDirection: 'column', ...style,
  };
  const headerStyle = { padding: '12px 16px', borderBottom: `2px solid ${c.border}`, background: c.bgSubtle };
  const bodyStyle = { padding, flex: 1 };
  const footerStyle = { padding: '12px 16px', borderTop: `2px solid ${c.border}`, background: c.bgSubtle };
  return React.createElement('div', { style: cardStyle, onMouseEnter: interactive ? () => setHov(true) : null, onMouseLeave: interactive ? () => setHov(false) : null },
    (title || subtitle) && React.createElement('div', { style: headerStyle },
      title && React.createElement('div', { style: { fontWeight: '700', fontSize: '12px', letterSpacing: '0.05em', color: c.fg, fontFamily: '"Geist Mono", monospace' } }, title),
      subtitle && React.createElement('div', { style: { fontSize: '12px', color: c.fgSubtle, marginTop: '2px', fontFamily: '"Geist Mono", monospace' } }, subtitle),
    ),
    React.createElement('div', { style: bodyStyle }, children),
    footer && React.createElement('div', { style: footerStyle }, footer),
  );
}

// ─── PIXEL BADGE ──────────────────────────────────────────
function PixelBadge({ children, variant = 'default', size = 'md', dot }) {
  const { c } = useTheme();
  const variants = {
    default: { bg: c.bgStrong, fg: c.fg, border: c.border },
    primary: { bg: c.primary, fg: c.primaryFg, border: c.border },
    success: { bg: c.successBg, fg: c.success, border: c.success },
    warning: { bg: c.warningBg, fg: c.warning, border: c.warning },
    error:   { bg: c.errorBg,   fg: c.error,   border: c.error },
    info:    { bg: c.infoBg,    fg: c.info,     border: c.info },
  };
  const sizes = { sm: { padding: '1px 4px', fontSize: '12px' }, md: { padding: '2px 6px', fontSize: '12px' }, lg: { padding: '4px 8px', fontSize: '13px' } };
  const v = variants[variant] || variants.default;
  const s = sizes[size] || sizes.md;
  return React.createElement('span', { style: { display: 'inline-flex', alignItems: 'center', gap: '4px', background: v.bg, border: `2px solid ${v.border}`, padding: s.padding, fontSize: s.fontSize, fontWeight: '700', letterSpacing: '0.05em', textTransform: 'uppercase', color: v.fg, fontFamily: '"Geist Mono", monospace', whiteSpace: 'nowrap' } },
    dot && React.createElement('span', { style: { width: '6px', height: '6px', background: v.fg, display: 'inline-block', flexShrink: 0 } }),
    children,
  );
}

// ─── PIXEL AVATAR ─────────────────────────────────────────
function PixelAvatar({ name, src, size = 'md', status, color }) {
  const { c } = useTheme();
  const sizes = { xs: 24, sm: 32, md: 40, lg: 56, xl: 72 };
  const s = sizes[size] || sizes.md;
  const colors = ['#D43840','#3A78A0','#2A9848','#E08820','#1890A0','#7B4FAA'];
  const idx = name ? name.charCodeAt(0) % colors.length : 0;
  const bg = color || colors[idx];
  const initials = name ? name.split(' ').slice(0,2).map(w => w[0]).join('').toUpperCase() : '?';
  const statusColors = { online: '#2A9848', offline: '#806050', busy: '#D43840', away: '#E08820' };
  return React.createElement('div', { style: { position: 'relative', display: 'inline-block', flexShrink: 0 } },
    React.createElement('div', { style: { width: s, height: s, background: src ? 'transparent' : bg, border: `2px solid ${c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', imageRendering: 'pixelated' } },
      src
        ? React.createElement('img', { src, style: { width: '100%', height: '100%', objectFit: 'cover', imageRendering: 'pixelated' } })
        : React.createElement('span', { style: { color: '#F4EDD9', fontSize: Math.max(8, s * 0.3), fontWeight: '700', fontFamily: '"Geist Mono", monospace', letterSpacing: '-0.02em' } }, initials),
    ),
    status && React.createElement('span', { style: { position: 'absolute', bottom: 0, right: 0, width: Math.max(6, s * 0.2), height: Math.max(6, s * 0.2), background: statusColors[status] || '#806050', border: `2px solid ${c.bg}`, display: 'block' } }),
  );
}

// ─── PIXEL ALERT ──────────────────────────────────────────
function PixelAlert({ children, title, variant = 'info', onClose }) {
  const { c } = useTheme();
  const role = variant === 'error' ? 'alert' : 'status';
  const v = { success: { bg: c.successBg, fg: c.success, icon: '✓' }, warning: { bg: c.warningBg, fg: c.warning, icon: '!' }, error: { bg: c.errorBg, fg: c.error, icon: '✕' }, info: { bg: c.infoBg, fg: c.info, icon: 'i' } };
  const cfg = v[variant] || v.info;
  return React.createElement('div', { role, 'aria-live': variant === 'error' ? 'assertive' : 'polite', style: { display: 'flex', gap: '12px', padding: '12px', background: cfg.bg, border: `2px solid ${cfg.fg}`, boxShadow: `3px 3px 0 ${cfg.fg}` } },
    React.createElement('span', { style: { width: '20px', height: '20px', background: cfg.fg, color: c.fgInverse, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700', flexShrink: 0, fontFamily: '"Geist Mono", monospace' } }, cfg.icon),
    React.createElement('div', { style: { flex: 1, fontFamily: '"Geist Mono", monospace' } },
      title && React.createElement('div', { style: { fontSize: '13px', fontWeight: '700', color: cfg.fg, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: children ? '4px' : 0 } }, title),
      children && React.createElement('div', { style: { fontSize: '12px', color: c.fg, lineHeight: 1.5 } }, children),
    ),
    onClose && React.createElement('button', { onClick: onClose, style: { background: 'none', border: 'none', color: cfg.fg, cursor: 'pointer', fontSize: '12px', fontFamily: '"Geist Mono", monospace', padding: '0', lineHeight: 1 } }, '✕'),
  );
}

// ─── PIXEL PROGRESS ───────────────────────────────────────
function PixelProgress({ value = 0, max = 100, variant = 'primary', label, showValue, size = 'md' }) {
  const { c } = useTheme();
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const ariaProps = { role: 'progressbar', 'aria-valuenow': value, 'aria-valuemin': 0, 'aria-valuemax': max, 'aria-label': typeof label==='string'?label:'Progress' };
  const colors = { primary: c.primary, success: c.success, warning: c.warning, error: c.error, info: c.info };
  const heights = { sm: '8px', md: '12px', lg: '16px' };
  const clr = colors[variant] || colors.primary;
  const h = heights[size] || heights.md;
  return React.createElement('div', { style: { width: '100%' } },
    (label || showValue) && React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontFamily: '"Geist Mono", monospace', fontSize: '12px', color: c.fgSubtle } },
      label && React.createElement('span', null, label),
      showValue && React.createElement('span', null, `${Math.round(pct)}%`),
    ),
    React.createElement('div', { style: { background: c.bgSubtle, border: `2px solid ${c.border}`, height: h, boxShadow: 'inset 2px 2px 0px rgba(0,0,0,0.12)', overflow: 'hidden' } },
      React.createElement('div', { style: { height: '100%', width: `${pct}%`, background: clr, transition: 'none' } }),
    ),
  );
}

// ─── PIXEL SKELETON ───────────────────────────────────────
function PixelSkeleton({ width = '100%', height = '16px', style = {} }) {
  const { c } = useTheme();
  const [step, setStep] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setStep(s => (s + 1) % 6), 100);
    return () => clearInterval(t);
  }, []);
  const opacities = [0.3, 0.4, 0.6, 0.8, 0.6, 0.4];
  return React.createElement('div', { style: { width, height, background: c.border, opacity: opacities[step], border: `1px solid ${c.border}`, ...style } });
}

// ─── PIXEL TABS ───────────────────────────────────────────
function PixelTabs({ tabs = [], activeTab, onTabChange }) {
  const { c } = useTheme();
  return React.createElement('div', { role: 'tablist', style: { display: 'flex', borderBottom: `2px solid ${c.border}`, gap: '0' } },
    tabs.map(tab => {
      const isActive = tab.id === activeTab;
      return React.createElement('button', {
        key: tab.id,
        onClick: () => onTabChange(tab.id),
        role: 'tab',
        'aria-selected': isActive,
        tabIndex: isActive ? 0 : -1,
        onKeyDown: (e) => {
          if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            e.preventDefault();
            const dir = e.key === 'ArrowRight' ? 1 : -1;
            const idx = tabs.findIndex(t => t.id === activeTab);
            const next = tabs[(idx + dir + tabs.length) % tabs.length];
            if (next) onTabChange(next.id);
          }
        },
        style: {
          padding: '8px 16px', fontFamily: '"Geist Mono", monospace', fontSize: '13px',
          fontWeight: isActive ? '700' : '400', letterSpacing: '0.05em', textTransform: 'uppercase',
          background: isActive ? c.bg : c.bgSubtle,
          color: isActive ? c.fg : c.fgSubtle,
          border: `2px solid ${c.border}`, borderBottom: isActive ? `2px solid ${c.bg}` : `2px solid ${c.border}`,
          marginBottom: isActive ? '-2px' : '0',
          cursor: 'pointer', outline: 'none', position: 'relative', zIndex: isActive ? 1 : 0, transition: 'none',
        }
      }, tab.label);
    }),
  );
}

// ─── PIXEL TABLE ──────────────────────────────────────────
function PixelTable({ columns = [], rows = [], striped = false }) {
  const { c } = useTheme();
  const thStyle = { padding: '8px 12px', textAlign: 'left', fontFamily: '"Geist Mono", monospace', fontSize: '12px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: c.fgSubtle, background: c.bgSubtle, border: `1px solid ${c.border}`, borderCollapse: 'collapse', whiteSpace: 'nowrap' };
  const tdStyle = (i) => ({ padding: '8px 12px', fontFamily: '"Geist Mono", monospace', fontSize: '12px', color: c.fg, background: striped && i % 2 ? c.bgSubtle : c.bg, border: `1px solid ${c.borderSubtle}`, borderCollapse: 'collapse' });
  return React.createElement('div', { style: { width: '100%', overflowX: 'auto', border: `2px solid ${c.border}`, boxShadow: `3px 3px 0 ${c.border}` } },
    React.createElement('table', { style: { width: '100%', borderCollapse: 'collapse' } },
      React.createElement('thead', null, React.createElement('tr', null, columns.map(col => React.createElement('th', { key: col.key, style: thStyle }, col.label)))),
      React.createElement('tbody', null, rows.map((row, i) => React.createElement('tr', { key: i }, columns.map(col => React.createElement('td', { key: col.key, style: tdStyle(i) }, row[col.key]))))),
    ),
  );
}

// ─── PIXEL MODAL ──────────────────────────────────────────
function PixelModal({ open, onClose, title, children, footer, size = 'md' }) {
  const { c } = useTheme();
  const dialogRef = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose?.(); };
    document.addEventListener('keydown', onKey);
    const prevFocus = document.activeElement;
    setTimeout(() => dialogRef.current?.focus(), 0);
    return () => { document.removeEventListener('keydown', onKey); prevFocus && prevFocus.focus?.(); };
  }, [open, onClose]);
  if (!open) return null;
  const sizes = { sm: '360px', md: '480px', lg: '640px' };
  const overlayStyle = { position: 'fixed', inset: 0, background: c.bgOverlay || 'rgba(22,12,4,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '16px' };
  const modalStyle = { background: c.bg, border: `2px solid ${c.border}`, boxShadow: `6px 6px 0 ${c.border}`, width: '100%', maxWidth: sizes[size] || sizes.md, maxHeight: '80vh', display: 'flex', flexDirection: 'column' };
  const headerStyle = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: `2px solid ${c.border}`, background: c.bgSubtle };
  return React.createElement('div', { style: overlayStyle, onClick: (e) => e.target === e.currentTarget && onClose?.() },
    React.createElement('div', { ref: dialogRef, role: 'dialog', 'aria-modal': true, 'aria-labelledby': 'px-modal-title', tabIndex: -1, style: modalStyle },
      React.createElement('div', { style: headerStyle },
        React.createElement('span', { id: 'px-modal-title', style: { fontFamily: '"Geist Mono", monospace', fontSize: '12px', fontWeight: '700', letterSpacing: '0.05em', textTransform: 'uppercase', color: c.fg } }, title),
        React.createElement('button', { onClick: onClose, 'aria-label': 'Close dialog', style: { background: 'none', border: '2px solid transparent', color: c.fg, cursor: 'pointer', fontSize: '14px', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace' } }, '✕'),
      ),
      React.createElement('div', { style: { padding: '16px', flex: 1, overflowY: 'auto', fontFamily: '"Geist Mono", monospace', fontSize: '12px', color: c.fg, lineHeight: 1.6 } }, children),
      footer && React.createElement('div', { style: { padding: '12px 16px', borderTop: `2px solid ${c.border}`, background: c.bgSubtle, display: 'flex', gap: '8px', justifyContent: 'flex-end' } }, footer),
    ),
  );
}

// ─── PIXEL CODE BLOCK ─────────────────────────────────────
function PixelCode({ code, lang = 'css' }) {
  const { c } = useTheme();
  const [copied, setCopied] = React.useState(false);
  const copy = () => { navigator.clipboard?.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1500); };
  return React.createElement('div', { style: { position: 'relative', background: c.bgInverse, border: `2px solid ${c.border}`, boxShadow: `3px 3px 0 ${c.border}` } },
    React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 12px', borderBottom: `1px solid ${c.border}`, background: `${c.bgInverse}` } },
      React.createElement('span', { style: { fontSize: '12px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: c.fgMuted, fontFamily: '"Geist Mono", monospace' } }, lang),
      React.createElement('button', { onClick: copy, style: { background: 'none', border: 'none', color: c.fgMuted, cursor: 'pointer', fontSize: '12px', fontFamily: '"Geist Mono", monospace', padding: '2px 4px', letterSpacing: '0.05em' } }, copied ? '✓ COPIED' : 'COPY'),
    ),
    React.createElement('pre', { style: { padding: '12px 16px', margin: 0, overflowX: 'auto', fontFamily: '"Geist Mono", monospace', fontSize: '13px', lineHeight: 1.6, color: c.fgInverse === '#F4EDD9' ? '#F4EDD9' : '#F4EDD9', whiteSpace: 'pre' } }, code),
  );
}

// ─── PIXEL SECTION WRAPPER ────────────────────────────────
function Section({ title, description, children, id }) {
  const { c } = useTheme();
  return React.createElement('section', { id, style: { marginBottom: '64px' } },
    React.createElement('div', { style: { marginBottom: '24px', paddingBottom: '12px', borderBottom: `2px solid ${c.border}` } },
      React.createElement('h2', { style: { fontFamily: '"Geist Mono", monospace', fontSize: '20px', fontWeight: '700', letterSpacing: '0.05em', color: c.fg, marginBottom: '4px' } }, title),
      description && React.createElement('p', { style: { fontFamily: '"Geist Mono", monospace', fontSize: '12px', color: c.fgSubtle, lineHeight: 1.6 } }, description),
    ),
    children,
  );
}

function SubSection({ title, children }) {
  const { c } = useTheme();
  return React.createElement('div', { style: { marginBottom: '32px' } },
    React.createElement('h3', { style: { fontFamily: '"Geist Mono", monospace', fontSize: '13px', fontWeight: '700', letterSpacing: '0.15em', textTransform: 'uppercase', color: c.fgSubtle, marginBottom: '16px' } }, '▸ ' + title),
    children,
  );
}

function PreviewBox({ children, dark = false, style = {} }) {
  const { c } = useTheme();
  return React.createElement('div', { style: { background: dark ? c.bgInverse : c.bgSubtle, border: `2px solid ${c.border}`, padding: '24px', display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'flex-start', ...style } }, children);
}

// ─── PIXEL TOAST (static display) ────────────────────────
function PixelToast({ message, variant = 'info', onClose }) {
  const { c } = useTheme();
  const v = { success: { bg: c.successBg, fg: c.success, icon: '✓' }, warning: { bg: c.warningBg, fg: c.warning, icon: '!' }, error: { bg: c.errorBg, fg: c.error, icon: '✕' }, info: { bg: c.infoBg, fg: c.info, icon: 'i' } };
  const cfg = v[variant] || v.info;
  return React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', background: cfg.bg, border: `2px solid ${cfg.fg}`, boxShadow: `3px 3px 0 ${cfg.fg}`, minWidth: '240px', maxWidth: '360px' } },
    React.createElement('span', { style: { width: '16px', height: '16px', background: cfg.fg, color: c.fgInverse === '#F4EDD9' ? '#F4EDD9' : c.bgInverse, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700', flexShrink: 0, fontFamily: '"Geist Mono", monospace' } }, cfg.icon),
    React.createElement('span', { style: { flex: 1, fontFamily: '"Geist Mono", monospace', fontSize: '13px', color: c.fg, lineHeight: 1.4 } }, message),
    onClose && React.createElement('button', { onClick: onClose, style: { background: 'none', border: 'none', color: cfg.fg, cursor: 'pointer', fontSize: '12px' } }, '✕'),
  );
}

// ─── PIXEL ICON SET (8-bit SVG) ───────────────────────────
const ICONS = {
  home: React.createElement('svg', { width: 16, height: 16, viewBox: '0 0 8 8', style: { imageRendering: 'pixelated' }, fill: 'currentColor' },
    React.createElement('path', { d: 'M4 0L0 4h1v4h2V5h2v3h2V4h1L4 0z' })),
  star: React.createElement('svg', { width: 16, height: 16, viewBox: '0 0 8 8', style: { imageRendering: 'pixelated' }, fill: 'currentColor' },
    React.createElement('path', { d: 'M4 0l1 2.5L8 3l-2 2 .5 3L4 6.5 1.5 8 2 5 0 3l3-.5L4 0z' })),
  close: React.createElement('svg', { width: 12, height: 12, viewBox: '0 0 8 8', style: { imageRendering: 'pixelated' }, fill: 'currentColor' },
    React.createElement('path', { d: 'M0 0h2l2 2 2-2h2v2L6 4l2 2v2H6L4 6l-2 2H0V6l2-2L0 2V0z' })),
  check: React.createElement('svg', { width: 12, height: 12, viewBox: '0 0 8 8', style: { imageRendering: 'pixelated' }, fill: 'currentColor' },
    React.createElement('path', { d: 'M0 4l1-1 2 2 4-4 1 1-5 5L0 4z' })),
  arrow: React.createElement('svg', { width: 12, height: 12, viewBox: '0 0 8 8', style: { imageRendering: 'pixelated' }, fill: 'currentColor' },
    React.createElement('path', { d: 'M0 3h5L3 1l2-1 3 4-3 4-2-1 2-2H0V3z' })),
  settings: React.createElement('svg', { width: 16, height: 16, viewBox: '0 0 8 8', style: { imageRendering: 'pixelated' }, fill: 'currentColor' },
    React.createElement('path', { d: 'M3 0v1C2 1 1 2 1 3H0v2h1c0 1 1 2 2 2v1h2V7c1 0 2-1 2-2h1V3H7C7 2 6 1 5 1V0H3zm1 2a2 2 0 100 4 2 2 0 000-4z' })),
  user: React.createElement('svg', { width: 16, height: 16, viewBox: '0 0 8 8', style: { imageRendering: 'pixelated' }, fill: 'currentColor' },
    React.createElement('path', { d: 'M4 0a2 2 0 100 4 2 2 0 000-4zM1 6c0-1 3-2 3-2s3 1 3 2v2H1V6z' })),
  bell: React.createElement('svg', { width: 16, height: 16, viewBox: '0 0 8 8', style: { imageRendering: 'pixelated' }, fill: 'currentColor' },
    React.createElement('path', { d: 'M4 0C3 0 2 1 2 2v4H1v1h6V6H6V2C6 1 5 0 4 0zM3 7h2c0 .5-.5 1-1 1S3 7.5 3 7z' })),
  search: React.createElement('svg', { width: 16, height: 16, viewBox: '0 0 8 8', style: { imageRendering: 'pixelated' }, fill: 'currentColor' },
    React.createElement('path', { d: 'M3 0a3 3 0 100 6 3 3 0 000-6zM5.5 5L5 5.5 7 8l1-1-2.5-2z' })),
  heart: React.createElement('svg', { width: 16, height: 16, viewBox: '0 0 8 8', style: { imageRendering: 'pixelated' }, fill: 'currentColor' },
    React.createElement('path', { d: 'M0 2c0-1 1-2 2-2s2 1 2 1 1-1 2-1 2 1 2 2-1 2-2 3L4 8 2 5C1 4 0 3 0 2z' })),
  mail: React.createElement('svg', { width: 16, height: 16, viewBox: '0 0 8 8', style: { imageRendering: 'pixelated' }, fill: 'currentColor' },
    React.createElement('path', { d: 'M0 1h8v1L4 5 0 2V1zm0 2.5l4 3 4-3V7H0V3.5z' })),
  trash: React.createElement('svg', { width: 16, height: 16, viewBox: '0 0 8 8', style: { imageRendering: 'pixelated' }, fill: 'currentColor' },
    React.createElement('path', { d: 'M3 0h2v1h3v1H0V1h3V0zM1 3h1v4h1V3h1v4h1V3h1v4c0 .5-.5 1-1 1H2c-.5 0-1-.5-1-1V3z' })),
};

function PixelIcon({ name, size = 16, color }) {
  const { c } = useTheme();
  const icon = ICONS[name];
  if (!icon) return null;
  return React.createElement('span', { style: { color: color || c.fg, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: size, height: size } },
    React.cloneElement(icon, { width: size, height: size })
  );
}

// ─── EXPORT TO WINDOW ─────────────────────────────────────
Object.assign(window, {
  T, ThemeCtx, ThemeProvider, useTheme,
  PixelButton, PixelSpinner, PixelInput, PixelTextarea, PixelSelect,
  PixelCheckbox, PixelRadio, PixelSwitch, PixelCard, PixelBadge,
  PixelAvatar, PixelAlert, PixelProgress, PixelSkeleton,
  PixelTabs, PixelTable, PixelModal, PixelCode, PixelToast,
  PixelIcon, ICONS, Section, SubSection, PreviewBox,
});
