import { Wrench } from 'lucide-react';
import { metaSchema } from '@/lib/tool';
export const meta = metaSchema.parse({
  id: 'markdown',
  name: 'Markdown preview',
  description:
    'Preview GitHub-flavored Markdown without loading remote content.',
  category: 'Formatting & Data',
  keywords: ['markdown', 'formatting & data'],
  icon: Wrench,
});
