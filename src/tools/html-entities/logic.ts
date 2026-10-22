import * as he from 'he';
import { result, type Runner } from '@/lib/tool';
export const run: Runner = (input, o) =>
  result(
    o.mode === 'Decode'
      ? he.decode(input)
      : he.encode(input, { useNamedReferences: true }),
  );
