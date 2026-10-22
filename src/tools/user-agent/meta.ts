import { Wrench } from 'lucide-react';
import { metaSchema } from '@/lib/tool';
export const meta = metaSchema.parse({
  id: 'user-agent',
  name: 'User-agent parser',
  description: 'Identify browser, operating system, device and engine.',
  category: 'Web & Network',
  keywords: ['user-agent', 'web & network'],
  icon: Wrench,
});
