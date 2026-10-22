import { Wrench } from 'lucide-react';
import { metaSchema } from '@/lib/tool';
export const meta = metaSchema.parse({
  id: 'quick-reference',
  name: 'Cron & regex reference',
  description: 'Search cron fields and regex building blocks.',
  category: 'Reference',
  keywords: ['quick-reference', 'reference'],
  icon: Wrench,
});
