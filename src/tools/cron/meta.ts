import { Wrench } from 'lucide-react';
import { metaSchema } from '@/lib/tool';
export const meta = metaSchema.parse({
  id: 'cron',
  name: 'Cron explorer',
  description:
    'Explain a cron schedule and calculate the next ten occurrences.',
  category: 'Time & Scheduling',
  keywords: ['cron', 'time & scheduling'],
  icon: Wrench,
});
