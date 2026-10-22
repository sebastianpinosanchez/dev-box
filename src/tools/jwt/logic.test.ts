import { describe, it, expect } from 'vitest';
import { run } from './logic';
describe('jwt', () => {
  it('signs and verifies HS256', async () => {
    const key = 'a strong sample secret used only in tests';
    const signed = await run('{"sub":"123"}', {
      mode: 'Sign',
      algorithm: 'HS256',
      key,
    });
    const verified = await run(signed.text, {
      mode: 'Verify',
      algorithm: 'HS256',
      key,
    });
    expect(verified.status).toContain('Valid signature');
    await expect(async () =>
      run(signed.text, { mode: 'Verify', algorithm: 'HS256', key: 'wrong' }),
    ).rejects.toThrow();
  });
  it('labels expired unverified claims', async () => {
    const signed = await run('{"exp":1}', {
      mode: 'Sign',
      key: 'test',
      algorithm: 'HS256',
    });
    expect((await run(signed.text, { mode: 'Decode' })).status).toContain(
      'expired',
    );
  });
  it('rejects broken tokens', async () => {
    await expect(async () => run('bad', {})).rejects.toThrow();
  });
  it('rejects algorithm confusion', async () => {
    const signed = await run('{}', {
      mode: 'Sign',
      key: 'test',
      algorithm: 'HS256',
    });
    await expect(async () =>
      run(signed.text, { mode: 'Verify', key: 'test', algorithm: 'HS512' }),
    ).rejects.toThrow();
  });
});

it('signs and verifies RSA and elliptic-curve tokens', async () => {
  const { generateKeyPair, exportPKCS8, exportSPKI } = await import('jose');
  for (const algorithm of ['RS256', 'ES256']) {
    const pair = await generateKeyPair(algorithm, { extractable: true });
    const signed = await run('{"sub":"local-test"}', {
      mode: 'Sign',
      algorithm,
      key: await exportPKCS8(pair.privateKey),
    });
    const verified = await run(signed.text, {
      mode: 'Verify',
      algorithm,
      key: await exportSPKI(pair.publicKey),
    });
    expect(verified.status).toContain('Valid signature');
  }
});
