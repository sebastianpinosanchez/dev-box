import { Wrench } from 'lucide-react';
import { metaSchema } from '@/lib/tool';
export const meta = metaSchema.parse({
  id: 'timestamp',
  name: 'Timestamp converter',
  description:
    'Convert Unix timestamps and ISO dates, with an explicit timezone.',
  category: 'Time & Scheduling',
  keywords: ['timestamp', 'time & scheduling'],
  icon: Wrench,
});
