import { Workbench } from '@/components/shared/Workbench';
import { meta } from './meta';
import { sample } from './samples';
const config = {
  fields: [
    {
      key: 'pattern',
      label: 'Pattern',
      value: '([\\w.+-]+)@([\\w.-]+)',
      type: 'text',
    },
    { key: 'flags', label: 'Flags', value: 'g', type: 'text' },
  ],
} as const;
export default function Tool() {
  return <Workbench meta={meta} sample={sample} config={config} />;
}
