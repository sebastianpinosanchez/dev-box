import { Wrench } from 'lucide-react';
import { metaSchema } from '@/lib/tool';
export const meta = metaSchema.parse({
  id: 'sql',
  name: 'SQL formatter',
  description: 'Readable SQL with dialect-aware formatting.',
  category: 'Formatting & Data',
  keywords: ['sql', 'formatting & data'],
  icon: Wrench,
});
