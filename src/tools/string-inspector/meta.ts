import { Wrench } from 'lucide-react';
import { metaSchema } from '@/lib/tool';
export const meta = metaSchema.parse({
  id: 'string-inspector',
  name: 'String inspector',
  description:
    'Count Unicode characters, graphemes, words, lines and UTF-8 bytes.',
  category: 'Text',
  keywords: ['string-inspector', 'text'],
  icon: Wrench,
});
