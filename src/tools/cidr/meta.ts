import { Wrench } from 'lucide-react';
import { metaSchema } from '@/lib/tool';
export const meta = metaSchema.parse({
  id: 'cidr',
  name: 'Subnet calculator',
  description: 'Calculate IPv4 and IPv6 networks, masks and host ranges.',
  category: 'Web & Network',
  keywords: ['cidr', 'web & network'],
  icon: Wrench,
});
