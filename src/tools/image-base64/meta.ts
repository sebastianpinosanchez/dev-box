import { Wrench } from 'lucide-react';
import { metaSchema } from '@/lib/tool';
export const meta = metaSchema.parse({
  id: 'image-base64',
  name: 'Image to data URI',
  description: 'Convert local images to Base64 and portable data URIs.',
  category: 'Misc',
  keywords: ['image-base64', 'misc'],
  icon: Wrench,
});
