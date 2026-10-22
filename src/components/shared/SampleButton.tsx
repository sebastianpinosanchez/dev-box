import { FlaskConical } from 'lucide-react';
import { Button } from '@/components/ui/button';
export function SampleButton({ onClick }: { onClick: () => void }) {
  return (
    <Button variant="outline" size="sm" onClick={onClick}>
      <FlaskConical className="size-3.5" />
      Load sample
    </Button>
  );
}
