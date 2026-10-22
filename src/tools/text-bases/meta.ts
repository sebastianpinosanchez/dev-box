import { Wrench } from 'lucide-react';
import { metaSchema } from '@/lib/tool';
export const meta = metaSchema.parse({
  id: 'text-bases',
  name: 'Text & bytes',
  description:
    'Convert UTF-8 text, hex, binary, ASCII and Unicode code points.',
  category: 'Encoding',
  keywords: ['text-bases', 'encoding'],
  icon: Wrench,
});
