import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
const entries = readdirSync('src/components/ui')
  .sort()
  .map((name) => {
    const path = `src/components/ui/${name}`;
    return [
      path,
      createHash('sha256').update(readFileSync(path)).digest('hex'),
    ];
  });
writeFileSync(
  'scripts/checks/ui-vendor.json',
  JSON.stringify(Object.fromEntries(entries), null, 2) + '\n',
);
console.log(
  'Recorded shadcn CLI output. Review the diff and document intentional vendor changes.',
);
