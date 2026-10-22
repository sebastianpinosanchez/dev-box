import { Workbench } from '@/components/shared/Workbench';
import { meta } from './meta';
import { sample } from './samples';
const config = {
  fields: [
    {
      key: 'from',
      label: 'From',
      value: 'Text',
      choices: ['Text', 'Hex', 'Binary', 'ASCII', 'Unicode'],
    },
    {
      key: 'to',
      label: 'To',
      value: 'Hex',
      choices: ['Text', 'Hex', 'Binary', 'ASCII', 'Unicode'],
    },
  ],
} as const;
export default function Tool() {
  return <Workbench meta={meta} sample={sample} config={config} />;
}
