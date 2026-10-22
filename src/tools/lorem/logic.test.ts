import { describe, it, expect } from 'vitest';
import { run } from './logic';
describe('lorem', () => {
  it('generates requested paragraphs', async () => {
    expect(
      (await run('', { paragraphs: '2', sentences: '1' })).text.split('\n\n'),
    ).toHaveLength(2);
  });
  it('starts with Lorem', async () => {
    expect((await run('', {})).text).toMatch(/^Lorem ipsum/);
  });
  it('rejects excessive count', async () => {
    expect(() => run('', { paragraphs: '1000' })).toThrow();
  });
});
