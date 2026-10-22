import { result, type Runner } from '@/lib/tool';
export const run: Runner = (input, o) => {
  const words =
    input
      .replace(/(\p{Ll}|\d)(\p{Lu})/gu, '$1 $2')
      .replace(/(\p{Lu})(\p{Lu}\p{Ll})/gu, '$1 $2')
      .match(/[\p{L}\p{N}]+/gu)
      ?.map((w) => w.toLowerCase()) || [];
  const title = words.map((w) => w[0].toUpperCase() + w.slice(1));
  const styles: Record<string, string> = {
    camelCase: words[0] + title.slice(1).join(''),
    snake_case: words.join('_'),
    'kebab-case': words.join('-'),
    PascalCase: title.join(''),
    CONSTANT_CASE: words.join('_').toUpperCase(),
    'Title Case': title.join(' '),
  };
  return result(words.length ? styles[o.style || 'camelCase'] : '');
};
