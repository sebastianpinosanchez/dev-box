# Adding a tool

Start with AGENTS.md and src/tools/AGENTS.md. Run `nvm use` to select the Node version in `.nvmrc` and run `npm ci` during setup. Choose a focused backlog item and create a dated plan for a larger change. The Base64 folder is the canonical complete reference.

## Worked example: line sorter

```sh
npm run new-tool -- line-sorter --category "Text"
```

This refuses duplicate IDs, validates the category, creates all six files and automatically registers the tool through the existing index glob. There is no generated route list to edit. The initial trim function is a scaffold, not the finished feature.

Replace logic.ts with a framework-free `run` that accepts newline-separated text, sorts using a documented comparison order, optionally removes duplicate lines, and returns `{ text }`. Configure a `direction` Select and `unique` Checkbox in Tool.tsx. Set a meaningful title/description/keywords in meta.ts and a small sample in samples.ts. Keep index.ts's lazy import.

Test ascending/descending order, duplicates, empty input and CRLF. Avoid locale-sensitive ordering in tests unless the tool explicitly promises a locale. The implemented line-sorter is the end-to-end generator self-test from this walkthrough; use a different ID to repeat the exercise.

1. Confirm every generated file is filled in and metadata ID matches the directory.
2. Keep all imports local to the tool, shared lib, shared UI, vendor components or documented dependencies.
3. For a new dependency, first add the rationale to docs/dependencies.md. Install it during setup, then keep runtime offline.
4. Add/update CHANGELOG.md and mark the backlog item done. Keep the execution plan current.
5. Run `npm run format`, then `npm run verify`.
6. Build and run `npm run test:smoke`; the new folder is discovered automatically by Playwright.
7. Open the route, load a sample, try malformed input, use the keyboard, test mobile and confirm no sensitive persistence.

If a tool needs custom controls, compose shadcn components in Tool.tsx and shared wrappers. Put reusable processing in src/lib, never in another tool. Use workers for expensive work; the shared Workbench already handles isolation, debounce, timeouts and stale-result cancellation. If a feature fundamentally requires internet, add it to the backlog with a reason instead of violating offline behavior.
