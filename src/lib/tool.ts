import { z } from 'zod';
import type { LucideIcon } from 'lucide-react';
export const categories = [
  'Encoding',
  'Formatting & Data',
  'Crypto & Security',
  'Text',
  'Time & Scheduling',
  'Web & Network',
  'Reference',
  'Misc',
] as const;
export const metaSchema = z.object({
  id: z.string().regex(/^[a-z][a-z0-9-]+$/),
  name: z.string().min(1),
  description: z.string().min(1),
  category: z.enum(categories),
  keywords: z.array(z.string()).min(1),
  icon: z.custom<LucideIcon>(
    (v) =>
      typeof v === 'function' ||
      (typeof v === 'object' && v !== null && '$$typeof' in v),
  ),
});
export type ToolMeta = z.infer<typeof metaSchema>;
export type Options = Record<string, string>;
export type ToolResult = {
  text: string;
  rows?: Record<string, string>[];
  html?: string;
  image?: string;
  status?: string;
  tree?: unknown;
  diff?: { value: string; added?: boolean; removed?: boolean }[];
  download?: { name: string; type: string; base64: string };
};
export type Runner = (
  input: string,
  options: Options,
  bytes?: Uint8Array,
) => ToolResult | Promise<ToolResult>;
export type Field = {
  key: string;
  label: string;
  type?: 'text' | 'number' | 'secret' | 'textarea' | 'checkbox';
  value: string;
  choices?: readonly string[];
  min?: number;
  max?: number;
};
export type WorkbenchConfig = {
  fields?: readonly Field[];
  modes?: readonly string[];
  file?: 'text' | 'binary' | 'image';
  inputLabel?: string;
  inputHidden?: boolean;
  action?: string;
  sensitive?: boolean;
  accept?: string;
  sampleOptions?: Options;
};
export const result = (value: unknown): ToolResult => ({
  text: typeof value === 'string' ? value : JSON.stringify(value, null, 2),
});
export function requireInput(input: string) {
  if (!input.trim()) throw new Error('Enter an input to continue.');
  return input;
}
export function integer(value: string, min: number, max: number) {
  const n = Number(value);
  if (!Number.isInteger(n) || n < min || n > max)
    throw new Error(`Enter an integer between ${min} and ${max}.`);
  return n;
}
