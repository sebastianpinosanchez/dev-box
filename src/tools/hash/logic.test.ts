import { describe, it, expect } from 'vitest';
import { run } from './logic';
describe('hash', () => {
  it('SHA256 known vector', async () => {
    expect((await run('abc', {})).text).toBe(
      'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad',
    );
  });
  it('MD5 empty vector', async () => {
    expect((await run('', { algorithm: 'MD5' })).text).toBe(
      'd41d8cd98f00b204e9800998ecf8427e',
    );
  });
  it('HMAC RFC vector', async () => {
    expect(
      (
        await run('The quick brown fox jumps over the lazy dog', {
          mode: 'HMAC',
          algorithm: 'SHA-256',
          key: 'key',
        })
      ).text,
    ).toBe('f7bc83f430538424b13298e6aa6fb143ef4d59a14946175997479dbc2d1a3cd8');
  });
  it('rejects unknown algorithm', async () => {
    await expect(async () => run('a', { algorithm: 'bad' })).rejects.toThrow();
  });
});
