import { Wrench } from 'lucide-react';
import { metaSchema } from '@/lib/tool';
export const meta = metaSchema.parse({
  id: 'hash',
  name: 'Hash & HMAC',
  description:
    'Compute text or file digests and keyed message authentication codes.',
  category: 'Crypto & Security',
  keywords: ['hash', 'crypto & security'],
  icon: Wrench,
});
