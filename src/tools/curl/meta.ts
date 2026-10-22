import { Wrench } from 'lucide-react';
import { metaSchema } from '@/lib/tool';
export const meta = metaSchema.parse({
  id: 'curl',
  name: 'cURL to code',
  description: 'Translate a cURL request into fetch, axios, Python or Go.',
  category: 'Web & Network',
  keywords: ['curl', 'web & network'],
  icon: Wrench,
});
