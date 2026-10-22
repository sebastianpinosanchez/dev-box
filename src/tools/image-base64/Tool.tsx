import { Workbench } from '@/components/shared/Workbench';
import { meta } from './meta';
import { sample } from './samples';
const config = {
  file: 'binary',
  accept: 'image/png,image/jpeg,image/gif,image/webp',
} as const;
export default function Tool() {
  return <Workbench meta={meta} sample={sample} config={config} />;
}
