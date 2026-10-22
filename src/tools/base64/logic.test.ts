import { describe, it, expect } from 'vitest';
import { run } from './logic';
describe('base64', () => {
  it('encodes UTF-8', async () => {
    expect((await run('Hello 👋', {})).text).toBe('SGVsbG8g8J+Riw==');
  });
  it('decodes URL-safe content', async () => {
    expect((await run('SGVsbG8g8J-Riw', { mode: 'Decode' })).text).toBe(
      'Hello 👋',
    );
  });
  it('rejects malformed input', async () => {
    await expect(async () => run('a===', { mode: 'Decode' })).rejects.toThrow();
  });
  it('preserves binary files', async () => {
    const encoded = await run('', {}, new Uint8Array([0, 255, 1]));
    expect(encoded.text).toBe('AP8B');
    expect((await run(encoded.text, { mode: 'Decode' })).download?.base64).toBe(
      'AP8B',
    );
  });
  it('handles empty text', async () => {
    expect((await run('', {})).text).toBe('');
  });
});
