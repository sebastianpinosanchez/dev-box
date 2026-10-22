import { describe, it, expect } from 'vitest';
import { run } from './logic';
describe('text-bases', () => {
  it('round trips UTF-8', async () => {
    const hex = await run('É🌍', { from: 'Text', to: 'Hex' });
    expect((await run(hex.text, { from: 'Hex', to: 'Text' })).text).toBe('É🌍');
  });
  it('converts code points', async () => {
    expect((await run('U+1F30D', { from: 'Unicode', to: 'Text' })).text).toBe(
      '🌍',
    );
  });
  it('rejects invalid ASCII and bytes', async () => {
    expect(() => run('é', { to: 'ASCII' })).toThrow();
    expect(() => run('gg', { from: 'Hex' })).toThrow();
    expect(() => run('U+D800', { from: 'Unicode' })).toThrow();
  });
});
