import { describe, it, expect } from 'vitest';
import { run } from './logic';
describe('case', () => {
  it('splits acronym boundaries', async () => {
    expect((await run('HTTPServerName', { style: 'snake_case' })).text).toBe(
      'http_server_name',
    );
  });
  it('preserves Unicode', async () => {
    expect((await run('héllo world', { style: 'PascalCase' })).text).toBe(
      'HélloWorld',
    );
  });
  it('handles empty', async () => {
    expect((await run('', {})).text).toBe('');
  });
});
