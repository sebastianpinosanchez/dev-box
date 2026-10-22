import { Wrench } from 'lucide-react';
import { metaSchema } from '@/lib/tool';
export const meta = metaSchema.parse({
  id: 'shortcuts',
  name: 'Keyboard shortcuts',
  description: 'Bash, Zsh, tmux, Vim, nano and VS Code shortcuts.',
  category: 'Reference',
  keywords: ['shortcuts', 'reference'],
  icon: Wrench,
});
