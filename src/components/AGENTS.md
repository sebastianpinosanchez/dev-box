# Component conventions

Read ../../AGENTS.md. ui/ is CLI-generated shadcn vendor code; no hand edits. Customize tokens in src/index.css and wrappers in shared/. Keep labels, focus handling and keyboard behavior. All preview HTML goes through sanitizePreview. No external media or active HTML. Shared component changes require focused component tests and route smoke tests. Preserve worker cancellation and stale-result cleanup.
