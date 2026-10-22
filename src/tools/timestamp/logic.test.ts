import { describe, it, expect } from 'vitest';
import { run } from './logic';
describe('timestamp', () => {
  it('converts seconds', async () => {
    expect(JSON.parse((await run('0', {})).text).ISO).toBe(
      '1970-01-01T00:00:00.000Z',
    );
  });
  it('converts negative milliseconds', async () => {
    expect(
      JSON.parse((await run('-1000', { unit: 'Milliseconds' })).text).seconds,
    ).toBe('-1');
  });
  it('rejects ambiguous dates', async () => {
    expect(() => run('01/02/2026', {})).toThrow();
  });
});
