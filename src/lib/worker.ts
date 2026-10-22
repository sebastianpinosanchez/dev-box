import type { Runner } from './tool';
const modules = import.meta.glob<{ run: Runner }>('../tools/*/logic.ts');
self.onmessage = async (
  event: MessageEvent<{
    id: string;
    input: string;
    options: Record<string, string>;
    bytes?: Uint8Array;
  }>,
) => {
  try {
    const load = modules[`../tools/${event.data.id}/logic.ts`];
    if (!load) throw new Error('Unknown tool');
    const { run } = await load();
    self.postMessage({
      result: await run(event.data.input, event.data.options, event.data.bytes),
    });
  } catch (error) {
    self.postMessage({
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
