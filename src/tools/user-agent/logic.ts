import { UAParser } from 'ua-parser-js';
import { requireInput, result, type Runner } from '@/lib/tool';
export const run: Runner = (input) => {
  const parsed = new UAParser(requireInput(input)).getResult();
  return result({
    browser: parsed.browser,
    engine: parsed.engine,
    os: parsed.os,
    device: parsed.device,
    cpu: parsed.cpu,
  });
};
