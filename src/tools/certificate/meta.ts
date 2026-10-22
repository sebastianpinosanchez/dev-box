import { Wrench } from 'lucide-react';
import { metaSchema } from '@/lib/tool';
export const meta = metaSchema.parse({
  id: 'certificate',
  name: 'Certificate decoder',
  description:
    'Inspect X.509 subject, issuer, validity and subject alternative names.',
  category: 'Crypto & Security',
  keywords: ['certificate', 'crypto & security'],
  icon: Wrench,
});
