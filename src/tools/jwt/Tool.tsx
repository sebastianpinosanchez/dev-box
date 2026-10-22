import { Workbench } from '@/components/shared/Workbench';
import { meta } from './meta';
import { sample } from './samples';
const config = {
  modes: ['Decode', 'Verify', 'Sign'],
  sensitive: true,
  fields: [
    {
      key: 'algorithm',
      label: 'Algorithm',
      value: 'HS256',
      choices: [
        'HS256',
        'HS384',
        'HS512',
        'RS256',
        'RS384',
        'RS512',
        'ES256',
        'ES384',
        'ES512',
      ],
    },
    { key: 'key', label: 'Secret / PEM key', value: '', type: 'textarea' },
  ],
} as const;
export default function Tool() {
  return <Workbench meta={meta} sample={sample} config={config} />;
}
