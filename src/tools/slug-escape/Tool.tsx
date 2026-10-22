import { Workbench } from '@/components/shared/Workbench';
import { meta } from './meta';
import { sample } from './samples';
const config = {
  modes: ['Slugify', 'Escape', 'Unescape'],
  fields: [
    {
      key: 'format',
      label: 'Format',
      value: 'JSON',
      choices: ['JSON', 'Shell', 'Regex'],
    },
  ],
} as const;
export default function Tool() {
  return <Workbench meta={meta} sample={sample} config={config} />;
}
