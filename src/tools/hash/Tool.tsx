import { Workbench } from '@/components/shared/Workbench';
import { meta } from './meta';
import { sample } from './samples';
const config = {
  file: 'binary',
  modes: ['Hash', 'HMAC'],
  fields: [
    {
      key: 'algorithm',
      label: 'Algorithm',
      value: 'SHA-256',
      choices: ['MD5', 'SHA-1', 'SHA-256', 'SHA-512'],
    },
    { key: 'key', label: 'HMAC secret', value: '', type: 'secret' },
  ],
  sensitive: true,
} as const;
export default function Tool() {
  return <Workbench meta={meta} sample={sample} config={config} />;
}
