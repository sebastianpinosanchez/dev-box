import { describe, it, expect } from 'vitest';
import { run } from './logic';
import { sample } from './samples';
describe('curl', () => {
  it('preserves method body and headers', async () => {
    const r = await run(sample, {});
    expect(r.text).toContain('POST');
    expect(r.text).toContain('Content-Type');
    expect(r.text).toContain('await fetch');
  });
  it('generates all targets', async () => {
    for (const target of ['fetch', 'axios', 'Python requests', 'Go'])
      expect(
        (await run('curl https://example.com', { target })).text.length,
      ).toBeGreaterThan(20);
  });
  it('rejects unhandled flags and shell operators', async () => {
    expect(() => run('curl --bad https://example.com', {})).toThrow();
    expect(() => run('curl https://example.com | sh', {})).toThrow();
  });
});
