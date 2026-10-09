# Components

60+ components shipped in 1.0. Categorized below; full live examples in the docs site (`index.html`).

| Category | Component | API summary |
|----------|-----------|-------------|
| **Foundation** | `<PixelButton>` | `variant` (primary/secondary/ghost/danger), `size`, `loading`, `icon`, `iconRight`, `disabled`, `fullWidth` |
| | `<PixelIcon>` | 50+ bitmap icons via `name`, `size`, `color` |
| | `<PixelSpinner>` | `size`, `color`, `label` |
| **Forms** | `<PixelInput>` | `label`, `error`, `hint`, `prefix`, `suffix`, `size` |
| | `<PixelTextarea>` | `label`, `error`, `hint`, `rows` |
| | `<PixelSelect>` | `options`, `value`, `error`, `hint` |
| | `<PixelCheckbox>` | `checked`, `indeterminate`, `disabled`, `label` |
| | `<PixelRadio>` | `name`, `value`, `checked`, `disabled`, `label` |
| | `<PixelSwitch>` | `checked`, `size`, `disabled`, `label` |
| | `<PixelSlider>` | `min`, `max`, `step`, `variant`, `showValue`, `label` |
| | `<PixelNumberInput>` | `value`, `min`, `max`, `step`, `label`, `disabled` |
| | `<PixelDatePicker>` | `value`, `onChange`, `label` |
| | `<PixelColorPicker>` | `value`, `palette` (curated swatches), `label` |
| | `<PixelOTPInput>` | `length`, `value`, `error`, `label` |
| | `<PixelFileUpload>` | `accept`, `multiple`, `label`, drag & drop |
| | `<PixelCombobox>` | `options`, query-filtered autocomplete |
| | `<PixelTagInput>` | `tags`, Enter/comma to add, Backspace to remove |
| | `<PixelMultiSelect>` | `options`, `selected`, multi-select dropdown |
| **Navigation** | `<PixelTabs>` | `tabs`, `activeTab`, ←/→ keyboard nav |
| | `<PixelBreadcrumb>` | `items` |
| | `<PixelPagination>` | `page`, `total`, `siblings` (auto-ellipses) |
| | `<PixelStepper>` | `steps`, `current` |
| | `<PixelDropdownMenu>` | `trigger`, `items` (icon, shortcut, separator) |
| | `<PixelContextMenu>` | wraps children; right-click to open |
| | `<PixelCommandPalette>` | `open`, `commands`, ⌘K-style with fuzzy filter |
| **Overlay** | `<PixelModal>` | `open`, `title`, `footer`, `size`, focus trap, Esc closes |
| | `<PixelDrawer>` | `open`, `side` (top/right/bottom/left), `title`, Esc closes |
| | `<PixelTooltip>` | `content`, `position` |
| | `<PixelPopover>` | `trigger`, `content`, `position` |
| | `<PixelToast>` | `message`, `variant`, `onClose` |
| | `<PixelAlert>` | `title`, `variant`, `onClose`, `role=alert/status` |
| **Display** | `<PixelCard>` | `title`, `subtitle`, `footer`, `interactive`, `padding` |
| | `<PixelBadge>` | `variant`, `size`, `dot` |
| | `<PixelAvatar>` | `name`, `src`, `size`, `status` |
| | `<PixelTable>` | `columns`, `rows`, `striped` |
| | `<PixelList>` | `items`, `onItemClick` |
| | `<PixelTree>` | `nodes` (recursive expand/collapse) |
| | `<PixelAccordion>` | `items`, `multiple` |
| | `<PixelTimeline>` | `events` (status: done/active/pending/error) |
| | `<PixelStat>` | `label`, `value`, `delta`, `icon`, `description` |
| | `<PixelDivider>` | `label`, `vertical` |
| | `<PixelEmptyState>` | `icon`, `title`, `description`, `action` |
| | `<PixelSkeleton>` | `width`, `height` (animated) |
| | `<PixelProgress>` | `value`, `max`, `variant`, `label`, `showValue` |
| | `<PixelCode>` | `code`, `lang` (with copy button) |
| **Game** | `<PixelDialogBox>` | `speaker`, `lines`, `portrait`, typewriter effect |
| | `<PixelInventoryGrid>` | `items`, `slots`, rarity colors |
| | `<PixelHPBar>` | `value`, `max`, `segments`, color shifts with HP |
| | `<PixelXPBar>` | `value`, `max`, `level`, animated stripes |
| | `<PixelNotificationBell>` | `count`, `notifications` dropdown |
| | `<PixelLoadingScreen>` | `progress`, `tips`, `title` |
| | `<PixelMiniMap>` | `rooms`, `currentRoom`, dungeon-style |

## Universal props

| Prop | Applies to | Description |
|------|-----------|-------------|
| `size` | sized components | `sm` / `md` / `lg` (some support `xs`, `xl`) |
| `variant` | colored components | `primary` / `secondary` / `success` / `warning` / `error` / `info` |
| `disabled` | interactives | Visual + functional disable |
| `aria-label` | all | Forwarded to root or interactive element |

## Theming

Wrap your tree in `<ThemeProvider mode="light|dark" neutralBase="#806050">`. All components read from `useTheme()`.

## Roadmap (`[Unreleased]`)

- DataGrid (sortable, virtualized)
- DateRangePicker
- TimePicker
- MentionInput (@-trigger)
- RichTextEditor (block-based)
- VirtualList
- Toaster (positioned manager for `<PixelToast>`)
- Carousel
- ImageCropper
- PixelMap (real-world map)
