import { Workbench } from '@/components/shared/Workbench';
import { meta } from './meta';
import { sample } from './samples';
const config = {
  fields: [
    {
      key: 'style',
      label: 'Style',
      value: 'camelCase',
      choices: [
        'camelCase',
        'snake_case',
        'kebab-case',
        'PascalCase',
        'CONSTANT_CASE',
        'Title Case',
      ],
    },
  ],
} as const;
export default function Tool() {
  return <Workbench meta={meta} sample={sample} config={config} />;
}
