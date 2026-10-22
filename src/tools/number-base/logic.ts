import { integer, requireInput, result, type Runner } from '@/lib/tool';
export const run: Runner = (input, o) => {
  const from = integer(o.from || '10', 2, 36),
    to = integer(o.to || '16', 2, 36);
  let value = requireInput(input).trim().toLowerCase();
  const negative = value.startsWith('-');
  if (negative || value.startsWith('+')) value = value.slice(1);
  if (!value) throw new Error('Enter digits after the sign.');
  let number = 0n;
  for (const c of value) {
    const digit = '0123456789abcdefghijklmnopqrstuvwxyz'.indexOf(c);
    if (digit < 0 || digit >= from)
      throw new Error(`Digit ${c} is invalid in base ${from}.`);
    number = number * BigInt(from) + BigInt(digit);
  }
  return result((negative ? -number : number).toString(to));
};
