import { integer, result, type Runner } from '@/lib/tool';
const sentences = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
];
export const run: Runner = (_input, o) =>
  result(
    Array.from({ length: integer(o.paragraphs || '3', 1, 100) }, (_, p) =>
      Array.from(
        { length: integer(o.sentences || '4', 1, 20) },
        (_, s) => sentences[(p + s) % sentences.length],
      ).join(' '),
    ).join('\n\n'),
  );
