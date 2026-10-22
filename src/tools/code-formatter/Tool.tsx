import { Workbench } from '@/components/shared/Workbench';
import { meta } from './meta';
import { sample } from './samples';
const config = {
  modes: ['Format', 'Minify'],
  fields: [
    {
      key: 'language',
      label: 'Language',
      value: 'JavaScript',
      choices: ['JavaScript', 'HTML', 'XML', 'CSS'],
    },
  ],
} as const;
export default function Tool() {
  return <Workbench meta={meta} sample={sample} config={config} />;
}
