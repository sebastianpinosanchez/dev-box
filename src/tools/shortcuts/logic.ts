import entries from '@/data/shortcuts.json';
import { searchReference } from '@/lib/reference';
import type { Runner } from '@/lib/tool';
export const run: Runner = (input) => searchReference(entries, input);
