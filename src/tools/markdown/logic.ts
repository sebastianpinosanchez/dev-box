import { marked } from 'marked';
import type { Runner } from '@/lib/tool';
// Sanitization is performed by the shared preview at the DOM boundary.
export const run: Runner = async (input) => ({
  text: await marked.parse(input, { gfm: true }),
  html: await marked.parse(input, { gfm: true }),
});
