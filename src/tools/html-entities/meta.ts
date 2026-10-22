import { Wrench } from 'lucide-react';
import { metaSchema } from '@/lib/tool';
export const meta = metaSchema.parse({
  id: 'html-entities',
  name: 'HTML entities',
  description: 'Encode and decode named and numeric HTML entities.',
  category: 'Encoding',
  keywords: ['html-entities', 'encoding'],
  icon: Wrench,
});
