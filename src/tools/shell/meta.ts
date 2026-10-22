import { Wrench } from 'lucide-react';
import { metaSchema } from '@/lib/tool';
export const meta = metaSchema.parse({
  id: 'shell',
  name: 'Linux & shell',
  description: 'Search practical shell commands, flags and copyable examples.',
  category: 'Reference',
  keywords: ['shell', 'reference'],
  icon: Wrench,
});
