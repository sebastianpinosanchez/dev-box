import DOMPurify from 'dompurify';
import { ArrowDownToLine, Braces, Check } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { CopyButton } from './CopyButton';
import { fromBase64 } from '@/lib/bytes';
import type { ToolResult } from '@/lib/tool';
export function sanitizePreview(html: string) {
  return DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
    FORBID_TAGS: [
      'img',
      'video',
      'audio',
      'source',
      'iframe',
      'object',
      'embed',
      'style',
      'link',
      'form',
      'input',
      'button',
    ],
    FORBID_ATTR: [
      'href',
      'src',
      'srcset',
      'style',
      'action',
      'poster',
      'background',
    ],
  });
}
function Tree({ value, name = 'root' }: { value: unknown; name?: string }) {
  if (value !== null && typeof value === 'object')
    return (
      <details open className="ml-3 font-mono text-xs">
        <summary className="cursor-pointer py-1">
          {name}{' '}
          <span className="text-muted-foreground">
            {Array.isArray(value) ? '[]' : '{}'}
          </span>
        </summary>
        {Object.entries(value).map(([key, v]) => (
          <Tree key={key} name={key} value={v} />
        ))}
      </details>
    );
  return (
    <div className="ml-3 py-1 font-mono text-xs">
      <span className="text-muted-foreground">{name}: </span>
      {JSON.stringify(value)}
    </div>
  );
}
export function OutputPane({
  result,
  busy,
  mode,
  onEditRow,
}: {
  result?: ToolResult;
  busy: boolean;
  mode?: string;
  onEditRow?: (index: number, key: string, value: string) => void;
}) {
  const columns = result?.rows?.length ? Object.keys(result.rows[0]) : [];
  return (
    <Card className="h-full gap-0 overflow-hidden py-0 shadow-none">
      <CardHeader className="bg-muted/30 border-b px-5 py-3">
        <CardTitle className="flex min-h-8 items-center justify-between text-sm">
          <span className="flex items-center gap-2">
            Output
            {result && !busy && <Check className="size-3.5 text-emerald-600" />}
          </span>
          <CopyButton text={result?.text || ''} />
        </CardTitle>
      </CardHeader>
      <CardContent
        className="space-y-4 p-5"
        aria-busy={busy}
        aria-live="polite"
      >
        {busy ? (
          <p role="status" className="text-muted-foreground text-sm">
            Processing locally…
          </p>
        ) : result ? (
          <>
            <span data-testid="result-ready" className="sr-only">
              Result ready
            </span>
            {result.status && (
              <Badge
                variant="secondary"
                className="h-auto leading-5 whitespace-normal"
              >
                {result.status}
              </Badge>
            )}
            {result.image && (
              <img
                src={result.image}
                alt="Generated or decoded preview"
                className="mx-auto max-h-72 max-w-full rounded border bg-white p-3"
              />
            )}
            {result.html !== undefined && (
              <div
                className="markdown-preview overflow-auto rounded-lg border p-5"
                dangerouslySetInnerHTML={{
                  __html: sanitizePreview(result.html),
                }}
              />
            )}
            {result.tree !== undefined && (
              <div className="max-h-96 overflow-auto rounded-lg border p-3">
                <Tree value={result.tree} />
              </div>
            )}
            {result.diff && (
              <div
                className={
                  mode === 'Side by side'
                    ? 'grid grid-cols-2 gap-3'
                    : 'space-y-0'
                }
              >
                {mode === 'Side by side' ? (
                  ['old', 'new'].map((side) => (
                    <pre
                      key={side}
                      className="overflow-auto rounded border p-3 text-xs"
                    >
                      {result
                        .diff!.filter((p) =>
                          side === 'old' ? !p.added : !p.removed,
                        )
                        .map((p, i) => (
                          <span
                            key={i}
                            className={
                              p.added
                                ? 'diff-added'
                                : p.removed
                                  ? 'diff-removed'
                                  : ''
                            }
                          >
                            {p.value}
                          </span>
                        ))}
                    </pre>
                  ))
                ) : (
                  <pre className="overflow-auto text-xs">
                    {result.diff.map((p, i) => (
                      <span
                        key={i}
                        className={`block whitespace-pre-wrap ${p.added ? 'diff-added' : p.removed ? 'diff-removed' : ''}`}
                      >
                        {p.added ? '+ ' : p.removed ? '- ' : '  '}
                        {p.value}
                      </span>
                    ))}
                  </pre>
                )}
              </div>
            )}
            {columns.length > 0 && (
              <div className="max-h-[500px] overflow-auto rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {columns.map((c) => (
                        <TableHead key={c}>{c}</TableHead>
                      ))}
                      {columns.includes('example') && (
                        <TableHead>Copy</TableHead>
                      )}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {result.rows!.map((row, i) => (
                      <TableRow key={i}>
                        {columns.map((c) => (
                          <TableCell
                            key={c}
                            className="max-w-80 font-mono text-xs whitespace-pre-wrap"
                          >
                            {onEditRow ? (
                              <Input
                                aria-label={`${c} ${i + 1}`}
                                defaultValue={row[c]}
                                onBlur={(event) =>
                                  onEditRow(i, c, event.target.value)
                                }
                              />
                            ) : (
                              row[c]
                            )}
                          </TableCell>
                        ))}
                        {columns.includes('example') && (
                          <TableCell>
                            <CopyButton text={row.example} />
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
            {!result.diff && (
              <Textarea
                aria-label="Output"
                readOnly
                value={result.text}
                spellCheck={false}
                className="min-h-[240px] border-0 bg-transparent font-mono text-sm leading-7 shadow-none"
              />
            )}
            {result.download && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const file = result.download!;
                  const url = URL.createObjectURL(
                    new Blob([fromBase64(file.base64)], { type: file.type }),
                  );
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = file.name;
                  a.click();
                  setTimeout(() => URL.revokeObjectURL(url), 1000);
                }}
              >
                <ArrowDownToLine className="size-4" />
                Download {result.download.name}
              </Button>
            )}
          </>
        ) : (
          <div className="text-muted-foreground flex min-h-[340px] flex-col items-center justify-center gap-3">
            <div className="bg-muted/40 rounded-xl border p-4">
              <Braces className="size-6" />
            </div>
            <p className="text-sm">A little input. A useful result.</p>
            <p className="text-xs">Your output will appear here.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
