import { parse } from 'shell-quote';
import { result, type Runner } from '@/lib/tool';
export const run: Runner = (input, o) => {
  if (!o.mode || o.mode === 'Slugify')
    return result(
      input
        .normalize('NFKD')
        .replace(/\p{M}/gu, '')
        .toLowerCase()
        .replace(/[^\p{L}\p{N}]+/gu, '-')
        .replace(/^-|-$/g, ''),
    );
  if (o.mode === 'Unescape') {
    if (o.format === 'Shell') {
      const tokens = parse(input, () => {
        throw new Error('Shell variable expansion is not supported.');
      });
      if (tokens.length !== 1 || typeof tokens[0] !== 'string')
        throw new Error('Enter one quoted shell argument.');
      return result(tokens[0]);
    }
    if (o.format === 'Regex')
      return result(input.replace(/\\([.*+?^${}()|[\]\\])/g, '$1'));
    const value: unknown = JSON.parse(input);
    if (typeof value !== 'string')
      throw new Error('Enter a JSON string including quotes.');
    return result(value);
  }
  if (o.format === 'Shell')
    return result("'" + input.replaceAll("'", "'\\''") + "'");
  if (o.format === 'Regex')
    return result(input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  return result(JSON.stringify(input));
};
