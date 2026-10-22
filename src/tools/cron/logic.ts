import { CronExpressionParser } from 'cron-parser';
import cronstrue from 'cronstrue';
import { requireInput, type Runner } from '@/lib/tool';
export const run: Runner = (input, o) => {
  requireInput(input);
  const interval = CronExpressionParser.parse(input, {
    currentDate: o.start || new Date(),
    tz: o.timezone || 'UTC',
  });
  const explanation = cronstrue.toString(input, {
    throwExceptionOnParseError: true,
  });
  const rows = Array.from({ length: 10 }, () => {
    const date = interval.next().toDate();
    return {
      UTC: date.toISOString(),
      local: date.toLocaleString('en-US', { timeZone: o.timezone || 'UTC' }),
    };
  });
  return {
    text:
      explanation +
      '\n\n' +
      rows.map((row) => `${row.UTC} · ${row.local}`).join('\n'),
    rows,
    status: explanation,
  };
};
