import { Workbench } from '@/components/shared/Workbench';
import { meta } from './meta';
import { sample } from './samples';
const config = {
  modes: ['Hash', 'Verify'],
  sensitive: true,
  action: 'Run bcrypt',
  fields: [
    { key: 'rounds', label: 'Cost (4–16)', value: '10', type: 'number' },
    { key: 'hash', label: 'Hash to verify', value: '', type: 'textarea' },
  ],
} as const;
export default function Tool() {
  return <Workbench meta={meta} sample={sample} config={config} />;
}
