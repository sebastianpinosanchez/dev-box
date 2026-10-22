import { Wrench } from 'lucide-react';
import { metaSchema } from '@/lib/tool';
export const meta = metaSchema.parse({
  id: 'url',
  name: 'URL studio',
  description: 'Encode components and inspect or edit URL query parameters.',
  category: 'Encoding',
  keywords: ['url', 'encoding'],
  icon: Wrench,
});
