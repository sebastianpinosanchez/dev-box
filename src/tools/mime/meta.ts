import { Wrench } from 'lucide-react';
import { metaSchema } from '@/lib/tool';
export const meta = metaSchema.parse({
  id: 'mime',
  name: 'MIME types',
  description: 'Look up common file extensions and media types.',
  category: 'Web & Network',
  keywords: ['mime', 'web & network'],
  icon: Wrench,
});
