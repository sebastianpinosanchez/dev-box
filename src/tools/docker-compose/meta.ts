import { Wrench } from 'lucide-react';
import { metaSchema } from '@/lib/tool';
export const meta = metaSchema.parse({
  id: 'docker-compose',
  name: 'docker run → Compose',
  description: 'Convert common docker run options into a Compose service.',
  category: 'Misc',
  keywords: ['docker-compose', 'misc'],
  icon: Wrench,
});
