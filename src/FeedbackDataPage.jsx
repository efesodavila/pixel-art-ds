// Feedback + Data Page — Alerts, Toasts, Modals, Progress, Tables, Avatars
// Requires: window components from PixelUI.jsx

function FeedbackPage() {
  const { c } = useTheme();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [toasts, setToasts] = React.useState([]);
  const [prog1, setProg1] = React.useState(65);
  const [alertsClosed, setAlertsClosed] = React.useState({});

  const addToast = (variant) => {
    const id = Date.now();
    const msgs = { success:'Quest completed! +500 XP earned.', warning:'Inventory almost full (90%).', error:'Connection lost. Retrying...', info:'New update available — v2.4.0' };
    setToasts(t => [...t, { id, variant, msg: msgs[variant] }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500);
  };

  return React.createElement('div', null,

    React.createElement(Section, { id:'alerts', title:'Alerts', description:'Inline feedback banners for contextual status messages. Supports dismissal.' },
      React.createElement(SubSection, { title:'Variants' },
        React.createElement('div', { style:{ display:'flex', flexDirection:'column', gap:'12px' } },
          ['success','warning','error','info'].map(v => !alertsClosed[v] &&
            React.createElement(PixelAlert, { key:v, variant:v, title:v.toUpperCase(),
              onClose:() => setAlertsClosed(p => ({...p,[v]:true})) },
              { success:'Operation completed successfully. All data has been saved.',
                warning:'Your session expires in 5 minutes. Save your work.',
                error:'Failed to connect to server. Check your connection and try again.',
                info:'Maintenance window scheduled for Sunday 02:00–04:00 UTC.' }[v]
            )
          )
        ),
        React.createElement(PixelCode, { lang:'jsx', code:`<PixelAlert variant="success" title="SUCCESS" onClose={() => setOpen(false)}>
  Operation completed successfully.
</PixelAlert>
<PixelAlert variant="error" title="ERROR">
  Failed to load resource. Please retry.
</PixelAlert>` })
      ),
    ),

    React.createElement(Section, { id:'toasts', title:'Toasts', description:'Non-blocking notifications stacked in the corner. Auto-dismiss after 3.5s.' },
      React.createElement(SubSection, { title:'Trigger Toasts' },
        React.createElement(PreviewBox, null,
          ['success','warning','error','info'].map(v =>
            React.createElement(PixelButton, { key:v, variant: v==='success'?'success':v==='error'?'danger':v==='warning'?'accent':'secondary', size:'sm', onClick:()=>addToast(v) }, `▸ ${v.toUpperCase()}`)
          )
        ),
        React.createElement('div', { style:{ position:'fixed', bottom:'24px', right:'24px', display:'flex', flexDirection:'column', gap:'8px', zIndex:9999 } },
          toasts.map(t => React.createElement(PixelToast, { key:t.id, variant:t.variant, message:t.msg, onClose:()=>setToasts(ts=>ts.filter(x=>x.id!==t.id)) }))
        ),
        React.createElement(PixelCode, { lang:'jsx', code:`// Trigger from anywhere
const showToast = (variant, message) => {
  const id = Date.now();
  setToasts(t => [...t, { id, variant, message }]);
  setTimeout(() => removeToast(id), 3500);
};

// Toast container (fixed position)
<div style={{ position:'fixed', bottom:24, right:24 }}>
  {toasts.map(t => (
    <PixelToast key={t.id} variant={t.variant} message={t.message} />
  ))}
</div>` })
      ),
    ),

    React.createElement(Section, { id:'modals', title:'Modals & Dialogs', description:'Pixel art modal windows with scanline overlay backdrop and hard-shadow chrome.' },
      React.createElement(SubSection, { title:'Modal Types' },
        React.createElement(PreviewBox, null,
          React.createElement(PixelButton, { onClick:()=>setModalOpen(true) }, '▸ OPEN MODAL'),
          React.createElement(PixelButton, { variant:'danger', onClick:()=>setConfirmOpen(true) }, '▸ CONFIRM DIALOG'),
        ),
        React.createElement(PixelModal, { open:modalOpen, onClose:()=>setModalOpen(false), title:'◈ QUEST DETAILS',
          footer: React.createElement('div', { style:{ display:'flex', gap:'8px' } },
            React.createElement(PixelButton, { variant:'outline', size:'sm', onClick:()=>setModalOpen(false) }, 'CLOSE'),
            React.createElement(PixelButton, { size:'sm' }, 'ACCEPT QUEST'),
          )
        },
          React.createElement('div', { style:{ display:'flex', flexDirection:'column', gap:'12px' } },
            React.createElement('div', { style:{ fontFamily:'"Geist Mono",monospace', fontSize:'12px', color:c.fg, lineHeight:1.7 } }, 'A mysterious merchant in the eastern district has requested your aid. The journey will take you through the Pixel Forest — danger lurks at every corner.'),
            React.createElement(PixelAlert, { variant:'warning', title:'WARNING' }, 'This quest is rated ★★★★☆ difficulty. Minimum level 20 required.'),
            React.createElement('div', { style:{ display:'flex', gap:'16px' } },
              React.createElement('div', { style:{ fontFamily:'"Geist Mono",monospace', fontSize: '13px', color:c.fgSubtle } }, '⏱ DURATION: 4–6 hours'),
              React.createElement('div', { style:{ fontFamily:'"Geist Mono",monospace', fontSize: '13px', color:c.fgSubtle } }, '💰 REWARD: 1,500 gold'),
            )
          )
        ),
        React.createElement(PixelModal, { open:confirmOpen, onClose:()=>setConfirmOpen(false), title:'⚠ CONFIRM ACTION', size:'sm',
          footer: React.createElement('div', { style:{ display:'flex', gap:'8px' } },
            React.createElement(PixelButton, { variant:'outline', size:'sm', onClick:()=>setConfirmOpen(false) }, 'CANCEL'),
            React.createElement(PixelButton, { variant:'danger', size:'sm', onClick:()=>setConfirmOpen(false) }, 'DELETE'),
          )
        },
          React.createElement('div', { style:{ fontFamily:'"Geist Mono",monospace', fontSize:'12px', color:c.fg, lineHeight:1.7 } }, 'This action cannot be undone. Are you sure you want to permanently delete this item?')
        ),
        React.createElement(PixelCode, { lang:'jsx', code:`const [open, setOpen] = React.useState(false);

<PixelButton onClick={() => setOpen(true)}>OPEN MODAL</PixelButton>

<PixelModal
  open={open}
  onClose={() => setOpen(false)}
  title="MODAL TITLE"
  size="md" // sm | md | lg
  footer={<PixelButton onClick={() => setOpen(false)}>CLOSE</PixelButton>}
>
  Modal content goes here.
</PixelModal>` })
      ),
    ),

    React.createElement(Section, { id:'progress', title:'Progress & Loading', description:'Pixel progress bars and skeleton loaders. No animations — stepped/instant updates only.' },
      React.createElement(SubSection, { title:'Progress Bar' },
        React.createElement(PreviewBox, { style:{ flexDirection:'column', gap:'16px' } },
          React.createElement(PixelProgress, { value:prog1, label:'XP TO NEXT LEVEL', showValue:true }),
          React.createElement(PixelProgress, { value:42, variant:'success', label:'HEALTH', showValue:true }),
          React.createElement(PixelProgress, { value:78, variant:'warning', label:'STAMINA', showValue:true }),
          React.createElement(PixelProgress, { value:20, variant:'error', label:'MANA', showValue:true }),
          React.createElement(PixelProgress, { value:55, variant:'info', size:'sm', label:'UPLOAD' }),
          React.createElement(PixelProgress, { value:55, variant:'primary', size:'lg', label:'DOWNLOAD' }),
          React.createElement('div', { style:{ display:'flex', gap:'8px' } },
            React.createElement(PixelButton, { size:'sm', variant:'outline', onClick:()=>setProg1(p=>Math.max(0,p-10)) }, '−10'),
            React.createElement(PixelButton, { size:'sm', variant:'outline', onClick:()=>setProg1(p=>Math.min(100,p+10)) }, '+10'),
          ),
        ),
        React.createElement(PixelCode, { lang:'jsx', code:`<PixelProgress value={65} label="XP" showValue />
<PixelProgress value={42} variant="success" label="HEALTH" />
<PixelProgress value={78} variant="warning" size="sm" />
<PixelProgress value={20} variant="error" size="lg" />` })
      ),

      React.createElement(SubSection, { title:'Skeleton Loader' },
        React.createElement(PreviewBox, { style:{ flexDirection:'column', gap:'8px', maxWidth:'320px' } },
          React.createElement('div', { style:{ display:'flex', gap:'12px', alignItems:'center' } },
            React.createElement(PixelSkeleton, { width:'40px', height:'40px' }),
            React.createElement('div', { style:{ flex:1, display:'flex', flexDirection:'column', gap:'6px' } },
              React.createElement(PixelSkeleton, { width:'70%', height:'12px' }),
              React.createElement(PixelSkeleton, { width:'45%', height:'10px' }),
            )
          ),
          React.createElement(PixelSkeleton, { width:'100%', height:'12px' }),
          React.createElement(PixelSkeleton, { width:'90%', height:'12px' }),
          React.createElement(PixelSkeleton, { width:'60%', height:'12px' }),
          React.createElement(PixelSkeleton, { width:'100%', height:'80px' }),
        ),
        React.createElement(PixelCode, { lang:'jsx', code:`// Show while loading data
{isLoading ? (
  <>
    <PixelSkeleton width="200px" height="16px" />
    <PixelSkeleton width="100%" height="80px" />
  </>
) : (
  <ActualContent />
)}` })
      ),

      React.createElement(SubSection, { title:'Spinner' },
        React.createElement(PreviewBox, { style:{ alignItems:'center', gap:'32px' } },
          [10,16,24,32].map(s => React.createElement('div', { key:s, style:{ display:'flex', flexDirection:'column', alignItems:'center', gap:'8px' } },
            React.createElement(PixelSpinner, { size:s }),
            React.createElement('span', { style:{ fontFamily:'"Geist Mono",monospace', fontSize: '12px', color:c.fgMuted } }, `${s}px`),
          ))
        )
      ),
    ),
  );
}

function DataPage() {
  const { c } = useTheme();

  const tableData = {
    columns: [
      { key:'name', label:'Name' }, { key:'class', label:'Class' },
      { key:'level', label:'Level' }, { key:'status', label:'Status' }, { key:'hp', label:'HP' },
    ],
    rows: [
      { name:'Aria Starfall', class:'Mage', level:'42', status: React.createElement(PixelBadge,{variant:'success',dot:true,size:'sm'},'ONLINE'), hp:'850/1000' },
      { name:'Rex Ironwood', class:'Warrior', level:'38', status: React.createElement(PixelBadge,{variant:'warning',dot:true,size:'sm'},'AWAY'), hp:'1200/1500' },
      { name:'Lena Quickfoot', class:'Rogue', level:'55', status: React.createElement(PixelBadge,{variant:'error',dot:true,size:'sm'},'BUSY'), hp:'600/800' },
      { name:'Grom Stoneback', class:'Paladin', level:'61', status: React.createElement(PixelBadge,{variant:'success',dot:true,size:'sm'},'ONLINE'), hp:'2000/2000' },
      { name:'Yuki Windwhisper', class:'Ranger', level:'29', status: React.createElement(PixelBadge,{variant:'default',dot:true,size:'sm'},'OFFLINE'), hp:'0/700' },
    ],
  };

  return React.createElement('div', null,

    React.createElement(Section, { id:'avatars', title:'Avatars', description:'Pixel-art avatars with status indicators. Auto-generates color from name initial.' },
      React.createElement(SubSection, { title:'Sizes' },
        React.createElement(PreviewBox, { style:{ alignItems:'center' } },
          ['xs','sm','md','lg','xl'].map(s =>
            React.createElement('div', { key:s, style:{ display:'flex', flexDirection:'column', alignItems:'center', gap:'8px' } },
              React.createElement(PixelAvatar, { name:'Aria Starfall', size:s }),
              React.createElement('span', { style:{ fontFamily:'"Geist Mono",monospace', fontSize: '12px', color:c.fgMuted } }, s),
            )
          )
        )
      ),
      React.createElement(SubSection, { title:'With Status Indicators' },
        React.createElement(PreviewBox, { style:{ alignItems:'center' } },
          [
            { name:'Aria Starfall',    status:'online' },
            { name:'Rex Ironwood',     status:'away' },
            { name:'Lena Quickfoot',   status:'busy' },
            { name:'Grom Stoneback',   status:'offline' },
          ].map(({ name, status }) =>
            React.createElement('div', { key:name, style:{ display:'flex', flexDirection:'column', alignItems:'center', gap:'6px' } },
              React.createElement(PixelAvatar, { name, status, size:'lg' }),
              React.createElement('span', { style:{ fontFamily:'"Geist Mono",monospace', fontSize: '12px', color:c.fgMuted, textAlign:'center', maxWidth:'64px' } }, name.split(' ')[0]),
              React.createElement(PixelBadge, { variant: status==='online'?'success':status==='busy'?'error':status==='away'?'warning':'default', size:'sm', dot:true }, status),
            )
          )
        )
      ),
      React.createElement(SubSection, { title:'Avatar Group' },
        React.createElement(PreviewBox, null,
          React.createElement('div', { style:{ display:'flex' } },
            ['Aria Starfall','Rex Ironwood','Lena Quickfoot','Grom Stoneback','Yuki W.'].map((name, i) =>
              React.createElement('div', { key:name, style:{ marginLeft: i===0?0:'-8px', zIndex:5-i } },
                React.createElement(PixelAvatar, { name, size:'md' })
              )
            ),
            React.createElement('div', { style:{ width:'40px', height:'40px', border:`2px solid ${c.border}`, background:c.bgStrong, display:'flex', alignItems:'center', justifyContent:'center', marginLeft:'-8px', fontFamily:'"Geist Mono",monospace', fontSize: '12px', fontWeight:'700', color:c.fg } }, '+12'),
          )
        )
      ),
      React.createElement(PixelCode, { lang:'jsx', code:`<PixelAvatar name="Aria Starfall" size="md" status="online" />
<PixelAvatar name="Rex Ironwood"  size="lg" status="away" />
<PixelAvatar src="/avatar.png"    size="xl" />` })
    ),

    React.createElement(Section, { id:'tables', title:'Tables', description:'Pixel data tables with strict border grid. Supports striping and status badges inline.' },
      React.createElement(SubSection, { title:'Default Table' },
        React.createElement(PixelTable, { columns:tableData.columns, rows:tableData.rows }),
      ),
      React.createElement(SubSection, { title:'Striped Table' },
        React.createElement(PixelTable, { columns:tableData.columns.slice(0,3), rows:tableData.rows, striped:true }),
      ),
      React.createElement(PixelCode, { lang:'jsx', code:`<PixelTable
  columns={[
    { key: 'name',  label: 'Name' },
    { key: 'class', label: 'Class' },
    { key: 'level', label: 'Level' },
  ]}
  rows={[
    { name: 'Aria Starfall', class: 'Mage',    level: '42' },
    { name: 'Rex Ironwood',  class: 'Warrior', level: '38' },
  ]}
  striped
/>` })
    ),
  );
}

Object.assign(window, { FeedbackPage, DataPage });
