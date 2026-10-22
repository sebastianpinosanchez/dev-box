import entries from '@/data/containers.json';
import { searchReference } from '@/lib/reference';
import type { Runner } from '@/lib/tool';
export const run: Runner = (input) => searchReference(entries, input);
