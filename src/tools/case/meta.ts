import { Wrench } from 'lucide-react';
import { metaSchema } from '@/lib/tool';
export const meta = metaSchema.parse({
  id: 'case',
  name: 'Case converter',
  description: 'Switch between common naming conventions.',
  category: 'Text',
  keywords: ['case', 'text'],
  icon: Wrench,
});
