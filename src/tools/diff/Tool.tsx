import { Workbench } from '@/components/shared/Workbench';
import { meta } from './meta';
import { sample } from './samples';
const config = {
  modes: ['Inline', 'Side by side'],
  fields: [
    {
      key: 'other',
      label: 'Compare with',
      value: 'Hello developer\nThis line stays\nNew value',
      type: 'textarea',
    },
  ],
} as const;
export default function Tool() {
  return <Workbench meta={meta} sample={sample} config={config} />;
}
