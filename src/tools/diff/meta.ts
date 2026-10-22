import { Wrench } from 'lucide-react';
import { metaSchema } from '@/lib/tool';
export const meta = metaSchema.parse({
  id: 'diff',
  name: 'Diff checker',
  description: 'Compare text line by line, inline or side by side.',
  category: 'Formatting & Data',
  keywords: ['diff', 'formatting & data'],
  icon: Wrench,
});
