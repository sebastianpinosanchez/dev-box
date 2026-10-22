# Conventions

Use strict TypeScript. Tool folder IDs use kebab-case and match metadata. Every folder owns six files: meta.ts, logic.ts, logic.test.ts, Tool.tsx, samples.ts and index.ts. `metaSchema.parse` is mandatory; index exports metadata plus a lazy Tool component. Registry discovery is automatic. Pure processing is exported as `run: Runner`; browser-standard crypto and randomness are allowed, but React, DOM, storage and network APIs are not.

Use `ToolResult` instead of ad hoc output rendering. Throw Error with a message that tells the user what to fix. Never silently discard unsupported flags or pretend lossy conversions are lossless. Structured conversions have format-specific limits (CSV needs flat records; TOML needs representable objects). Keep literal commands inert. Use `integer` for bounded counts and `requireInput` when empty input is invalid.

Test fixed known vectors, malformed input, boundaries and inverse operations. Do not test only a sample's existence. Use the Node Vitest environment for pure logic, with `// @vitest-environment jsdom` for component tests. Browser tests cover actual workers, CSP, lazy chunks, files and DOM behavior. Test fixtures are invented, never production credentials.

Prettier sorts Tailwind classes. ESLint enforces strict typing and React hook rules. Vendor UI files are excluded from formatting/lint rewriting but protected by checksums and typechecked. Refresh checksums only after CLI regeneration or a documented ADR exception. Plans track larger work before edits and record outcomes honestly.
