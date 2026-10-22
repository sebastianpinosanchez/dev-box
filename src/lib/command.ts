import { parse } from 'shell-quote';
export function commandTokens(input: string) {
  const tokens = parse(input.replace(/\\\r?\n/g, ' '), (name) => '$' + name);
  if (tokens.some((t) => typeof t !== 'string'))
    throw new Error(
      'Shell operators, pipes, redirects and expansions are not supported. Paste one literal command.',
    );
  return tokens as string[];
}
export function take(tokens: string[], index: number, flag: string) {
  const value = tokens[index];
  if (value === undefined) throw new Error(`Missing value for ${flag}.`);
  return value;
}
