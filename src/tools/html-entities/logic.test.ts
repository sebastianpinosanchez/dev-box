import { describe, it, expect } from 'vitest';
import { run } from './logic';
describe('html-entities', () => {
  it('round trips entities', async () => {
    const encoded = await run('<b>É & "hi"</b>', {});
    expect((await run(encoded.text, { mode: 'Decode' })).text).toBe(
      '<b>É & "hi"</b>',
    );
  });
  it('decodes numeric characters', async () => {
    expect((await run('&#128075;', { mode: 'Decode' })).text).toBe('👋');
  });
  it('handles empty text', async () => {
    expect((await run('', {})).text).toBe('');
  });
});
