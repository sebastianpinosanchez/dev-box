import { describe, it, expect } from 'vitest';
import { run } from './logic';
describe('json', () => {
  it('minifies', async () => {
    expect((await run('{ "a": 1 }', { mode: 'Minify' })).text).toBe('{"a":1}');
  });
  it('queries without script evaluation', async () => {
    expect(
      (await run('{"a":[1,2]}', { mode: 'Query', query: '$.a[1]' })).text,
    ).toBe('[\n  2\n]');
  });
  it('reports error location', async () => {
    expect(() => run('{\n bad}', {})).toThrow(/line.*column/);
  });
});
