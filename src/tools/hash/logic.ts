import {
  md5,
  sha1,
  sha256,
  sha512,
  createMD5,
  createSHA1,
  createSHA256,
  createSHA512,
  createHMAC,
} from 'hash-wasm';
import { utf8 } from '@/lib/bytes';
import { result, type Runner } from '@/lib/tool';
export const run: Runner = async (input, o, bytes) => {
  const data = bytes ?? utf8(input);
  const algorithm = o.algorithm || 'SHA-256';
  const hashes = {
    MD5: md5,
    'SHA-1': sha1,
    'SHA-256': sha256,
    'SHA-512': sha512,
  };
  if (!(algorithm in hashes)) throw new Error('Unsupported hash algorithm.');
  const name = algorithm as keyof typeof hashes;
  if (o.mode !== 'HMAC') return result(await hashes[name](data));
  const factories = {
    MD5: createMD5,
    'SHA-1': createSHA1,
    'SHA-256': createSHA256,
    'SHA-512': createSHA512,
  };
  const hmac = await createHMAC(factories[name](), utf8(o.key || ''));
  return result(hmac.init().update(data).digest('hex'));
};
