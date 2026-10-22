import { requireInput, type Runner } from '@/lib/tool';
export const run: Runner = (input, o) => {
  const value = requireInput(input).trim();
  if (
    !/^-?\d+(?:\.\d+)?$/.test(value) &&
    !/^\d{4}-\d{2}-\d{2}T.*(?:Z|[+-]\d{2}:\d{2})$/.test(value)
  )
    throw new Error(
      'Use a Unix number or ISO 8601 datetime with Z or a timezone offset.',
    );
  const date = new Date(
    /^-?\d+(?:\.\d+)?$/.test(value)
      ? Number(value) * (o.unit === 'Milliseconds' ? 1 : 1000)
      : value,
  );
  if (!Number.isFinite(date.getTime()))
    throw new Error('Invalid or out-of-range date.');
  const values = {
    seconds: String(Math.floor(date.getTime() / 1000)),
    milliseconds: String(date.getTime()),
    ISO: date.toISOString(),
    local: new Intl.DateTimeFormat('en-US', {
      timeZone: o.timezone || 'UTC',
      dateStyle: 'full',
      timeStyle: 'long',
    }).format(date),
  };
  return {
    text: JSON.stringify(values, null, 2),
    rows: Object.entries(values).map(([format, value]) => ({ format, value })),
  };
};
