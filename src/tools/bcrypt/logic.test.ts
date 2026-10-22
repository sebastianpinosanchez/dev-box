import { describe, it, expect } from 'vitest';
import { run } from './logic';
describe('bcrypt', () => {
  it('hashes and verifies', async () => {
    const hash = (await run('test', { rounds: '4' })).text;
    expect((await run('test', { mode: 'Verify', hash })).text).toBe(
      'Password matches',
    );
    expect((await run('other', { mode: 'Verify', hash })).text).toBe(
      'Password does not match',
    );
  });
  it('rejects truncation', async () => {
    await expect(async () =>
      run('é'.repeat(37), { rounds: '4' }),
    ).rejects.toThrow(/72/);
  });
  it('rejects malformed hashes', async () => {
    await expect(async () =>
      run('test', { mode: 'Verify', hash: 'bad' }),
    ).rejects.toThrow();
  });
});
