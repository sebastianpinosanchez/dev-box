import QRCode from 'qrcode';
import jsQR from 'jsqr';
import { toBase64, utf8 } from '@/lib/bytes';
import { integer, requireInput, type Runner } from '@/lib/tool';
export const run: Runner = (input, o, bytes) => {
  if (o.mode === 'Decode') {
    if (!bytes) throw new Error('Upload a QR image to decode.');
    const width = integer(o.width, 1, 8192),
      height = integer(o.height, 1, 8192);
    if (bytes.length !== width * height * 4)
      throw new Error('Invalid image pixel data.');
    const code = jsQR(new Uint8ClampedArray(bytes), width, height);
    if (!code)
      throw new Error(
        'No QR code found. Use a clear image with a visible border.',
      );
    return { text: code.data };
  }
  requireInput(input);
  const qr = QRCode.create(input, { errorCorrectionLevel: 'M' });
  const size = qr.modules.size;
  const cells: string[] = [];
  for (let y = 0; y < size; y++)
    for (let x = 0; x < size; x++)
      if (qr.modules.get(y, x)) cells.push(`M${x + 4},${y + 4}h1v1h-1z`);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size + 8} ${size + 8}"><path fill="white" d="M0 0h${size + 8}v${size + 8}H0z"/><path fill="black" d="${cells.join('')}"/></svg>`;
  const base64 = toBase64(utf8(svg));
  return {
    text: input,
    image: `data:image/svg+xml;base64,${base64}`,
    download: { name: 'qrcode.svg', type: 'image/svg+xml', base64 },
  };
};
