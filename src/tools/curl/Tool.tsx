import { Workbench } from '@/components/shared/Workbench';
import { meta } from './meta';
import { sample } from './samples';
const config = {
  fields: [
    {
      key: 'target',
      label: 'Target',
      value: 'fetch',
      choices: ['fetch', 'axios', 'Python requests', 'Go'],
    },
  ],
} as const;
export default function Tool() {
  return <Workbench meta={meta} sample={sample} config={config} />;
}
