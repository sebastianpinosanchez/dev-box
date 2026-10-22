import { result, type Runner } from '@/lib/tool';
// Deliberately deterministic: compare Unicode code units, independent of locale.
export const run: Runner = (input, o) => {
  if (input === '') return result('');
  const lines = input.replace(/\r\n?/g, '\n').split('\n');
  const sorted = (o.unique === 'true' ? [...new Set(lines)] : lines).sort();
  if (o.direction === 'Descending') sorted.reverse();
  return result(sorted.join('\n'));
};
