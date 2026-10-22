import { result, requireInput, type Runner } from '@/lib/tool';
export const run: Runner = (input, o) => {
  if (o.mode === 'Encode') return result(encodeURIComponent(input));
  if (o.mode === 'Decode') return result(decodeURIComponent(input));
  const url = new URL(requireInput(input));
  return {
    text: JSON.stringify(
      {
        protocol: url.protocol,
        host: url.host,
        hostname: url.hostname,
        port: url.port,
        path: url.pathname,
        fragment: url.hash,
        origin: url.origin,
      },
      null,
      2,
    ),
    rows: Array.from(url.searchParams, ([parameter, value]) => ({
      parameter,
      value,
    })),
  };
};
