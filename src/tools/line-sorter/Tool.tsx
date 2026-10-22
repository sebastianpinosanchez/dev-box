import { Workbench } from '@/components/shared/Workbench';
import { meta } from './meta';
import { sample } from './samples';
const config = {
  fields: [
    {
      key: 'direction',
      label: 'Direction',
      value: 'Ascending',
      choices: ['Ascending', 'Descending'],
    },
    {
      key: 'unique',
      label: 'Remove duplicate lines',
      value: 'false',
      type: 'checkbox',
    },
  ],
} as const;
export default function Tool() {
  return <Workbench meta={meta} sample={sample} config={config} />;
}
