import { describe, it, expect } from 'vitest';
import { run } from './logic';
import { sample } from './samples';
describe('certificate', () => {
  it('decodes subject and SANs', async () => {
    const r = await run(sample, {});
    expect(r.text).toContain('devbox.local');
    expect(r.status).toContain('trust not verified');
  });
  it('rejects malformed PEM', async () => {
    expect(() => run('not a certificate', {})).toThrow();
  });
});
