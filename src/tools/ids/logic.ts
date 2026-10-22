import { v4, v7, validate, version } from 'uuid';
import { ulid } from 'ulid';
import { nanoid } from 'nanoid';
import { integer, result, type Runner } from '@/lib/tool';
export const run: Runner = (input, o) => {
  if (o.mode === 'Validate') {
    if (!validate(input.trim())) throw new Error('Invalid UUID.');
    return result({ valid: true, version: version(input.trim()) });
  }
  const generate =
    o.kind === 'UUID v7'
      ? v7
      : o.kind === 'ULID'
        ? ulid
        : o.kind === 'NanoID'
          ? nanoid
          : v4;
  return result(
    Array.from({ length: integer(o.count || '1', 1, 10000) }, () =>
      generate(),
    ).join('\n'),
  );
};
