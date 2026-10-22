import { describe, it, expect } from 'vitest';
import { run } from './logic';
describe('mime', () => {
  it('returns bundled entries', async () => {
    expect((await run('', {})).rows!.length).toBeGreaterThan(5);
  });
  it('searches all columns', async () => {
    const all = await run('', {});
    const term = Object.values(all.rows![0])[0];
    expect((await run(term, {})).rows!.length).toBeGreaterThan(0);
  });
  it('unknown query returns no matches', async () => {
    expect((await run('zzzz-no-such-reference', {})).rows).toHaveLength(0);
  });
});
