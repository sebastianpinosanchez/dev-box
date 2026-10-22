import { type Runner } from '@/lib/tool';
const escape = (text: string) =>
  text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
export const run: Runner = (input, o) => {
  const flags = o.flags ?? 'g';
  const regex = new RegExp(o.pattern || '', flags);
  const first = !flags.includes('g') ? regex.exec(input) : null;
  const matches = flags.includes('g')
    ? Array.from(input.matchAll(regex))
    : first
      ? [first]
      : [];
  let html = '',
    position = 0;
  for (const match of matches) {
    html +=
      escape(input.slice(position, match.index)) +
      '<mark>' +
      escape(match[0]) +
      '</mark>';
    position = match.index! + match[0].length;
  }
  html += escape(input.slice(position));
  const rows = matches.map((match, i) => ({
    match: String(i + 1),
    index: String(match.index),
    text: match[0],
    groups: JSON.stringify(match.slice(1)),
    named: JSON.stringify(match.groups || {}),
  }));
  return {
    text: JSON.stringify(rows, null, 2),
    rows,
    html: `<pre>${html}</pre>`,
    status: `${matches.length} matches`,
  };
};
