import { Wrench } from 'lucide-react';
import { metaSchema } from '@/lib/tool';
export const meta = metaSchema.parse({
  id: 'git',
  name: 'Git cheat sheet',
  description:
    'Find commands for everyday workflows and recovering from mistakes.',
  category: 'Reference',
  keywords: ['git', 'reference'],
  icon: Wrench,
});
