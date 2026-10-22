import { Wrench } from 'lucide-react';
import { metaSchema } from '@/lib/tool';
export const meta = metaSchema.parse({
  id: 'env',
  name: '.env ⇄ JSON',
  description: 'Convert environment variables and JSON string maps locally.',
  category: 'Misc',
  keywords: ['env', 'misc'],
  icon: Wrench,
});
