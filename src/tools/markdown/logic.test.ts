import { describe, it, expect } from 'vitest';
import { run } from './logic';
describe('markdown', () => {
  it('renders GFM tables', async () => {
    expect((await run('| a |\n| - |\n| b |', {})).html).toContain('<table>');
  });
  it('renders headings', async () => {
    expect((await run('# Hello', {})).html).toContain('<h1>Hello</h1>');
  });
  it('handles empty', async () => {
    expect((await run('', {})).text).toBe('');
  });
});
