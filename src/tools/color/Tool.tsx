import { Workbench } from '@/components/shared/Workbench';
import { meta } from './meta';
import { sample } from './samples';
const config = {
  fields: [
    {
      key: 'background',
      label: 'Background color',
      value: '#ffffff',
      type: 'text',
    },
  ],
} as const;
export default function Tool() {
  return <Workbench meta={meta} sample={sample} config={config} />;
}
