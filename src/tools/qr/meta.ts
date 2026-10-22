import { Wrench } from 'lucide-react';
import { metaSchema } from '@/lib/tool';
export const meta = metaSchema.parse({
  id: 'qr',
  name: 'QR code',
  description: 'Generate QR codes or decode one from an uploaded image.',
  category: 'Misc',
  keywords: ['qr', 'misc'],
  icon: Wrench,
});
