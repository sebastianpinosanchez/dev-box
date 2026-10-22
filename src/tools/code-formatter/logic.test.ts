import { describe, it, expect } from 'vitest';
import { run } from './logic';
describe('code-formatter', () => {
  it('formats JS', async () => {
    expect((await run('const x=1', { language: 'JavaScript' })).text).toBe(
      'const x = 1;\n',
    );
  });
  it('minifies CSS', async () => {
    expect(
      (await run('a { color: red; }', { language: 'CSS', mode: 'Minify' }))
        .text,
    ).toBe('a{color:red}');
  });
  it('rejects invalid XML', async () => {
    await expect(async () =>
      run('<a><b></a>', { language: 'XML' }),
    ).rejects.toThrow();
  });
});

it('minifies HTML without changing preformatted content', async () => {
  const result = await run(
    '<div>hello   world</div><!-- comment --><pre>  keep\n  this</pre>',
    { language: 'HTML', mode: 'Minify' },
  );
  expect(result.text).not.toContain('comment');
  expect(result.text).toContain('<div>hello world</div>');
  expect(result.text).toContain('<pre>  keep\n  this</pre>');
});

it('preserves HTML documents and XML entity values', async () => {
  const html = await run(
    '<!doctype html><html><head><title>Hi</title></head><body> Hello </body></html>',
    { language: 'HTML', mode: 'Minify' },
  );
  expect(html.text).toContain('<!DOCTYPE html>');
  expect(html.text).toContain('<html>');
  const xml = await run('<r>\n <a>A &amp; B</a>\n <b>x</b>\n</r>', {
    language: 'XML',
    mode: 'Minify',
  });
  expect(xml.text).toBe('<r><a>A &amp; B</a><b>x</b></r>');
  expect(
    (
      await run('<r xml:space="preserve">\n <b>x</b>\n</r>', {
        language: 'XML',
        mode: 'Minify',
      })
    ).text,
  ).toContain('\n <b>x</b>\n');
});
