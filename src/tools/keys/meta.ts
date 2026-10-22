import { Wrench } from 'lucide-react';
import { metaSchema } from '@/lib/tool';
export const meta = metaSchema.parse({
  id: 'keys',
  name: 'RSA / SSH keys',
  description: 'Generate RSA key pairs as PEM and OpenSSH public keys.',
  category: 'Crypto & Security',
  keywords: ['keys', 'crypto & security'],
  icon: Wrench,
});
