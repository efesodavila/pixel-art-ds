// Advanced Forms + Navigation + Overlay — Showcase page
// Requires: PixelUI.jsx + PixelUI2.jsx

function AdvancedFormsPage() {
  const { c } = useTheme();
  const [slider, setSlider] = React.useState(65);
  const [num, setNum] = React.useState(8);
  const [date, setDate] = React.useState('');
  const [color, setColor] = React.useState('#D43840');
  const [otp, setOtp] = React.useState('');
  const [tags, setTags] = React.useState(['pixel','art','RPG']);
  const [multi, setMulti] = React.useState(['Warrior','Mage']);
  const [combo, setCombo] = React.useState('');

  const classOptions = ['Warrior','Mage','Rogue','Healer','Ranger','Paladin','Necromancer','Bard'];

  return React.createElement('div', null,

    React.createElement(Section, { id:'slider', title:'Slider', description:'Range input with pixel-art track and thumb. Supports color variants.' },
      React.createElement(SubSection, { title:'Variants' },
        React.createElement(PreviewBox, { style:{ flexDirection:'column', gap:'20px', maxWidth:'480px' } },
          React.createElement(PixelSlider, { label:'EXPERIENCE', value:slider, onChange:setSlider, showValue:true }),
          React.createElement(PixelSlider, { label:'HEALTH', value:42, onChange:()=>{}, variant:'success', showValue:true }),
          React.createElement(PixelSlider, { label:'STAMINA', value:78, onChange:()=>{}, variant:'warning', showValue:true }),
          React.createElement(PixelSlider, { label:'MANA', value:20, onChange:()=>{}, variant:'error', showValue:true }),
        ),
        React.createElement(PixelCode, { lang:'jsx', code:`<PixelSlider label="XP" value={xp} onChange={setXp} showValue />
<PixelSlider label="HP" value={hp} variant="success" />` })
      ),
    ),

    React.createElement(Section, { id:'number-input', title:'Number Input', description:'Numeric stepper with pixel +/− buttons.' },
      React.createElement(SubSection, { title:'Examples' },
        React.createElement(PreviewBox, { style:{ gap:'24px', flexWrap:'wrap' } },
          React.createElement(PixelNumberInput, { label:'LEVEL', value:num, onChange:setNum, min:1, max:99 }),
          React.createElement(PixelNumberInput, { label:'QUANTITY', value:3, onChange:()=>{}, min:0, step:1 }),
          React.createElement(PixelNumberInput, { label:'DISABLED', value:10, onChange:()=>{}, disabled:true }),
        ),
        React.createElement(PixelCode, { lang:'jsx', code:`<PixelNumberInput label="LEVEL" value={level} onChange={setLevel} min={1} max={99} />` })
      ),
    ),

    React.createElement(Section, { id:'date-picker', title:'Date Picker', description:'Pixel-art calendar with month-by-month navigation.' },
      React.createElement(SubSection, { title:'Calendar' },
        React.createElement(PreviewBox, { style:{ gap:'24px', flexWrap:'wrap' } },
          React.createElement(PixelDatePicker, { label:'QUEST DATE', value:date, onChange:setDate }),
        ),
        React.createElement(PixelCode, { lang:'jsx', code:`<PixelDatePicker label="DATE" value={date} onChange={setDate} />` })
      ),
    ),

    React.createElement(Section, { id:'color-picker', title:'Color Picker', description:'Game-style color palette with swatches + hex input.' },
      React.createElement(SubSection, { title:'Palette' },
        React.createElement(PreviewBox, null,
          React.createElement(PixelColorPicker, { label:'CHARACTER COLOR', value:color, onChange:setColor }),
          React.createElement('div', { style:{ display:'flex', flexDirection:'column', gap:'8px', justifyContent:'center' } },
            React.createElement('div', { style:{ fontFamily:'"Geist Mono",monospace', fontSize: '13px', color:c.fg } }, 'Selected:'),
            React.createElement('div', { style:{ width:'64px', height:'64px', background:color, border:`2px solid ${c.border}`, boxShadow:`3px 3px 0 ${c.border}` } }),
            React.createElement('div', { style:{ fontFamily:'"Geist Mono",monospace', fontSize: '13px', fontWeight:'700', color:c.fg } }, color.toUpperCase()),
          )
        ),
        React.createElement(PixelCode, { lang:'jsx', code:`<PixelColorPicker value={color} onChange={setColor} />
// Custom palette:
<PixelColorPicker palette={['#FF0000','#00FF00','#0000FF']} />` })
      ),
    ),

    React.createElement(Section, { id:'otp', title:'OTP / PIN Input', description:'Individual fields for verification codes. Supports paste, backspace, and keyboard navigation.' },
      React.createElement(SubSection, { title:'6 digits' },
        React.createElement(PreviewBox, { style:{ flexDirection:'column', gap:'16px' } },
          React.createElement(PixelOTPInput, { label:'VERIFICATION CODE', length:6, value:otp, onChange:setOtp }),
          React.createElement(PixelOTPInput, { label:'ERROR STATE', length:6, value:'123', onChange:()=>{}, error:'Invalid code. Try again.' }),
          React.createElement(PixelOTPInput, { label:'4-DIGIT PIN', length:4, value:otp.slice(0,4), onChange:v=>setOtp(v) }),
        ),
        React.createElement(PixelCode, { lang:'jsx', code:`<PixelOTPInput length={6} value={otp} onChange={setOtp} label="CODE" />` })
      ),
    ),

    React.createElement(Section, { id:'file-upload', title:'File Upload', description:'Pixel-art drag & drop zone with selected file list.' },
      React.createElement(SubSection, { title:'Drag & Drop' },
        React.createElement(PreviewBox, { style:{ flexDirection:'column', maxWidth:'480px' } },
          React.createElement(PixelFileUpload, { label:'UPLOAD SPRITE SHEET', accept:'image/*', onFile:(files)=>console.log(files) }),
        ),
        React.createElement(PixelCode, { lang:'jsx', code:`<PixelFileUpload label="UPLOAD" accept="image/*" multiple onFile={files => console.log(files)} />` })
      ),
    ),

    React.createElement(Section, { id:'combobox', title:'Combobox', description:'Input with query-filtered autocomplete.' },
      React.createElement(SubSection, { title:'Autocomplete' },
        React.createElement(PreviewBox, { style:{ flexDirection:'column', maxWidth:'360px' } },
          React.createElement(PixelCombobox, { label:'CHARACTER CLASS', options:classOptions, value:combo, onChange:setCombo, placeholder:'Search class...' }),
        ),
        React.createElement(PixelCode, { lang:'jsx', code:`<PixelCombobox
  label="CLASS"
  options={['Warrior','Mage','Rogue']}
  value={val} onChange={setVal}
/>` })
      ),
    ),

    React.createElement(Section, { id:'tag-input', title:'Tag Input', description:'Creates tags on Enter or comma. Backspace removes the last tag.' },
      React.createElement(SubSection, { title:'Tags' },
        React.createElement(PreviewBox, { style:{ flexDirection:'column', maxWidth:'480px' } },
          React.createElement(PixelTagInput, { label:'SKILLS', tags, onAdd:t=>setTags(ts=>[...ts,t]), onRemove:t=>setTags(ts=>ts.filter(x=>x!==t)) }),
        ),
        React.createElement(PixelCode, { lang:'jsx', code:`<PixelTagInput
  label="TAGS" tags={tags}
  onAdd={tag => setTags(t => [...t, tag])}
  onRemove={tag => setTags(t => t.filter(x => x !== tag))}
/>` })
      ),
    ),

    React.createElement(Section, { id:'multi-select', title:'Multi Select', description:'Dropdown with checkboxes for multi-selection.' },
      React.createElement(SubSection, { title:'Multiple' },
        React.createElement(PreviewBox, { style:{ flexDirection:'column', maxWidth:'360px' } },
          React.createElement(PixelMultiSelect, { label:'PARTY MEMBERS', options:classOptions, selected:multi, onChange:setMulti }),
        ),
        React.createElement(PixelCode, { lang:'jsx', code:`<PixelMultiSelect
  label="SELECT"
  options={['A','B','C']}
  selected={selected}
  onChange={setSelected}
/>` })
      ),
    ),
  );
}

function NavigationOverlayPage() {
  const { c } = useTheme();
  const [page, setPage] = React.useState(3);
  const [step, setStep] = React.useState(1);
  const [cmdOpen, setCmdOpen] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const commands = [
    { icon:'🎨', label:'Open Color Picker', description:'Change theme accent color', shortcut:'⌘K C', action:()=>{} },
    { icon:'🌙', label:'Toggle Dark Mode', description:'Switch between light and dark', shortcut:'⌘K D', action:()=>{} },
    { icon:'📦', label:'Export Tokens', description:'Download design tokens as CSS/JS/JSON', shortcut:'⌘K E', action:()=>{} },
    { icon:'📐', label:'Go to Spacing', description:'View spacing scale documentation', action:()=>{} },
    { icon:'🎮', label:'Pixel Game Components', description:'View RPG-exclusive components', action:()=>{} },
    { icon:'⚙', label:'Open Settings', description:'Configure DS preferences', shortcut:'⌘,', action:()=>{} },
  ];

  return React.createElement('div', null,

    React.createElement(Section, { id:'breadcrumb', title:'Breadcrumb', description:'Hierarchical navigation trail with pixel ▸ separators.' },
      React.createElement(SubSection, { title:'Examples' },
        React.createElement(PreviewBox, { style:{ flexDirection:'column', gap:'12px' } },
          React.createElement(PixelBreadcrumb, { items:[{label:'Home'},{label:'Foundation'},{label:'Colors'}] }),
          React.createElement(PixelBreadcrumb, { items:[{label:'DS'},{label:'Components'},{label:'Forms'},{label:'Input'}] }),
        ),
        React.createElement(PixelCode, { lang:'jsx', code:`<PixelBreadcrumb items={[
  { label: 'Home', href: '/' },
  { label: 'Components' },
  { label: 'Buttons' },
]} />` })
      ),
    ),

    React.createElement(Section, { id:'pagination', title:'Pagination', description:'RPG-style pagination with ◀ ▶ and automatic ellipses.' },
      React.createElement(SubSection, { title:'Interactive' },
        React.createElement(PreviewBox, { style:{ flexDirection:'column', gap:'12px', alignItems:'flex-start' } },
          React.createElement(PixelPagination, { page, total:10, onChange:setPage }),
          React.createElement('span', { style:{ fontFamily:'"Geist Mono",monospace', fontSize: '12px', color:c.fgMuted } }, `Page ${page} of 10`),
        ),
        React.createElement(PixelCode, { lang:'jsx', code:`<PixelPagination page={page} total={20} onChange={setPage} />` })
      ),
    ),

    React.createElement(Section, { id:'stepper', title:'Stepper / Wizard', description:'Multi-step progress indicator. Complete steps in sequence.' },
      React.createElement(SubSection, { title:'Wizard' },
        React.createElement(PreviewBox, { style:{ flexDirection:'column', gap:'24px' } },
          React.createElement(PixelStepper, { steps:['ACCOUNT','PROFILE','CLASS','REVIEW'], current:step }),
          React.createElement('div', { style:{ display:'flex', gap:'8px' } },
            React.createElement(PixelButton, { size:'sm', variant:'outline', disabled:step===0, onClick:()=>setStep(s=>Math.max(0,s-1)) }, '◀ BACK'),
            React.createElement(PixelButton, { size:'sm', disabled:step===3, onClick:()=>setStep(s=>Math.min(3,s+1)) }, 'NEXT ▶'),
          ),
        ),
        React.createElement(PixelCode, { lang:'jsx', code:`<PixelStepper steps={['ACCOUNT','PROFILE','CLASS','REVIEW']} current={step} />` })
      ),
    ),

    React.createElement(Section, { id:'dropdown-menu', title:'Dropdown Menu', description:'Anchored floating menu with icons, shortcuts, and separators.' },
      React.createElement(SubSection, { title:'Menu' },
        React.createElement(PreviewBox, null,
          React.createElement(PixelDropdownMenu, {
            trigger: React.createElement(PixelButton, { iconRight: React.createElement('span',null,'▼') }, 'ACTIONS'),
            items:[
              { label:'Edit', icon:'✏', shortcut:'⌘E', onClick:()=>{} },
              { label:'Duplicate', icon:'⧉', onClick:()=>{} },
              'divider',
              { label:'Export', icon:'↓', shortcut:'⌘S', onClick:()=>{} },
              'divider',
              { label:'Delete', icon:'✕', danger:true, onClick:()=>{} },
            ]
          }),
          React.createElement(PixelDropdownMenu, {
            trigger: React.createElement(PixelButton, { variant:'outline' }, '⋮ MORE'),
            items:[{label:'View',icon:'👁',onClick:()=>{}},{label:'Share',icon:'↗',onClick:()=>{}},'divider',{label:'Report',danger:true,onClick:()=>{}}]
          }),
        ),
        React.createElement(PixelCode, { lang:'jsx', code:`<PixelDropdownMenu
  trigger={<PixelButton>ACTIONS ▼</PixelButton>}
  items={[
    { label: 'Edit',   icon: '✏', onClick: () => {} },
    { label: 'Delete', icon: '✕', danger: true, onClick: () => {} },
  ]}
/>` })
      ),
    ),

    React.createElement(Section, { id:'context-menu', title:'Context Menu', description:'Right-click to open the context menu.' },
      React.createElement(SubSection, { title:'Right-click zone' },
        React.createElement(PreviewBox, null,
          React.createElement(PixelContextMenu, {
            items:[{label:'Copy',icon:'⧉',onClick:()=>{}},{label:'Paste',icon:'⊡',onClick:()=>{}},'divider',{label:'Delete',icon:'✕',danger:true,onClick:()=>{}}]
          },
            React.createElement('div', { style:{ padding:'32px 24px', border:`2px dashed ${c.border}`, background:c.bgSubtle, fontFamily:'"Geist Mono",monospace', fontSize: '13px', color:c.fgMuted, cursor:'context-menu', userSelect:'none', textAlign:'center' } }, '[ RIGHT-CLICK HERE ]')
          )
        ),
      ),
    ),

    React.createElement(Section, { id:'command-palette', title:'Command Palette', description:'Command palette in ⌘K style. Navigate with ↑↓, confirm with Enter, close with Esc.' },
      React.createElement(SubSection, { title:'⌘K Palette' },
        React.createElement(PreviewBox, null,
          React.createElement(PixelButton, { onClick:()=>setCmdOpen(true), icon:React.createElement('span',null,'⌘') }, 'OPEN COMMAND PALETTE'),
        ),
        React.createElement(PixelCommandPalette, { open:cmdOpen, onClose:()=>setCmdOpen(false), commands }),
        React.createElement(PixelCode, { lang:'jsx', code:`const [open, setOpen] = useState(false);

// Keyboard shortcut
useEffect(() => {
  const h = (e) => { if ((e.metaKey||e.ctrlKey) && e.key==='k') setOpen(true); };
  window.addEventListener('keydown', h);
  return () => window.removeEventListener('keydown', h);
}, []);

<PixelCommandPalette
  open={open}
  onClose={() => setOpen(false)}
  commands={[
    { icon:'🎨', label:'Change Theme', shortcut:'⌘K T', action: () => {} },
  ]}
/>` })
      ),
    ),

    React.createElement(Section, { id:'tooltip', title:'Tooltip', description:'Floating tooltip in 4 positions. Appears on hover.' },
      React.createElement(SubSection, { title:'Positions' },
        React.createElement(PreviewBox, { style:{ gap:'24px', alignItems:'center', justifyContent:'center', flexWrap:'wrap', minHeight:'100px' } },
          ['top','bottom','left','right'].map(pos =>
            React.createElement(PixelTooltip, { key:pos, content:`Tooltip ${pos}`, position:pos },
              React.createElement(PixelButton, { variant:'outline', size:'sm' }, pos.toUpperCase())
            )
          )
        ),
        React.createElement(PixelCode, { lang:'jsx', code:`<PixelTooltip content="Tooltip text" position="top">
  <PixelButton>Hover me</PixelButton>
</PixelTooltip>` })
      ),
    ),

    React.createElement(Section, { id:'popover', title:'Popover', description:'Rich-content popover anchored to a trigger. Closes on outside click.' },
      React.createElement(SubSection, { title:'Rich content' },
        React.createElement(PreviewBox, null,
          React.createElement(PixelPopover, {
            trigger: React.createElement(PixelButton, { variant:'outline' }, '▸ INFO POPOVER'),
            content: React.createElement('div', { style:{ padding:'14px', maxWidth:'240px' } },
              React.createElement('div', { style:{ fontFamily:'"Geist Mono",monospace', fontSize: '13px', fontWeight:'700', color:c.fg, marginBottom:'8px' } }, 'CHARACTER INFO'),
              React.createElement('div', { style:{ fontFamily:'"Geist Mono",monospace', fontSize: '13px', color:c.fgSubtle, lineHeight:1.6 } }, 'Level 42 Pixel Mage with 850 HP and a 90% magic attack stat.'),
              React.createElement('div', { style:{ marginTop:'12px' } }, React.createElement(PixelButton, { size:'sm', fullWidth:true }, 'VIEW PROFILE')),
            ),
          })
        ),
        React.createElement(PixelCode, { lang:'jsx', code:`<PixelPopover
  trigger={<PixelButton>Open</PixelButton>}
  content={<div style={{padding:14}}>Rich content here</div>}
  position="bottom"
/>` })
      ),
    ),

    React.createElement(Section, { id:'drawer', title:'Drawer', description:'Sliding side panel. Available on all 4 sides.' },
      React.createElement(SubSection, { title:'Side Drawer' },
        React.createElement(PreviewBox, null,
          React.createElement(PixelButton, { onClick:()=>setDrawerOpen(true) }, '▸ OPEN RIGHT DRAWER'),
        ),
        React.createElement(PixelDrawer, { open:drawerOpen, onClose:()=>setDrawerOpen(false), title:'⚔ EQUIPMENT', side:'right', width:'300px' },
          React.createElement('div', { style:{ display:'flex', flexDirection:'column', gap:'12px' } },
            React.createElement(PixelAlert, { variant:'info', title:'EQUIPPED' }, 'Currently wearing the Pixel Knight armor set.'),
            ...[{n:'Sword of Bits',t:'Weapon',s:'★★★★☆'},{n:'Pixel Shield',t:'Armor',s:'★★★☆☆'},{n:'Mana Ring',t:'Accessory',s:'★★★★★'}].map(item =>
              React.createElement(PixelCard, { key:item.n, title:item.n, subtitle:item.t },
                React.createElement('div', { style:{ fontFamily:'"Geist Mono",monospace', fontSize: '13px', color:c.fgSubtle } }, item.s)
              )
            ),
          )
        ),
        React.createElement(PixelCode, { lang:'jsx', code:`<PixelDrawer open={open} onClose={() => setOpen(false)} title="PANEL" side="right" width="320px">
  <p>Drawer content here</p>
</PixelDrawer>` })
      ),
    ),
  );
}

Object.assign(window, { AdvancedFormsPage, NavigationOverlayPage });
