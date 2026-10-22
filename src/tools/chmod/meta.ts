import { Wrench } from 'lucide-react';
import { metaSchema } from '@/lib/tool';
export const meta = metaSchema.parse({
  id: 'chmod',
  name: 'chmod calculator',
  description: 'Translate permissions between octal and symbolic notation.',
  category: 'Reference',
  keywords: ['chmod', 'reference'],
  icon: Wrench,
});
