import { Workbench } from '@/components/shared/Workbench';
import { meta } from './meta';
import { sample } from './samples';
const config = {
  fields: [
    {
      key: 'from',
      label: 'From',
      value: 'JSON',
      choices: ['JSON', 'YAML', 'TOML', 'XML', 'CSV'],
    },
    {
      key: 'to',
      label: 'To',
      value: 'YAML',
      choices: ['JSON', 'YAML', 'TOML', 'XML', 'CSV'],
    },
  ],
} as const;
export default function Tool() {
  return <Workbench meta={meta} sample={sample} config={config} />;
}
