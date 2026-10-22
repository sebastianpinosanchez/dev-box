import { Wrench } from 'lucide-react';
import { metaSchema } from '@/lib/tool';
export const meta = metaSchema.parse({
  id: 'color',
  name: 'Color studio',
  description: 'Convert HEX, RGB, HSL and OKLCH, and check WCAG contrast.',
  category: 'Web & Network',
  keywords: ['color', 'web & network'],
  icon: Wrench,
});
