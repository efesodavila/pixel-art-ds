/**
 * PIXEL ART DS — Advanced Components Part 2
 * Advanced forms · Navigation · Overlay
 * Requires: PixelUI.jsx loaded first
 */

// ─── PIXEL SLIDER ─────────────────────────────────────────
function PixelSlider({ min=0, max=100, value=50, onChange, label, showValue=false, step=1, variant='primary' }) {
  const ariaProps = { role: 'slider', 'aria-valuemin': min, 'aria-valuemax': max, 'aria-valuenow': value, 'aria-label': typeof label==='string'?label:'Slider' };
  const { c } = useTheme();
  const ref = React.useRef();
  const pct = ((value - min) / (max - min)) * 100;
  const colors = { primary: c.primary, success: c.success, warning: c.warning, error: c.error };
  const clr = colors[variant] || c.primary;

  const handleClick = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const raw = min + x * (max - min);
    const stepped = Math.round(raw / step) * step;
    onChange?.(Math.max(min, Math.min(max, stepped)));
  };

  const labelStyle = { display:'block', marginBottom:'4px', fontSize: '12px', fontWeight:'700', letterSpacing:'0.1em', textTransform:'uppercase', color:c.fgSubtle, fontFamily:'"Geist Mono",monospace' };
  return React.createElement('div', { style:{ width:'100%' } },
    (label || showValue) && React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', marginBottom:'6px' } },
      label && React.createElement('span', { style: labelStyle }, label),
      showValue && React.createElement('span', { style:{ fontFamily:'"Geist Mono",monospace', fontSize: '13px', fontWeight:'700', color:c.fg } }, value),
    ),
    React.createElement('div', { ref, onClick: handleClick, style:{ position:'relative', height:'16px', background:c.bgSubtle, border:`2px solid ${c.border}`, boxShadow:'inset 2px 2px 0 rgba(0,0,0,0.12)', cursor:'pointer' } },
      React.createElement('div', { style:{ position:'absolute', left:0, top:0, bottom:0, width:`${pct}%`, background:clr } }),
      React.createElement('div', { style:{ position:'absolute', top:'-4px', left:`calc(${pct}% - 8px)`, width:'16px', height:'22px', background:c.bg, border:`2px solid ${c.border}`, boxShadow:`2px 2px 0 ${c.border}`, cursor:'ew-resize' } }),
    ),
    React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', marginTop:'4px', fontFamily:'"Geist Mono",monospace', fontSize: '12px', color:c.fgMuted } },
      React.createElement('span', null, min), React.createElement('span', null, max),
    ),
  );
}

// ─── PIXEL NUMBER INPUT ───────────────────────────────────
function PixelNumberInput({ value=0, onChange, min, max, step=1, label, disabled }) {
  const { c } = useTheme();
  const dec = () => { const v = value - step; onChange?.(min !== undefined ? Math.max(min, v) : v); };
  const inc = () => { const v = value + step; onChange?.(max !== undefined ? Math.min(max, v) : v); };
  const btnStyle = (side) => ({
    width:'32px', height:'36px', background:c.bgSubtle, border:`2px solid ${c.border}`,
    borderRight: side==='left' ? 'none' : `2px solid ${c.border}`,
    borderLeft: side==='right' ? 'none' : `2px solid ${c.border}`,
    color:c.fg, cursor: disabled ? 'not-allowed' : 'pointer', fontFamily:'"Geist Mono",monospace',
    fontSize:'16px', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
    fontWeight:'700', outline:'none',
  });
  const labelStyle = { display:'block', marginBottom:'4px', fontSize: '12px', fontWeight:'700', letterSpacing:'0.1em', textTransform:'uppercase', color:c.fgSubtle, fontFamily:'"Geist Mono",monospace' };
  return React.createElement('div', null,
    label && React.createElement('label', { style: labelStyle }, label),
    React.createElement('div', { style:{ display:'flex', alignItems:'stretch' } },
      React.createElement('button', { onClick: dec, disabled, style: btnStyle('left') }, '−'),
      React.createElement('input', { type:'number', value, onChange:e=>onChange?.(Number(e.target.value)), disabled, min, max, step,
        style:{ width:'80px', textAlign:'center', background:c.bg, border:`2px solid ${c.border}`, color:c.fg, fontFamily:'"Geist Mono",monospace', fontSize:'13px', fontWeight:'700', outline:'none', MozAppearance:'textfield' } }),
      React.createElement('button', { onClick: inc, disabled, style: btnStyle('right') }, '+'),
    ),
  );
}

// ─── PIXEL DATE PICKER ────────────────────────────────────
function PixelDatePicker({ value, onChange, label }) {
  const { c } = useTheme();
  const [open, setOpen] = React.useState(false);
  const today = new Date();
  const [viewYear, setViewYear] = React.useState(today.getFullYear());
  const [viewMonth, setViewMonth] = React.useState(today.getMonth());

  const MONTHS = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
  const DAYS = ['S','M','T','W','T','F','S'];
  const daysInMonth = new Date(viewYear, viewMonth+1, 0).getDate();
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();

  const selDate = value ? new Date(value) : null;
  const isSelected = (d) => selDate && selDate.getFullYear()===viewYear && selDate.getMonth()===viewMonth && selDate.getDate()===d;
  const isToday = (d) => today.getFullYear()===viewYear && today.getMonth()===viewMonth && today.getDate()===d;

  const select = (d) => { onChange?.(new Date(viewYear, viewMonth, d).toISOString().slice(0,10)); setOpen(false); };
  const displayVal = value || 'YYYY-MM-DD';

  const labelStyle = { display:'block', marginBottom:'4px', fontSize: '12px', fontWeight:'700', letterSpacing:'0.1em', textTransform:'uppercase', color:c.fgSubtle, fontFamily:'"Geist Mono",monospace' };
  const cellStyle = (d) => ({
    width:'28px', height:'24px', display:'flex', alignItems:'center', justifyContent:'center',
    fontFamily:'"Geist Mono",monospace', fontSize: '12px', cursor:'pointer',
    background: isSelected(d) ? c.primary : isToday(d) ? c.bgStrong : 'transparent',
    color: isSelected(d) ? c.primaryFg : c.fg, fontWeight: isSelected(d) || isToday(d) ? '700' : '400',
    border: isSelected(d) ? `2px solid ${c.border}` : '2px solid transparent',
  });

  return React.createElement('div', { style:{ position:'relative', display:'inline-block' } },
    label && React.createElement('label', { style: labelStyle }, label),
    React.createElement('div', { onClick:()=>setOpen(o=>!o), style:{ display:'flex', alignItems:'center', gap:'8px', padding:'8px 12px', background:c.bg, border:`2px solid ${open?c.borderFocus:c.border}`, cursor:'pointer', fontFamily:'"Geist Mono",monospace', fontSize:'12px', color:value?c.fg:c.fgMuted, minWidth:'160px', boxShadow:'inset 2px 2px 0 rgba(0,0,0,0.1)' } },
      React.createElement('span', null, '📅'),
      React.createElement('span', null, displayVal),
    ),
    open && React.createElement('div', { style:{ position:'absolute', top:'100%', left:0, zIndex:500, background:c.bg, border:`2px solid ${c.border}`, boxShadow:`4px 4px 0 ${c.border}`, padding:'12px', minWidth:'220px', marginTop:'2px' } },
      // Header
      React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'8px' } },
        React.createElement('button', { onClick:()=>{ if(viewMonth===0){setViewMonth(11);setViewYear(y=>y-1);}else setViewMonth(m=>m-1); }, style:{ background:'none', border:'none', color:c.fg, cursor:'pointer', fontFamily:'"Geist Mono",monospace', fontSize:'14px' } }, '◀'),
        React.createElement('span', { style:{ fontFamily:'"Geist Mono",monospace', fontSize: '13px', fontWeight:'700', color:c.fg, letterSpacing:'0.1em' } }, `${MONTHS[viewMonth]} ${viewYear}`),
        React.createElement('button', { onClick:()=>{ if(viewMonth===11){setViewMonth(0);setViewYear(y=>y+1);}else setViewMonth(m=>m+1); }, style:{ background:'none', border:'none', color:c.fg, cursor:'pointer', fontFamily:'"Geist Mono",monospace', fontSize:'14px' } }, '▶'),
      ),
      // Day headers
      React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'repeat(7,28px)', gap:'2px', marginBottom:'4px' } },
        DAYS.map((d,i) => React.createElement('div', { key:i, style:{ width:'28px', height:'20px', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'"Geist Mono",monospace', fontSize: '12px', color:c.fgMuted, fontWeight:'700' } }, d))
      ),
      // Days grid
      React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'repeat(7,28px)', gap:'2px' } },
        [...Array(firstDay)].map((_,i) => React.createElement('div',{key:'e'+i})),
        [...Array(daysInMonth)].map((_,i) => React.createElement('div', { key:i+1, style: cellStyle(i+1), onClick:()=>select(i+1) }, i+1)),
      ),
    ),
  );
}

// ─── PIXEL COLOR PICKER ───────────────────────────────────
function PixelColorPicker({ value='#D43840', onChange, label, palette }) {
  const { c } = useTheme();
  const defaultPalette = ['#D43840','#E08820','#2A9848','#3A78A0','#1890A0','#7B4FAA','#D4648A','#F4EDD9','#806050','#160C04','#FFFFFF','#888888'];
  const swatches = palette || defaultPalette;
  const labelStyle = { display:'block', marginBottom:'4px', fontSize: '12px', fontWeight:'700', letterSpacing:'0.1em', textTransform:'uppercase', color:c.fgSubtle, fontFamily:'"Geist Mono",monospace' };
  return React.createElement('div', null,
    label && React.createElement('label', { style: labelStyle }, label),
    React.createElement('div', { style:{ display:'flex', flexDirection:'column', gap:'8px', padding:'10px', background:c.bgSubtle, border:`2px solid ${c.border}`, display:'inline-flex' } },
      React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'repeat(6,24px)', gap:'4px' } },
        swatches.map(sw => React.createElement('div', { key:sw, onClick:()=>onChange?.(sw),
          style:{ width:'24px', height:'24px', background:sw, border:`2px solid ${value===sw?c.border:'transparent'}`, cursor:'pointer', boxShadow:value===sw?`2px 2px 0 ${c.border}`:'none' } }))
      ),
      React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:'8px' } },
        React.createElement('div', { style:{ width:'24px', height:'24px', background:value, border:`2px solid ${c.border}`, flexShrink:0, position:'relative', overflow:'hidden' } },
          React.createElement('input', { type:'color', value, onChange:e=>onChange?.(e.target.value), style:{ position:'absolute', inset:'-4px', opacity:0, cursor:'pointer' } }),
        ),
        React.createElement('span', { style:{ fontFamily:'"Geist Mono",monospace', fontSize: '13px', fontWeight:'700', color:c.fg } }, value.toUpperCase()),
      ),
    ),
  );
}

// ─── PIXEL OTP INPUT ──────────────────────────────────────
function PixelOTPInput({ length=6, value='', onChange, label, error }) {
  const { c } = useTheme();
  const refs = Array.from({length}, () => React.useRef());
  const chars = value.split('').concat(Array(length).fill('')).slice(0, length);

  const handleKey = (i, e) => {
    if (e.key === 'Backspace') {
      const next = chars.map((c,j)=>j===i?'':c).join('');
      onChange?.(next);
      if (i > 0) refs[i-1].current?.focus();
    } else if (/^\d$/.test(e.key) || /^[a-zA-Z]$/.test(e.key)) {
      const next = chars.map((c,j)=>j===i?e.key:c).join('');
      onChange?.(next);
      if (i < length-1) refs[i+1].current?.focus();
    } else if (e.key === 'ArrowLeft' && i > 0) refs[i-1].current?.focus();
    else if (e.key === 'ArrowRight' && i < length-1) refs[i+1].current?.focus();
    e.preventDefault();
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData('text').slice(0, length);
    onChange?.(pasted);
    refs[Math.min(pasted.length, length-1)].current?.focus();
    e.preventDefault();
  };

  const labelStyle = { display:'block', marginBottom:'4px', fontSize: '12px', fontWeight:'700', letterSpacing:'0.1em', textTransform:'uppercase', color:c.fgSubtle, fontFamily:'"Geist Mono",monospace' };
  return React.createElement('div', null,
    label && React.createElement('label', { style: labelStyle }, label),
    React.createElement('div', { style:{ display:'flex', gap:'8px' }, onPaste: handlePaste },
      chars.map((ch, i) => React.createElement('input', {
        key:i, ref:refs[i], value:ch, readOnly: true,
        onKeyDown: e => handleKey(i, e), onFocus: e => e.target.select(),
        style:{ width:'40px', height:'48px', textAlign:'center', fontFamily:'"Geist Mono",monospace', fontSize:'20px', fontWeight:'700', color:c.fg, background:c.bg, border:`2px solid ${error?c.error:ch?c.border:c.borderSubtle}`, boxShadow:ch?`2px 2px 0 ${c.border}`:'inset 2px 2px 0 rgba(0,0,0,0.1)', outline:'none' },
      }))
    ),
    error && React.createElement('span', { style:{ fontSize: '12px', color:c.error, marginTop:'4px', display:'block', fontFamily:'"Geist Mono",monospace' } }, error),
  );
}

// ─── PIXEL FILE UPLOAD ────────────────────────────────────
function PixelFileUpload({ onFile, accept='*', multiple=false, label }) {
  const { c } = useTheme();
  const [dragging, setDragging] = React.useState(false);
  const [files, setFiles] = React.useState([]);
  const inputRef = React.useRef();

  const handleFiles = (fs) => { const arr = Array.from(fs); setFiles(arr); onFile?.(arr); };
  const onDrop = (e) => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files); };
  const labelStyle = { display:'block', marginBottom:'4px', fontSize: '12px', fontWeight:'700', letterSpacing:'0.1em', textTransform:'uppercase', color:c.fgSubtle, fontFamily:'"Geist Mono",monospace' };

  return React.createElement('div', null,
    label && React.createElement('label', { style: labelStyle }, label),
    React.createElement('div', {
      onClick:()=>inputRef.current?.click(),
      onDragOver:e=>{e.preventDefault();setDragging(true)},
      onDragLeave:()=>setDragging(false),
      onDrop,
      style:{ padding:'32px 16px', border:`2px dashed ${dragging?c.primary:c.border}`, background:dragging?c.bgStrong:c.bgSubtle, cursor:'pointer', textAlign:'center', display:'flex', flexDirection:'column', alignItems:'center', gap:'8px' },
    },
      React.createElement('span', { style:{ fontSize:'24px' } }, '▦'),
      React.createElement('span', { style:{ fontFamily:'"Geist Mono",monospace', fontSize: '13px', fontWeight:'700', color:c.fg, letterSpacing:'0.05em' } }, dragging ? 'DROP FILES HERE' : 'DRAG & DROP OR CLICK'),
      React.createElement('span', { style:{ fontFamily:'"Geist Mono",monospace', fontSize: '12px', color:c.fgMuted } }, accept === '*' ? 'All files accepted' : accept),
      files.length > 0 && React.createElement('div', { style:{ marginTop:'8px', display:'flex', flexDirection:'column', gap:'4px', width:'100%' } },
        files.map((f,i) => React.createElement('div', { key:i, style:{ display:'flex', justifyContent:'space-between', padding:'4px 8px', background:c.bg, border:`1px solid ${c.border}`, fontFamily:'"Geist Mono",monospace', fontSize: '12px', color:c.fg } },
          React.createElement('span', null, f.name),
          React.createElement('span', { style:{ color:c.fgMuted } }, `${(f.size/1024).toFixed(1)}kb`),
        ))
      ),
    ),
    React.createElement('input', { ref:inputRef, type:'file', accept, multiple, style:{ display:'none' }, onChange:e=>handleFiles(e.target.files) }),
  );
}

// ─── PIXEL COMBOBOX ───────────────────────────────────────
function PixelCombobox({ options=[], value='', onChange, label, placeholder='Search...' }) {
  const { c } = useTheme();
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState(value);
  const filtered = options.filter(o => (o.label||o).toLowerCase().includes(query.toLowerCase()));
  const labelStyle = { display:'block', marginBottom:'4px', fontSize: '12px', fontWeight:'700', letterSpacing:'0.1em', textTransform:'uppercase', color:c.fgSubtle, fontFamily:'"Geist Mono",monospace' };
  const select = (opt) => { const v = opt.value||opt; setQuery(opt.label||opt); onChange?.(v); setOpen(false); };
  return React.createElement('div', { style:{ position:'relative' } },
    label && React.createElement('label', { style: labelStyle }, label),
    React.createElement('input', { value:query, placeholder, onChange:e=>{setQuery(e.target.value);setOpen(true);onChange?.(e.target.value);}, onFocus:()=>setOpen(true), onBlur:()=>setTimeout(()=>setOpen(false),150),
      style:{ width:'100%', padding:'8px 12px', background:c.bg, border:`2px solid ${open?c.borderFocus:c.border}`, color:c.fg, fontFamily:'"Geist Mono",monospace', fontSize:'12px', outline:'none', boxShadow:'inset 2px 2px 0 rgba(0,0,0,0.1)' } }),
    open && filtered.length > 0 && React.createElement('div', { style:{ position:'absolute', top:'100%', left:0, right:0, background:c.bg, border:`2px solid ${c.border}`, borderTop:'none', zIndex:200, maxHeight:'160px', overflowY:'auto', boxShadow:`3px 3px 0 ${c.border}` } },
      filtered.map((opt,i) => React.createElement('div', { key:i, onMouseDown:()=>select(opt),
        style:{ padding:'8px 12px', fontFamily:'"Geist Mono",monospace', fontSize: '13px', color:c.fg, cursor:'pointer', borderBottom:`1px solid ${c.borderSubtle}` },
        onMouseEnter:e=>e.target.style.background=c.bgSubtle,
        onMouseLeave:e=>e.target.style.background='transparent',
      }, opt.label||opt))
    ),
  );
}

// ─── PIXEL TAG INPUT ──────────────────────────────────────
function PixelTagInput({ tags=[], onAdd, onRemove, label, placeholder='Add tag + Enter' }) {
  const { c } = useTheme();
  const [input, setInput] = React.useState('');
  const [focused, setFocused] = React.useState(false);
  const onKey = (e) => { if ((e.key==='Enter'||e.key===',') && input.trim()) { onAdd?.(input.trim()); setInput(''); e.preventDefault(); } else if (e.key==='Backspace'&&!input&&tags.length) onRemove?.(tags[tags.length-1]); };
  const labelStyle = { display:'block', marginBottom:'4px', fontSize: '12px', fontWeight:'700', letterSpacing:'0.1em', textTransform:'uppercase', color:c.fgSubtle, fontFamily:'"Geist Mono",monospace' };
  return React.createElement('div', null,
    label && React.createElement('label', { style: labelStyle }, label),
    React.createElement('div', { style:{ display:'flex', flexWrap:'wrap', gap:'4px', padding:'6px 8px', background:c.bg, border:`2px solid ${focused?c.borderFocus:c.border}`, minHeight:'40px', alignItems:'center', boxShadow:'inset 2px 2px 0 rgba(0,0,0,0.1)' } },
      tags.map((tag,i) => React.createElement('span', { key:i, style:{ display:'inline-flex', alignItems:'center', gap:'4px', padding:'2px 6px', background:c.primary, color:c.primaryFg, fontFamily:'"Geist Mono",monospace', fontSize: '12px', fontWeight:'700', border:`1px solid ${c.border}` } },
        tag,
        React.createElement('button', { onClick:()=>onRemove?.(tag), style:{ background:'none', border:'none', color:c.primaryFg, cursor:'pointer', padding:0, lineHeight:1, fontSize: '12px' } }, '×'),
      )),
      React.createElement('input', { value:input, onChange:e=>setInput(e.target.value), onKeyDown:onKey, placeholder:tags.length===0?placeholder:'', onFocus:()=>setFocused(true), onBlur:()=>setFocused(false),
        style:{ flex:1, minWidth:'80px', background:'none', border:'none', outline:'none', fontFamily:'"Geist Mono",monospace', fontSize: '13px', color:c.fg } }),
    ),
  );
}

// ─── PIXEL MULTI SELECT ───────────────────────────────────
function PixelMultiSelect({ options=[], selected=[], onChange, label, placeholder='Select options...' }) {
  const { c } = useTheme();
  const [open, setOpen] = React.useState(false);
  const toggle = (val) => { const next = selected.includes(val) ? selected.filter(s=>s!==val) : [...selected, val]; onChange?.(next); };
  const labelStyle = { display:'block', marginBottom:'4px', fontSize: '12px', fontWeight:'700', letterSpacing:'0.1em', textTransform:'uppercase', color:c.fgSubtle, fontFamily:'"Geist Mono",monospace' };
  return React.createElement('div', { style:{ position:'relative' } },
    label && React.createElement('label', { style: labelStyle }, label),
    React.createElement('div', { onClick:()=>setOpen(o=>!o), style:{ display:'flex', alignItems:'center', flexWrap:'wrap', gap:'4px', padding:'6px 10px', paddingRight:'28px', background:c.bg, border:`2px solid ${open?c.borderFocus:c.border}`, cursor:'pointer', minHeight:'40px', position:'relative', boxShadow:'inset 2px 2px 0 rgba(0,0,0,0.1)' } },
      selected.length===0
        ? React.createElement('span', { style:{ color:c.fgMuted, fontFamily:'"Geist Mono",monospace', fontSize:'12px' } }, placeholder)
        : selected.map(v=>React.createElement('span',{key:v,style:{padding:'1px 6px',background:c.primary,color:c.primaryFg,fontFamily:'"Geist Mono",monospace',fontSize: '12px',fontWeight:'700',border:`1px solid ${c.border}`}},v)),
      React.createElement('span', { style:{ position:'absolute', right:'10px', color:c.fgMuted, fontSize: '12px', fontFamily:'monospace' } }, open?'▲':'▼'),
    ),
    open && React.createElement('div', { style:{ position:'absolute', top:'100%', left:0, right:0, background:c.bg, border:`2px solid ${c.border}`, borderTop:'none', zIndex:200, maxHeight:'200px', overflowY:'auto', boxShadow:`3px 3px 0 ${c.border}` } },
      options.map((opt,i) => {
        const val = opt.value||opt, lbl = opt.label||opt, checked = selected.includes(val);
        return React.createElement('div', { key:i, onClick:()=>toggle(val),
          style:{ display:'flex', alignItems:'center', gap:'8px', padding:'8px 12px', cursor:'pointer', background:checked?c.bgSubtle:'transparent', borderBottom:`1px solid ${c.borderSubtle}` } },
          React.createElement('div', { style:{ width:'14px', height:'14px', border:`2px solid ${c.border}`, background:checked?c.primary:'transparent', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 } },
            checked && React.createElement('span', { style:{ color:c.primaryFg, fontSize: '12px' } }, '✓'),
          ),
          React.createElement('span', { style:{ fontFamily:'"Geist Mono",monospace', fontSize: '13px', color:c.fg } }, lbl),
        );
      })
    ),
  );
}

// ─── PIXEL BREADCRUMB ─────────────────────────────────────
function PixelBreadcrumb({ items=[] }) {
  const { c } = useTheme();
  return React.createElement('nav', { style:{ display:'flex', alignItems:'center', flexWrap:'wrap', gap:'0' } },
    items.map((item, i) => React.createElement(React.Fragment, { key:i },
      i > 0 && React.createElement('span', { style:{ padding:'0 6px', color:c.fgMuted, fontFamily:'"Geist Mono",monospace', fontSize: '13px' } }, '▸'),
      React.createElement(item.href ? 'a' : 'span', {
        href: item.href, onClick: item.onClick,
        style:{ fontFamily:'"Geist Mono",monospace', fontSize: '13px', color: i===items.length-1 ? c.fg : c.primary, fontWeight: i===items.length-1 ? '700' : '400', textDecoration:'none', letterSpacing:'0.02em', cursor: item.href||item.onClick?'pointer':'default', padding:'4px 2px' },
      }, item.label),
    ))
  );
}

// ─── PIXEL PAGINATION ─────────────────────────────────────
function PixelPagination({ page=1, total=10, onChange, siblings=1 }) {
  const { c } = useTheme();
  const pages = [];
  const delta = siblings;
  for (let i=Math.max(2,page-delta); i<=Math.min(total-1,page+delta); i++) pages.push(i);
  const showLeftDots = page-delta > 2;
  const showRightDots = page+delta < total-1;

  const btnStyle = (active, disabled) => ({
    width:'32px', height:'32px', display:'flex', alignItems:'center', justifyContent:'center',
    fontFamily:'"Geist Mono",monospace', fontSize: '13px', fontWeight: active?'700':'400',
    color: active ? c.primaryFg : disabled ? c.fgMuted : c.fg,
    background: active ? c.primary : 'transparent',
    border: `2px solid ${active ? c.border : c.borderSubtle}`,
    boxShadow: active ? `2px 2px 0 ${c.border}` : 'none',
    cursor: disabled ? 'not-allowed' : 'pointer', outline:'none',
  });

  return React.createElement('div', { style:{ display:'flex', gap:'4px', alignItems:'center', flexWrap:'wrap' } },
    React.createElement('button', { onClick:()=>page>1&&onChange?.(page-1), disabled:page===1, style:btnStyle(false,page===1) }, '◀'),
    React.createElement('button', { onClick:()=>onChange?.(1), style:btnStyle(page===1,false) }, '1'),
    showLeftDots && React.createElement('span', { style:{ color:c.fgMuted, fontFamily:'"Geist Mono",monospace', fontSize: '13px', padding:'0 4px' } }, '...'),
    pages.map(p => React.createElement('button', { key:p, onClick:()=>onChange?.(p), style:btnStyle(p===page,false) }, p)),
    showRightDots && React.createElement('span', { style:{ color:c.fgMuted, fontFamily:'"Geist Mono",monospace', fontSize: '13px', padding:'0 4px' } }, '...'),
    total > 1 && React.createElement('button', { onClick:()=>onChange?.(total), style:btnStyle(page===total,false) }, total),
    React.createElement('button', { onClick:()=>page<total&&onChange?.(page+1), disabled:page===total, style:btnStyle(false,page===total) }, '▶'),
  );
}

// ─── PIXEL STEPPER ────────────────────────────────────────
function PixelStepper({ steps=[], current=0 }) {
  const { c } = useTheme();
  return React.createElement('div', { style:{ display:'flex', alignItems:'center' } },
    steps.map((step, i) => React.createElement(React.Fragment, { key:i },
      // Connector line
      i > 0 && React.createElement('div', { style:{ flex:1, height:'2px', background: i<=current ? c.primary : c.borderSubtle, minWidth:'16px' } }),
      // Step node
      React.createElement('div', { style:{ display:'flex', flexDirection:'column', alignItems:'center', gap:'6px', flexShrink:0 } },
        React.createElement('div', { style:{ width:'32px', height:'32px', display:'flex', alignItems:'center', justifyContent:'center', background: i<current ? c.success : i===current ? c.primary : c.bgSubtle, border:`2px solid ${i<=current?c.border:c.borderSubtle}`, boxShadow: i===current?`2px 2px 0 ${c.border}`:'none', fontFamily:'"Geist Mono",monospace', fontSize: '13px', fontWeight:'700', color: i<=current ? '#F4EDD9' : c.fgMuted } },
          i < current ? '✓' : i+1
        ),
        React.createElement('span', { style:{ fontFamily:'"Geist Mono",monospace', fontSize: '12px', fontWeight: i===current?'700':'400', color: i===current?c.fg:c.fgMuted, whiteSpace:'nowrap', letterSpacing:'0.05em', textTransform:'uppercase' } }, step),
      ),
    ))
  );
}

// ─── PIXEL DROPDOWN MENU ──────────────────────────────────
function PixelDropdownMenu({ trigger, items=[] }) {
  const { c } = useTheme();
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef();
  React.useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);
  return React.createElement('div', { ref, style:{ position:'relative', display:'inline-block' } },
    React.createElement('div', { onClick:()=>setOpen(o=>!o) }, trigger),
    open && React.createElement('div', { style:{ position:'absolute', top:'calc(100% + 4px)', left:0, background:c.bg, border:`2px solid ${c.border}`, boxShadow:`4px 4px 0 ${c.border}`, zIndex:500, minWidth:'160px' } },
      items.map((item, i) => item === 'divider'
        ? React.createElement('div', { key:i, style:{ height:'1px', background:c.border, margin:'4px 0' } })
        : React.createElement('button', { key:i, onClick:()=>{ item.onClick?.(); setOpen(false); },
            style:{ display:'flex', alignItems:'center', gap:'8px', width:'100%', padding:'8px 12px', background:'none', border:'none', color: item.danger?c.error:c.fg, fontFamily:'"Geist Mono",monospace', fontSize: '13px', cursor:'pointer', textAlign:'left', letterSpacing:'0.02em', borderBottom:`1px solid ${c.borderSubtle}` },
            onMouseEnter:e=>e.currentTarget.style.background=c.bgSubtle,
            onMouseLeave:e=>e.currentTarget.style.background='none',
          },
          item.icon && React.createElement('span', null, item.icon),
          React.createElement('span', { style:{ flex:1 } }, item.label),
          item.shortcut && React.createElement('span', { style:{ color:c.fgMuted, fontSize: '12px' } }, item.shortcut),
        )
      )
    ),
  );
}

// ─── PIXEL CONTEXT MENU ───────────────────────────────────
function PixelContextMenu({ children, items=[] }) {
  const { c } = useTheme();
  const [pos, setPos] = React.useState(null);
  const ref = React.useRef();
  React.useEffect(() => {
    const close = () => setPos(null);
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);
  const onCtx = (e) => { e.preventDefault(); setPos({ x: e.clientX, y: e.clientY }); };
  return React.createElement('div', { onContextMenu: onCtx, ref, style:{ display:'contents' } },
    children,
    pos && React.createElement('div', { style:{ position:'fixed', top:pos.y, left:pos.x, background:c.bg, border:`2px solid ${c.border}`, boxShadow:`4px 4px 0 ${c.border}`, zIndex:9000, minWidth:'160px' } },
      items.map((item,i) => item === 'divider'
        ? React.createElement('div',{key:i,style:{height:'1px',background:c.border,margin:'4px 0'}})
        : React.createElement('button',{key:i,onClick:()=>{item.onClick?.();setPos(null);},
            style:{display:'flex',alignItems:'center',gap:'8px',width:'100%',padding:'8px 12px',background:'none',border:'none',color:item.danger?c.error:c.fg,fontFamily:'"Geist Mono",monospace',fontSize: '13px',cursor:'pointer',textAlign:'left',borderBottom:`1px solid ${c.borderSubtle}`},
            onMouseEnter:e=>e.currentTarget.style.background=c.bgSubtle,
            onMouseLeave:e=>e.currentTarget.style.background='none',
          }, item.icon&&React.createElement('span',null,item.icon), item.label)
      )
    ),
  );
}

// ─── PIXEL COMMAND PALETTE ────────────────────────────────
function PixelCommandPalette({ open, onClose, commands=[] }) {
  const { c } = useTheme();
  const [query, setQuery] = React.useState('');
  const [sel, setSel] = React.useState(0);
  const inputRef = React.useRef();

  React.useEffect(() => {
    if (open) { setQuery(''); setSel(0); setTimeout(()=>inputRef.current?.focus(), 50); }
  }, [open]);

  const filtered = query
    ? commands.filter(cmd => (cmd.label + ' ' + (cmd.description || '')).toLowerCase().includes(query.toLowerCase()))
    : commands;

  React.useEffect(() => {
    const h = (e) => {
      if (!open) return;
      if (e.key === 'ArrowDown') { e.preventDefault(); setSel(s => Math.min(s+1, filtered.length-1)); }
      if (e.key === 'ArrowUp')   { e.preventDefault(); setSel(s => Math.max(s-1, 0)); }
      if (e.key === 'Enter' && filtered[sel]) { filtered[sel].action?.(); onClose?.(); }
      if (e.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [open, filtered, sel]);

  if (!open) return null;

  const renderCmd = (cmd, i) => React.createElement('div', {
    key: i,
    onClick: () => { cmd.action?.(); onClose?.(); },
    onMouseEnter: () => setSel(i),
    style: {
      display:'flex', alignItems:'center', gap:'12px', padding:'10px 16px', cursor:'pointer',
      background: i===sel ? c.bgSubtle : 'transparent',
      borderBottom: `1px solid ${c.borderSubtle}`,
      borderLeft: i===sel ? `3px solid ${c.primary}` : '3px solid transparent',
    },
  },
    cmd.icon && React.createElement('span', { style:{ fontSize:'16px', flexShrink:0 } }, cmd.icon),
    React.createElement('div', { style:{ flex:1 } },
      React.createElement('div', { style:{ fontFamily:'"Geist Mono",monospace', fontSize:'12px', fontWeight:i===sel?'700':'400', color:c.fg } }, cmd.label),
      cmd.description && React.createElement('div', { style:{ fontFamily:'"Geist Mono",monospace', fontSize: '12px', color:c.fgMuted, marginTop:'2px' } }, cmd.description),
    ),
    cmd.shortcut && React.createElement('span', { style:{ fontFamily:'"Geist Mono",monospace', fontSize: '12px', color:c.fgMuted, padding:'2px 4px', border:`1px solid ${c.borderSubtle}`, flexShrink:0 } }, cmd.shortcut),
  );

  return React.createElement('div', {
    style:{ position:'fixed', inset:0, background:'rgba(22,12,4,0.7)', zIndex:9999, display:'flex', alignItems:'flex-start', justifyContent:'center', paddingTop:'80px' },
    onClick: e => e.target === e.currentTarget && onClose?.(),
  },
    React.createElement('div', { style:{ width:'100%', maxWidth:'520px', background:c.bg, border:`2px solid ${c.border}`, boxShadow:`6px 6px 0 ${c.border}`, overflow:'hidden' } },
      React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:'8px', padding:'12px 16px', borderBottom:`2px solid ${c.border}`, background:c.bgSubtle } },
        React.createElement('span', { style:{ fontSize:'14px', flexShrink:0 } }, '⌘'),
        React.createElement('input', { ref:inputRef, value:query, onChange:e=>{ setQuery(e.target.value); setSel(0); }, placeholder:'Type a command or search...', style:{ flex:1, background:'none', border:'none', outline:'none', fontFamily:'"Geist Mono",monospace', fontSize:'13px', color:c.fg } }),
        React.createElement('span', { style:{ fontSize: '12px', color:c.fgMuted, fontFamily:'"Geist Mono",monospace', padding:'2px 4px', border:`1px solid ${c.borderSubtle}` } }, 'ESC'),
      ),
      React.createElement('div', { style:{ maxHeight:'320px', overflowY:'auto' } },
        filtered.length === 0
          ? React.createElement('div', { style:{ padding:'24px', textAlign:'center', fontFamily:'"Geist Mono",monospace', fontSize: '13px', color:c.fgMuted } }, 'No commands found.')
          : filtered.map(renderCmd),
      ),
      React.createElement('div', { style:{ padding:'6px 16px', borderTop:`1px solid ${c.borderSubtle}`, background:c.bgSubtle, display:'flex', gap:'16px' } },
        [['↑↓','Navigate'],['↵','Select'],['ESC','Close']].map(([k,l]) =>
          React.createElement('span', { key:k, style:{ fontFamily:'"Geist Mono",monospace', fontSize: '12px', color:c.fgMuted } }, `${k} ${l}`)
        ),
      ),
    ),
  );
}

// ─── PIXEL TOOLTIP ────────────────────────────────────────
function PixelTooltip({ children, content, position='top' }) {
  const tipId = (React.useId ? React.useId() : 'px-tip-' + Math.random().toString(36).slice(2,8));
  const { c } = useTheme();
  const [show, setShow] = React.useState(false);
  const posStyles = {
    top:    { bottom:'calc(100% + 8px)', left:'50%', transform:'translateX(-50%)' },
    bottom: { top:'calc(100% + 8px)',    left:'50%', transform:'translateX(-50%)' },
    left:   { right:'calc(100% + 8px)', top:'50%',  transform:'translateY(-50%)' },
    right:  { left:'calc(100% + 8px)',  top:'50%',  transform:'translateY(-50%)' },
  };
  return React.createElement('div', { style:{ position:'relative', display:'inline-block' }, onMouseEnter:()=>setShow(true), onMouseLeave:()=>setShow(false) },
    children,
    show && React.createElement('div', { style:{ position:'absolute', ...posStyles[position], background:c.bgInverse, color:c.fgInverse, padding:'6px 10px', fontFamily:'"Geist Mono",monospace', fontSize: '12px', fontWeight:'700', border:`2px solid ${c.border}`, boxShadow:`2px 2px 0 ${c.border}`, whiteSpace:'nowrap', zIndex:1000, pointerEvents:'none', letterSpacing:'0.02em' } }, content),
  );
}

// ─── PIXEL POPOVER ────────────────────────────────────────
function PixelPopover({ trigger, content, position='bottom' }) {
  const { c } = useTheme();
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef();
  React.useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);
  const posStyles = {
    bottom: { top:'calc(100% + 8px)', left:0 },
    top:    { bottom:'calc(100% + 8px)', left:0 },
    right:  { left:'calc(100% + 8px)', top:0 },
    left:   { right:'calc(100% + 8px)', top:0 },
  };
  return React.createElement('div', { ref, style:{ position:'relative', display:'inline-block' } },
    React.createElement('div', { onClick:()=>setOpen(o=>!o) }, trigger),
    open && React.createElement('div', { style:{ position:'absolute', ...posStyles[position], background:c.bg, border:`2px solid ${c.border}`, boxShadow:`4px 4px 0 ${c.border}`, zIndex:500, minWidth:'200px' } }, content),
  );
}

// ─── PIXEL DRAWER ─────────────────────────────────────────
function PixelDrawer({ open, onClose, side='right', children, title, width='320px' }) {
  const { c } = useTheme();
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose?.(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  if (!open) return null;
  const sideStyles = {
    right:  { top:0, right:0, bottom:0, width, borderLeft:`2px solid ${c.border}` },
    left:   { top:0, left:0,  bottom:0, width, borderRight:`2px solid ${c.border}` },
    bottom: { left:0, right:0, bottom:0, height:'50vh', borderTop:`2px solid ${c.border}` },
    top:    { left:0, right:0, top:0,    height:'50vh', borderBottom:`2px solid ${c.border}` },
  };
  return React.createElement('div', null,
    React.createElement('div', { onClick:onClose, style:{ position:'fixed', inset:0, background:'rgba(22,12,4,0.5)', zIndex:800 } }),
    React.createElement('div', { style:{ position:'fixed', ...sideStyles[side], background:c.bg, zIndex:801, display:'flex', flexDirection:'column', boxShadow:side==='right'?`-4px 0 0 ${c.border}`:side==='left'?`4px 0 0 ${c.border}`:`0 -4px 0 ${c.border}` } },
      React.createElement('div', { style:{ padding:'12px 16px', borderBottom:`2px solid ${c.border}`, background:c.bgSubtle, display:'flex', alignItems:'center', justifyContent:'space-between', flexShrink:0 } },
        React.createElement('span', { style:{ fontFamily:'"Geist Mono",monospace', fontSize:'12px', fontWeight:'700', letterSpacing:'0.05em', textTransform:'uppercase', color:c.fg } }, title),
        React.createElement('button', { onClick:onClose, style:{ background:'none', border:'none', color:c.fg, cursor:'pointer', fontSize:'14px' } }, '✕'),
      ),
      React.createElement('div', { style:{ flex:1, overflowY:'auto', padding:'16px' } }, children),
    ),
  );
}

// ─── EXPORT ───────────────────────────────────────────────
Object.assign(window, {
  PixelSlider, PixelNumberInput, PixelDatePicker, PixelColorPicker,
  PixelOTPInput, PixelFileUpload, PixelCombobox, PixelTagInput, PixelMultiSelect,
  PixelBreadcrumb, PixelPagination, PixelStepper,
  PixelDropdownMenu, PixelContextMenu, PixelCommandPalette,
  PixelTooltip, PixelPopover, PixelDrawer,
});
