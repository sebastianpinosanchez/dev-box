import { describe, it, expect } from 'vitest';
import { run } from './logic';
describe('env', () => {
  it('parses quoted comments safely', async () => {
    expect(
      JSON.parse((await run('A="hello # world"\nB=value # comment', {})).text),
    ).toEqual({ A: 'hello # world', B: 'value' });
  });
  it('round trips multiline values as escaped strings', async () => {
    const env = await run('{"A":"line1\\nline2"}', { mode: 'JSON to env' });
    expect(JSON.parse((await run(env.text, {})).text).A).toBe('line1\nline2');
  });
  it('rejects malformed assignments', async () => {
    expect(() => run('bad line', {})).toThrow();
  });
});
