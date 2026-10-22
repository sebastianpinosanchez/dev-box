import { Workbench } from '@/components/shared/Workbench';
import { meta } from './meta';
import { sample } from './samples';
const config = {
  inputHidden: true,
  action: 'Generate',
  fields: [
    { key: 'paragraphs', label: 'Paragraphs', value: '3', type: 'number' },
    {
      key: 'sentences',
      label: 'Sentences per paragraph',
      value: '4',
      type: 'number',
    },
  ],
} as const;
export default function Tool() {
  return <Workbench meta={meta} sample={sample} config={config} />;
}
