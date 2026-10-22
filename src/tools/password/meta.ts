import { Wrench } from 'lucide-react';
import { metaSchema } from '@/lib/tool';
export const meta = metaSchema.parse({
  id: 'password',
  name: 'Password generator',
  description:
    'Cryptographically random secrets with configurable character sets.',
  category: 'Crypto & Security',
  keywords: ['password', 'crypto & security'],
  icon: Wrench,
});
