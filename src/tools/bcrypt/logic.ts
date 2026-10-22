import bcrypt from 'bcryptjs';
import { integer, requireInput, result, type Runner } from '@/lib/tool';
import { utf8 } from '@/lib/bytes';
export const run: Runner = async (input, o) => {
  requireInput(input);
  if (utf8(input).length > 72)
    throw new Error(
      'Bcrypt supports at most 72 UTF-8 bytes. Shorten the password to avoid truncation.',
    );
  if (o.mode === 'Verify') {
    if (!/^\$2[aby]\$\d\d\$[./A-Za-z0-9]{53}$/.test(o.hash || ''))
      throw new Error('Enter a valid bcrypt hash.');
    return result(
      (await bcrypt.compare(input, o.hash))
        ? 'Password matches'
        : 'Password does not match',
    );
  }
  return result(await bcrypt.hash(input, integer(o.rounds || '10', 4, 16)));
};
