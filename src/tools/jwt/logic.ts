import {
  decodeJwt,
  decodeProtectedHeader,
  jwtVerify,
  SignJWT,
  importSPKI,
  importPKCS8,
} from 'jose';
import { utf8 } from '@/lib/bytes';
import { requireInput, type Runner } from '@/lib/tool';
export const run: Runner = async (input, o) => {
  requireInput(input);
  const algorithm = o.algorithm || 'HS256';
  const allowed = [
    'HS256',
    'HS384',
    'HS512',
    'RS256',
    'RS384',
    'RS512',
    'ES256',
    'ES384',
    'ES512',
  ];
  if (!allowed.includes(algorithm))
    throw new Error('Unsupported signing algorithm.');
  if (o.mode === 'Sign') {
    if (!o.key) throw new Error('Provide a secret or PKCS#8 private PEM key.');
    const payload: unknown = JSON.parse(input);
    if (!payload || typeof payload !== 'object' || Array.isArray(payload))
      throw new Error('Payload must be a JSON object.');
    const key = algorithm.startsWith('HS')
      ? utf8(o.key)
      : await importPKCS8(o.key, algorithm);
    return {
      text: await new SignJWT(payload as Record<string, unknown>)
        .setProtectedHeader({ alg: algorithm, typ: 'JWT' })
        .sign(key),
      status: 'Signed locally',
    };
  }
  const header = decodeProtectedHeader(input);
  const payload = decodeJwt(input);
  let status = 'Decoded · signature not verified';
  if (o.mode === 'Verify') {
    if (!o.key) throw new Error('Provide a secret or SPKI public PEM key.');
    const key = algorithm.startsWith('HS')
      ? utf8(o.key)
      : await importSPKI(o.key, algorithm);
    await jwtVerify(input, key, { algorithms: [algorithm] });
    status = 'Valid signature and time claims';
  }
  const now = Date.now() / 1000;
  if (typeof payload.exp === 'number' && payload.exp <= now)
    status += ' · expired';
  if (typeof payload.nbf === 'number' && payload.nbf > now)
    status += ' · not yet valid';
  const rows = Object.entries(payload).map(([claim, value]) => ({
    claim,
    value: JSON.stringify(value),
    date:
      ['exp', 'iat', 'nbf'].includes(claim) && typeof value === 'number'
        ? new Date(value * 1000).toISOString()
        : '',
  }));
  return { text: JSON.stringify({ header, payload }, null, 2), rows, status };
};
