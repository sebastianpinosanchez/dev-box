import { describe, it, expect } from 'vitest';
import { run } from './logic';
describe('cron', () => {
  it('returns ten future runs', async () => {
    const r = await run('0 0 * * *', {
      start: '2026-01-01T00:00:00Z',
      timezone: 'UTC',
    });
    expect(r.rows).toHaveLength(10);
    expect(r.rows?.[0].UTC).toBe('2026-01-02T00:00:00.000Z');
  });
  it('handles timezone', async () => {
    const r = await run('0 9 * * *', {
      start: '2026-01-01T00:00:00Z',
      timezone: 'America/Bogota',
    });
    expect(r.rows?.[0].UTC).toBe('2026-01-01T14:00:00.000Z');
  });
  it('rejects bad cron', async () => {
    expect(() => run('bad', {})).toThrow();
  });
});

it('keeps local wall time across daylight saving changes', async () => {
  const runs = await run('0 9 * * *', {
    start: '2026-03-07T00:00:00Z',
    timezone: 'America/New_York',
  });
  expect(runs.rows?.[0].UTC).toBe('2026-03-07T14:00:00.000Z');
  expect(runs.rows?.[1].UTC).toBe('2026-03-08T13:00:00.000Z');
});
