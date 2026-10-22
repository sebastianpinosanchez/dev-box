import { Wrench } from 'lucide-react';
import { metaSchema } from '@/lib/tool';
export const meta = metaSchema.parse({
  id: 'json',
  name: 'JSON workbench',
  description:
    'Format, validate, minify, explore a tree or query with JSONPath.',
  category: 'Formatting & Data',
  keywords: ['json', 'formatting & data'],
  icon: Wrench,
});
