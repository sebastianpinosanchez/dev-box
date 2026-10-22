import { describe, it, expect } from 'vitest';
import { run } from './logic';
describe('qr', () => {
  it('generates an SVG download', async () => {
    const r = await run('hello', {});
    expect(r.image).toMatch(/^data:image\/svg/);
    expect(r.download?.name).toBe('qrcode.svg');
  });
  it('rejects empty text', async () => {
    expect(() => run('', {})).toThrow();
  });
  it('requires image for decoding', async () => {
    expect(() => run('', { mode: 'Decode' })).toThrow();
  });
});

it('decodes a generated pixel matrix', async () => {
  const { default: QRCode } = await import('qrcode');
  const qr = QRCode.create('QR round trip ✓');
  const scale = 4,
    width = (qr.modules.size + 8) * scale;
  const bytes = new Uint8Array(width * width * 4).fill(255);
  for (let y = 0; y < qr.modules.size; y++)
    for (let x = 0; x < qr.modules.size; x++)
      if (qr.modules.get(y, x))
        for (let dy = 0; dy < scale; dy++)
          for (let dx = 0; dx < scale; dx++) {
            const i =
              (((y + 4) * scale + dy) * width + (x + 4) * scale + dx) * 4;
            bytes[i] = 0;
            bytes[i + 1] = 0;
            bytes[i + 2] = 0;
          }
  expect(
    (
      await run(
        '',
        { mode: 'Decode', width: String(width), height: String(width) },
        bytes,
      )
    ).text,
  ).toBe('QR round trip ✓');
});
