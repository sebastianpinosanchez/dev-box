import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve, relative, dirname } from 'node:path';
import { createHash } from 'node:crypto';
import ts from 'typescript';
export function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory()
      ? walk(`${dir}/${entry.name}`)
      : [`${dir}/${entry.name}`],
  );
}
const errors = [];
const fail = (file, message) => errors.push(`${file}: ${message}`);
const source = walk('src');
const allowed = JSON.parse(
  readFileSync('scripts/checks/offline-allowlist.json', 'utf8'),
);
function scanURLs(file) {
  const text = readFileSync(file, 'utf8');
  for (const match of text.matchAll(/https?:\/\/[^\s"'`<>\\)\]}]+/g)) {
    const url = match[0];
    if (
      !allowed.some(
        (entry) =>
          (!entry.buildOnly || file.startsWith('dist/')) &&
          url.startsWith(entry.prefix),
      )
    )
      fail(
        file,
        `Unapproved URL ${url.slice(0, 180)}. Remove runtime network references; document inert fixtures or upstream diagnostic URLs in scripts/checks/offline-allowlist.json.`,
      );
  }
}
for (const file of source.filter(
  (file) =>
    /\.(ts|tsx|css|json)$/.test(file) &&
    !file.endsWith('.test.ts') &&
    !file.endsWith('.test.tsx'),
)) {
  scanURLs(file);
  if (!/\.tsx?$/.test(file)) continue;
  const text = readFileSync(file, 'utf8');
  const ast = ts.createSourceFile(
    file,
    text,
    ts.ScriptTarget.Latest,
    true,
    file.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );
  const ownTool = /^src\/tools\/([^/]+)\//.exec(file)?.[1];
  function visit(node) {
    if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) {
      const spec = node.moduleSpecifier;
      if (spec && ts.isStringLiteral(spec)) {
        const name = spec.text;
        const target = name.startsWith('@/')
          ? resolve('src', name.slice(2))
          : name.startsWith('.')
            ? resolve(dirname(file), name)
            : null;
        if (ownTool && target) {
          const other = /^src\/tools\/([^/]+)\//.exec(
            relative('.', target),
          )?.[1];
          if (other && other !== ownTool)
            fail(
              file,
              `Cross-tool import ${name}. Move shared logic to src/lib or shared UI to src/components/shared.`,
            );
        }
        if (
          ownTool &&
          /(?:@mui|antd|@chakra|@mantine|@base-ui|radix-ui|@radix-ui)/.test(
            name,
          )
        )
          fail(
            file,
            `Import shadcn wrappers from @/components/ui instead of ${name}.`,
          );
      }
    }
    if (
      ownTool &&
      (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) &&
      /^(button|input|select|textarea|table)$/.test(node.tagName.getText(ast))
    )
      fail(
        file,
        'Use the corresponding shadcn UI component, not a raw form/table element.',
      );
    if (ts.isCallExpression(node) || ts.isNewExpression(node)) {
      const callee = node.expression.getText(ast);
      if (
        /(?:^|\.)(?:fetch|XMLHttpRequest|WebSocket|EventSource|sendBeacon|importScripts)$/.test(
          callee,
        )
      )
        fail(
          file,
          `Runtime networking (${callee}) is prohibited. Process data locally; generated code must remain inert strings.`,
        );
    }
    if (ownTool && file.endsWith('/logic.ts')) {
      if (
        ts.isImportDeclaration(node) &&
        /^react(?:-dom)?$/.test(node.moduleSpecifier.text)
      )
        fail(file, 'logic.ts must remain framework-free.');
    }
    ts.forEachChild(node, visit);
  }
  visit(ast);
}
const folders = readdirSync('src/tools', { withFileTypes: true }).filter((e) =>
  e.isDirectory(),
);
const registry = readFileSync('src/tools/registry.ts', 'utf8');
if (!registry.includes("'./*/index.ts'"))
  fail(
    'src/tools/registry.ts',
    'Keep automatic index.ts discovery, or update this check to prove all folders are registered.',
  );
const ids = new Set();
for (const folder of folders) {
  const base = `src/tools/${folder.name}`;
  for (const file of [
    'meta.ts',
    'logic.ts',
    'logic.test.ts',
    'Tool.tsx',
    'samples.ts',
    'index.ts',
  ])
    if (!existsSync(`${base}/${file}`))
      fail(
        base,
        `Missing ${file}. Use npm run new-tool -- ${folder.name} --category "Text".`,
      );
  if (existsSync(`${base}/meta.ts`)) {
    const text = readFileSync(`${base}/meta.ts`, 'utf8');
    const id = /id:\s*['"]([^'"]+)/.exec(text)?.[1];
    if (id !== folder.name || ids.has(id))
      fail(base, 'Metadata id must be unique and match its directory.');
    ids.add(id);
    if (!text.includes('metaSchema.parse'))
      fail(base, 'Validate metadata with metaSchema.parse.');
  }
  if (
    existsSync(`${base}/index.ts`) &&
    !readFileSync(`${base}/index.ts`, 'utf8').includes('lazy(')
  )
    fail(base, 'Export a React.lazy Tool component from index.ts.');
}
const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
const dependencies = readFileSync('docs/dependencies.md', 'utf8');
for (const name of Object.keys(pkg.dependencies || {}))
  if (!dependencies.includes('`' + name + '`'))
    fail(
      'docs/dependencies.md',
      `Document why runtime dependency ${name} is needed.`,
    );
const vendor = JSON.parse(
  readFileSync('scripts/checks/ui-vendor.json', 'utf8'),
);
for (const file of walk('src/components/ui')) {
  const hash = createHash('sha256').update(readFileSync(file)).digest('hex');
  if (vendor[file] !== hash)
    fail(
      file,
      'Vendor component changed. Regenerate with the shadcn CLI, document exceptions in an ADR, then run node scripts/record-ui.mjs.',
    );
}
if (!existsSync('dist/index.html'))
  fail('dist', 'Build before checking: npm run build.');
else
  for (const file of walk('dist').filter((f) => /\.(js|css|html)$/.test(f)))
    scanURLs(file);
if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else
  console.log(
    `All guardrails passed: offline source/build, ${folders.length} registered tools, boundaries, UI, dependencies, vendor integrity.`,
  );
