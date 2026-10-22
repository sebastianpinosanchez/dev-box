import { describe, it, expect } from 'vitest';
import { run } from './logic';
describe('ids', () => {
  it('generates unique UUIDs', async () => {
    const ids = (await run('', { count: '10' })).text.split('\n');
    expect(new Set(ids).size).toBe(10);
    expect(ids.every((id) => /^.{14}4/.test(id))).toBe(true);
  });
  it('validates UUID', async () => {
    expect(
      (await run('550e8400-e29b-41d4-a716-446655440000', { mode: 'Validate' }))
        .text,
    ).toContain('true');
  });
  it('rejects bad UUID and excessive counts', async () => {
    expect(() => run('bad', { mode: 'Validate' })).toThrow();
    expect(() => run('', { count: '10001' })).toThrow();
  });
});
