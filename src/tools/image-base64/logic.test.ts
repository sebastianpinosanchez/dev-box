import { describe, it, expect } from 'vitest';
import { run } from './logic';
import { sample } from './samples';
describe('image-base64', () => {
  it('detects PNG', async () => {
    expect((await run(sample, {})).text).toMatch(/^data:image\/png;base64,/);
  });
  it('rejects non-images', async () => {
    expect(() => run('aGVsbG8=', {})).toThrow();
  });
});
