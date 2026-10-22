export const utf8 = (text: string) => new TextEncoder().encode(text);
export const textFromBytes = (bytes: Uint8Array) =>
  new TextDecoder('utf-8', { fatal: true }).decode(bytes);
export function toBase64(bytes: Uint8Array, url = false) {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  const encoded = btoa(binary);
  return url
    ? encoded.replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/, '')
    : encoded;
}
export function fromBase64(value: string) {
  let clean = value
    .replace(/\s/g, '')
    .replaceAll('-', '+')
    .replaceAll('_', '/');
  if (
    !/^[A-Za-z0-9+/]*={0,2}$/.test(clean) ||
    clean.replace(/=/g, '').length % 4 === 1 ||
    (clean.includes('=') && clean.length % 4 !== 0)
  )
    throw new Error('Invalid Base64 input. Check the alphabet and padding.');
  clean = clean.replace(/=+$/, '');
  const binary = atob(clean);
  return Uint8Array.from(binary, (c) => c.charCodeAt(0));
}
export function imageMime(bytes: Uint8Array): string | undefined {
  if (bytes[0] === 137 && bytes[1] === 80 && bytes[2] === 78 && bytes[3] === 71)
    return 'image/png';
  if (bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255)
    return 'image/jpeg';
  if (String.fromCharCode(...bytes.slice(0, 6)).startsWith('GIF8'))
    return 'image/gif';
  if (
    String.fromCharCode(...bytes.slice(0, 4)) === 'RIFF' &&
    String.fromCharCode(...bytes.slice(8, 12)) === 'WEBP'
  )
    return 'image/webp';
  return undefined;
}
export function pem(bytes: Uint8Array, label: string) {
  return `-----BEGIN ${label}-----\n${toBase64(bytes)
    .match(/.{1,64}/g)!
    .join('\n')}\n-----END ${label}-----`;
}
