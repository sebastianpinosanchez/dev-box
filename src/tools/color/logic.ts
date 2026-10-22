import {
  parse,
  converter,
  formatHex,
  formatRgb,
  formatCss,
  wcagContrast,
} from 'culori';
import { requireInput, type Runner } from '@/lib/tool';
export const run: Runner = (input, o) => {
  const color = parse(requireInput(input)),
    background = parse(o.background || '#ffffff');
  if (!color || !background) throw new Error('Enter a valid CSS color.');
  if ((color.alpha ?? 1) < 1 || (background.alpha ?? 1) < 1)
    throw new Error('Contrast requires opaque colors.');
  const contrast = wcagContrast(color, background);
  const values = {
    HEX: formatHex(color),
    RGB: formatRgb(color),
    HSL: formatCss(converter('hsl')(color)),
    OKLCH: formatCss(converter('oklch')(color)),
    Contrast: `${contrast.toFixed(2)}:1`,
    'WCAG AA normal': contrast >= 4.5 ? 'Pass' : 'Fail',
    'WCAG AA large': contrast >= 3 ? 'Pass' : 'Fail',
    'WCAG AAA normal': contrast >= 7 ? 'Pass' : 'Fail',
  };
  return {
    text: JSON.stringify(values, null, 2),
    rows: Object.entries(values).map(([format, value]) => ({
      format,
      value: value || '',
    })),
    status: `Contrast ${contrast.toFixed(2)}:1`,
  };
};
