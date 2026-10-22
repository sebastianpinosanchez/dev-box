import { Wrench } from 'lucide-react';
import { metaSchema } from '@/lib/tool';
export const meta = metaSchema.parse({
  id: 'containers',
  name: 'Docker & Kubernetes',
  description: 'Docker, Compose and kubectl commands for local reference.',
  category: 'Reference',
  keywords: ['containers', 'reference'],
  icon: Wrench,
});
