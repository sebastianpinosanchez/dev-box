import { useEffect, useState, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Play, RotateCcw, Clock3 } from 'lucide-react';
import { ToolLayout } from './ToolLayout';
import { InputPane } from './InputPane';
import { OutputPane } from './OutputPane';
import { ErrorAlert } from './ErrorAlert';
import { SampleButton } from './SampleButton';
import { FileDropzone } from './FileDropzone';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/components/ui/resizable';
import { readSetting, writeSetting } from '@/lib/settings';
import type {
  Options,
  ToolMeta,
  ToolResult,
  WorkbenchConfig,
} from '@/lib/tool';
function safeOptions(config: WorkbenchConfig, options: Options) {
  return Object.fromEntries(
    (config.fields || [])
      .filter((f) => f.choices || f.type === 'number' || f.type === 'checkbox')
      .map((f) => [f.key, options[f.key]]),
  );
}
function initialOptions(meta: ToolMeta, config: WorkbenchConfig) {
  const defaults = Object.fromEntries(
    (config.fields || []).map((f) => [f.key, f.value]),
  );
  const saved = config.sensitive
    ? {}
    : readSetting<Options>(`settings:${meta.id}`, {});
  return {
    ...defaults,
    ...safeOptions(config, { ...defaults, ...saved }),
    mode: config.modes?.[0] || '',
  };
}
function LiveNow() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="text-muted-foreground flex items-center gap-2 font-mono text-xs">
      <Clock3 className="size-3.5" />
      Now: {Math.floor(now.getTime() / 1000)} · {now.toISOString()}
    </div>
  );
}
export function Workbench({
  meta,
  sample,
  config,
}: {
  meta: ToolMeta;
  sample: string;
  config: WorkbenchConfig;
}) {
  const mobile = useIsMobile();
  const [input, setInput] = useState('');
  const [options, setOptions] = useState<Options>(() =>
    initialOptions(meta, config),
  );
  const [bytes, setBytes] = useState<Uint8Array>();
  const [output, setOutput] = useState<ToolResult>();
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [revision, setRevision] = useState(0);
  const [cleared, setCleared] = useState(false);
  const fileSequence = useRef(0);
  const changeOption = (key: string, value: string) => {
    setCleared(false);
    setOptions((current) => ({ ...current, [key]: value }));
  };
  useEffect(() => {
    if (!config.sensitive)
      writeSetting(`settings:${meta.id}`, safeOptions(config, options));
  }, [config, meta.id, options]);
  useEffect(() => {
    setOutput(undefined);
    setError('');
    setBusy(false);
    if (
      cleared ||
      (!input &&
        !bytes &&
        !revision &&
        meta.category !== 'Reference' &&
        meta.id !== 'http-status' &&
        meta.id !== 'mime')
    )
      return;
    if (config.action && !revision) return;
    let worker: Worker | undefined;
    let deadline: ReturnType<typeof setTimeout> | undefined;
    setBusy(true);
    const timer = setTimeout(() => {
      worker = new Worker(new URL('../../lib/worker.ts', import.meta.url), {
        type: 'module',
      });
      deadline = setTimeout(
        () => {
          worker?.terminate();
          setBusy(false);
          setError(
            'Operation timed out. Reduce the input size or complexity and try again.',
          );
        },
        meta.id === 'regex' ? 2500 : 60000,
      );
      worker.onmessage = (
        event: MessageEvent<{ result?: ToolResult; error?: string }>,
      ) => {
        clearTimeout(deadline);
        setBusy(false);
        setOutput(event.data.result);
        setError(event.data.error || '');
        worker?.terminate();
      };
      worker.onerror = (event) => {
        event.preventDefault();
        clearTimeout(deadline);
        setBusy(false);
        setError('The processing worker failed. Reload the app and try again.');
        worker?.terminate();
      };
      worker.postMessage({ id: meta.id, input, options, bytes });
    }, 250);
    return () => {
      clearTimeout(timer);
      clearTimeout(deadline);
      worker?.terminate();
    };
  }, [
    input,
    options,
    bytes,
    revision,
    cleared,
    config.action,
    meta.id,
    meta.category,
  ]);
  const loadSample = () => {
    fileSequence.current++;
    setCleared(false);
    setBytes(undefined);
    setInput(sample);
    setOptions({
      ...Object.fromEntries((config.fields || []).map((f) => [f.key, f.value])),
      mode: config.modes?.[0] || '',
      ...config.sampleOptions,
    });
    setRevision((n) => n + 1);
  };
  const onFile = async (file: File) => {
    const sequence = ++fileSequence.current;
    try {
      if (file.size > 20 * 1024 * 1024)
        throw new Error('File exceeds the 20 MB limit.');
      let data: Uint8Array | undefined;
      let text = '';
      let dimensions: Options = {};
      if (
        config.file === 'text' ||
        (meta.id === 'base64' && options.mode === 'Decode')
      )
        text = await file.text();
      else if (config.file === 'image') {
        const bitmap = await createImageBitmap(file);
        if (bitmap.width * bitmap.height > 16_000_000) {
          bitmap.close();
          throw new Error('Image exceeds 16 megapixels. Resize it first.');
        }
        const canvas = document.createElement('canvas');
        canvas.width = bitmap.width;
        canvas.height = bitmap.height;
        const context = canvas.getContext('2d');
        if (!context) throw new Error('Canvas unavailable.');
        context.drawImage(bitmap, 0, 0);
        data = new Uint8Array(
          context.getImageData(0, 0, bitmap.width, bitmap.height).data,
        );
        dimensions = {
          width: String(bitmap.width),
          height: String(bitmap.height),
          mode: 'Decode',
        };
        bitmap.close();
      } else data = new Uint8Array(await file.arrayBuffer());
      if (sequence !== fileSequence.current) return;
      setCleared(false);
      setInput(text);
      setBytes(data);
      setOptions((current) => ({ ...current, ...dimensions }));
      setRevision((n) => n + 1);
    } catch (e) {
      if (sequence === fileSequence.current) {
        setOutput(undefined);
        setError((e as Error).message);
      }
    }
  };
  const inputPane = (
    <InputPane
      value={input}
      onChange={(value) => {
        fileSequence.current++;
        setInput(value);
        setBytes(undefined);
        setCleared(false);
      }}
      label={
        config.inputLabel ||
        (meta.category === 'Reference' ? 'Search reference' : 'Input')
      }
    >
      {bytes && (
        <p className="text-muted-foreground text-xs">
          {bytes.length.toLocaleString()} bytes loaded from file. Edit the input
          to switch back to text.
        </p>
      )}
      {config.file && <FileDropzone accept={config.accept} onFile={onFile} />}
    </InputPane>
  );
  const outputPane = (
    <OutputPane
      result={output}
      busy={busy}
      mode={options.mode}
      onEditRow={
        meta.id === 'url' && options.mode === 'Parse'
          ? (index, key, value) => {
              try {
                const url = new URL(input);
                const pairs = Array.from(url.searchParams);
                pairs[index][key === 'parameter' ? 0 : 1] = value;
                url.search = '';
                for (const [k, v] of pairs) url.searchParams.append(k, v);
                setInput(url.toString());
              } catch {
                /* Invalid URL is shown by the worker. */
              }
            }
          : undefined
      }
    />
  );
  return (
    <ToolLayout
      meta={meta}
      actions={
        <>
          <SampleButton onClick={loadSample} />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              fileSequence.current++;
              setInput('');
              setBytes(undefined);
              setOptions(initialOptions(meta, config));
              setCleared(true);
              setRevision(0);
              setOutput(undefined);
              setError('');
            }}
          >
            <RotateCcw className="size-3.5" />
            Clear
          </Button>
        </>
      }
    >
      <div className="mb-5 space-y-5">
        {config.modes && (
          <Tabs
            value={options.mode}
            onValueChange={(value) => changeOption('mode', value)}
          >
            <TabsList className="h-auto flex-wrap">
              {config.modes.map((mode) => (
                <TabsTrigger key={mode} value={mode}>
                  {mode}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        )}
        {config.fields && (
          <div className="bg-card flex flex-wrap items-end gap-4 rounded-xl border p-4">
            {config.fields.map((field) => (
              <div
                key={field.key}
                className={
                  field.type === 'textarea'
                    ? 'w-full'
                    : field.type === 'checkbox'
                      ? 'flex items-center gap-2 self-center'
                      : 'min-w-36 flex-1 space-y-2'
                }
              >
                {field.type === 'checkbox' ? (
                  <>
                    <Checkbox
                      id={`field-${field.key}`}
                      checked={options[field.key] === 'true'}
                      onCheckedChange={(v) =>
                        changeOption(field.key, String(v === true))
                      }
                    />
                    <Label htmlFor={`field-${field.key}`} className="text-xs">
                      {field.label}
                    </Label>
                  </>
                ) : (
                  <>
                    <Label
                      htmlFor={`field-${field.key}`}
                      className="text-muted-foreground text-xs"
                    >
                      {field.label}
                    </Label>
                    {field.choices ? (
                      <Select
                        value={options[field.key]}
                        onValueChange={(v) => changeOption(field.key, v)}
                      >
                        <SelectTrigger
                          id={`field-${field.key}`}
                          className="w-full"
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {field.choices.map((choice) => (
                            <SelectItem key={choice} value={choice}>
                              {choice}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : field.type === 'textarea' ? (
                      <Textarea
                        id={`field-${field.key}`}
                        value={options[field.key]}
                        onChange={(e) =>
                          changeOption(field.key, e.target.value)
                        }
                        spellCheck={false}
                        autoComplete="off"
                        className="mt-2 min-h-20 font-mono text-xs"
                      />
                    ) : (
                      <Input
                        id={`field-${field.key}`}
                        type={
                          field.type === 'secret'
                            ? 'password'
                            : field.type || 'text'
                        }
                        min={field.min}
                        max={field.max}
                        autoComplete="off"
                        value={options[field.key]}
                        onChange={(e) =>
                          changeOption(field.key, e.target.value)
                        }
                        className="font-mono text-sm"
                      />
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        )}
        {meta.id === 'timestamp' && <LiveNow />}
        {meta.id === 'color' && (
          <div className="flex items-center gap-3">
            <Label htmlFor="color-picker">Pick a color</Label>
            <Input
              id="color-picker"
              aria-label="Pick a color"
              type="color"
              value={/^#[0-9a-f]{6}$/i.test(input) ? input : '#2563eb'}
              onChange={(e) => {
                setInput(e.target.value);
                setCleared(false);
              }}
              className="h-10 w-16 p-1"
            />
          </div>
        )}
        {meta.id === 'regex' && (
          <p className="text-muted-foreground font-mono text-xs">
            \d digit · \w word · + one or more · * zero or more · (group)
            capture · ^ start · $ end · g global · i ignore case
          </p>
        )}
        {config.action && (
          <Button
            onClick={() => {
              setCleared(false);
              setRevision((n) => n + 1);
            }}
          >
            <Play className="size-4" />
            {config.action}
          </Button>
        )}
        {error && <ErrorAlert message={error} />}
      </div>
      {config.inputHidden ? (
        outputPane
      ) : mobile ? (
        <div className="grid gap-4">
          {inputPane}
          {outputPane}
        </div>
      ) : (
        <div>
          <ResizablePanelGroup
            orientation="horizontal"
            className="min-h-[430px] items-stretch"
          >
            <ResizablePanel defaultSize="50%" minSize="25%">
              {inputPane}
            </ResizablePanel>
            <ResizableHandle className="mx-3 bg-transparent" withHandle />
            <ResizablePanel defaultSize="50%" minSize="25%">
              {outputPane}
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      )}
    </ToolLayout>
  );
}
