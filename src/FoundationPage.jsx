// Foundation Page — Colors, Typography, Spacing tokens
// Requires: window.PX components from PixelUI.jsx

function FoundationPage() {
  const { c, mode } = useTheme();

  const primitives = [
    { name: 'Red', shades: [{s:'50',v:'#FEF0F0'},{s:'100',v:'#FDDADA'},{s:'200',v:'#F8AAAA'},{s:'300',v:'#F07070'},{s:'500',v:'#D43840'},{s:'700',v:'#941820'},{s:'900',v:'#500810'}] },
    { name: 'Blue', shades: [{s:'50',v:'#F0F5FA'},{s:'100',v:'#D4E8F4'},{s:'300',v:'#88B8D8'},{s:'500',v:'#3A78A0'},{s:'700',v:'#245878'},{s:'900',v:'#102840'}] },
    { name: 'Amber', shades: [{s:'50',v:'#FEF6E0'},{s:'100',v:'#FDEBC0'},{s:'300',v:'#F0C060'},{s:'500',v:'#E08820'},{s:'700',v:'#A05808'},{s:'900',v:'#603000'}] },
    { name: 'Green', shades: [{s:'50',v:'#EEFAEE'},{s:'100',v:'#CCF0CC'},{s:'300',v:'#70C880'},{s:'500',v:'#2A9848'},{s:'700',v:'#186830'},{s:'900',v:'#083018'}] },
    { name: 'Teal', shades: [{s:'50',v:'#E8FAF8'},{s:'100',v:'#C0EEE8'},{s:'300',v:'#60C8C0'},{s:'500',v:'#1890A0'},{s:'700',v:'#106070'},{s:'900',v:'#083040'}] },
    { name: 'Neutral', shades: [{s:'50',v:'#FBF8F0'},{s:'100',v:'#F4EDD9'},{s:'200',v:'#E4D9BC'},{s:'300',v:'#CCBA90'},{s:'400',v:'#A89070'},{s:'500',v:'#806050'},{s:'600',v:'#604838'},{s:'700',v:'#403020'},{s:'800',v:'#281808'},{s:'900',v:'#160C04'}] },
  ];

  const semantic = [
    { label: 'bg-default',   value: c.bg,         token: '--bg-default' },
    { label: 'bg-subtle',    value: c.bgSubtle,    token: '--bg-subtle' },
    { label: 'bg-strong',    value: c.bgStrong,    token: '--bg-strong' },
    { label: 'fg-default',   value: c.fg,          token: '--fg-default' },
    { label: 'fg-subtle',    value: c.fgSubtle,    token: '--fg-subtle' },
    { label: 'fg-muted',     value: c.fgMuted,     token: '--fg-muted' },
    { label: 'border',       value: c.border,      token: '--border-default' },
    { label: 'border-subtle',value: c.borderSubtle,token: '--border-subtle' },
    { label: 'border-focus', value: c.borderFocus, token: '--border-focus' },
    { label: 'primary',      value: c.primary,     token: '--interactive-primary' },
    { label: 'secondary',    value: c.secondary,   token: '--interactive-secondary' },
    { label: 'accent',       value: c.accent,      token: '--color-amber-500' },
    { label: 'success',      value: c.success,     token: '--status-success' },
    { label: 'warning',      value: c.warning,     token: '--status-warning' },
    { label: 'error',        value: c.error,       token: '--status-error' },
    { label: 'info',         value: c.info,        token: '--status-info' },
  ];

  const spacing = [0,1,2,4,8,12,16,24,32,48,64,96,128];
  const fontSizes = [
    {name:'2xs',size:9},{name:'xs',size:10},{name:'sm',size:11},{name:'md',size:12},
    {name:'base',size:14},{name:'lg',size:16},{name:'xl',size:20},{name:'2xl',size:24},
    {name:'3xl',size:32},{name:'4xl',size:48},
  ];
  const shadows = [
    { name: 'shadow-sm', css: `2px 2px 0px ${c.border}`, px: '2px' },
    { name: 'shadow-md', css: `3px 3px 0px ${c.border}`, px: '3px' },
    { name: 'shadow-lg', css: `4px 4px 0px ${c.border}`, px: '4px' },
    { name: 'shadow-xl', css: `6px 6px 0px ${c.border}`, px: '6px' },
  ];

  const swatch = (color, label, token, large) => React.createElement('div', {
    key: label,
    style: { display:'flex', flexDirection:'column', gap:'4px', minWidth: large ? '120px' : '80px' }
  },
    React.createElement('div', { style: { height: large ? '64px' : '40px', background: color, border:`2px solid ${c.border}`, boxShadow:`2px 2px 0 ${c.border}` } }),
    React.createElement('div', { style: { fontFamily:'"Geist Mono",monospace', fontSize: '12px', fontWeight:'700', color:c.fg } }, label),
    React.createElement('div', { style: { fontFamily:'"Geist Mono",monospace', fontSize: '12px', color:c.fgMuted } }, color),
    token && React.createElement('div', { style: { fontFamily:'"Geist Mono",monospace', fontSize: '12px', color:c.borderFocus } }, token),
  );

  return React.createElement('div', null,

    React.createElement(Section, { id:'colors', title:'Colors', description:'Pixel Art DS uses a warm-toned palette inspired by RPG pixel art. Two modes: light (parchment) and dark (warm ember).' },

      React.createElement(SubSection, { title:'Primitive Palette' },
        primitives.map(group =>
          React.createElement('div', { key: group.name, style: { marginBottom:'24px' } },
            React.createElement('div', { style: { fontFamily:'"Geist Mono",monospace', fontSize: '12px', fontWeight:'700', letterSpacing:'0.1em', color:c.fgSubtle, marginBottom:'8px' } }, group.name.toUpperCase()),
            React.createElement('div', { style: { display:'flex', gap:'8px', flexWrap:'wrap' } },
              group.shades.map(sh => swatch(sh.v, sh.s, null, false))
            )
          )
        )
      ),

      React.createElement(SubSection, { title:'Semantic Tokens — ' + mode.toUpperCase() + ' MODE' },
        React.createElement('div', { style: { display:'flex', flexWrap:'wrap', gap:'12px' } },
          semantic.map(s2 => swatch(s2.value, s2.label, s2.token, true))
        )
      ),

      React.createElement(SubSection, { title:'Status Colors' },
        React.createElement(PreviewBox, null,
          ['success','warning','error','info'].map(v2 =>
            React.createElement(PixelAlert, { key: v2, variant: v2, title: v2.toUpperCase() }, `This is a ${v2} message.`)
          )
        )
      ),
    ),

    React.createElement(Section, { id:'typography', title:'Typography', description:'Geist Mono is the sole typeface. All text uses the monospace stack for pixel art consistency.' },

      React.createElement(SubSection, { title:'Type Scale' },
        React.createElement('div', { style: { background: c.bgSubtle, border:`2px solid ${c.border}`, padding:'24px', display:'flex', flexDirection:'column', gap:'16px' } },
          fontSizes.map(f =>
            React.createElement('div', { key: f.name, style: { display:'flex', alignItems:'baseline', gap:'16px', borderBottom:`1px solid ${c.borderSubtle}`, paddingBottom:'12px' } },
              React.createElement('span', { style: { fontFamily:'"Geist Mono",monospace', fontSize: '12px', color:c.fgMuted, width:'40px', flexShrink:0 } }, f.name),
              React.createElement('span', { style: { fontFamily:'"Geist Mono",monospace', fontSize:`${f.size}px`, color:c.fg, lineHeight:1.2 } }, 'Geist Mono — The quick brown fox'),
              React.createElement('span', { style: { fontFamily:'"Geist Mono",monospace', fontSize: '12px', color:c.fgMuted, marginLeft:'auto', flexShrink:0 } }, `${f.size}px`),
            )
          )
        )
      ),

      React.createElement(SubSection, { title:'Font Weights' },
        React.createElement(PreviewBox, null,
          [{w:'400',label:'Regular'},{w:'500',label:'Medium'},{w:'700',label:'Bold'}].map(fw =>
            React.createElement('div', { key: fw.w, style: { flex:1, minWidth:'140px' } },
              React.createElement('div', { style: { fontFamily:'"Geist Mono",monospace', fontSize:'24px', fontWeight:fw.w, color:c.fg, lineHeight:1.2 } }, 'Aa'),
              React.createElement('div', { style: { fontFamily:'"Geist Mono",monospace', fontSize: '12px', color:c.fgSubtle, marginTop:'8px' } }, `${fw.label} / ${fw.w}`),
              React.createElement('div', { style: { fontFamily:'"Geist Mono",monospace', fontSize: '13px', fontWeight:fw.w, color:c.fg, marginTop:'4px' } }, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'),
              React.createElement('div', { style: { fontFamily:'"Geist Mono",monospace', fontSize: '13px', fontWeight:fw.w, color:c.fg } }, 'abcdefghijklmnopqrstuvwxyz'),
              React.createElement('div', { style: { fontFamily:'"Geist Mono",monospace', fontSize: '13px', fontWeight:fw.w, color:c.fg } }, '0123456789 !@#$%^&*()'),
            )
          )
        )
      ),

      React.createElement(SubSection, { title:'Letter Spacing' },
        React.createElement(PreviewBox, null,
          [
            {name:'normal',  val:'0em',    sample:'PIXEL ART DS'},
            {name:'wide',    val:'0.05em', sample:'PIXEL ART DS'},
            {name:'wider',   val:'0.1em',  sample:'PIXEL ART DS'},
            {name:'widest',  val:'0.2em',  sample:'PIXEL ART DS'},
          ].map(ls => React.createElement('div', { key: ls.name, style: { flex:1, minWidth:'160px' } },
            React.createElement('div', { style: { fontFamily:'"Geist Mono",monospace', fontSize:'12px', letterSpacing:ls.val, color:c.fg, fontWeight:'700' } }, ls.sample),
            React.createElement('div', { style: { fontFamily:'"Geist Mono",monospace', fontSize: '12px', color:c.fgMuted, marginTop:'4px' } }, `${ls.name} / ${ls.val}`),
          ))
        )
      ),
    ),

    React.createElement(Section, { id:'spacing', title:'Spacing', description:'Pure pixel grid — multiples of 1px. Values: 0, 1, 2, 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.' },
      React.createElement(SubSection, { title:'Scale' },
        React.createElement('div', { style: { display:'flex', flexDirection:'column', gap:'8px' } },
          spacing.map(sp =>
            React.createElement('div', { key: sp, style: { display:'flex', alignItems:'center', gap:'16px' } },
              React.createElement('span', { style: { fontFamily:'"Geist Mono",monospace', fontSize: '12px', color:c.fgMuted, width:'40px', textAlign:'right', flexShrink:0 } }, `${sp}px`),
              React.createElement('span', { style: { fontFamily:'"Geist Mono",monospace', fontSize: '12px', color:c.fgSubtle, width:'72px', flexShrink:0 } }, `--space-${sp}`),
              React.createElement('div', { style: { width:`${Math.min(sp * 2, 256)}px`, height:'16px', background:c.primary, border:`1px solid ${c.border}`, minWidth: sp === 0 ? '2px' : undefined } }),
            )
          )
        )
      ),
    ),

    React.createElement(Section, { id:'shadows', title:'Shadows', description:'Pixel-perfect hard offset shadows. No blur radius — pure translation offsets for the 8-bit look.' },
      React.createElement(SubSection, { title:'Shadow Scale' },
        React.createElement(PreviewBox, null,
          shadows.map(sh =>
            React.createElement('div', { key: sh.name, style: { flex:1, minWidth:'120px', display:'flex', flexDirection:'column', alignItems:'center', gap:'12px' } },
              React.createElement('div', { style: { width:'64px', height:'64px', background:c.bg, border:`2px solid ${c.border}`, boxShadow:sh.css } }),
              React.createElement('div', { style: { fontFamily:'"Geist Mono",monospace', fontSize: '12px', fontWeight:'700', color:c.fg, textAlign:'center' } }, sh.name),
              React.createElement('div', { style: { fontFamily:'"Geist Mono",monospace', fontSize: '12px', color:c.fgMuted, textAlign:'center' } }, sh.px + ' offset'),
            )
          )
        )
      ),
    ),

    React.createElement(Section, { id:'icons', title:'Icons', description:'8-bit pixel SVG icon set. All icons are 8×8 pixel art on a 16px canvas. Stroke-free, fill-only.' },
      React.createElement(SubSection, { title:'Icon Set' },
        React.createElement(PreviewBox, null,
          Object.keys(ICONS).map(name =>
            React.createElement('div', { key: name, style: { display:'flex', flexDirection:'column', alignItems:'center', gap:'6px' } },
              React.createElement('div', { style: { width:'48px', height:'48px', border:`2px solid ${c.border}`, display:'flex', alignItems:'center', justifyContent:'center', background:c.bg, boxShadow:`2px 2px 0 ${c.border}` } },
                React.createElement(PixelIcon, { name, size:20 })
              ),
              React.createElement('span', { style: { fontFamily:'"Geist Mono",monospace', fontSize: '12px', color:c.fgSubtle } }, name),
            )
          )
        )
      ),
      React.createElement(SubSection, { title:'Usage' },
        React.createElement(PixelCode, { lang:'jsx', code:`import { PixelIcon } from '@pixelds/react';

// Basic usage
<PixelIcon name="star" />

// Custom size & color
<PixelIcon name="heart" size={24} color="#D43840" />

// Available icons:
// home, star, close, check, arrow, settings
// user, bell, search, heart, mail, trash` })
      ),
    ),
  );
}

Object.assign(window, { FoundationPage });
