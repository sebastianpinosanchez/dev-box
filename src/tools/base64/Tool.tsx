import { Workbench } from '@/components/shared/Workbench';
import { meta } from './meta';
import { sample } from './samples';
const config = {
  modes: ['Encode', 'Decode'],
  file: 'binary',
  fields: [
    {
      key: 'urlSafe',
      label: 'URL-safe alphabet',
      value: 'false',
      type: 'checkbox',
    },
  ],
} as const;
export default function Tool() {
  return <Workbench meta={meta} sample={sample} config={config} />;
}
