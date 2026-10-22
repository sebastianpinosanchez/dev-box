import { describe, it, expect } from 'vitest';
import { run } from './logic';
describe('line sorter', () => {
  it('sorts deterministically and retains duplicates', async () => {
    expect((await run('z\nA\na\na', {})).text).toBe('A\na\na\nz');
  });
  it('normalizes CRLF and removes duplicates', async () => {
    expect(
      (await run('b\r\na\r\nb', { direction: 'Descending', unique: 'true' }))
        .text,
    ).toBe('b\na');
  });
  it('handles empty input', async () => {
    expect((await run('', {})).text).toBe('');
  });
});
