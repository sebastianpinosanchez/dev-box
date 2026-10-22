import { describe, it, expect } from 'vitest';
import { run } from './logic';
describe('url', () => {
  it('preserves duplicate params', async () => {
    expect((await run('https://example.com/?a=1&a=2', {})).rows).toHaveLength(
      2,
    );
  });
  it('encodes and decodes Unicode', async () => {
    const encoded = await run('hello 🌍', { mode: 'Encode' });
    expect((await run(encoded.text, { mode: 'Decode' })).text).toBe('hello 🌍');
  });
  it('rejects malformed escapes', async () => {
    expect(() => run('%ZZ', { mode: 'Decode' })).toThrow();
  });
});
