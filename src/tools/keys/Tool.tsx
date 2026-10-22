import { Workbench } from '@/components/shared/Workbench';
import { meta } from './meta';
import { sample } from './samples';
const config = {
  inputHidden: true,
  action: 'Generate key pair',
  sensitive: true,
  fields: [
    {
      key: 'bits',
      label: 'Key size',
      value: '2048',
      choices: ['2048', '3072', '4096'],
    },
  ],
} as const;
export default function Tool() {
  return <Workbench meta={meta} sample={sample} config={config} />;
}
