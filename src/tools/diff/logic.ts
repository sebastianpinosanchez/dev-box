import { diffLines } from 'diff';
import type { Runner } from '@/lib/tool';
export const run: Runner = (input, o) => {
  const diff = diffLines(input, o.other || '');
  return {
    text: diff
      .map((p) =>
        p.value
          .split('\n')
          .filter((line, i, all) => line || i < all.length - 1)
          .map((line) => `${p.added ? '+' : p.removed ? '-' : ' '} ${line}`)
          .join('\n'),
      )
      .join('\n'),
    diff,
  };
};
