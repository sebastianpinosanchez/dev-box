import { describe, it, expect } from 'vitest';
import { run } from './logic';
describe('password', () => {
  it('uses only selected alphabet', async () => {
    const r = await run('', {
      length: '64',
      count: '3',
      lower: 'false',
      upper: 'false',
      digits: 'true',
      symbols: 'false',
    });
    expect(r.text.split('\n')).toHaveLength(3);
    expect(r.text.split('\n').every((p) => /^\d{64}$/.test(p))).toBe(true);
  });
  it('reports entropy', async () => {
    expect(
      (
        await run('', {
          length: '10',
          lower: 'false',
          upper: 'false',
          symbols: 'false',
        })
      ).status,
    ).toContain('33.2');
  });
  it('rejects empty alphabet', async () => {
    expect(() =>
      run('', {
        lower: 'false',
        upper: 'false',
        digits: 'false',
        symbols: 'false',
      }),
    ).toThrow();
  });
});
