import { describe, it, expect } from 'vitest';
import { run } from './logic';
describe('regex', () => {
  it('captures groups', async () => {
    const r = await run('abc 123', { pattern: '(\\d+)', flags: 'g' });
    expect(r.rows?.[0].text).toBe('123');
    expect(r.rows?.[0].groups).toBe('["123"]');
  });
  it('escapes HTML when highlighting', async () => {
    const r = await run('<script>', { pattern: 'script' });
    expect(r.html).toContain('&lt;');
    expect(r.html).not.toContain('<script>');
  });
  it('rejects invalid patterns', async () => {
    expect(() => run('a', { pattern: '[' })).toThrow();
  });
  it('handles zero length matches', async () => {
    expect(
      (await run('ab', { pattern: '(?:)', flags: 'g' })).rows,
    ).toHaveLength(3);
  });
});

it('honors the absence of a global flag', async () => {
  expect((await run('aa', { pattern: 'a', flags: '' })).rows).toHaveLength(1);
});
