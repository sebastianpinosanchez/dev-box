import { utf8, textFromBytes } from '@/lib/bytes';
import { result, type Runner } from '@/lib/tool';
export const run: Runner = (input, o) => {
  const from = o.from || 'Text',
    to = o.to || 'Hex';
  let text = input;
  if (from === 'Unicode') {
    const parts = input.trim().split(/\s+/).filter(Boolean);
    text = parts
      .map((p) => {
        if (!/^(?:U\+)?[0-9a-f]{1,6}$/i.test(p))
          throw new Error('Use Unicode code points such as U+0041.');
        const n = parseInt(p.replace(/^U\+/i, ''), 16);
        if (n > 0x10ffff || (n >= 0xd800 && n <= 0xdfff))
          throw new Error('Invalid Unicode scalar value.');
        return String.fromCodePoint(n);
      })
      .join('');
  } else if (from !== 'Text') {
    const base = from === 'Hex' ? 16 : from === 'Binary' ? 2 : 10;
    const parts = input.trim().split(/\s+/).filter(Boolean);
    const pattern =
      base === 16 ? /^[0-9a-f]{2}$/i : base === 2 ? /^[01]{8}$/ : /^\d{1,3}$/;
    const nums = parts.map((p) => {
      const n = parseInt(p, base);
      if (!pattern.test(p) || n > (from === 'ASCII' ? 127 : 255))
        throw new Error(`Invalid ${from} byte: ${p}`);
      return n;
    });
    text = textFromBytes(Uint8Array.from(nums));
  }
  if (to === 'Text') return result(text);
  if (to === 'Unicode')
    return result(
      Array.from(
        text,
        (c) =>
          `U+${c.codePointAt(0)!.toString(16).toUpperCase().padStart(4, '0')}`,
      ).join(' '),
    );
  const bytes = utf8(text);
  if (to === 'ASCII' && bytes.some((b) => b > 127))
    throw new Error(
      'ASCII only supports characters U+0000 through U+007F. Use UTF-8 hex or Unicode instead.',
    );
  return result(
    Array.from(bytes, (b) =>
      b
        .toString(to === 'Hex' ? 16 : to === 'Binary' ? 2 : 10)
        .padStart(to === 'Hex' ? 2 : to === 'Binary' ? 8 : 1, '0'),
    ).join(' '),
  );
};
