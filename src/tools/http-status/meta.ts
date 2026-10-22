import { Wrench } from 'lucide-react';
import { metaSchema } from '@/lib/tool';
export const meta = metaSchema.parse({
  id: 'http-status',
  name: 'HTTP status codes',
  description: 'Search offline HTTP status definitions.',
  category: 'Web & Network',
  keywords: ['http-status', 'web & network'],
  icon: Wrench,
});
