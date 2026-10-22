import { Wrench } from 'lucide-react';
import { metaSchema } from '@/lib/tool';
export const meta = metaSchema.parse({
  id: 'line-sorter',
  name: 'Line Sorter',
  description:
    'Sort lines in deterministic order, with optional deduplication.',
  category: 'Text',
  keywords: ['line-sorter', 'text', 'sort', 'deduplicate', 'unique'],
  icon: Wrench,
});
