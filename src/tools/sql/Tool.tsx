import { Workbench } from '@/components/shared/Workbench';
import { meta } from './meta';
import { sample } from './samples';
const config = {
  fields: [
    {
      key: 'dialect',
      label: 'Dialect',
      value: 'sql',
      choices: [
        'sql',
        'postgresql',
        'mysql',
        'sqlite',
        'bigquery',
        'transactsql',
      ],
    },
  ],
} as const;
export default function Tool() {
  return <Workbench meta={meta} sample={sample} config={config} />;
}
