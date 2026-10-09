// Main App — Sidebar + Router + Shell
// Requires all page components loaded before this

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "scanlines": true,
  "shadowSize": "md",
  "accentColor": "#D43840"
}/*EDITMODE-END*/;

function App() {
  const { c, mode, toggle, neutralBase, setNeutralBase, neutralScale } = useTheme();
  const [page, setPage] = React.useState(() => localStorage.getItem('px-page') || 'colors');
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [tweaks, setTweaks] = React.useState(TWEAK_DEFAULTS);
  const [tweakOpen, setTweakOpen] = React.useState(false);

  React.useEffect(() => {
    localStorage.setItem('px-page', page);
    // Scroll the matching section into view after the page renders
    const tries = [0, 60, 180];
    tries.forEach(t => setTimeout(() => {
      const el = document.getElementById(page);
      const main = document.querySelector('main');
      if (el && main) {
        const top = el.getBoundingClientRect().top - main.getBoundingClientRect().top + main.scrollTop - 16;
        main.scrollTo({ top, behavior: t === 0 ? 'auto' : 'smooth' });
      } else if (main) {
        main.scrollTo({ top: 0 });
      }
    }, t));
  }, [page]);

  // Tweaks panel communication
  React.useEffect(() => {
    const handler = (e) => {
      if (e.data?.type === '__activate_edit_mode') setTweakOpen(true);
      if (e.data?.type === '__deactivate_edit_mode') setTweakOpen(false);
    };
    window.addEventListener('message', handler);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', handler);
  }, []);

  const updateTweak = (key, val) => {
    const next = { ...tweaks, [key]: val };
    setTweaks(next);
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [key]: val } }, '*');
  };

  const nav = [
    { group: 'FOUNDATION', items: [
      { id: 'colors',     label: '◈ Colors' },
      { id: 'typography', label: '◈ Typography' },
      { id: 'spacing',    label: '◈ Spacing' },
      { id: 'shadows',    label: '◈ Shadows' },
      { id: 'icons',      label: '◈ Icons' },
    ]},
    { group: 'COMPONENTS', items: [
      { id: 'buttons',    label: '▸ Buttons' },
      { id: 'forms',      label: '▸ Forms' },
      { id: 'cards',      label: '▸ Cards' },
      { id: 'badges',     label: '▸ Badges' },
      { id: 'navigation', label: '▸ Navigation' },
      { id: 'alerts',     label: '▸ Alerts' },
      { id: 'toasts',     label: '▸ Toasts' },
      { id: 'modals',     label: '▸ Modals' },
      { id: 'progress',   label: '▸ Progress' },
      { id: 'avatars',    label: '▸ Avatars' },
      { id: 'tables',     label: '▸ Tables' },
    ]},
    { group: 'ADVANCED FORMS', items: [
      { id: 'slider',       label: '▸ Slider' },
      { id: 'number-input', label: '▸ Number Input' },
      { id: 'date-picker',  label: '▸ Date Picker' },
      { id: 'color-picker', label: '▸ Color Picker' },
      { id: 'otp',          label: '▸ OTP Input' },
      { id: 'file-upload',  label: '▸ File Upload' },
      { id: 'combobox',     label: '▸ Combobox' },
      { id: 'tag-input',    label: '▸ Tag Input' },
      { id: 'multi-select', label: '▸ Multi Select' },
    ]},
    { group: 'NAVIGATION', items: [
      { id: 'breadcrumb',       label: '▸ Breadcrumb' },
      { id: 'pagination',       label: '▸ Pagination' },
      { id: 'stepper',          label: '▸ Stepper' },
      { id: 'dropdown-menu',    label: '▸ Dropdown Menu' },
      { id: 'context-menu',     label: '▸ Context Menu' },
      { id: 'command-palette',  label: '▸ Command Palette' },
    ]},
    { group: 'OVERLAY', items: [
      { id: 'tooltip', label: '▸ Tooltip' },
      { id: 'popover', label: '▸ Popover' },
      { id: 'drawer',  label: '▸ Drawer' },
    ]},
    { group: 'DISPLAY', items: [
      { id: 'accordion',   label: '▸ Accordion' },
      { id: 'timeline',    label: '▸ Timeline' },
      { id: 'stat',        label: '▸ Stat / KPI' },
      { id: 'divider',     label: '▸ Divider' },
      { id: 'empty-state', label: '▸ Empty State' },
      { id: 'list',        label: '▸ List' },
      { id: 'tree',        label: '▸ Tree' },
    ]},
    { group: 'PIXEL ART 🎮', items: [
      { id: 'dialog-box',          label: '🎮 Dialog Box' },
      { id: 'inventory',           label: '🎮 Inventory Grid' },
      { id: 'hp-bar',              label: '🎮 HP Bar' },
      { id: 'xp-bar',              label: '🎮 XP Bar' },
      { id: 'notification-bell',   label: '🎮 Notif. Bell' },
      { id: 'loading-screen',      label: '🎮 Loading Screen' },
      { id: 'minimap',             label: '🎮 Mini Map' },
    ]},
    { group: 'AUDIT 🏆', items: [
      { id: 'audit-overview',     label: '🏆 100/100 Audit' },
      { id: 'audit-distribution', label: '🏆 Distribution' },
      { id: 'audit-methodology',  label: '🏆 Methodology' },
    ]},
    { group: 'ACCESSIBILITY ♿', items: [
      { id: 'a11y-overview',   label: '♿ Overview' },
      { id: 'a11y-contrast',   label: '♿ Contrast Audit' },
      { id: 'a11y-typography', label: '♿ Type Scale' },
      { id: 'a11y-auto',       label: '♿ Auto-Contrast' },
    ]},
    { group: 'TOKENS', items: [
      { id: 'tokens-css',  label: '⬡ CSS Vars' },
      { id: 'tokens-js',   label: '⬡ JS / React Native' },
      { id: 'tokens-json', label: '⬡ JSON' },
    ]},
  ];

  const pageMap = {
    colors: FoundationPage, typography: FoundationPage, spacing: FoundationPage,
    shadows: FoundationPage, icons: FoundationPage,
    buttons: ButtonsPage, forms: FormsPage,
    cards: CardsPage, badges: CardsPage, navigation: CardsPage,
    alerts: FeedbackPage, toasts: FeedbackPage, modals: FeedbackPage, progress: FeedbackPage,
    avatars: DataPage, tables: DataPage,
    // Advanced forms
    'slider': AdvancedFormsPage, 'number-input': AdvancedFormsPage,
    'date-picker': AdvancedFormsPage, 'color-picker': AdvancedFormsPage,
    'otp': AdvancedFormsPage, 'file-upload': AdvancedFormsPage,
    'combobox': AdvancedFormsPage, 'tag-input': AdvancedFormsPage,
    'multi-select': AdvancedFormsPage,
    // Navigation + overlay
    'breadcrumb': NavigationOverlayPage, 'pagination': NavigationOverlayPage,
    'stepper': NavigationOverlayPage, 'dropdown-menu': NavigationOverlayPage,
    'context-menu': NavigationOverlayPage, 'command-palette': NavigationOverlayPage,
    'tooltip': NavigationOverlayPage, 'popover': NavigationOverlayPage,
    'drawer': NavigationOverlayPage,
    // Display
    'accordion': DisplayPage, 'timeline': DisplayPage, 'stat': DisplayPage,
    'divider': DisplayPage, 'empty-state': DisplayPage, 'list': DisplayPage, 'tree': DisplayPage,
    // Game
    'dialog-box': GamePage, 'inventory': GamePage, 'hp-bar': GamePage,
    'xp-bar': GamePage, 'notification-bell': GamePage,
    'loading-screen': GamePage, 'minimap': GamePage,
    // Audit
    'audit-overview': AuditPage, 'audit-distribution': AuditPage, 'audit-methodology': AuditPage,
    // Accessibility
    'a11y-overview': AccessibilityPage, 'a11y-contrast': AccessibilityPage,
    'a11y-typography': AccessibilityPage, 'a11y-auto': AccessibilityPage,
    // Tokens
    'tokens-css': TokensExportPage, 'tokens-js': TokensExportPage, 'tokens-json': TokensExportPage,
  };

  const PageComponent = pageMap[page] || FoundationPage;

  const sidebarStyle = {
    width: sidebarOpen ? '240px' : '0',
    minWidth: sidebarOpen ? '240px' : '0',
    overflow: 'hidden',
    borderRight: `2px solid ${c.border}`,
    background: c.bgSubtle,
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    position: 'relative',
  };

  return React.createElement('div', {
    style: { display:'flex', height:'100vh', background:c.bg, overflow:'hidden',
      position:'relative', ...(tweaks.scanlines ? { '--scanlines':'1' } : {}) }
  },

    // SIDEBAR
    React.createElement('aside', { style: sidebarStyle },
      tweaks.scanlines && React.createElement('div', { style:{ position:'absolute', inset:0, backgroundImage:'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.03) 2px,rgba(0,0,0,0.03) 4px)', pointerEvents:'none', zIndex:10 } }),

      // Sidebar header
      React.createElement('div', { style:{ padding:'16px 12px', borderBottom:`2px solid ${c.border}`, background:c.bgStrong, flexShrink:0 } },
        React.createElement('div', { style:{ fontFamily:'"Geist Mono",monospace', fontSize: '12px', fontWeight:'700', letterSpacing:'0.2em', color:c.fgSubtle, marginBottom:'4px' } }, 'PIXEL ART'),
        React.createElement('div', { style:{ fontFamily:'"Geist Mono",monospace', fontSize:'14px', fontWeight:'700', color:c.fg, letterSpacing:'0.05em' } }, 'DESIGN SYSTEM'),
        React.createElement('div', { style:{ fontFamily:'"Geist Mono",monospace', fontSize: '12px', color:c.fgMuted, marginTop:'4px' } }, 'v1.0.0 — Geist Mono'),
      ),

      // Nav
      React.createElement('nav', { style:{ flex:1, overflowY:'auto', padding:'8px 0' } },
        nav.map(group => React.createElement('div', { key:group.group, style:{ marginBottom:'8px' } },
          React.createElement('div', { style:{ padding:'8px 12px 4px', fontFamily:'"Geist Mono",monospace', fontSize: '12px', fontWeight:'700', letterSpacing:'0.2em', color:c.fgMuted, borderBottom:`1px solid ${c.borderSubtle}`, marginBottom:'2px' } }, group.group),
          group.items.map(item => {
            const isActive = page === item.id;
            return React.createElement('button', {
              key: item.id,
              onClick: () => setPage(item.id),
              style: {
                display: 'block', width: '100%', padding: '6px 12px 6px 16px',
                fontFamily: '"Geist Mono",monospace', fontSize: '13px', textAlign: 'left',
                color: isActive ? c.primaryFg : c.fgSubtle,
                background: isActive ? c.primary : 'transparent',
                border: 'none', cursor: 'pointer', outline: 'none',
                borderLeft: isActive ? `3px solid ${c.border}` : '3px solid transparent',
                fontWeight: isActive ? '700' : '400',
                letterSpacing: '0.02em',
              }
            }, item.label);
          })
        ))
      ),

      // Sidebar footer
      React.createElement('div', { style:{ borderTop:`2px solid ${c.border}`, padding:'8px 12px', background:c.bgStrong, flexShrink:0 } },
        React.createElement('div', { style:{ display:'flex', gap:'6px', alignItems:'center' } },
          React.createElement(PixelButton, { size:'sm', variant:'outline', onClick:toggle, style:{ flex:1, fontSize: '12px', padding:'4px' } }, mode === 'light' ? '◐ DARK' : '◑ LIGHT'),
          React.createElement(PixelButton, { size:'sm', variant:'outline', onClick:()=>setSidebarOpen(v=>!v), style:{ fontSize: '12px', padding:'4px 8px' } }, '«'),
        )
      ),
    ),

    // MAIN CONTENT
    React.createElement('div', { style:{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' } },

      // Top bar
      React.createElement('header', { style:{ padding:'10px 24px', borderBottom:`2px solid ${c.border}`, background:c.bgSubtle, display:'flex', alignItems:'center', gap:'12px', flexShrink:0 } },
        !sidebarOpen && React.createElement(PixelButton, { size:'sm', variant:'outline', onClick:()=>setSidebarOpen(true), style:{ fontSize: '12px' } }, '≡'),
        React.createElement('div', { style:{ fontFamily:'"Geist Mono",monospace', fontSize: '12px', color:c.fgMuted, letterSpacing:'0.1em' } },
          nav.flatMap(g=>g.items).find(i=>i.id===page)?.label.replace(/[◈▸⬡] /,'').toUpperCase() || page.toUpperCase()
        ),
        React.createElement('div', { style:{ marginLeft:'auto', display:'flex', gap:'8px', alignItems:'center' } },
          React.createElement(PixelBadge, { variant:'default', size:'sm' }, mode === 'dark' ? '◐ DARK' : '◑ LIGHT'),
          React.createElement(PixelBadge, { variant:'primary', size:'sm' }, 'v1.0.0'),
        ),
      ),

      // Page content
      React.createElement('main', { style:{ flex:1, overflowY:'auto', padding:'32px' } },
        React.createElement(PageComponent, { activePage: page })
      ),
    ),

    // TWEAKS PANEL
    tweakOpen && React.createElement('div', {
      style: { position:'fixed', bottom:'80px', right:'16px', width:'268px', background:c.bg, border:`2px solid ${c.border}`, boxShadow:`4px 4px 0 ${c.border}`, zIndex:9000, fontFamily:'"Geist Mono",monospace', maxHeight:'82vh', overflowY:'auto' }
    },
      React.createElement('div', { style:{ padding:'8px 12px', borderBottom:`2px solid ${c.border}`, background:c.bgSubtle, fontWeight:'700', fontSize: '13px', letterSpacing:'0.1em', color:c.fg, position:'sticky', top:0 } }, '⚙ TWEAKS'),
      React.createElement('div', { style:{ padding:'12px', display:'flex', flexDirection:'column', gap:'14px' } },

        // ── Neutral Base ──────────────────────────────────
        React.createElement('div', null,
          React.createElement('div', { style:{ fontSize: '12px', fontWeight:'700', color:c.fgSubtle, marginBottom:'4px', letterSpacing:'0.1em' } }, 'NEUTRAL BASE'),
          React.createElement('div', { style:{ fontSize: '12px', color:c.fgMuted, marginBottom:'10px', lineHeight:1.5 } }, 'Pick a base tone — the whole neutral scale is regenerated live.'),

          // Presets
          React.createElement('div', { style:{ display:'flex', gap:'6px', flexWrap:'wrap', marginBottom:'10px' } },
            NEUTRAL_PRESETS.map(preset =>
              React.createElement('div', { key:preset.hex, onClick:()=>setNeutralBase(preset.hex), style:{ display:'flex', flexDirection:'column', alignItems:'center', gap:'3px', cursor:'pointer' } },
                React.createElement('div', { style:{ width:'30px', height:'30px', background:preset.hex, border:`2px solid ${neutralBase===preset.hex ? c.border : c.borderSubtle}`, boxShadow: neutralBase===preset.hex ? `2px 2px 0 ${c.border}` : 'none' } }),
                React.createElement('span', { style:{ fontSize:'8px', color: neutralBase===preset.hex ? c.fg : c.fgMuted, fontWeight: neutralBase===preset.hex ? '700' : '400' } }, preset.name),
              )
            )
          ),

          // Custom color picker
          React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:'10px', padding:'8px', background:c.bgSubtle, border:`2px solid ${c.border}` } },
            React.createElement('div', { style:{ position:'relative', width:'40px', height:'32px', border:`2px solid ${c.border}`, flexShrink:0, overflow:'hidden' } },
              React.createElement('div', { style:{ position:'absolute', inset:0, background:neutralBase } }),
              React.createElement('input', { type:'color', value:neutralBase, onChange:e=>setNeutralBase(e.target.value), style:{ position:'absolute', inset:'-4px', width:'calc(100%+8px)', height:'calc(100%+8px)', opacity:0, cursor:'pointer' } }),
            ),
            React.createElement('div', null,
              React.createElement('div', { style:{ fontSize: '12px', color:c.fgMuted, letterSpacing:'0.05em' } }, 'CUSTOM HEX'),
              React.createElement('div', { style:{ fontSize: '13px', color:c.fg, fontWeight:'700', letterSpacing:'0.05em' } }, neutralBase.toUpperCase()),
            ),
          ),

          // Live scale preview
          neutralScale && React.createElement('div', { style:{ marginTop:'8px' } },
            React.createElement('div', { style:{ fontSize: '12px', color:c.fgMuted, marginBottom:'4px', letterSpacing:'0.05em' } }, 'GENERATED SCALE'),
            React.createElement('div', { style:{ display:'flex', height:'24px', border:`2px solid ${c.border}`, overflow:'hidden' } },
              [50,100,200,300,400,500,600,700,800,900].map(shade =>
                React.createElement('div', { key:shade, title:`${shade}: ${neutralScale[shade]}`, style:{ flex:1, background:neutralScale[shade] } })
              )
            ),
            React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', marginTop:'2px' } },
              ['50','','','','500','','','','','900'].map((l,i) =>
                React.createElement('span', { key:i, style:{ fontSize:'7px', color:c.fgMuted, width:'10%', textAlign:'center' } }, l)
              )
            ),
          ),
        ),

        React.createElement('div', { style:{ borderTop:`1px solid ${c.borderSubtle}` } }),

        // ── Scanlines ────────────────────────────────────
        React.createElement('label', { style:{ display:'flex', alignItems:'center', justifyContent:'space-between', fontSize: '13px', color:c.fg, cursor:'pointer' } },
          'Scanlines',
          React.createElement(PixelSwitch, { checked:tweaks.scanlines, onChange:e=>updateTweak('scanlines',e.target.checked), size:'sm' })
        ),

        // ── Accent Color ──────────────────────────────────
        React.createElement('div', null,
          React.createElement('div', { style:{ fontSize: '12px', color:c.fgSubtle, marginBottom:'6px', letterSpacing:'0.05em' } }, 'ACCENT COLOR'),
          React.createElement('div', { style:{ display:'flex', gap:'6px', flexWrap:'wrap' } },
            ['#D43840','#3A78A0','#E08820','#2A9848','#1890A0','#7B4FAA'].map(clr =>
              React.createElement('div', { key:clr, onClick:()=>updateTweak('accentColor',clr), style:{ width:'26px', height:'26px', background:clr, border:`2px solid ${tweaks.accentColor===clr?c.border:'transparent'}`, cursor:'pointer', boxShadow:tweaks.accentColor===clr?`2px 2px 0 ${c.border}`:'none' } })
            )
          )
        ),

        // ── Shadow Size ───────────────────────────────────
        React.createElement('div', null,
          React.createElement('div', { style:{ fontSize: '12px', color:c.fgSubtle, marginBottom:'6px', letterSpacing:'0.05em' } }, 'SHADOW SIZE'),
          React.createElement('div', { style:{ display:'flex', gap:'4px' } },
            ['sm','md','lg','xl'].map(s => React.createElement(PixelButton, { key:s, size:'sm', variant:tweaks.shadowSize===s?'primary':'outline', onClick:()=>updateTweak('shadowSize',s), style:{ fontSize: '12px', padding:'2px 6px' } }, s))
          )
        ),

        // ── Reset ─────────────────────────────────────────
        React.createElement(PixelButton, { variant:'outline', size:'sm', fullWidth:true, onClick:()=>{ setNeutralBase('#A89070'); updateTweak('scanlines',true); updateTweak('shadowSize','md'); }, style:{ fontSize: '12px' } }, '↺ RESET DEFAULTS'),
      ),
    ),
  );
}

// ─── TOKENS EXPORT PAGE ───────────────────────────────────
function TokensExportPage({ activePage }) {
  const { c } = useTheme();
  const snippets = {
    'tokens-css': { lang:'css', label:'CSS Custom Properties', file:'tokens/tokens.css', code:`/* Import in your HTML or CSS */
@import url('./tokens/tokens.css');

/* Or link in HTML */
<link rel="stylesheet" href="tokens/tokens.css" />

/* Usage */
.my-button {
  background: var(--interactive-primary);
  color: var(--interactive-primary-fg);
  border: var(--border-width-2) solid var(--border-default);
  box-shadow: var(--shadow-md);
  font-family: var(--font-mono);
  font-size: var(--text-md);
  padding: var(--space-8) var(--space-16);
}

/* Dark mode auto-applies via data-theme attribute */
document.documentElement.setAttribute('data-theme', 'dark');` },
    'tokens-js': { lang:'ts', label:'JS / TypeScript / React Native', file:'tokens/tokens.js', code:`// React Native usage
import { tokens, theme, pixelShadow, pixelBorder } from './tokens/tokens';
import { StyleSheet, View, Text } from 'react-native';

const t = theme.light; // or theme.dark

const styles = StyleSheet.create({
  button: {
    backgroundColor: t.interactive.primary,
    ...pixelBorder(2, t.border.default),
    ...pixelShadow('md', t.border.default),
    paddingVertical: tokens.spacing[8],
    paddingHorizontal: tokens.spacing[16],
  },
  label: {
    fontFamily: tokens.typography.fontFamily.mono,
    fontSize: tokens.typography.fontSize.md,
    fontWeight: tokens.typography.fontWeight.bold,
    color: t.interactive.primaryFg,
    letterSpacing: tokens.typography.letterSpacing.wide,
  },
});

// Dynamic theming
const usePixelTheme = (colorScheme) => {
  return colorScheme === 'dark' ? theme.dark : theme.light;
};` },
    'tokens-json': { lang:'json', label:'JSON Tokens (Design Tool Import)', file:'tokens/tokens.json', code:`// tokens/tokens.json — style-dictionary compatible
{
  "color": {
    "primitive": {
      "red": { "500": "#D43840" },
      "blue": { "500": "#3A78A0" }
    },
    "semantic": {
      "light": {
        "interactive": {
          "primary": "#D43840"
        }
      }
    }
  },
  "spacing": { "16": "16px" },
  "typography": {
    "fontFamily": {
      "mono": "\\"Geist Mono\\", monospace"
    }
  }
}

// Style Dictionary config (sd.config.js)
module.exports = {
  source: ['tokens/tokens.json'],
  platforms: {
    css:  { transformGroup: 'css', buildPath: 'build/', files: [{ destination: 'tokens.css', format: 'css/variables' }] },
    js:   { transformGroup: 'js',  buildPath: 'build/', files: [{ destination: 'tokens.js',  format: 'javascript/esm' }] },
    ios:  { transformGroup: 'ios', buildPath: 'build/ios/' },
    android: { transformGroup: 'android', buildPath: 'build/android/' },
  },
};` },
  };

  const sn = snippets[activePage] || snippets['tokens-css'];
  return React.createElement('div', null,
    React.createElement(Section, { title: sn.label, description:`Use these tokens in your web or React Native project. File: ${sn.file}` },
      React.createElement(PixelCode, { lang: sn.lang, code: sn.code }),
      React.createElement('div', { style:{ marginTop:'16px' } },
        React.createElement(PixelAlert, { variant:'info', title:'REACT NATIVE NOTES' }, 'React Native does not support CSS custom properties. Use tokens/tokens.js directly. Geist Mono must be loaded via expo-font (Expo) or react-native-asset (bare RN).'),
      )
    ),
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(ThemeProvider, null, React.createElement(App, null)));
