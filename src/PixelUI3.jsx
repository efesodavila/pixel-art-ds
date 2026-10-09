/**
 * PIXEL ART DS — Display + Pixel Game Components (Part 3)
 * Layout/Display · Pixel Art Exclusivos 🎮
 * Requires: PixelUI.jsx loaded first
 */

// ─── PIXEL ACCORDION ──────────────────────────────────────
function PixelAccordion({ items=[], multiple=false }) {
  const { c } = useTheme();
  const [open, setOpen] = React.useState([]);
  const toggle = (i) => {
    if (multiple) setOpen(o => o.includes(i) ? o.filter(x=>x!==i) : [...o,i]);
    else setOpen(o => o.includes(i) ? [] : [i]);
  };
  return React.createElement('div', { style:{ border:`2px solid ${c.border}`, boxShadow:`3px 3px 0 ${c.border}` } },
    items.map((item, i) => {
      const isOpen = open.includes(i);
      return React.createElement('div', { key:i, style:{ borderBottom: i<items.length-1 ? `1px solid ${c.border}` : 'none' } },
        React.createElement('button', { onClick:()=>toggle(i), style:{ width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 16px', background: isOpen ? c.bgSubtle : c.bg, border:'none', cursor:'pointer', outline:'none', gap:'8px' } },
          React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:'8px' } },
            item.icon && React.createElement('span', { style:{ fontSize:'14px' } }, item.icon),
            React.createElement('span', { style:{ fontFamily:'"Geist Mono",monospace', fontSize:'12px', fontWeight:'700', color:c.fg, letterSpacing:'0.03em', textAlign:'left' } }, item.title),
          ),
          React.createElement('span', { style:{ color:c.fgMuted, fontSize: '12px', fontFamily:'monospace', flexShrink:0 } }, isOpen ? '▲' : '▼'),
        ),
        isOpen && React.createElement('div', { style:{ padding:'12px 16px 16px', borderTop:`1px solid ${c.borderSubtle}`, fontFamily:'"Geist Mono",monospace', fontSize:'12px', color:c.fgSubtle, lineHeight:1.7 } }, item.content),
      );
    })
  );
}

// ─── PIXEL TIMELINE ───────────────────────────────────────
function PixelTimeline({ events=[] }) {
  const { c } = useTheme();
  const statusColors = { done:c.success, active:c.primary, pending:c.fgMuted, error:c.error };
  return React.createElement('div', { style:{ display:'flex', flexDirection:'column' } },
    events.map((evt, i) => React.createElement('div', { key:i, style:{ display:'flex', gap:'16px' } },
      // Spine
      React.createElement('div', { style:{ display:'flex', flexDirection:'column', alignItems:'center', flexShrink:0 } },
        React.createElement('div', { style:{ width:'16px', height:'16px', background: statusColors[evt.status]||c.fgMuted, border:`2px solid ${c.border}`, boxShadow:`2px 2px 0 ${c.border}`, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'8px', color:'#F4EDD9', fontWeight:'700', fontFamily:'monospace' } },
          evt.status==='done'?'✓':evt.status==='error'?'✕':i+1
        ),
        i < events.length-1 && React.createElement('div', { style:{ width:'2px', flex:1, minHeight:'24px', background: i < events.findIndex(e=>e.status==='active'||e.status==='pending') ? c.primary : c.borderSubtle, margin:'4px 0' } }),
      ),
      // Content
      React.createElement('div', { style:{ paddingBottom: i<events.length-1?'20px':'0', flex:1, paddingTop:'0' } },
        React.createElement('div', { style:{ display:'flex', alignItems:'baseline', gap:'8px', marginBottom:'2px' } },
          React.createElement('span', { style:{ fontFamily:'"Geist Mono",monospace', fontSize:'12px', fontWeight:'700', color:c.fg } }, evt.title),
          evt.time && React.createElement('span', { style:{ fontFamily:'"Geist Mono",monospace', fontSize: '12px', color:c.fgMuted } }, evt.time),
        ),
        evt.description && React.createElement('p', { style:{ fontFamily:'"Geist Mono",monospace', fontSize: '13px', color:c.fgSubtle, lineHeight:1.6, margin:0 } }, evt.description),
      ),
    ))
  );
}

// ─── PIXEL STAT ───────────────────────────────────────────
function PixelStat({ label, value, delta, icon, description, variant='default' }) {
  const { c } = useTheme();
  const isPos = delta > 0, isNeg = delta < 0;
  const deltaColor = isPos ? c.success : isNeg ? c.error : c.fgMuted;
  const deltaBg = isPos ? c.successBg : isNeg ? c.errorBg : c.bgSubtle;
  return React.createElement('div', { style:{ background:c.bg, border:`2px solid ${c.border}`, padding:'16px', boxShadow:`3px 3px 0 ${c.border}` } },
    React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'8px' } },
      React.createElement('span', { style:{ fontFamily:'"Geist Mono",monospace', fontSize: '12px', fontWeight:'700', letterSpacing:'0.1em', textTransform:'uppercase', color:c.fgSubtle } }, label),
      icon && React.createElement('span', { style:{ fontSize:'20px' } }, icon),
    ),
    React.createElement('div', { style:{ fontFamily:'"Geist Mono",monospace', fontSize:'32px', fontWeight:'700', color:c.fg, lineHeight:1, marginBottom:'8px', letterSpacing:'-0.02em' } }, value),
    React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:'8px' } },
      delta !== undefined && React.createElement('span', { style:{ padding:'2px 6px', background:deltaBg, color:deltaColor, fontFamily:'"Geist Mono",monospace', fontSize: '12px', fontWeight:'700', border:`1px solid ${deltaColor}` } },
        `${isPos?'▲':isNeg?'▼':'─'} ${Math.abs(delta)}%`
      ),
      description && React.createElement('span', { style:{ fontFamily:'"Geist Mono",monospace', fontSize: '12px', color:c.fgMuted } }, description),
    ),
  );
}

// ─── PIXEL DIVIDER ────────────────────────────────────────
function PixelDivider({ label, vertical=false, style: extraStyle={} }) {
  const { c } = useTheme();
  if (vertical) return React.createElement('div', { style:{ width:'2px', background:c.border, alignSelf:'stretch', ...extraStyle } });
  if (!label) return React.createElement('div', { style:{ height:'2px', background:c.border, width:'100%', ...extraStyle } });
  return React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:'12px', width:'100%', ...extraStyle } },
    React.createElement('div', { style:{ flex:1, height:'2px', background:c.border } }),
    React.createElement('span', { style:{ fontFamily:'"Geist Mono",monospace', fontSize: '12px', fontWeight:'700', letterSpacing:'0.15em', textTransform:'uppercase', color:c.fgMuted, whiteSpace:'nowrap', padding:'0 4px' } }, label),
    React.createElement('div', { style:{ flex:1, height:'2px', background:c.border } }),
  );
}

// ─── PIXEL EMPTY STATE ────────────────────────────────────
function PixelEmptyState({ icon='▦', title='Nothing here yet', description, action }) {
  const { c } = useTheme();
  return React.createElement('div', { style:{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'48px 24px', textAlign:'center', border:`2px dashed ${c.borderSubtle}`, background:c.bgSubtle } },
    React.createElement('div', { style:{ fontSize:'48px', marginBottom:'16px', opacity:0.5 } }, icon),
    React.createElement('div', { style:{ fontFamily:'"Geist Mono",monospace', fontSize:'14px', fontWeight:'700', color:c.fg, letterSpacing:'0.05em', textTransform:'uppercase', marginBottom:'8px' } }, title),
    description && React.createElement('p', { style:{ fontFamily:'"Geist Mono",monospace', fontSize: '13px', color:c.fgSubtle, lineHeight:1.6, maxWidth:'280px', marginBottom:'16px' } }, description),
    action && React.createElement('div', null, action),
  );
}

// ─── PIXEL LIST ───────────────────────────────────────────
function PixelList({ items=[], onItemClick }) {
  const { c } = useTheme();
  return React.createElement('div', { style:{ border:`2px solid ${c.border}`, boxShadow:`3px 3px 0 ${c.border}` } },
    items.map((item, i) => React.createElement('div', { key:i, onClick:()=>onItemClick?.(item),
        style:{ display:'flex', alignItems:'center', gap:'12px', padding:'10px 14px', borderBottom: i<items.length-1?`1px solid ${c.borderSubtle}`:'none', background:c.bg, cursor:onItemClick?'pointer':'default' },
        onMouseEnter:e=>{ if(onItemClick) e.currentTarget.style.background=c.bgSubtle; },
        onMouseLeave:e=>e.currentTarget.style.background=c.bg,
      },
      item.icon && React.createElement('span', { style:{ fontSize:'16px', flexShrink:0 } }, item.icon),
      item.avatar && React.createElement(PixelAvatar, { name:item.avatar, size:'sm' }),
      React.createElement('div', { style:{ flex:1, minWidth:0 } },
        React.createElement('div', { style:{ fontFamily:'"Geist Mono",monospace', fontSize:'12px', fontWeight:'700', color:c.fg, letterSpacing:'0.02em', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' } }, item.title),
        item.description && React.createElement('div', { style:{ fontFamily:'"Geist Mono",monospace', fontSize: '12px', color:c.fgSubtle, marginTop:'2px', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' } }, item.description),
      ),
      item.meta && React.createElement('span', { style:{ fontFamily:'"Geist Mono",monospace', fontSize: '12px', color:c.fgMuted, flexShrink:0 } }, item.meta),
      item.badge && React.createElement(PixelBadge, { variant:item.badgeVariant||'default', size:'sm' }, item.badge),
      item.actions && React.createElement('div', { style:{ display:'flex', gap:'4px', flexShrink:0 } }, item.actions),
    ))
  );
}

// ─── PIXEL TREE ───────────────────────────────────────────
function PixelTreeNode({ node, depth=0 }) {
  const { c } = useTheme();
  const [expanded, setExpanded] = React.useState(node.expanded !== false);
  const hasChildren = node.children && node.children.length > 0;
  return React.createElement('div', null,
    React.createElement('div', { onClick:()=>hasChildren&&setExpanded(e=>!e), style:{ display:'flex', alignItems:'center', gap:'4px', padding:`4px 8px`, paddingLeft:`${8+depth*16}px`, cursor:hasChildren?'pointer':'default', background:'transparent', fontFamily:'"Geist Mono",monospace', fontSize:'12px', color: node.active?c.primary:c.fg },
      onMouseEnter:e=>e.currentTarget.style.background=c.bgSubtle,
      onMouseLeave:e=>e.currentTarget.style.background='transparent',
    },
      hasChildren
        ? React.createElement('span', { style:{ fontSize: '12px', color:c.fgMuted, width:'12px', flexShrink:0 } }, expanded?'▼':'▶')
        : React.createElement('span', { style:{ width:'12px', flexShrink:0 } }),
      node.icon && React.createElement('span', { style:{ fontSize:'12px' } }, node.icon),
      React.createElement('span', { style:{ fontWeight: node.active?'700':'400' } }, node.label),
      node.badge && React.createElement(PixelBadge, { size:'sm', variant:node.badgeVariant||'default' }, node.badge),
    ),
    hasChildren && expanded && React.createElement('div', null,
      node.children.map((child,i) => React.createElement('div', { key:i, style:{ borderLeft:`2px solid ${c.borderSubtle}`, marginLeft:`${16+depth*16}px` } },
        React.createElement(PixelTreeNode, { node:child, depth:depth+1 })
      ))
    ),
  );
}

function PixelTree({ nodes=[] }) {
  const { c } = useTheme();
  return React.createElement('div', { style:{ border:`2px solid ${c.border}`, background:c.bg, boxShadow:`3px 3px 0 ${c.border}`, padding:'8px 0' } },
    nodes.map((node,i) => React.createElement(PixelTreeNode, { key:i, node }))
  );
}

// ═══════════════════════════════════════════════════════════
// PIXEL ART EXCLUSIVOS 🎮
// ═══════════════════════════════════════════════════════════

// ─── PIXEL DIALOG BOX (RPG) ───────────────────────────────
function PixelDialogBox({ speaker, lines=[], portrait, onNext, autoType=true }) {
  const { c } = useTheme();
  const [lineIdx, setLineIdx] = React.useState(0);
  const [charIdx, setCharIdx] = React.useState(0);
  const [done, setDone] = React.useState(false);
  const text = lines[lineIdx] || '';

  React.useEffect(() => {
    setCharIdx(0); setDone(false);
  }, [lineIdx]);

  React.useEffect(() => {
    if (!autoType || done) return;
    if (charIdx < text.length) {
      const t = setTimeout(() => setCharIdx(i => i+1), 30);
      return () => clearTimeout(t);
    } else setDone(true);
  }, [charIdx, text, done, autoType]);

  const advance = () => {
    if (!done) { setCharIdx(text.length); setDone(true); return; }
    if (lineIdx < lines.length-1) setLineIdx(i=>i+1);
    else onNext?.();
  };

  const displayed = autoType ? text.slice(0, charIdx) : text;

  return React.createElement('div', { onClick: advance, style:{ background:c.bg, border:`3px solid ${c.border}`, boxShadow:`4px 4px 0 ${c.border}`, padding:'0', cursor:'pointer', userSelect:'none', position:'relative' } },
    // Title bar
    React.createElement('div', { style:{ background:c.bgInverse, padding:'6px 12px', display:'flex', alignItems:'center', justifyContent:'space-between', borderBottom:`2px solid ${c.border}` } },
      React.createElement('span', { style:{ fontFamily:'"Geist Mono",monospace', fontSize: '13px', fontWeight:'700', letterSpacing:'0.1em', textTransform:'uppercase', color:c.fgInverse } }, speaker || '???'),
      React.createElement('span', { style:{ fontFamily:'"Geist Mono",monospace', fontSize: '12px', color: c.fgInverse === '#F4EDD9' ? '#A89070' : '#604838' } }, `${lineIdx+1}/${lines.length}`),
    ),
    React.createElement('div', { style:{ display:'flex', gap:'0' } },
      // Portrait
      portrait && React.createElement('div', { style:{ width:'80px', height:'80px', background:c.bgSubtle, border:`2px solid ${c.border}`, borderRight:`2px solid ${c.border}`, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden', imageRendering:'pixelated', margin:'12px', marginRight:0 } },
        typeof portrait === 'string'
          ? React.createElement('img', { src:portrait, style:{ width:'100%', imageRendering:'pixelated' } })
          : portrait
      ),
      // Text
      React.createElement('div', { style:{ padding:'16px', flex:1, minHeight:'80px' } },
        React.createElement('p', { style:{ fontFamily:'"Geist Mono",monospace', fontSize:'13px', color:c.fg, lineHeight:1.7, margin:0 } }, displayed),
      ),
    ),
    // Cursor blink
    done && React.createElement('div', { style:{ position:'absolute', bottom:'10px', right:'14px', fontFamily:'monospace', fontSize:'16px', color:c.primary, animation:'px-blink 0.8s steps(1) infinite' } }, '▼'),
  );
}

// ─── PIXEL INVENTORY GRID ─────────────────────────────────
function PixelInventoryGrid({ items=[], slots=20, onSelect, selected }) {
  const { c } = useTheme();
  const rarityColors = { common:'#A89070', uncommon:c.success, rare:c.secondary, epic:'#7B4FAA', legendary:c.warning };
  return React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'repeat(5,56px)', gap:'4px', padding:'8px', background:c.bgStrong, border:`3px solid ${c.border}`, boxShadow:`4px 4px 0 ${c.border}`, display:'inline-grid' } },
    [...Array(slots)].map((_,i) => {
      const item = items[i];
      const isSelected = selected === i;
      const rColor = item ? (rarityColors[item.rarity] || rarityColors.common) : c.borderSubtle;
      return React.createElement('div', { key:i, onClick:()=>item&&onSelect?.(i),
          style:{ width:'56px', height:'56px', background: isSelected ? c.bgSubtle : c.bg, border:`2px solid ${isSelected?c.primary:item?rColor:c.borderSubtle}`, boxShadow: isSelected?`0 0 0 1px ${c.primary}`:item?`inset 1px 1px 0 rgba(255,255,255,0.15)`:'none', cursor:item?'pointer':'default', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:'2px', position:'relative', overflow:'hidden' },
        },
        item
          ? React.createElement(React.Fragment, null,
              React.createElement('span', { style:{ fontSize:'22px', imageRendering:'pixelated' } }, item.icon || '▣'),
              item.count > 1 && React.createElement('span', { style:{ position:'absolute', bottom:'2px', right:'4px', fontFamily:'"Geist Mono",monospace', fontSize:'8px', fontWeight:'700', color:c.fg } }, item.count),
              React.createElement('div', { style:{ position:'absolute', top:0, left:0, right:0, height:'2px', background:rColor } }),
            )
          : React.createElement('span', { style:{ fontSize:'8px', color:c.borderSubtle, fontFamily:'monospace' } }, '·'),
      );
    })
  );
}

// ─── PIXEL HP BAR ─────────────────────────────────────────
function PixelHPBar({ value=80, max=100, label='HP', showNumbers=true, segments=20, color }) {
  const { c } = useTheme();
  const pct = value / max;
  const filled = Math.round(pct * segments);
  const clr = color || (pct > 0.5 ? c.success : pct > 0.25 ? c.warning : c.error);
  return React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:'8px' } },
    React.createElement('span', { style:{ fontFamily:'"Geist Mono",monospace', fontSize: '12px', fontWeight:'700', color:c.fg, width:'24px', flexShrink:0, letterSpacing:'0.05em' } }, label),
    React.createElement('div', { style:{ display:'flex', gap:'2px', flex:1 } },
      [...Array(segments)].map((_,i) => React.createElement('div', { key:i, style:{ flex:1, height:'14px', background: i<filled ? clr : c.bgSubtle, border:`1px solid ${i<filled?c.border:c.borderSubtle}` } }))
    ),
    showNumbers && React.createElement('span', { style:{ fontFamily:'"Geist Mono",monospace', fontSize: '12px', color:c.fgSubtle, flexShrink:0, minWidth:'56px', textAlign:'right' } }, `${value}/${max}`),
  );
}

// ─── PIXEL XP BAR ─────────────────────────────────────────
function PixelXPBar({ value=340, max=500, level=12 }) {
  const { c } = useTheme();
  const pct = (value / max) * 100;
  const [animated, setAnimated] = React.useState(0);
  React.useEffect(() => { const t = setTimeout(() => setAnimated(pct), 100); return ()=>clearTimeout(t); }, [pct]);
  return React.createElement('div', { style:{ background:c.bgStrong, border:`2px solid ${c.border}`, padding:'8px 12px', boxShadow:`3px 3px 0 ${c.border}` } },
    React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'6px' } },
      React.createElement('span', { style:{ fontFamily:'"Geist Mono",monospace', fontSize: '13px', fontWeight:'700', color:c.fg, letterSpacing:'0.05em' } }, `★ LEVEL ${level}`),
      React.createElement('span', { style:{ fontFamily:'"Geist Mono",monospace', fontSize: '12px', color:c.fgSubtle } }, `${value} / ${max} XP`),
    ),
    React.createElement('div', { style:{ position:'relative', height:'16px', background:c.bgSubtle, border:`2px solid ${c.border}`, boxShadow:'inset 2px 2px 0 rgba(0,0,0,0.2)', overflow:'hidden' } },
      React.createElement('div', { style:{ height:'100%', width:`${animated}%`, background:`linear-gradient(90deg, ${c.warning} 0%, ${c.accent||c.warning} 100%)`, position:'relative' } },
        React.createElement('div', { style:{ position:'absolute', inset:0, backgroundImage:'repeating-linear-gradient(90deg,transparent,transparent 8px,rgba(255,255,255,0.15) 8px,rgba(255,255,255,0.15) 10px)' } }),
      ),
    ),
    React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', marginTop:'4px' } },
      React.createElement('span', { style:{ fontFamily:'"Geist Mono",monospace', fontSize: '12px', color:c.fgMuted } }, `${Math.round(pct)}% to level ${level+1}`),
      React.createElement('span', { style:{ fontFamily:'"Geist Mono",monospace', fontSize: '12px', color:c.fgMuted } }, `${max - value} XP remaining`),
    ),
  );
}

// ─── PIXEL NOTIFICATION BELL ──────────────────────────────
function PixelNotificationBell({ count=0, notifications=[], onRead }) {
  const { c } = useTheme();
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef();
  React.useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);
  return React.createElement('div', { ref, style:{ position:'relative', display:'inline-block' } },
    React.createElement('button', { onClick:()=>setOpen(o=>!o), style:{ position:'relative', background:c.bgSubtle, border:`2px solid ${c.border}`, width:'36px', height:'36px', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', boxShadow: open?'none':`2px 2px 0 ${c.border}`, transform:open?'translate(2px,2px)':'none' } },
      React.createElement(PixelIcon, { name:'bell', size:16 }),
      count > 0 && React.createElement('span', { style:{ position:'absolute', top:'-6px', right:'-6px', background:c.error, color:'#F4EDD9', fontFamily:'"Geist Mono",monospace', fontSize:'8px', fontWeight:'700', minWidth:'16px', height:'16px', display:'flex', alignItems:'center', justifyContent:'center', border:`2px solid ${c.border}`, padding:'0 2px' } }, count > 9 ? '9+' : count),
    ),
    open && React.createElement('div', { style:{ position:'absolute', top:'calc(100%+4px)', right:0, width:'280px', background:c.bg, border:`2px solid ${c.border}`, boxShadow:`4px 4px 0 ${c.border}`, zIndex:500, marginTop:'4px' } },
      React.createElement('div', { style:{ padding:'8px 12px', borderBottom:`2px solid ${c.border}`, background:c.bgSubtle, display:'flex', justifyContent:'space-between', alignItems:'center' } },
        React.createElement('span', { style:{ fontFamily:'"Geist Mono",monospace', fontSize: '13px', fontWeight:'700', color:c.fg, letterSpacing:'0.05em' } }, 'NOTIFICATIONS'),
        onRead && React.createElement('button', { onClick:onRead, style:{ background:'none', border:'none', fontFamily:'"Geist Mono",monospace', fontSize: '12px', color:c.primary, cursor:'pointer' } }, 'MARK ALL READ'),
      ),
      notifications.length === 0
        ? React.createElement('div', { style:{ padding:'24px', textAlign:'center', fontFamily:'"Geist Mono",monospace', fontSize: '13px', color:c.fgMuted } }, 'No notifications')
        : React.createElement('div', { style:{ maxHeight:'280px', overflowY:'auto' } },
            notifications.map((n,i) => React.createElement('div', { key:i, style:{ padding:'10px 12px', borderBottom:`1px solid ${c.borderSubtle}`, background: n.read?'transparent':c.bgSubtle } },
              React.createElement('div', { style:{ display:'flex', gap:'8px', alignItems:'flex-start' } },
                React.createElement('div', { style:{ width:'8px', height:'8px', background:n.read?'transparent':c.primary, border:`1px solid ${n.read?c.borderSubtle:c.primary}`, flexShrink:0, marginTop:'4px' } }),
                React.createElement('div', { style:{ flex:1 } },
                  React.createElement('div', { style:{ fontFamily:'"Geist Mono",monospace', fontSize: '13px', fontWeight:n.read?'400':'700', color:c.fg, lineHeight:1.4 } }, n.message),
                  n.time && React.createElement('div', { style:{ fontFamily:'"Geist Mono",monospace', fontSize: '12px', color:c.fgMuted, marginTop:'2px' } }, n.time),
                ),
              )
            ))
          ),
    ),
  );
}

// ─── PIXEL LOADING SCREEN ─────────────────────────────────
function PixelLoadingScreen({ progress=0, message='LOADING...', title='PIXEL ART DS', tips=[] }) {
  const { c } = useTheme();
  const [tipIdx, setTipIdx] = React.useState(0);
  const [dots, setDots] = React.useState('');
  React.useEffect(() => {
    if (!tips.length) return;
    const t = setInterval(() => setTipIdx(i=>(i+1)%tips.length), 3000);
    return ()=>clearInterval(t);
  }, [tips]);
  React.useEffect(() => {
    const t = setInterval(() => setDots(d=>d.length>=3?'':d+'.'), 400);
    return ()=>clearInterval(t);
  }, []);
  const pct = Math.min(100, Math.max(0, progress));
  return React.createElement('div', { style:{ background:c.bgInverse, border:`3px solid ${c.border}`, boxShadow:`6px 6px 0 ${c.border}`, padding:'32px', display:'flex', flexDirection:'column', alignItems:'center', gap:'20px', position:'relative', overflow:'hidden', minWidth:'320px' } },
    // Scanlines
    React.createElement('div', { style:{ position:'absolute', inset:0, backgroundImage:'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,0.03) 2px,rgba(255,255,255,0.03) 4px)', pointerEvents:'none' } }),
    React.createElement('div', { style:{ fontFamily:'"Geist Mono",monospace', fontSize:'24px', fontWeight:'700', color:c.fgInverse, letterSpacing:'0.15em', textAlign:'center' } }, title),
    React.createElement('div', { style:{ width:'100%' } },
      React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', marginBottom:'6px', fontFamily:'"Geist Mono",monospace', fontSize: '12px', color:c.fgInverse, letterSpacing:'0.1em' } },
        React.createElement('span', null, message + dots),
        React.createElement('span', null, `${Math.round(pct)}%`),
      ),
      React.createElement('div', { style:{ height:'16px', background:'rgba(255,255,255,0.1)', border:`2px solid ${c.fgInverse}`, boxShadow:'inset 2px 2px 0 rgba(0,0,0,0.3)', overflow:'hidden' } },
        React.createElement('div', { style:{ height:'100%', width:`${pct}%`, background:c.primary, position:'relative' } },
          React.createElement('div', { style:{ position:'absolute', inset:0, backgroundImage:'repeating-linear-gradient(90deg,transparent,transparent 12px,rgba(255,255,255,0.2) 12px,rgba(255,255,255,0.2) 14px)' } }),
        ),
      ),
    ),
    tips.length > 0 && React.createElement('div', { style:{ background:'rgba(255,255,255,0.05)', border:`1px solid ${c.fgInverse}30`, padding:'10px 14px', width:'100%' } },
      React.createElement('span', { style:{ fontFamily:'"Geist Mono",monospace', fontSize: '12px', fontWeight:'700', letterSpacing:'0.15em', color:c.primary, display:'block', marginBottom:'4px' } }, '▸ TIP'),
      React.createElement('span', { style:{ fontFamily:'"Geist Mono",monospace', fontSize: '12px', color:c.fgInverse, lineHeight:1.5, display:'block' } }, tips[tipIdx]),
    ),
  );
}

// ─── PIXEL MINI MAP ───────────────────────────────────────
function PixelMiniMap({ rooms=[], currentRoom, onRoomClick, cellSize=24 }) {
  const { c } = useTheme();
  if (!rooms.length) return null;
  const maxX = Math.max(...rooms.map(r=>r.x));
  const maxY = Math.max(...rooms.map(r=>r.y));
  const roomMap = {};
  rooms.forEach(r => { roomMap[`${r.x},${r.y}`] = r; });
  const typeColors = { dungeon:c.bgStrong, boss:c.error, treasure:c.warning, safe:c.success, shop:c.secondary };

  return React.createElement('div', { style:{ background:c.bgInverse, border:`3px solid ${c.border}`, padding:'12px', display:'inline-block', boxShadow:`4px 4px 0 ${c.border}`, position:'relative' } },
    React.createElement('div', { style:{ marginBottom:'8px', fontFamily:'"Geist Mono",monospace', fontSize: '12px', fontWeight:'700', letterSpacing:'0.15em', color:c.fgInverse, textAlign:'center' } }, '[ MINI MAP ]'),
    React.createElement('div', { style:{ display:'grid', gridTemplateColumns:`repeat(${maxX+1},${cellSize}px)`, gridTemplateRows:`repeat(${maxY+1},${cellSize}px)`, gap:'2px' } },
      [...Array(maxY+1)].flatMap((_,y) =>
        [...Array(maxX+1)].map((_,x) => {
          const room = roomMap[`${x},${y}`];
          const isCurrent = room && room.id === currentRoom;
          const roomColor = room ? (typeColors[room.type] || c.bgStrong) : 'transparent';
          return React.createElement('div', { key:`${x},${y}`, onClick:()=>room&&onRoomClick?.(room.id),
              style:{ width:cellSize, height:cellSize, background: room ? roomColor : 'transparent', border: room ? `2px solid ${isCurrent?c.primary:c.border}` : 'none', cursor:room?'pointer':'default', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:isCurrent?`0 0 0 2px ${c.primary}`:'none', position:'relative' },
            },
            room && isCurrent && React.createElement('div', { style:{ width:'6px', height:'6px', background:c.primary, animation:'px-blink 0.8s steps(1) infinite' } }),
            room && !isCurrent && room.type && React.createElement('span', { style:{ fontSize: '12px' } }, room.type==='boss'?'☠':room.type==='treasure'?'★':room.type==='shop'?'$':room.type==='safe'?'♥':'·'),
          );
        })
      )
    ),
    // Legend
    React.createElement('div', { style:{ marginTop:'8px', display:'flex', gap:'8px', flexWrap:'wrap', justifyContent:'center' } },
      Object.entries(typeColors).map(([type,clr]) =>
        React.createElement('div', { key:type, style:{ display:'flex', alignItems:'center', gap:'3px' } },
          React.createElement('div', { style:{ width:'8px', height:'8px', background:clr, border:`1px solid ${c.border}` } }),
          React.createElement('span', { style:{ fontFamily:'"Geist Mono",monospace', fontSize:'8px', color:c.fgInverse, letterSpacing:'0.05em' } }, type),
        )
      )
    ),
  );
}

// ─── EXPORT ───────────────────────────────────────────────
Object.assign(window, {
  PixelAccordion, PixelTimeline, PixelStat, PixelDivider,
  PixelEmptyState, PixelList, PixelTree, PixelTreeNode,
  PixelDialogBox, PixelInventoryGrid, PixelHPBar, PixelXPBar,
  PixelNotificationBell, PixelLoadingScreen, PixelMiniMap,
});
