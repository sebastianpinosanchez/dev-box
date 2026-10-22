import {
  fromBase64,
  toBase64,
  utf8,
  textFromBytes,
  imageMime,
} from '@/lib/bytes';
import type { Runner } from '@/lib/tool';
// Reference tool: pure conversion, no UI state, no storage and no network.
// Binary uploads preserve their bytes; text uses UTF-8 rather than Latin-1.
export const run: Runner = (input, options, bytes) => {
  if (options.mode !== 'Decode')
    return { text: toBase64(bytes ?? utf8(input), options.urlSafe === 'true') };
  const decoded = fromBase64(input);
  const mime = imageMime(decoded);
  let text: string;
  try {
    text = textFromBytes(decoded);
  } catch {
    text = `[${decoded.length} binary bytes — download below]`;
  }
  return {
    text,
    image: mime ? `data:${mime};base64,${toBase64(decoded)}` : undefined,
    download: {
      name: 'decoded.bin',
      type: mime ?? 'application/octet-stream',
      base64: toBase64(decoded),
    },
  };
};
