import { Wrench } from 'lucide-react';
import { metaSchema } from '@/lib/tool';
export const meta = metaSchema.parse({
  id: 'slug-escape',
  name: 'Slug & escape',
  description:
    'Build slugs or escape text for JSON, POSIX shell and regular expressions.',
  category: 'Text',
  keywords: ['slug-escape', 'text'],
  icon: Wrench,
});
