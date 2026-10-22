import { describe, it, expect } from 'vitest';
import { run } from './logic';
describe('data-converter', () => {
  it('converts JSON to YAML', async () => {
    expect(
      (await run('{"name":"DevBox"}', { from: 'JSON', to: 'YAML' })).text,
    ).toContain('name: DevBox');
  });
  it('converts CSV to JSON', async () => {
    expect(
      JSON.parse(
        (await run('name,value\na,1', { from: 'CSV', to: 'JSON' })).text,
      ),
    ).toEqual([{ name: 'a', value: '1' }]);
  });
  it('rejects lossy CSV shape and XML DTD', async () => {
    expect(() => run('{"a":1}', { to: 'CSV' })).toThrow();
    expect(() => run('<!DOCTYPE x><x/>', { from: 'XML' })).toThrow();
  });
});

it('decodes built-in XML entities without double escaping', async () => {
  expect(
    JSON.parse(
      (await run('<r>A &amp; B</r>', { from: 'XML', to: 'JSON' })).text,
    ),
  ).toEqual({ r: 'A & B' });
});
