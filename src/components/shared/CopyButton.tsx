import { Copy } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
export function CopyButton({
  text,
  label = 'Copy',
}: {
  text: string;
  label?: string;
}) {
  return (
    <Button
      variant="outline"
      size="sm"
      disabled={!text}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          toast.success('Copied!');
        } catch {
          toast.error(
            'Clipboard unavailable. Select the output and copy it manually.',
          );
        }
      }}
    >
      <Copy className="size-3.5" />
      {label}
    </Button>
  );
}
