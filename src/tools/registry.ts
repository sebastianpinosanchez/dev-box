import type { ComponentType, LazyExoticComponent } from 'react';
import type { ToolMeta } from '@/lib/tool';
type Definition = {
  meta: ToolMeta;
  Component: LazyExoticComponent<ComponentType>;
};
const modules = import.meta.glob<{ default: Definition }>('./*/index.ts', {
  eager: true,
});
export const tools = Object.values(modules)
  .map((m) => m.default)
  .sort((a, b) => a.meta.name.localeCompare(b.meta.name));
if (new Set(tools.map((t) => t.meta.id)).size !== tools.length)
  throw new Error('Duplicate tool id: use a unique folder and metadata id.');
