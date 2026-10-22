import { describe, it, expect } from 'vitest';
import { run } from './logic';
describe('chmod', () => {
  it('converts octal', async () => {
    expect(JSON.parse((await run('755', {})).text).symbolic).toBe('rwxr-xr-x');
  });
  it('converts symbolic', async () => {
    expect(JSON.parse((await run('rw-r--r--', {})).text).octal).toBe('644');
  });
  it('rejects invalid digits', async () => {
    expect(() => run('999', {})).toThrow();
  });
});
