import { describe, it, expect } from 'vitest';
import { run } from './logic';
describe('sql', () => {
  it('formats postgres', async () => {
    expect(
      (await run('select id from users', { dialect: 'postgresql' })).text,
    ).toContain('SELECT');
  });
  it('preserves quoted values', async () => {
    expect((await run("select 'a  b'", {})).text).toContain("'a  b'");
  });
  it('rejects empty', async () => {
    expect(() => run('', {})).toThrow();
  });
});
