import { Wrench } from 'lucide-react';
import { metaSchema } from '@/lib/tool';
export const meta = metaSchema.parse({
  id: 'lorem',
  name: 'Lorem ipsum',
  description: 'Generate placeholder paragraphs for a design or prototype.',
  category: 'Text',
  keywords: ['lorem', 'text'],
  icon: Wrench,
});
