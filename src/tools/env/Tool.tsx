import { Workbench } from '@/components/shared/Workbench';
import { meta } from './meta';
import { sample } from './samples';
const config = {
  modes: ['env to JSON', 'JSON to env'],
  sensitive: true,
} as const;
export default function Tool() {
  return <Workbench meta={meta} sample={sample} config={config} />;
}
