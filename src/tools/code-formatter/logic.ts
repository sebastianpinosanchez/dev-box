import {
  parse as parseDocument,
  parseFragment,
  serialize,
  type DefaultTreeAdapterMap,
} from 'parse5';
function minifyHTML(input: string) {
  const root = /<!doctype|<html[\s>]/i.test(input)
    ? parseDocument(input)
    : parseFragment(input);
  function visit(node: DefaultTreeAdapterMap['node'], preserve = false) {
    const keep =
      preserve ||
      ('tagName' in node &&
        ['pre', 'textarea', 'script', 'style'].includes(node.tagName));
    if ('childNodes' in node) {
      node.childNodes = node.childNodes.filter(
        (child) => child.nodeName !== '#comment',
      );
      for (const child of node.childNodes) visit(child, keep);
    }
    if ('value' in node && !keep)
      node.value = node.value.replace(/[\t\n\r ]+/g, ' ');
  }
  visit(root);
  return serialize(root).trim();
}
import * as prettier from 'prettier/standalone';
import * as babel from 'prettier/plugins/babel';
import * as estree from 'prettier/plugins/estree';
import * as html from 'prettier/plugins/html';
import * as postcss from 'prettier/plugins/postcss';
import { minify as minifyJS } from 'terser';
import { parse, generate } from 'css-tree';
import { XMLParser, XMLBuilder, XMLValidator } from 'fast-xml-parser';
import { requireInput, result, type Runner } from '@/lib/tool';
export const run: Runner = async (input, o) => {
  requireInput(input);
  const language = o.language || 'JavaScript';
  if (language === 'XML') {
    const valid = XMLValidator.validate(input);
    if (valid !== true) throw new Error(valid.err.msg);
    if (/<!DOCTYPE/i.test(input))
      throw new Error('DTD declarations are not supported.');
    const data = new XMLParser({
      preserveOrder: true,
      ignoreAttributes: false,
      trimValues: false,
      processEntities: true,
    }).parse(input);
    return result(
      new XMLBuilder({
        preserveOrder: true,
        ignoreAttributes: false,
        format: o.mode !== 'Minify',
      }).build(o.mode === 'Minify' ? minifyXML(data) : data),
    );
  }
  if (o.mode === 'Minify') {
    if (language === 'JavaScript')
      return result((await minifyJS(input)).code || '');
    if (language === 'CSS') return result(generate(parse(input)));
    // Preserve preformatted content and document structure while compacting HTML.
    return result(minifyHTML(input));
  }
  return result(
    await prettier.format(input, {
      parser:
        language === 'JavaScript'
          ? 'babel'
          : language === 'CSS'
            ? 'css'
            : 'html',
      plugins: [babel, estree, html, postcss],
    }),
  );
};

// Remove indentation only in element-only content; preserve mixed content and xml:space.
type XMLNode = Record<string, unknown>;
function minifyXML(nodes: XMLNode[], preserve = false): XMLNode[] {
  const mixed = nodes.some(
    (node) =>
      ('#text' in node && String(node['#text']).trim() !== '') ||
      '#cdata' in node,
  );
  const elements = nodes.some((node) =>
    Object.keys(node).some((key) => !key.startsWith('#') && key !== ':@'),
  );
  return nodes
    .filter(
      (node) =>
        preserve ||
        mixed ||
        !elements ||
        !('#text' in node) ||
        String(node['#text']).trim() !== '',
    )
    .map((node) => {
      const attributes = node[':@'] as Record<string, string> | undefined;
      const space = attributes?.['@_xml:space'];
      const keep = space === 'preserve' || (space !== 'default' && preserve);
      return Object.fromEntries(
        Object.entries(node).map(([key, value]) => [
          key,
          Array.isArray(value) ? minifyXML(value as XMLNode[], keep) : value,
        ]),
      );
    });
}
