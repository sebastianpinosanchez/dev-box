import { useRef } from 'react';
import { Upload } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
export function FileDropzone({
  onFile,
  accept,
}: {
  onFile: (file: File) => void;
  accept?: string;
}) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) onFile(file);
      }}
      className="rounded-lg border border-dashed p-4 text-center"
    >
      <Input
        ref={ref}
        aria-label="Upload file"
        type="file"
        accept={accept}
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) onFile(file);
          event.target.value = '';
        }}
      />
      <Button variant="ghost" size="sm" onClick={() => ref.current?.click()}>
        <Upload className="size-4" />
        Choose a file or drop it here
      </Button>
      <p className="text-muted-foreground mt-1 text-xs">
        Processed on this device · maximum 20 MB
      </p>
    </div>
  );
}
