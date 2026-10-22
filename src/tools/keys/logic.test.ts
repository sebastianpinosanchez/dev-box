import { describe, it, expect } from 'vitest';
import { run } from './logic';
describe('keys', () => {
  it('exports PEM and SSH', async () => {
    const r = await run('', { bits: '2048' });
    expect(r.text).toContain('BEGIN PRIVATE KEY');
    expect(r.text).toContain('BEGIN PUBLIC KEY');
    expect(r.text).toContain('ssh-rsa AAAAB3NzaC1yc2E');
  });
  it('rejects insecure key sizes', async () => {
    await expect(async () => run('', { bits: '512' })).rejects.toThrow();
  });
});
