import { describe, it, expect } from 'vitest';
import { run } from './logic';
describe('slug-escape', () => {
  it('normalizes accents', async () => {
    expect((await run('  Héllo, World! ', {})).text).toBe('hello-world');
  });
  it('round trips JSON and shell', async () => {
    for (const format of ['JSON', 'Shell']) {
      const encoded = await run("a'b\n", { mode: 'Escape', format });
      expect((await run(encoded.text, { mode: 'Unescape', format })).text).toBe(
        "a'b\n",
      );
    }
  });
  it('rejects non-string JSON', async () => {
    expect(() => run('{}', { mode: 'Unescape', format: 'JSON' })).toThrow();
  });
});
