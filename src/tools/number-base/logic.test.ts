import { describe, it, expect } from 'vitest';
import { run } from './logic';
describe('number-base', () => {
  it('retains precision beyond safe integers', async () => {
    expect((await run('9007199254740993', { from: '10', to: '16' })).text).toBe(
      '20000000000001',
    );
  });
  it('converts negatives', async () => {
    expect((await run('-ff', { from: '16', to: '2' })).text).toBe('-11111111');
  });
  it('rejects invalid digits and bases', async () => {
    expect(() => run('2', { from: '2', to: '10' })).toThrow();
    expect(() => run('1', { from: '1', to: '10' })).toThrow();
  });
});
