import type { ToolResult } from './tool';
export function searchReference(
  entries: Record<string, string>[],
  query: string,
): ToolResult {
  const words = query.toLowerCase().trim().replace(/^\./, '').split(/\s+/);
  const rows = entries.filter((entry) =>
    words.every((word) =>
      Object.values(entry).join(' ').toLowerCase().includes(word),
    ),
  );
  return {
    text: rows
      .map((row) =>
        Object.entries(row)
          .map(([key, value]) => `${key}: ${value}`)
          .join('\n'),
      )
      .join('\n\n'),
    rows,
    status: `${rows.length} entries`,
  };
}
