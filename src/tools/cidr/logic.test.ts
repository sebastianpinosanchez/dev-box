import { describe, it, expect } from 'vitest';
import { run } from './logic';
describe('cidr', () => {
  it('IPv4 network and broadcast', async () => {
    const v = JSON.parse((await run('192.168.1.42/24', {})).text);
    expect(v.network).toBe('192.168.1.0/24');
    expect(v.broadcast).toBe('192.168.1.255');
    expect(v.usableHosts).toBe('254');
  });
  it('IPv6 range', async () => {
    const v = JSON.parse((await run('2001:db8::1/64', {})).text);
    expect(v.network).toBe('2001:db8::/64');
    expect(v.addresses).toBe('18446744073709551616');
  });
  it('point-to-point IPv4 retains both addresses', async () => {
    expect(JSON.parse((await run('10.0.0.0/31', {})).text).usableHosts).toBe(
      '2',
    );
  });
  it('rejects invalid prefix', async () => {
    expect(() => run('10.0.0.1/33', {})).toThrow();
  });
});
