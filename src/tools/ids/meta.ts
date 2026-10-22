import { Wrench } from 'lucide-react';
import { metaSchema } from '@/lib/tool';
export const meta = metaSchema.parse({
  id: 'ids',
  name: 'UUID / ULID / NanoID',
  description: 'Generate identifiers in bulk or validate a UUID.',
  category: 'Crypto & Security',
  keywords: ['ids', 'crypto & security'],
  icon: Wrench,
});
