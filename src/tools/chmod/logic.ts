import { result, type Runner } from '@/lib/tool';
export const run: Runner = (input, o) => {
  let digits: string;
  if (o.mode === 'From checkboxes')
    digits = ['owner', 'group', 'other']
      .map((w) =>
        ['Read', 'Write', 'Execute'].reduce(
          (n, p, i) => n + (o[w + p] === 'true' ? [4, 2, 1][i] : 0),
          0,
        ),
      )
      .join('');
  else if (/^[0-7]{3}$/.test(input.trim())) digits = input.trim();
  else if (/^[r-][w-][x-][r-][w-][x-][r-][w-][x-]$/.test(input.trim()))
    digits = input
      .trim()
      .match(/.{3}/g)!
      .map((part) =>
        [...part].reduce((n, c, i) => n + (c === '-' ? 0 : [4, 2, 1][i]), 0),
      )
      .join('');
  else
    throw new Error(
      'Enter three octal digits (e.g. 755) or nine rwx characters (e.g. rwxr-xr-x).',
    );
  const symbolic = [...digits]
    .map((d) =>
      ['r', 'w', 'x']
        .map((c, i) => (Number(d) & [4, 2, 1][i] ? c : '-'))
        .join(''),
    )
    .join('');
  return result({ octal: digits, symbolic, command: `chmod ${digits} file` });
};
