import { Wrench } from 'lucide-react';
import { metaSchema } from '@/lib/tool';
export const meta = metaSchema.parse({
  id: 'number-base',
  name: 'Number bases',
  description: 'Convert integers precisely between bases 2–36.',
  category: 'Encoding',
  keywords: ['number-base', 'encoding'],
  icon: Wrench,
});
