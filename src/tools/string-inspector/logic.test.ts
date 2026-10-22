import { describe, it, expect } from 'vitest';
import { run } from './logic';
describe('string-inspector', () => {
  it('counts Unicode bytes and characters', async () => {
    const data = JSON.parse((await run('👋', {})).text);
    expect(data['Unicode characters']).toBe(1);
    expect(data['UTF-8 bytes']).toBe(4);
    expect(data['UTF-16 units']).toBe(2);
  });
  it('handles CRLF', async () => {
    expect(JSON.parse((await run('a\r\nb', {})).text).Lines).toBe(2);
  });
  it('empty has zero lines', async () => {
    expect(JSON.parse((await run('', {})).text).Lines).toBe(0);
  });
});
