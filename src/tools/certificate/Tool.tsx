import { Workbench } from '@/components/shared/Workbench';
import { meta } from './meta';
import { sample } from './samples';
const config = {
  file: 'text',
  accept: '.pem,.crt,.cer',
  inputLabel: 'PEM certificate',
} as const;
export default function Tool() {
  return <Workbench meta={meta} sample={sample} config={config} />;
}
