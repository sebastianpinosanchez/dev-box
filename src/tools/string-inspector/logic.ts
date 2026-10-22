import { utf8 } from '@/lib/bytes';
import type { Runner } from '@/lib/tool';
export const run: Runner = (input) => {
  const values = {
    'Unicode characters': Array.from(input).length,
    Graphemes: Array.from(
      new Intl.Segmenter(undefined, { granularity: 'grapheme' }).segment(input),
    ).length,
    'UTF-16 units': input.length,
    Words: Array.from(
      new Intl.Segmenter(undefined, { granularity: 'word' }).segment(input),
    ).filter((s) => s.isWordLike).length,
    Lines: input ? input.split(/\r\n|\r|\n/).length : 0,
    'UTF-8 bytes': utf8(input).length,
  };
  return {
    text: JSON.stringify(values, null, 2),
    rows: Object.entries(values).map(([metric, value]) => ({
      metric,
      value: String(value),
    })),
  };
};
