import { describe, it, expect } from 'vitest';
import { run } from './logic';
import { sample } from './samples';
describe('docker-compose', () => {
  it('preserves ports, environment and bind mounts', async () => {
    const r = await run(sample, {});
    expect(r.text).toContain('8080:80');
    expect(r.text).toContain('MODE=local');
    expect(r.text).toContain('nginx:alpine');
  });
  it('declares named volumes', async () => {
    expect((await run('docker run -v data:/data alpine', {})).text).toContain(
      'data: {}',
    );
  });
  it('rejects unknown options', async () => {
    expect(() => run('docker run --bad alpine', {})).toThrow();
  });
});
