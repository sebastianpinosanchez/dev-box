import { pem, utf8, toBase64, fromBase64 } from '@/lib/bytes';
import { integer, result, type Runner } from '@/lib/tool';
function sshString(bytes: Uint8Array) {
  const result = new Uint8Array(bytes.length + 4);
  new DataView(result.buffer).setUint32(0, bytes.length);
  result.set(bytes, 4);
  return result;
}
function mpint(value: string) {
  const bytes = fromBase64(value);
  return sshString(bytes[0] & 128 ? Uint8Array.from([0, ...bytes]) : bytes);
}
export const run: Runner = async (_input, o) => {
  const bits = integer(o.bits || '2048', 2048, 4096);
  if (![2048, 3072, 4096].includes(bits))
    throw new Error('Select 2048, 3072 or 4096 bits.');
  const pair = await crypto.subtle.generateKey(
    {
      name: 'RSASSA-PKCS1-v1_5',
      modulusLength: bits,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: 'SHA-256',
    },
    true,
    ['sign', 'verify'],
  );
  const publicKey = new Uint8Array(
    await crypto.subtle.exportKey('spki', pair.publicKey),
  );
  const privateKey = new Uint8Array(
    await crypto.subtle.exportKey('pkcs8', pair.privateKey),
  );
  const jwk = await crypto.subtle.exportKey('jwk', pair.publicKey);
  const ssh = Uint8Array.from([
    ...sshString(utf8('ssh-rsa')),
    ...mpint(jwk.e!),
    ...mpint(jwk.n!),
  ]);
  return result(
    `${pem(publicKey, 'PUBLIC KEY')}\n\n${pem(privateKey, 'PRIVATE KEY')}\n\nssh-rsa ${toBase64(ssh)} devbox-local`,
  );
};
