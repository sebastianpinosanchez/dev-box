import { Workbench } from '@/components/shared/Workbench';
import { meta } from './meta';
import { sample } from './samples';
const config = {
  fields: [
    {
      key: 'unit',
      label: 'Numeric input',
      value: 'Seconds',
      choices: ['Seconds', 'Milliseconds'],
    },
    {
      key: 'timezone',
      label: 'Timezone',
      value: 'UTC',
      choices: [
        'UTC',
        'America/Bogota',
        'America/New_York',
        'America/Los_Angeles',
        'Europe/London',
        'Europe/Berlin',
        'Asia/Tokyo',
        'Asia/Kolkata',
        'Australia/Sydney',
      ],
    },
  ],
} as const;
export default function Tool() {
  return <Workbench meta={meta} sample={sample} config={config} />;
}
