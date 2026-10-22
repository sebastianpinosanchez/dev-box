import { describe, it, expect } from 'vitest';
import { tools } from './registry';
import { metaSchema } from '@/lib/tool';
describe('registry', () => {
  it('validates every definition and route', () => {
    expect(tools.length).toBeGreaterThanOrEqual(41);
    expect(new Set(tools.map((t) => t.meta.id)).size).toBe(tools.length);
    for (const tool of tools) {
      expect(metaSchema.safeParse(tool.meta).success).toBe(true);
      expect(tool.Component).toBeDefined();
    }
  });
  it('rejects incomplete metadata', () => {
    expect(metaSchema.safeParse({ id: 'bad' }).success).toBe(false);
  });
});
