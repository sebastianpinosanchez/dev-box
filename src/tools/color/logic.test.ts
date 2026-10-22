import { describe, it, expect } from 'vitest';
import { run } from './logic';
describe('color', () => {
  it('black and white contrast', async () => {
    const r = await run('#000', { background: '#fff' });
    expect(r.status).toContain('21.00:1');
    expect(r.text).toContain('Pass');
  });
  it('OKLCH conversion', async () => {
    expect((await run('oklch(0.6 0.1 200)', {})).text).toContain('HEX');
  });
  it('rejects invalid or transparent colors', async () => {
    expect(() => run('not-a-color', {})).toThrow();
    expect(() => run('#fff8', {})).toThrow();
  });
});
