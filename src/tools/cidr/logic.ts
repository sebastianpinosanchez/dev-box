import ipaddr from 'ipaddr.js';
import { requireInput, type Runner } from '@/lib/tool';
export const run: Runner = (input) => {
  const [address, prefix] = ipaddr.parseCIDR(requireInput(input));
  const bytes = address.toByteArray();
  const bits = bytes.length * 8;
  const hostBits = BigInt(bits - prefix);
  const number = bytes.reduce((n, b) => (n << 8n) + BigInt(b), 0n);
  const all = (1n << BigInt(bits)) - 1n;
  const mask = all ^ ((1n << hostBits) - 1n);
  const network = number & mask;
  const last = network | (all ^ mask);
  const format = (n: bigint) => {
    const values = Array.from({ length: bytes.length }, (_, i) =>
      Number((n >> BigInt((bytes.length - i - 1) * 8)) & 255n),
    );
    return ipaddr.fromByteArray(values).toString();
  };
  const ipv4 = bits === 32;
  const reserve = ipv4 && prefix < 31;
  const values = {
    family: ipv4 ? 'IPv4' : 'IPv6',
    network: `${format(network)}/${prefix}`,
    mask: format(mask),
    broadcast: ipv4 ? format(last) : 'Not applicable to IPv6',
    firstHost: format(network + (reserve ? 1n : 0n)),
    lastHost: format(last - (reserve ? 1n : 0n)),
    addresses: (1n << hostBits).toString(),
    usableHosts: ((1n << hostBits) - (reserve ? 2n : 0n)).toString(),
  };
  return {
    text: JSON.stringify(values, null, 2),
    rows: Object.entries(values).map(([field, value]) => ({ field, value })),
  };
};
