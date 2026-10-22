import YAML from 'yaml';
import * as TOML from 'smol-toml';
import { XMLParser, XMLBuilder, XMLValidator } from 'fast-xml-parser';
import Papa from 'papaparse';
import { requireInput, type Runner } from '@/lib/tool';
export const run: Runner = (input, o) => {
  requireInput(input);
  let data: unknown;
  switch (o.from || 'JSON') {
    case 'JSON':
      data = JSON.parse(input);
      break;
    case 'YAML':
      data = YAML.parse(input, { maxAliasCount: 100 });
      break;
    case 'TOML':
      data = TOML.parse(input);
      break;
    case 'XML': {
      const validation = XMLValidator.validate(input);
      if (validation !== true) throw new Error(validation.err.msg);
      if (/<!DOCTYPE/i.test(input))
        throw new Error('DTD declarations are not supported.');
      data = new XMLParser({
        ignoreAttributes: false,
        processEntities: true,
      }).parse(input);
      break;
    }
    case 'CSV': {
      const parsed = Papa.parse(input, { header: true, skipEmptyLines: true });
      if (parsed.errors.length) throw new Error(parsed.errors[0].message);
      data = parsed.data;
      break;
    }
    default:
      throw new Error('Unsupported input format.');
  }
  let text: string;
  switch (o.to || 'YAML') {
    case 'JSON':
      text = JSON.stringify(data, null, 2);
      break;
    case 'YAML':
      text = YAML.stringify(data);
      break;
    case 'TOML':
      text = TOML.stringify(data as Record<string, unknown>);
      break;
    case 'XML':
      if (!data || typeof data !== 'object' || Array.isArray(data))
        throw new Error('XML output needs an object with a named root.');
      text = new XMLBuilder({ format: true, ignoreAttributes: false }).build(
        data,
      );
      break;
    case 'CSV':
      if (
        !Array.isArray(data) ||
        data.some(
          (row) =>
            !row ||
            typeof row !== 'object' ||
            Object.values(row).some(
              (value) => typeof value === 'object' && value !== null,
            ),
        )
      )
        throw new Error('CSV needs an array of flat records.');
      text = Papa.unparse(data);
      break;
    default:
      throw new Error('Unsupported output format.');
  }
  return { text };
};
