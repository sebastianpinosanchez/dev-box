import { Workbench } from '@/components/shared/Workbench';
import { meta } from './meta';
import { sample } from './samples';
const config = {
  fields: [
    { key: 'ownerRead', label: 'Owner read', value: 'true', type: 'checkbox' },
    {
      key: 'ownerWrite',
      label: 'Owner write',
      value: 'true',
      type: 'checkbox',
    },
    {
      key: 'ownerExecute',
      label: 'Owner execute',
      value: 'true',
      type: 'checkbox',
    },
    { key: 'groupRead', label: 'Group read', value: 'true', type: 'checkbox' },
    {
      key: 'groupWrite',
      label: 'Group write',
      value: 'false',
      type: 'checkbox',
    },
    {
      key: 'groupExecute',
      label: 'Group execute',
      value: 'true',
      type: 'checkbox',
    },
    { key: 'otherRead', label: 'Other read', value: 'true', type: 'checkbox' },
    {
      key: 'otherWrite',
      label: 'Other write',
      value: 'false',
      type: 'checkbox',
    },
    {
      key: 'otherExecute',
      label: 'Other execute',
      value: 'true',
      type: 'checkbox',
    },
  ],
  modes: ['From octal / symbolic', 'From checkboxes'],
} as const;
export default function Tool() {
  return <Workbench meta={meta} sample={sample} config={config} />;
}
