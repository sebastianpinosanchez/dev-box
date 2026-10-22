import { Workbench } from '@/components/shared/Workbench';
import { meta } from './meta';
import { sample } from './samples';
const config = {
  fields: [
    {
      key: 'start',
      label: 'Start (ISO; blank = now)',
      value: '2026-01-01T00:00:00Z',
      type: 'text',
    },
    {
      key: 'timezone',
      label: 'Timezone',
      value: 'UTC',
      choices: [
        'UTC',
        'America/Bogota',
        'America/New_York',
        'Europe/London',
        'Asia/Tokyo',
      ],
    },
  ],
} as const;
export default function Tool() {
  return <Workbench meta={meta} sample={sample} config={config} />;
}
