import { imageMime, toBase64, fromBase64 } from '@/lib/bytes';
import type { Runner } from '@/lib/tool';
export const run: Runner = (input, _o, bytes) => {
  const data = bytes ?? fromBase64(input.replace(/^data:[^,]*,/, ''));
  const mime = imageMime(data);
  if (!mime) throw new Error('Upload a PNG, JPEG, GIF or WebP image.');
  const uri = `data:${mime};base64,${toBase64(data)}`;
  return { text: uri, image: uri };
};
