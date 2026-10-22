import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
const categories = [
  'Encoding',
  'Formatting & Data',
  'Crypto & Security',
  'Text',
  'Time & Scheduling',
  'Web & Network',
  'Reference',
  'Misc',
];
export function scaffold(id, category, details = {}) {
  if (!/^[a-z][a-z0-9-]+$/.test(id) || !categories.includes(category))
    throw new Error(
      `Use a kebab-case id and --category one of: ${categories.join(', ')}`,
    );
  const dir = `src/tools/${id}`;
  if (existsSync(dir))
    throw new Error(
      `${dir} already exists. Choose a new id; tools are never overwritten.`,
    );
  const name =
    details.name ??
    id
      .split('-')
      .map((s) => s[0].toUpperCase() + s.slice(1))
      .join(' ');
  const description = details.description ?? `Transform text with ${name}.`;
  mkdirSync(dir, { recursive: true });
  const files = {
    'meta.ts': `import { Wrench } from 'lucide-react';\nimport { metaSchema } from '@/lib/tool';\nexport const meta = metaSchema.parse({ id: ${JSON.stringify(id)}, name: ${JSON.stringify(name)}, description: ${JSON.stringify(description)}, category: ${JSON.stringify(category)}, keywords: ${JSON.stringify(details.keywords ?? [id, category.toLowerCase()])}, icon: Wrench });\n`,
    'logic.ts': `import { result, requireInput, type Runner } from '@/lib/tool';\nexport const run: Runner = (input) => result(requireInput(input).trim());\n`,
    'logic.test.ts': `import { describe, it, expect } from 'vitest';\nimport { run } from './logic';\ndescribe(${JSON.stringify(id)}, () => { it('trims input', async () => { expect((await run(' example ', {})).text).toBe('example'); }); it('rejects empty input', async () => { await expect(async () => run('', {})).rejects.toThrow(); }); });\n`,
    'samples.ts': `export const sample = ${JSON.stringify(details.sample ?? ' example ')};\n`,
    'Tool.tsx': `import { Workbench } from '@/components/shared/Workbench';\nimport { meta } from './meta';\nimport { sample } from './samples';\nconst config = ${JSON.stringify(details.config ?? {})} as const;\nexport default function Tool() { return <Workbench meta={meta} sample={sample} config={config} />; }\n`,
    'index.ts': `import { lazy } from 'react';\nimport { meta } from './meta';\nexport default { meta, Component: lazy(() => import('./Tool')) };\n`,
  };
  for (const [file, content] of Object.entries(files))
    writeFileSync(`${dir}/${file}`, content);
}
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const [id, flag, category] = process.argv.slice(2);
  if (flag !== '--category')
    throw new Error('Usage: npm run new-tool -- <tool-id> --category "Text"');
  scaffold(id, category);
  console.log(
    `Created ${id}. Registry discovers it automatically. Read docs/adding-a-tool.md, replace the example logic/tests, update CHANGELOG.md and run npm run verify.`,
  );
}
