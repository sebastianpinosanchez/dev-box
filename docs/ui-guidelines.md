# UI guidelines

Use `ToolLayout` for the title, description and actions. Most tools should configure `Workbench`, which supplies InputPane, OutputPane, CopyButton, FileDropzone, ErrorAlert and SampleButton. Editors use the bundled JetBrains Mono font. Shared layout uses resizable panels on desktop and a single vertical layout on mobile.

Use Sidebar for navigation; CommandDialog for search; Tabs for modes; Input, Textarea, Select, Checkbox, Switch and Slider for labeled controls. Use Card/Separator/ScrollArea for grouping; Table for rows; Badge for state; Alert for errors; Tooltip for short hints; DropdownMenu for theme/actions; Sonner for copy feedback. All fields require unique labels. Keep both visible focus and keyboard access. Don't communicate validity by color alone.

```tsx
import { Workbench } from '@/components/shared/Workbench';
import { meta } from './meta';
import { sample } from './samples';
const config = {
  modes: ['Encode', 'Decode'],
  file: 'binary',
  fields: [
    {
      key: 'urlSafe',
      label: 'URL-safe alphabet',
      value: 'false',
      type: 'checkbox',
    },
  ],
} as const;
export default function Tool() {
  return <Workbench meta={meta} sample={sample} config={config} />;
}
```

Customize CSS variables in src/index.css, not primitives. The light/dark/system ThemeProvider applies the dark class, follows media-query changes and saves only the chosen theme. shadcn's Toaster receives the resolved theme explicitly.

Add primitives with `npx shadcn@latest add <component>`. Keep components.json's `new-york` Radix style. Run `node scripts/record-ui.mjs` after reviewing generated files. Never add CDN fonts, remote images or alternative UI frameworks. Tool HTML is always sanitized; images are local raster data or numeric generated QR SVG.
