import { JSONPath } from 'jsonpath-plus';
import { requireInput, result, type Runner } from '@/lib/tool';
export const run: Runner = (input, o) => {
  requireInput(input);
  let data: unknown;
  try {
    data = JSON.parse(input);
  } catch (error) {
    const message = (error as Error).message;
    const position = Number(
      /position (\d+)/.exec(message)?.[1] ?? input.length,
    );
    const before = input.slice(0, position);
    throw new Error(
      `${message} — line ${before.split('\n').length}, column ${position - before.lastIndexOf('\n')}`,
      { cause: error },
    );
  }
  if (o.mode === 'Minify') return result(JSON.stringify(data));
  if (o.mode === 'Validate') return { text: 'Valid JSON', status: 'Valid' };
  if (o.mode === 'Query')
    return result(
      JSONPath({ path: o.query || '$', json: data as object, eval: false }),
    );
  return {
    text: JSON.stringify(data, null, 2),
    tree: o.mode === 'Tree' ? data : undefined,
  };
};
