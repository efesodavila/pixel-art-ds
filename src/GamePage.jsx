// Display + Pixel Game Components — Showcase page
// Requires: PixelUI.jsx + PixelUI3.jsx

function DisplayPage() {
  const { c } = useTheme();

  const accordionItems = [
    { icon:'⚔', title:'Combat System', content:'Turn-based combat with pixel art animations. Each character has ATK, DEF, MAG and SPD stats that determine action order and damage calculation.' },
    { icon:'🗺', title:'World Exploration', content:'Navigate through procedurally generated pixel dungeons. Each room has a chance to contain enemies, treasure, traps or shops.' },
    { icon:'📦', title:'Inventory & Crafting', content:'Collect up to 20 items in your inventory. Combine materials at the Pixel Forge to create powerful weapons and armor.' },
    { icon:'✦', title:'Magic & Skills', content:'Learn spells by leveling up. Each class has a unique skill tree. Unlock passive bonuses and active abilities as you progress.' },
  ];

  const timelineEvents = [
    { title:'DS Created', time:'v1.0.0', description:'Initial release with core components and token system.', status:'done' },
    { title:'Advanced Forms', time:'v1.1.0', description:'Added Slider, DatePicker, OTP Input, FileUpload, Combobox.', status:'done' },
    { title:'Navigation Layer', time:'v1.2.0', description:'Command Palette, Drawer, Dropdown, Context Menu.', status:'active' },
    { title:'Animation System', time:'v1.3.0', description:'Step-based transitions and pixel sprite animations.', status:'pending' },
    { title:'React Native Port', time:'v2.0.0', description:'Full StyleSheet export with Expo support.', status:'pending' },
  ];

  const treeData = [
    { label:'Foundation', icon:'◈', expanded:true, children:[
      { label:'Colors', icon:'●', active:false },
      { label:'Typography', icon:'T' },
      { label:'Spacing', icon:'↔' },
      { label:'Shadows', icon:'◻', badge:'NEW', badgeVariant:'success' },
    ]},
    { label:'Components', icon:'▦', expanded:true, children:[
      { label:'Forms', icon:'□', children:[
        { label:'Button', active:true, badge:'34', badgeVariant:'default' },
        { label:'Input' },
        { label:'Select' },
      ]},
      { label:'Overlay', icon:'⊡', children:[
        { label:'Modal' },
        { label:'Drawer' },
        { label:'Tooltip' },
      ]},
    ]},
    { label:'Tokens', icon:'⬡', children:[
      { label:'tokens.css' },
      { label:'tokens.js' },
      { label:'tokens.json' },
    ]},
  ];

  const listItems = [
    { icon:'⚔', title:'Sword of Eternal Pixels', description:'ATK +80 | Legendary quality', meta:'Lv.40+', badge:'LEGENDARY', badgeVariant:'warning' },
    { icon:'🛡', title:'Crystal Shield', description:'DEF +60 | Rare quality', meta:'Lv.30+', badge:'RARE', badgeVariant:'info' },
    { icon:'🧪', title:'Health Potion x3', description:'Restores 500 HP instantly', meta:'Consumable', badge:'COMMON', badgeVariant:'default' },
    { icon:'✦', title:'Mana Crystal', description:'MAG +40 | Uncommon quality', meta:'Lv.20+', badge:'UNCOMMON', badgeVariant:'success' },
  ];

  return React.createElement('div', null,

    React.createElement(Section, { id:'accordion', title:'Accordion', description:'Collapse/expand with per-item open state. Multiple mode allows several open at once.' },
      React.createElement(SubSection, { title:'Single expand' },
        React.createElement(PixelAccordion, { items:accordionItems }),
        React.createElement(PixelCode, { lang:'jsx', code:`<PixelAccordion items={[
  { icon: '⚔', title: 'Combat', content: 'Turn-based system...' },
  { icon: '🗺', title: 'Exploration', content: 'Procedural dungeons...' },
]} />
// multiple={true} — allows several open at the same time` })
      ),
    ),

    React.createElement(Section, { id:'timeline', title:'Timeline', description:'Vertical timeline with per-event status: done, active, pending, error.' },
      React.createElement(SubSection, { title:'Changelog Timeline' },
        React.createElement(PreviewBox, { style:{ flexDirection:'column', maxWidth:'480px' } },
          React.createElement(PixelTimeline, { events:timelineEvents }),
        ),
        React.createElement(PixelCode, { lang:'jsx', code:`<PixelTimeline events={[
  { title: 'Deploy', time: '10:30', description: 'Production deployed.', status: 'done' },
  { title: 'Testing', time: '11:00', description: 'QA running.', status: 'active' },
  { title: 'Release', time: '12:00', description: 'Planned.', status: 'pending' },
]} />` })
      ),
    ),

    React.createElement(Section, { id:'stat', title:'Stat / KPI', description:'Metric cards with emphasized value, percent delta, and icon.' },
      React.createElement(SubSection, { title:'Metrics' },
        React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))', gap:'12px' } },
          React.createElement(PixelStat, { label:'TOTAL XP', value:'48,250', delta:12.4, description:'vs last week', icon:'⭐' }),
          React.createElement(PixelStat, { label:'BATTLES WON', value:'342', delta:8.1, description:'this month', icon:'⚔' }),
          React.createElement(PixelStat, { label:'ITEMS FOUND', value:'1,204', delta:-3.2, description:'vs last week', icon:'📦' }),
          React.createElement(PixelStat, { label:'ACTIVE USERS', value:'89', delta:0, description:'no change', icon:'👥' }),
        ),
        React.createElement(PixelCode, { lang:'jsx', code:`<PixelStat label="TOTAL XP" value="48,250" delta={12.4} description="vs last week" icon="⭐" />
// delta > 0 → green ▲  |  delta < 0 → red ▼  |  delta = 0 → gray ─` })
      ),
    ),

    React.createElement(Section, { id:'divider', title:'Divider', description:'Horizontal divider with optional centered label, or vertical for inline layouts.' },
      React.createElement(SubSection, { title:'Variations' },
        React.createElement(PreviewBox, { style:{ flexDirection:'column', gap:'16px', width:'100%' } },
          React.createElement(PixelDivider, null),
          React.createElement(PixelDivider, { label:'FOUNDATION' }),
          React.createElement(PixelDivider, { label:'OR' }),
          React.createElement('div', { style:{ display:'flex', gap:'16px', alignItems:'stretch', height:'40px' } },
            React.createElement('span', { style:{ fontFamily:'"Geist Mono",monospace', fontSize:'12px', color:c.fg } }, 'Left'),
            React.createElement(PixelDivider, { vertical:true }),
            React.createElement('span', { style:{ fontFamily:'"Geist Mono",monospace', fontSize:'12px', color:c.fg } }, 'Right'),
          ),
        ),
        React.createElement(PixelCode, { lang:'jsx', code:`<PixelDivider />               // plain line
<PixelDivider label="OR" />    // with center label
<PixelDivider vertical />      // vertical` })
      ),
    ),

    React.createElement(Section, { id:'empty-state', title:'Empty State', description:'Empty screen with icon, title, description, and CTA.' },
      React.createElement(SubSection, { title:'Examples' },
        React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px' } },
          React.createElement(PixelEmptyState, { icon:'📭', title:'No Messages', description:'Your inbox is empty. Start a conversation with your party members.', action:React.createElement(PixelButton,{size:'sm'},'COMPOSE') }),
          React.createElement(PixelEmptyState, { icon:'🗃', title:'Empty Inventory', description:'No items found. Explore dungeons to discover loot.', action:React.createElement(PixelButton,{size:'sm',variant:'outline'},'EXPLORE') }),
        ),
        React.createElement(PixelCode, { lang:'jsx', code:`<PixelEmptyState
  icon="📭"
  title="No Results"
  description="Try adjusting your search filters."
  action={<PixelButton>CLEAR FILTERS</PixelButton>}
/>` })
      ),
    ),

    React.createElement(Section, { id:'list', title:'List', description:'Item list with icon, avatar, badge, and inline actions.' },
      React.createElement(SubSection, { title:'Item List' },
        React.createElement(PixelList, { items:listItems, onItemClick:(item)=>console.log(item) }),
        React.createElement(PixelCode, { lang:'jsx', code:`<PixelList
  items={[
    { icon: '⚔', title: 'Sword', description: 'ATK +80', meta: 'Lv.40', badge: 'RARE', badgeVariant: 'info' },
  ]}
  onItemClick={item => console.log(item)}
/>` })
      ),
    ),

    React.createElement(Section, { id:'tree', title:'Tree', description:'Hierarchical navigation tree with per-node expand/collapse.' },
      React.createElement(SubSection, { title:'File Tree' },
        React.createElement(PixelTree, { nodes:treeData }),
        React.createElement(PixelCode, { lang:'jsx', code:`<PixelTree nodes={[
  { label: 'src', icon: '📁', expanded: true, children: [
    { label: 'components', children: [
      { label: 'Button.jsx', active: true },
    ]},
  ]},
]} />` })
      ),
    ),
  );
}

function GamePage() {
  const { c } = useTheme();
  const [dialogLine, setDialogLine] = React.useState(0);
  const [loadProg, setLoadProg] = React.useState(0);
  const [invSelected, setInvSelected] = React.useState(null);
  const [hp, setHp] = React.useState(68);
  const [notifOpen, setNotifOpen] = React.useState(false);

  React.useEffect(() => {
    if (loadProg < 100) {
      const t = setTimeout(() => setLoadProg(p => Math.min(100, p + 2)), 80);
      return () => clearTimeout(t);
    }
  }, [loadProg]);

  const dialogLines = [
    'Welcome, brave adventurer! I have been waiting for you to arrive at our pixel village.',
    'The ancient dragon has stolen our sacred color palette. Without it, the world becomes grayscale!',
    'You must venture into the Dungeon of Tokens and retrieve the lost design system.',
    'Take this sword — it was forged from pure CSS variables and blessed by the Component Gods.',
  ];

  const inventoryItems = [
    { icon:'⚔', rarity:'legendary', count:1 }, { icon:'🛡', rarity:'rare', count:1 },
    { icon:'🧪', rarity:'common', count:5 }, { icon:'✦', rarity:'epic', count:2 },
    { icon:'🗡', rarity:'uncommon', count:1 }, { icon:'📜', rarity:'common', count:3 },
    { icon:'💎', rarity:'rare', count:1 }, { icon:'🔮', rarity:'epic', count:1 },
    { icon:'🍖', rarity:'common', count:8 },
  ];

  const notifications = [
    { message:'New quest available: The Token Heist', time:'2 min ago', read:false },
    { message:'Aria Starfall sent you a party invite', time:'5 min ago', read:false },
    { message:'Achievement unlocked: First Pixel Art', time:'1 hr ago', read:true },
    { message:'Daily login bonus: +100 XP', time:'3 hr ago', read:true },
  ];

  const mapRooms = [
    {id:'start',x:0,y:1,type:'safe'},{id:'r1',x:1,y:1,type:'dungeon'},{id:'r2',x:2,y:1,type:'dungeon'},
    {id:'boss',x:3,y:1,type:'boss'},{id:'shop',x:1,y:0,type:'shop'},{id:'chest',x:2,y:0,type:'treasure'},
    {id:'r3',x:1,y:2,type:'dungeon'},{id:'r4',x:2,y:2,type:'dungeon'},{id:'safe2',x:0,y:2,type:'safe'},
  ];
  const [curRoom, setCurRoom] = React.useState('r1');

  return React.createElement('div', null,

    React.createElement(Section, { id:'dialog-box', title:'Dialog Box (RPG)', description:'RPG-style dialog box with typewriter effect, line counter, and ▼ to advance.' },
      React.createElement(SubSection, { title:'Interactive Dialog' },
        React.createElement(PreviewBox, { style:{ maxWidth:'520px' } },
          React.createElement(PixelDialogBox, {
            speaker:'ELDER PIXELTON',
            lines:dialogLines,
            portrait:React.createElement('div',{style:{width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'40px'}},['🧙','👴','🧙','🧙'][dialogLine]||'🧙'),
            autoType:true,
          })
        ),
        React.createElement(PixelCode, { lang:'jsx', code:`<PixelDialogBox
  speaker="NPC NAME"
  lines={[
    'First line of dialogue...',
    'Second line — click to advance.',
  ]}
  portrait={<img src="/portrait.png" />}
  autoType // typewriter effect
  onNext={() => closeDialog()}
/>` })
      ),
    ),

    React.createElement(Section, { id:'inventory', title:'Inventory Grid', description:'5×4 RPG-style slot grid. Rarity colored on top of each slot.' },
      React.createElement(SubSection, { title:'20 Slots' },
        React.createElement(PreviewBox, null,
          React.createElement(PixelInventoryGrid, { items:inventoryItems, slots:20, selected:invSelected, onSelect:setInvSelected }),
          invSelected !== null && inventoryItems[invSelected] && React.createElement('div', { style:{ padding:'12px', background:c.bgSubtle, border:`2px solid ${c.border}`, fontFamily:'"Geist Mono",monospace', fontSize: '13px', color:c.fg, display:'flex', flexDirection:'column', gap:'4px', alignSelf:'flex-start' } },
            React.createElement('div', { style:{ fontWeight:'700', fontSize:'12px' } }, `SLOT #${invSelected+1}`),
            React.createElement('div', { style:{ color:c.fgSubtle } }, `Rarity: ${inventoryItems[invSelected].rarity}`),
            React.createElement('div', { style:{ color:c.fgSubtle } }, `Count: ${inventoryItems[invSelected].count}`),
          )
        ),
        React.createElement(PixelCode, { lang:'jsx', code:`<PixelInventoryGrid
  slots={20}
  items={[
    { icon: '⚔', rarity: 'legendary', count: 1 },
    { icon: '🧪', rarity: 'common',   count: 5 },
  ]}
  selected={sel} onSelect={setSel}
/>
// rarity: common | uncommon | rare | epic | legendary` })
      ),
    ),

    React.createElement(Section, { id:'hp-bar', title:'HP Bar', description:'Segmented RPG-style HP bar. Color shifts automatically with HP.' },
      React.createElement(SubSection, { title:'Interactive HP' },
        React.createElement(PreviewBox, { style:{ flexDirection:'column', gap:'12px', maxWidth:'500px' } },
          React.createElement(PixelHPBar, { value:hp, max:100, label:'HP', showNumbers:true }),
          React.createElement(PixelHPBar, { value:Math.floor(hp*0.9), max:100, label:'MP', showNumbers:true, color:c.secondary }),
          React.createElement(PixelHPBar, { value:Math.floor(hp*1.2), max:200, label:'STM', showNumbers:true, color:c.accent }),
          React.createElement('div', { style:{ display:'flex', gap:'8px' } },
            React.createElement(PixelButton, { size:'sm', variant:'danger', onClick:()=>setHp(h=>Math.max(0,h-10)) }, '−10 DMG'),
            React.createElement(PixelButton, { size:'sm', variant:'success', onClick:()=>setHp(h=>Math.min(100,h+10)) }, '+10 HEAL'),
          ),
        ),
        React.createElement(PixelCode, { lang:'jsx', code:`<PixelHPBar value={hp} max={100} label="HP" segments={20} />
// Color auto-adapts: green > 50% | yellow 25-50% | red < 25%
// Custom: color="#D43840"` })
      ),
    ),

    React.createElement(Section, { id:'xp-bar', title:'XP Bar', description:'Experience bar with level, progress, and stripe animation.' },
      React.createElement(SubSection, { title:'Level Progress' },
        React.createElement(PreviewBox, { style:{ flexDirection:'column', maxWidth:'480px' } },
          React.createElement(PixelXPBar, { value:340, max:500, level:12 }),
          React.createElement(PixelXPBar, { value:490, max:500, level:24 }),
          React.createElement(PixelXPBar, { value:50, max:1000, level:1 }),
        ),
        React.createElement(PixelCode, { lang:'jsx', code:`<PixelXPBar value={340} max={500} level={12} />` })
      ),
    ),

    React.createElement(Section, { id:'notification-bell', title:'Notification Bell', description:'Bell with count badge and notification dropdown.' },
      React.createElement(SubSection, { title:'Bell with 4 notifications' },
        React.createElement(PreviewBox, { style:{ alignItems:'flex-start', gap:'24px' } },
          React.createElement(PixelNotificationBell, { count:notifications.filter(n=>!n.read).length, notifications, onRead:()=>{} }),
          React.createElement(PixelNotificationBell, { count:0, notifications:[], }),
          React.createElement(PixelNotificationBell, { count:99, notifications, }),
        ),
        React.createElement(PixelCode, { lang:'jsx', code:`<PixelNotificationBell
  count={unreadCount}
  notifications={[
    { message: 'New quest available!', time: '2m ago', read: false },
  ]}
  onRead={() => markAllRead()}
/>` })
      ),
    ),

    React.createElement(Section, { id:'loading-screen', title:'Loading Screen', description:'Game-style loading screen with progress bar, tips, and animated dots.' },
      React.createElement(SubSection, { title:'Game Loading' },
        React.createElement(PreviewBox, { dark:true, style:{ justifyContent:'center' } },
          React.createElement(PixelLoadingScreen, {
            progress:loadProg, title:'PIXEL ART DS',
            message:'LOADING ASSETS',
            tips:['Use pixel borders for that 8-bit look','Combine HP Bar + XP Bar for game UIs','All tokens available as CSS vars, JS and JSON','Geist Mono keeps your text pixel-perfect'],
          }),
        ),
        React.createElement('div', { style:{ display:'flex', gap:'8px', marginTop:'8px' } },
          React.createElement(PixelButton, { size:'sm', variant:'outline', onClick:()=>setLoadProg(0) }, '↺ RESTART'),
          React.createElement(PixelButton, { size:'sm', onClick:()=>setLoadProg(100) }, '▶ SKIP'),
        ),
        React.createElement(PixelCode, { lang:'jsx', code:`<PixelLoadingScreen
  progress={progress}  // 0–100
  title="MY GAME"
  message="LOADING ASSETS"
  tips={['Tip shown every 3s', 'Another tip']}
/>` })
      ),
    ),

    React.createElement(Section, { id:'minimap', title:'Mini Map', description:'Dungeon-style navigation map. Click a room to navigate.' },
      React.createElement(SubSection, { title:'Dungeon Map' },
        React.createElement(PreviewBox, { dark:true, style:{ justifyContent:'center', flexDirection:'column', alignItems:'center', gap:'12px' } },
          React.createElement(PixelMiniMap, { rooms:mapRooms, currentRoom:curRoom, onRoomClick:setCurRoom, cellSize:32 }),
          React.createElement('span', { style:{ fontFamily:'"Geist Mono",monospace', fontSize: '12px', color:c.fgSubtle } }, `Current: ${curRoom}`),
        ),
        React.createElement(PixelCode, { lang:'jsx', code:`<PixelMiniMap
  rooms={[
    { id: 'start', x: 0, y: 1, type: 'safe' },
    { id: 'r1',    x: 1, y: 1, type: 'dungeon' },
    { id: 'boss',  x: 3, y: 1, type: 'boss' },
    { id: 'shop',  x: 1, y: 0, type: 'shop' },
  ]}
  currentRoom={roomId}
  onRoomClick={id => navigate(id)}
/>
// types: dungeon | boss | treasure | safe | shop` })
      ),
    ),
  );
}

Object.assign(window, { DisplayPage, GamePage });
