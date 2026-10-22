import { Workbench } from '@/components/shared/Workbench';
import { meta } from './meta';
import { sample } from './samples';
const config = {
  inputHidden: true,
  action: 'Generate',
  sensitive: true,
  fields: [
    { key: 'length', label: 'Length', value: '24', type: 'number' },
    { key: 'count', label: 'Count', value: '1', type: 'number' },
    { key: 'lower', label: 'Lowercase', value: 'true', type: 'checkbox' },
    { key: 'upper', label: 'Uppercase', value: 'true', type: 'checkbox' },
    { key: 'digits', label: 'Digits', value: 'true', type: 'checkbox' },
    { key: 'symbols', label: 'Symbols', value: 'true', type: 'checkbox' },
  ],
} as const;
export default function Tool() {
  return <Workbench meta={meta} sample={sample} config={config} />;
}
