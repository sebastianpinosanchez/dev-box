import { Wrench } from 'lucide-react';
import { metaSchema } from '@/lib/tool';
export const meta = metaSchema.parse({
  id: 'jwt',
  name: 'JWT studio',
  description: 'Inspect claims, verify signatures, and sign tokens locally.',
  category: 'Encoding',
  keywords: ['jwt', 'encoding'],
  icon: Wrench,
});
