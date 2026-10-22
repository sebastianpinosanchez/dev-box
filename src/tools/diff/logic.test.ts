import { describe, it, expect } from 'vitest';
import { run } from './logic';
describe('diff', () => {
  it('marks additions and removals', async () => {
    const r = await run('old\n', { other: 'new\n' });
    expect(r.diff?.some((p) => p.added)).toBe(true);
    expect(r.diff?.some((p) => p.removed)).toBe(true);
  });
  it('identical text is unchanged', async () => {
    expect(
      (await run('same', { other: 'same' })).diff?.some(
        (p) => p.added || p.removed,
      ),
    ).toBe(false);
  });
  it('handles empty text', async () => {
    expect((await run('', { other: '' })).text).toBe('');
  });
});
