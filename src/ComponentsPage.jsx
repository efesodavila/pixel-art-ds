// Components Page — Buttons, Forms, Cards, Badges, Navigation
// Requires: window components from PixelUI.jsx

function ButtonsPage() {
  const { c } = useTheme();
  const [loading, setLoading] = React.useState(false);
  const triggerLoad = () => { setLoading(true); setTimeout(() => setLoading(false), 2000); };

  return React.createElement('div', null,
    React.createElement(Section, { id:'buttons', title:'Buttons', description:'Pixel art buttons use hard box-shadows for a raised 3D effect. Press state translates by the shadow offset.' },

      React.createElement(SubSection, { title:'Variants' },
        React.createElement(PreviewBox, null,
          ['primary','secondary','accent','outline','ghost','danger','success'].map(v =>
            React.createElement(PixelButton, { key: v, variant: v }, v.toUpperCase())
          )
        ),
        React.createElement(PixelCode, { lang:'jsx', code:`<PixelButton variant="primary">PRIMARY</PixelButton>
<PixelButton variant="secondary">SECONDARY</PixelButton>
<PixelButton variant="accent">ACCENT</PixelButton>
<PixelButton variant="outline">OUTLINE</PixelButton>
<PixelButton variant="ghost">GHOST</PixelButton>
<PixelButton variant="danger">DANGER</PixelButton>` })
      ),

      React.createElement(SubSection, { title:'Sizes' },
        React.createElement(PreviewBox, { style:{ alignItems:'center' } },
          ['sm','md','lg','xl'].map(s =>
            React.createElement(PixelButton, { key: s, size: s }, s.toUpperCase())
          )
        ),
        React.createElement(PixelCode, { lang:'jsx', code:`<PixelButton size="sm">SM</PixelButton>
<PixelButton size="md">MD</PixelButton>
<PixelButton size="lg">LG</PixelButton>
<PixelButton size="xl">XL</PixelButton>` })
      ),

      React.createElement(SubSection, { title:'States' },
        React.createElement(PreviewBox, null,
          React.createElement(PixelButton, { variant:'primary' }, 'DEFAULT'),
          React.createElement(PixelButton, { variant:'primary', loading: true }, 'LOADING'),
          React.createElement(PixelButton, { variant:'primary', disabled: true }, 'DISABLED'),
          React.createElement(PixelButton, { variant:'primary', icon: React.createElement(PixelIcon,{name:'star',size:12}) }, 'WITH ICON'),
          React.createElement(PixelButton, { variant:'primary', iconRight: React.createElement(PixelIcon,{name:'arrow',size:12}) }, 'ICON RIGHT'),
          React.createElement(PixelButton, { variant:'primary', fullWidth: true, style:{marginTop:'8px'} }, 'FULL WIDTH'),
        ),
        React.createElement(PixelCode, { lang:'jsx', code:`<PixelButton loading>LOADING</PixelButton>
<PixelButton disabled>DISABLED</PixelButton>
<PixelButton icon={<PixelIcon name="star" />}>WITH ICON</PixelButton>
<PixelButton fullWidth>FULL WIDTH</PixelButton>` })
      ),
    ),
  );
}

function FormsPage() {
  const { c } = useTheme();
  const [text, setText] = React.useState('');
  const [pass, setPass] = React.useState('');
  const [select, setSelect] = React.useState('option1');
  const [check1, setCheck1] = React.useState(true);
  const [check2, setCheck2] = React.useState(false);
  const [radio, setRadio] = React.useState('a');
  const [sw1, setSw1] = React.useState(true);
  const [sw2, setSw2] = React.useState(false);
  const [textarea, setTextarea] = React.useState('');

  return React.createElement('div', null,
    React.createElement(Section, { id:'forms', title:'Forms', description:'Pixel inputs use an inset shadow to look sunken/recessed — the classic pixel art data entry look.' },

      React.createElement(SubSection, { title:'Text Inputs' },
        React.createElement(PreviewBox, { style:{ flexDirection:'column', gap:'16px', maxWidth:'480px' } },
          React.createElement(PixelInput, { label:'USERNAME', placeholder:'Enter username...', value:text, onChange:e=>setText(e.target.value) }),
          React.createElement(PixelInput, { label:'WITH PREFIX', prefix:'@', placeholder:'handle', value:text, onChange:e=>setText(e.target.value) }),
          React.createElement(PixelInput, { label:'WITH SUFFIX', suffix:'.exe', placeholder:'filename', value:text, onChange:e=>setText(e.target.value) }),
          React.createElement(PixelInput, { label:'ERROR STATE', placeholder:'Enter value...', error:'Invalid input — value required', value:text, onChange:e=>setText(e.target.value) }),
          React.createElement(PixelInput, { label:'WITH HINT', placeholder:'Search...', hint:'Press Enter to search', value:text, onChange:e=>setText(e.target.value) }),
          React.createElement(PixelInput, { label:'DISABLED', placeholder:'Cannot edit', disabled:true }),
        ),
        React.createElement(PixelCode, { lang:'jsx', code:`<PixelInput label="USERNAME" placeholder="Enter username..." />
<PixelInput label="SEARCH" prefix="🔍" hint="Press enter to search" />
<PixelInput label="EMAIL" error="Invalid email address" />
<PixelInput label="READ ONLY" disabled />` })
      ),

      React.createElement(SubSection, { title:'Textarea' },
        React.createElement(PreviewBox, { style:{ flexDirection:'column', maxWidth:'480px' } },
          React.createElement(PixelTextarea, { label:'MESSAGE', placeholder:'Type your message...', value:textarea, onChange:e=>setTextarea(e.target.value), rows:4 }),
          React.createElement(PixelTextarea, { label:'ERROR', placeholder:'Required field', error:'This field is required', rows:3 }),
        )
      ),

      React.createElement(SubSection, { title:'Select / Dropdown' },
        React.createElement(PreviewBox, { style:{ flexDirection:'column', maxWidth:'360px' } },
          React.createElement(PixelSelect, {
            label:'CHARACTER CLASS',
            options:[{value:'warrior',label:'⚔ Warrior'},{value:'mage',label:'✦ Mage'},{value:'rogue',label:'◈ Rogue'},{value:'healer',label:'✚ Healer'}],
            value:select, onChange:e=>setSelect(e.target.value)
          }),
          React.createElement(PixelSelect, {
            label:'DISABLED',
            options:[{value:'option1',label:'Option 1'}],
            disabled:true, value:'option1', onChange:()=>{}
          }),
        ),
        React.createElement(PixelCode, { lang:'jsx', code:`<PixelSelect
  label="CLASS"
  options={[
    { value: 'warrior', label: '⚔ Warrior' },
    { value: 'mage',    label: '✦ Mage' },
  ]}
  value={selected}
  onChange={e => setSelected(e.target.value)}
/>` })
      ),

      React.createElement(SubSection, { title:'Checkboxes' },
        React.createElement(PreviewBox, { style:{ gap:'12px', flexDirection:'column' } },
          React.createElement(PixelCheckbox, { label:'Enable notifications', checked:check1, onChange:e=>setCheck1(e.target.checked) }),
          React.createElement(PixelCheckbox, { label:'Remember me', checked:check2, onChange:e=>setCheck2(e.target.checked) }),
          React.createElement(PixelCheckbox, { label:'Indeterminate state', checked:false, indeterminate:true, onChange:()=>{} }),
          React.createElement(PixelCheckbox, { label:'Disabled (checked)', checked:true, disabled:true, onChange:()=>{} }),
          React.createElement(PixelCheckbox, { label:'Disabled (unchecked)', checked:false, disabled:true, onChange:()=>{} }),
        ),
        React.createElement(PixelCode, { lang:'jsx', code:`<PixelCheckbox
  label="Enable notifications"
  checked={checked}
  onChange={e => setChecked(e.target.checked)}
/>
<PixelCheckbox label="Indeterminate" indeterminate />
<PixelCheckbox label="Disabled" disabled />` })
      ),

      React.createElement(SubSection, { title:'Radio Buttons' },
        React.createElement(PreviewBox, { style:{ gap:'12px', flexDirection:'column' } },
          ['a','b','c'].map(v =>
            React.createElement(PixelRadio, { key:v, name:'demo', value:v, label:`Option ${v.toUpperCase()}`, checked:radio===v, onChange:()=>setRadio(v) })
          ),
          React.createElement(PixelRadio, { name:'demo2', value:'x', label:'Disabled option', checked:false, onChange:()=>{}, disabled:true }),
        ),
        React.createElement(PixelCode, { lang:'jsx', code:`<PixelRadio name="plan" value="free"    label="Free"    checked={plan==='free'}    onChange={() => setPlan('free')} />
<PixelRadio name="plan" value="pro"     label="Pro"     checked={plan==='pro'}     onChange={() => setPlan('pro')} />
<PixelRadio name="plan" value="enterprise" label="Enterprise" checked={plan==='enterprise'} onChange={() => setPlan('enterprise')} />` })
      ),

      React.createElement(SubSection, { title:'Toggle Switch' },
        React.createElement(PreviewBox, { style:{ gap:'16px', flexDirection:'column' } },
          React.createElement(PixelSwitch, { label:'Dark mode', checked:sw1, onChange:e=>setSw1(e.target.checked), size:'sm' }),
          React.createElement(PixelSwitch, { label:'Notifications', checked:sw2, onChange:e=>setSw2(e.target.checked), size:'md' }),
          React.createElement(PixelSwitch, { label:'Sound effects', checked:true, onChange:()=>{}, size:'lg' }),
          React.createElement(PixelSwitch, { label:'Disabled switch', checked:false, onChange:()=>{}, disabled:true }),
        ),
        React.createElement(PixelCode, { lang:'jsx', code:`<PixelSwitch
  label="Dark mode"
  checked={dark}
  onChange={e => setDark(e.target.checked)}
  size="md" // sm | md | lg
/>` })
      ),
    ),
  );
}

function CardsPage() {
  const { c } = useTheme();

  return React.createElement('div', null,
    React.createElement(Section, { id:'cards', title:'Cards', description:'Pixel cards use hard raised shadows. Interactive cards translate on hover for a tactile feel.' },

      React.createElement(SubSection, { title:'Card Variants' },
        React.createElement(PreviewBox, { style:{ alignItems:'stretch', gap:'16px' } },
          React.createElement('div', { style:{ flex:1, minWidth:'200px', maxWidth:'300px' } },
            React.createElement(PixelCard, { title:'DEFAULT CARD', subtitle:'Basic container' },
              React.createElement('p', { style:{ fontFamily:'"Geist Mono",monospace', fontSize:'12px', color:c.fgSubtle, lineHeight:1.6 } }, 'Standard card with header. Use for grouping related content.')
            )
          ),
          React.createElement('div', { style:{ flex:1, minWidth:'200px', maxWidth:'300px' } },
            React.createElement(PixelCard, { title:'INTERACTIVE', subtitle:'Hover to lift', interactive:true,
              footer: React.createElement('div', { style:{ display:'flex', gap:'8px' } },
                React.createElement(PixelButton, { size:'sm', variant:'outline' }, 'CANCEL'),
                React.createElement(PixelButton, { size:'sm' }, 'CONFIRM'),
              )
            },
              React.createElement('p', { style:{ fontFamily:'"Geist Mono",monospace', fontSize:'12px', color:c.fgSubtle, lineHeight:1.6 } }, 'Hoverable card with footer actions.')
            )
          ),
          React.createElement('div', { style:{ flex:1, minWidth:'200px', maxWidth:'300px' } },
            React.createElement(PixelCard, { padding:'0' },
              React.createElement('div', { style:{ background:c.primary, height:'80px', display:'flex', alignItems:'center', justifyContent:'center' } },
                React.createElement('span', { style:{ color:'#F4EDD9', fontFamily:'"Geist Mono",monospace', fontSize: '12px', letterSpacing:'0.2em' } }, '[ IMAGE SLOT ]')
              ),
              React.createElement('div', { style:{ padding:'16px' } },
                React.createElement('div', { style:{ fontFamily:'"Geist Mono",monospace', fontSize:'12px', fontWeight:'700', color:c.fg, marginBottom:'4px' } }, 'MEDIA CARD'),
                React.createElement('div', { style:{ fontFamily:'"Geist Mono",monospace', fontSize: '13px', color:c.fgSubtle, lineHeight:1.5 } }, 'Card with full-bleed header image area.'),
              )
            )
          ),
        ),
        React.createElement(PixelCode, { lang:'jsx', code:`<PixelCard title="QUEST LOG" subtitle="Active quests">
  <p>Card body content here.</p>
</PixelCard>

<PixelCard
  title="CONFIRM ACTION"
  interactive
  footer={
    <>
      <PixelButton variant="outline" size="sm">CANCEL</PixelButton>
      <PixelButton size="sm">CONFIRM</PixelButton>
    </>
  }
>
  Are you sure you want to proceed?
</PixelCard>` })
      ),
    ),

    React.createElement(Section, { id:'badges', title:'Badges & Tags', description:'Inline labels for status, categorization, and counts.' },
      React.createElement(SubSection, { title:'Variants' },
        React.createElement(PreviewBox, null,
          ['default','primary','success','warning','error','info'].map(v =>
            React.createElement(PixelBadge, { key:v, variant:v }, v)
          )
        )
      ),
      React.createElement(SubSection, { title:'With Dot Indicator' },
        React.createElement(PreviewBox, null,
          ['success','warning','error','info'].map(v =>
            React.createElement(PixelBadge, { key:v, variant:v, dot:true }, v)
          )
        )
      ),
      React.createElement(SubSection, { title:'Sizes' },
        React.createElement(PreviewBox, { style:{ alignItems:'center' } },
          ['sm','md','lg'].map(s =>
            React.createElement(PixelBadge, { key:s, variant:'primary', size:s }, `SIZE ${s.toUpperCase()}`)
          )
        )
      ),
      React.createElement(PixelCode, { lang:'jsx', code:`<PixelBadge variant="success" dot>ONLINE</PixelBadge>
<PixelBadge variant="warning">BETA</PixelBadge>
<PixelBadge variant="error">CRITICAL</PixelBadge>
<PixelBadge variant="primary" size="lg">NEW</PixelBadge>` })
    ),

    React.createElement(Section, { id:'navigation', title:'Navigation & Tabs', description:'Pixel tab navigation uses border-based active state — no underlines or backgrounds, just borders.' },
      React.createElement(SubSection, { title:'Tabs' },
        React.createElement(TabsDemo, null)
      ),
      React.createElement(PixelCode, { lang:'jsx', code:`const [tab, setTab] = React.useState('stats');

<PixelTabs
  tabs={[
    { id: 'stats',     label: '⚔ STATS' },
    { id: 'inventory', label: '◈ INVENTORY' },
    { id: 'quests',    label: '✦ QUESTS' },
  ]}
  activeTab={tab}
  onTabChange={setTab}
/>` })
    ),
  );
}

function TabsDemo() {
  const { c } = useTheme();
  const [tab, setTab] = React.useState('stats');
  const content = {
    stats: React.createElement('div', { style:{ fontFamily:'"Geist Mono",monospace', fontSize:'12px', color:c.fg, lineHeight:2 } },
      React.createElement('div', null, '⚔  ATK   ████████░░  80/100'),
      React.createElement('div', null, '🛡  DEF   ██████░░░░  60/100'),
      React.createElement('div', null, '✦  MAG   █████████░  90/100'),
      React.createElement('div', null, '◈  SPD   ███████░░░  70/100'),
    ),
    inventory: React.createElement('div', { style:{ display:'flex', gap:'8px', flexWrap:'wrap' } },
      ['[SWORD]','[SHIELD]','[POTION]','[SCROLL]','[KEY]','[GEMS]'].map(item =>
        React.createElement('div', { key:item, style:{ padding:'8px 12px', border:`2px solid ${c.border}`, background:c.bgSubtle, fontFamily:'"Geist Mono",monospace', fontSize: '13px', color:c.fg } }, item)
      )
    ),
    quests: React.createElement('div', { style:{ fontFamily:'"Geist Mono",monospace', fontSize:'12px', color:c.fg, display:'flex', flexDirection:'column', gap:'8px' } },
      ['▸ Defeat the Dragon King','▸ Find the Lost Artifact','✓ Rescue the Villagers'].map((q,i) =>
        React.createElement('div', { key:i, style:{ color: i===2 ? c.success : c.fg } }, q)
      )
    ),
  };
  return React.createElement('div', null,
    React.createElement(PixelTabs, { tabs:[{id:'stats',label:'⚔ STATS'},{id:'inventory',label:'◈ INVENTORY'},{id:'quests',label:'✦ QUESTS'}], activeTab:tab, onTabChange:setTab }),
    React.createElement('div', { style:{ padding:'16px', border:`2px solid ${c.border}`, borderTop:'none', background:c.bg } }, content[tab]),
  );
}

Object.assign(window, { ButtonsPage, FormsPage, CardsPage, TabsDemo });
