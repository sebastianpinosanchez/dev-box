import { Wrench } from 'lucide-react';
import { metaSchema } from '@/lib/tool';
export const meta = metaSchema.parse({
  id: 'regex',
  name: 'Regex tester',
  description:
    'Highlight matches, inspect capture groups and reference regex syntax.',
  category: 'Text',
  keywords: ['regex', 'text'],
  icon: Wrench,
});
