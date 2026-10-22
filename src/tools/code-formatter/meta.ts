import { Wrench } from 'lucide-react';
import { metaSchema } from '@/lib/tool';
export const meta = metaSchema.parse({
  id: 'code-formatter',
  name: 'Code formatter',
  description: 'Format or minify HTML, XML, CSS and JavaScript.',
  category: 'Formatting & Data',
  keywords: ['code-formatter', 'formatting & data'],
  icon: Wrench,
});
