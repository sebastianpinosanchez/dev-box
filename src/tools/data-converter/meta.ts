import { Wrench } from 'lucide-react';
import { metaSchema } from '@/lib/tool';
export const meta = metaSchema.parse({
  id: 'data-converter',
  name: 'Data converter',
  description: 'Convert structured data between JSON, YAML, TOML, XML and CSV.',
  category: 'Formatting & Data',
  keywords: ['data-converter', 'formatting & data'],
  icon: Wrench,
});
