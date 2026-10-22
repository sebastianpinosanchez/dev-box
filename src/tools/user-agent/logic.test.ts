import { describe, it, expect } from 'vitest';
import { run } from './logic';
import { sample } from './samples';
describe('user-agent', () => {
  it('parses browser', async () => {
    expect(JSON.parse((await run(sample, {})).text).browser.name).toBe(
      'Chrome',
    );
  });
  it('unknown stays unknown', async () => {
    expect(
      JSON.parse((await run('custom', {})).text).browser.name,
    ).toBeUndefined();
  });
  it('rejects empty', async () => {
    expect(() => run('', {})).toThrow();
  });
});
