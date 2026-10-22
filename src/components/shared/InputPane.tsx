import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
export function InputPane({
  value,
  onChange,
  label = 'Input',
  children,
}: {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  children?: React.ReactNode;
}) {
  return (
    <Card className="h-full gap-0 overflow-hidden py-0 shadow-none">
      <CardHeader className="bg-muted/30 border-b px-5 py-4">
        <CardTitle className="flex items-center justify-between text-sm">
          <Label htmlFor="tool-input">{label}</Label>
          <span className="text-muted-foreground font-mono text-xs font-normal">
            {new TextEncoder().encode(value).length.toLocaleString()} bytes
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-4">
        <Textarea
          id="tool-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
          autoComplete="off"
          className="min-h-[340px] resize-y border-0 bg-transparent font-mono text-sm leading-7 shadow-none focus-visible:ring-1"
          placeholder="Paste your input here, or load a sample…"
        />
        {children}
      </CardContent>
    </Card>
  );
}
