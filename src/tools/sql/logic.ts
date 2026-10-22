import { format, type SqlLanguage } from 'sql-formatter';
import { requireInput, result, type Runner } from '@/lib/tool';
export const run: Runner = (input, o) =>
  result(
    format(requireInput(input), {
      language: (o.dialect || 'sql') as SqlLanguage,
      keywordCase: 'upper',
    }),
  );
