import { requireInput, result, type Runner } from '@/lib/tool';
export const run: Runner = (input, o) => {
  requireInput(input);
  if (o.mode === 'JSON to env') {
    const data: unknown = JSON.parse(input);
    if (!data || typeof data !== 'object' || Array.isArray(data))
      throw new Error('Enter a JSON object.');
    return result(
      Object.entries(data)
        .map(([key, value]) => {
          if (
            !/^[A-Za-z_][A-Za-z0-9_]*$/.test(key) ||
            typeof value === 'object'
          )
            throw new Error('Use valid environment names and scalar values.');
          return `${key}=${JSON.stringify(String(value))}`;
        })
        .join('\n'),
    );
  }
  const data: Record<string, string> = Object.create(null);
  for (const [index, line] of input.split(/\r?\n/).entries()) {
    if (!line.trim() || line.trimStart().startsWith('#')) continue;
    const match = /^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/.exec(
      line,
    );
    if (!match) throw new Error(`Invalid assignment on line ${index + 1}.`);
    let value = match[2].trim();
    if (value.startsWith('"')) {
      const quoted = /^("(?:[^"\\]|\\.)*")\s*(?:#.*)?$/.exec(value);
      if (!quoted)
        throw new Error(`Invalid quoted value on line ${index + 1}.`);
      value = JSON.parse(quoted[1]);
    } else if (value.startsWith("'")) {
      const quoted = /^'([^']*)'\s*(?:#.*)?$/.exec(value);
      if (!quoted)
        throw new Error(`Invalid quoted value on line ${index + 1}.`);
      value = quoted[1];
    } else value = value.replace(/\s+#.*$/, '').trim();
    data[match[1]] = value;
  }
  return result(data);
};
