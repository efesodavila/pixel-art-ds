/**
 * PIXEL ART DESIGN SYSTEM — JavaScript / TypeScript Tokens (v2)
 * WCAG 2.2 AA compliant. Compatible with React Native + React Web.
 *
 * Usage (React Native):
 *   import { tokens, theme, ensureContrast } from './tokens';
 *   const styles = StyleSheet.create({
 *     container: { backgroundColor: theme.light.bg.default }
 *   });
 */

// ─── PRIMITIVE TOKENS ────────────────────────────────────────────────────────

export const tokens = {
  color: {
    primitive: {
      neutral: {
        50:  '#FBF8F0',
        100: '#F4EDD9',
        200: '#E4D9BC',
        300: '#CCBA90',
        400: '#A89070',
        500: '#806050',
        600: '#604838',
        700: '#403020',
        800: '#281808',
        900: '#160C04',
        950: '#0A0602',
      },
      // AA-tuned
      red:    { 50:'#FEF0F0', 100:'#FDDADA', 300:'#F07070', 500:'#C02830', 700:'#8C1018', 900:'#500810' },
      blue:   { 50:'#F0F5FA', 100:'#D4E8F4', 300:'#88B8D8', 500:'#245878', 700:'#14405C', 900:'#102840' },
      amber:  { 50:'#FEF6E0', 100:'#FDEBC0', 300:'#F0C060', 500:'#A05808', 700:'#6C3C00', 900:'#3C2000' },
      green:  { 50:'#EEFAEE', 100:'#CCF0CC', 300:'#70C880', 500:'#1E7838', 700:'#0E5020', 900:'#082818' },
      teal:   { 50:'#E8FAF8', 100:'#C0EEE8', 300:'#60C8C0', 500:'#14707C', 700:'#0E4C56', 900:'#082830' },
    },
  },

  spacing: { 0:0, 1:1, 2:2, 4:4, 8:8, 12:12, 16:16, 24:24, 32:32, 48:48, 64:64, 96:96, 128:128 },

  typography: {
    fontFamily: { mono: 'GeistMono', monoFallback: 'Courier New' },
    // WCAG-aligned scale — body min 14px, metadata min 12px (must be bold).
    // Removed 2xs (9px) for accessibility.
    fontSize: {
      xs:    12,   // labels uppercase, badges (use bold)
      sm:    13,   // captions, metadata
      md:    14,   // BODY DEFAULT
      base:  16,   // long-form text
      lg:    18,
      xl:    22,
      '2xl': 28,
      '3xl': 36,
      '4xl': 48,
      '5xl': 64,
    },
    fontWeight: { regular:'400', medium:'500', bold:'700' },
    lineHeight: { tight:1.3, normal:1.55, relaxed:1.8 },
    letterSpacing: { normal:0, wide:0.8, wider:1.6, widest:3.2 },
  },

  borderWidth: { 1:1, 2:2, 4:4 },
  borderRadius: { none: 0 },

  shadow: {
    sm: { shadowOffset:{width:2,height:2}, shadowOpacity:1, shadowRadius:0, elevation:2 },
    md: { shadowOffset:{width:3,height:3}, shadowOpacity:1, shadowRadius:0, elevation:3 },
    lg: { shadowOffset:{width:4,height:4}, shadowOpacity:1, shadowRadius:0, elevation:4 },
    xl: { shadowOffset:{width:6,height:6}, shadowOpacity:1, shadowRadius:0, elevation:6 },
  },
};

// ─── WCAG CONTRAST UTILITIES ──────────────────────────────────────────────────
function _hexToRgb(hex) {
  const h = hex.replace('#','');
  return [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)];
}
function _luminance(hex) {
  const lin = _hexToRgb(hex).map(v => { v/=255; return v<=0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4); });
  return lin[0]*0.2126 + lin[1]*0.7152 + lin[2]*0.0722;
}
export function contrastRatio(a, b) {
  const L1 = _luminance(a), L2 = _luminance(b);
  const [hi, lo] = L1 > L2 ? [L1, L2] : [L2, L1];
  return (hi + 0.05) / (lo + 0.05);
}
export function wcagGrade(ratio, large=false) {
  if (ratio >= (large ? 4.5 : 7)) return 'AAA';
  if (ratio >= (large ? 3 : 4.5)) return 'AA';
  if (ratio >= 3) return 'AA-LG';
  return 'FAIL';
}
/** Picks the candidate with highest contrast against bg. */
export function getContrastFg(bg, candidates = ['#FFFFFF','#160C04']) {
  let best = candidates[0], bestR = 0;
  for (const c of candidates) { const r = contrastRatio(bg, c); if (r > bestR) { bestR = r; best = c; } }
  return best;
}
/** Walks `candidates` in order and returns the first that meets `minRatio` against bg.
 *  If none pass, returns the highest-contrast option (graceful fallback). */
export function ensureContrast(bg, candidates, minRatio = 4.5) {
  for (const c of candidates) if (contrastRatio(bg, c) >= minRatio) return c;
  return getContrastFg(bg, candidates);
}

// ─── SEMANTIC THEMES (AA verified) ────────────────────────────────────────────

const c = tokens.color.primitive;

export const theme = {
  light: {
    bg:     { default:c.neutral[100], subtle:c.neutral[200], strong:c.neutral[300], inverse:c.neutral[900] },
    fg:     { default:c.neutral[900], subtle:c.neutral[600], muted:c.neutral[600], inverse:c.neutral[100] },
    border: { default:c.neutral[900], subtle:c.neutral[600], focus:c.blue[500] },
    interactive: {
      primary:c.red[500], primaryHover:c.red[700], primaryFg:'#FFFFFF',
      secondary:c.blue[500], secondaryHover:c.blue[700], secondaryFg:'#FFFFFF',
    },
    status: {
      success:c.green[500], warning:c.amber[500], error:c.red[500], info:c.blue[500],
      successBg:c.green[50], warningBg:c.amber[50], errorBg:c.red[50], infoBg:c.blue[50],
    },
  },
  dark: {
    bg:     { default:'#18100A', subtle:'#241A10', strong:'#302018', inverse:c.neutral[100] },
    fg:     { default:c.neutral[100], subtle:'#C8B090', muted:c.neutral[400], inverse:'#18100A' },
    border: { default:c.neutral[400], subtle:c.neutral[700], focus:c.blue[300] },
    interactive: {
      primary:'#E04848', primaryHover:c.red[300], primaryFg:'#18100A',
      secondary:c.blue[300], secondaryHover:'#B0D0E8', secondaryFg:'#18100A',
    },
    status: {
      success:c.green[300], warning:c.amber[300], error:c.red[300], info:c.blue[300],
      successBg:c.green[900], warningBg:c.amber[900], errorBg:c.red[900], infoBg:c.blue[900],
    },
  },
};

// ─── REACT NATIVE STYLE HELPERS ───────────────────────────────────────────────
export function pixelShadow(size='md', color='#160C04') {
  const s = tokens.shadow[size];
  return { shadowColor:color, shadowOffset:s.shadowOffset, shadowOpacity:s.shadowOpacity, shadowRadius:s.shadowRadius, elevation:s.elevation };
}
export function pixelBorder(width=2, color='#160C04') {
  return { borderWidth:width, borderColor:color, borderRadius:0 };
}

/**
 * Generates a full neutral scale from a single base hex, then derives
 * an AA-compliant theme. Use this when allowing users to customize
 * the brand's neutral hue while keeping accessibility guarantees.
 *
 *   const t = buildAccessibleTheme('#7888A0');
 *   t.light.fg.default // auto-picked to hit ≥4.5:1 vs t.light.bg.default
 */
export function buildAccessibleTheme(baseHex) {
  // Reuse minimal HSL generator
  const [r,g,b] = _hexToRgb(baseHex).map(v => v/255);
  const max=Math.max(r,g,b), min=Math.min(r,g,b);
  let h=0, s=0, l=(max+min)/2;
  if (max!==min) {
    const d=max-min; s = l>0.5 ? d/(2-max-min) : d/(max+min);
    switch(max){case r:h=((g-b)/d+(g<b?6:0))/6;break;case g:h=((b-r)/d+2)/6;break;case b:h=((r-g)/d+4)/6;break;}
  }
  h*=360; s*=100; l*=100;
  const sat = Math.min(s*0.55, 14);
  const hsl2hex = (h,s,l) => {
    h/=360; s/=100; l/=100;
    let r,g,b;
    if (s===0) r=g=b=l;
    else {
      const hue2 = (p,q,t) => { if(t<0)t+=1; if(t>1)t-=1; if(t<1/6)return p+(q-p)*6*t; if(t<1/2)return q; if(t<2/3)return p+(q-p)*(2/3-t)*6; return p; };
      const q = l<0.5 ? l*(1+s) : l+s-l*s, p = 2*l-q;
      r=hue2(p,q,h+1/3); g=hue2(p,q,h); b=hue2(p,q,h-1/3);
    }
    return '#'+[r,g,b].map(x=>Math.round(x*255).toString(16).padStart(2,'0')).join('').toUpperCase();
  };
  const scale = {
    50:hsl2hex(h,sat*0.6,97), 100:hsl2hex(h,sat,92), 200:hsl2hex(h,sat*0.9,84),
    300:hsl2hex(h,sat*0.8,73), 400:hsl2hex(h,sat*0.7,60), 500:hsl2hex(h,sat*0.6,47),
    600:hsl2hex(h,sat*0.5,37), 700:hsl2hex(h,sat*0.4,27), 800:hsl2hex(h,sat*0.3,16),
    900:hsl2hex(h,sat*0.3,8),  950:hsl2hex(h,sat*0.2,4),
  };
  const darkBg = hsl2hex(h, 8, 7);
  const lightBg = scale[100];
  return {
    scale,
    light: {
      bg:{ default:lightBg, subtle:scale[200], strong:scale[300], inverse:scale[900] },
      fg:{
        default: ensureContrast(lightBg, [scale[950], scale[900], scale[800], '#000000']),
        subtle:  ensureContrast(lightBg, [scale[700], scale[800], scale[900], '#000000']),
        muted:   ensureContrast(lightBg, [scale[700], scale[800], scale[900], '#000000']),
        inverse: scale[100],
      },
      border:{ default:scale[900], subtle:scale[700], focus:c.blue[500] },
    },
    dark: {
      bg:{ default:darkBg, subtle:hsl2hex(h,8,11), strong:hsl2hex(h,7,16), inverse:scale[100] },
      fg:{
        default: ensureContrast(darkBg, [scale[50], scale[100], scale[200], '#FFFFFF']),
        subtle:  ensureContrast(darkBg, [scale[300], scale[200], scale[100], '#FFFFFF']),
        muted:   ensureContrast(darkBg, [scale[400], scale[300], scale[200], '#FFFFFF']),
        inverse: darkBg,
      },
      border:{ default:scale[600], subtle:scale[700], focus:c.blue[300] },
    },
  };
}

export default { tokens, theme, pixelShadow, pixelBorder, contrastRatio, wcagGrade, getContrastFg, ensureContrast, buildAccessibleTheme };
