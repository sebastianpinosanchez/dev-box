import { Wrench } from 'lucide-react';
import { metaSchema } from '@/lib/tool';
export const meta = metaSchema.parse({
  id: 'base64',
  name: 'Base64',
  description:
    'Encode text or files. Decode safely, including URL-safe Base64.',
  category: 'Encoding',
  keywords: ['base64', 'encoding'],
  icon: Wrench,
});
