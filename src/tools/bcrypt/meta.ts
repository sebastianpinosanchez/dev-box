import { Wrench } from 'lucide-react';
import { metaSchema } from '@/lib/tool';
export const meta = metaSchema.parse({
  id: 'bcrypt',
  name: 'Bcrypt',
  description: 'Hash passwords and verify bcrypt hashes in an isolated worker.',
  category: 'Crypto & Security',
  keywords: ['bcrypt', 'crypto & security'],
  icon: Wrench,
});
