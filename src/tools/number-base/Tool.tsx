import { Workbench } from '@/components/shared/Workbench';
import { meta } from './meta';
import { sample } from './samples';
const config = {
  fields: [
    { key: 'from', label: 'Input base', value: '10', type: 'number' },
    { key: 'to', label: 'Output base', value: '16', type: 'number' },
  ],
} as const;
export default function Tool() {
  return <Workbench meta={meta} sample={sample} config={config} />;
}
