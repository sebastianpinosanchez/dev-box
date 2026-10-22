import { Workbench } from '@/components/shared/Workbench';
import { meta } from './meta';
import { sample } from './samples';
const config = {
  modes: ['Format', 'Minify', 'Validate', 'Tree', 'Query'],
  fields: [
    { key: 'query', label: 'JSONPath', value: '$.tools[*].name', type: 'text' },
  ],
} as const;
export default function Tool() {
  return <Workbench meta={meta} sample={sample} config={config} />;
}
