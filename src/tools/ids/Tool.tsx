import { Workbench } from '@/components/shared/Workbench';
import { meta } from './meta';
import { sample } from './samples';
const config = {
  modes: ['Generate', 'Validate'],
  fields: [
    {
      key: 'kind',
      label: 'Identifier',
      value: 'UUID v4',
      choices: ['UUID v4', 'UUID v7', 'ULID', 'NanoID'],
    },
    { key: 'count', label: 'Count', value: '5', type: 'number' },
  ],
} as const;
export default function Tool() {
  return <Workbench meta={meta} sample={sample} config={config} />;
}
