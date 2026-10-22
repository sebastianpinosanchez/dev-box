import { integer, type Runner } from '@/lib/tool';
function randomIndex(max: number) {
  const range = Math.floor(256 / max) * max;
  const bytes = new Uint8Array(1);
  do {
    crypto.getRandomValues(bytes);
  } while (bytes[0] >= range);
  return bytes[0] % max;
}
export const run: Runner = (_input, o) => {
  const sets = [
    ['lower', 'abcdefghijklmnopqrstuvwxyz'],
    ['upper', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'],
    ['digits', '0123456789'],
    ['symbols', '!@#$%^&*()-_=+[]{};:,.?'],
  ]
    .filter(([key]) => o[key] !== 'false')
    .map(([, chars]) => chars);
  if (!sets.length) throw new Error('Select at least one character set.');
  const length = integer(o.length || '24', 1, 1024),
    count = integer(o.count || '1', 1, 1000);
  const alphabet = sets.join('');
  // Independent uniform samples, using rejection sampling to avoid modulo bias.
  const passwords = Array.from({ length: count }, () =>
    Array.from({ length }, () => alphabet[randomIndex(alphabet.length)]).join(
      '',
    ),
  );
  const entropy = length * Math.log2(alphabet.length);
  return {
    text: passwords.join('\n'),
    status: `${entropy.toFixed(1)} bits of entropy · ${alphabet.length} possible characters per position`,
    rows: [
      {
        length: String(length),
        alphabet: String(alphabet.length),
        'entropy (bits)': entropy.toFixed(1),
      },
    ],
  };
};
