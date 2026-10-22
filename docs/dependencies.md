# Runtime dependencies

All dependencies are installed during setup and bundled locally. No package may fetch resources at runtime. package-lock.json fixes the resolved graph. Keep a concrete justification for each addition. Heavy libraries are lazy-loaded in workers.

| Package                      | Reason                                                                                                                              |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `@base-ui/react`             | CLI-generated optional InputGroup support (initial scaffold; unused by tool screens).                                               |
| `@fontsource-variable/geist` | Locally bundled font from the shadcn initialization; no remote font requests.                                                       |
| `@fontsource/inter`          | Local interface font.                                                                                                               |
| `@fontsource/jetbrains-mono` | Local monospace editor font.                                                                                                        |
| `@peculiar/x509`             | Browser X.509 certificate parsing without a backend.                                                                                |
| `bcryptjs`                   | Portable bcrypt hashing and verification inside workers.                                                                            |
| `class-variance-authority`   | Typed shadcn component variants.                                                                                                    |
| `clsx`                       | Shared conditional class composition.                                                                                               |
| `cmdk`                       | Fuzzy keyboard command palette used by shadcn Command.                                                                              |
| `cn`                         | Class composition helper emitted by the current shadcn CLI.                                                                         |
| `cron-parser`                | Timezone-aware cron iteration including daylight saving transitions.                                                                |
| `cronstrue`                  | Human-readable cron descriptions.                                                                                                   |
| `css-tree`                   | Syntax-aware CSS parsing and compact serialization.                                                                                 |
| `culori`                     | CSS color parsing, conversions and contrast calculations.                                                                           |
| `diff`                       | Line comparison and change segments.                                                                                                |
| `dompurify`                  | Sanitizes Markdown/regex previews at the DOM boundary.                                                                              |
| `fast-xml-parser`            | XML validation and structured parsing/building without DTD processing.                                                              |
| `hash-wasm`                  | Bundled WASM MD5/SHA/HMAC with no external WASM downloads.                                                                          |
| `he`                         | Complete HTML named/numeric entity conversion.                                                                                      |
| `ipaddr.js`                  | IPv4 and IPv6 parsing and serialization.                                                                                            |
| `jose`                       | Local JWT signing, verification and decoding via Web Crypto.                                                                        |
| `jsonpath-plus`              | JSONPath queries with script evaluation explicitly disabled.                                                                        |
| `jsqr`                       | QR decoding from local RGBA image pixels.                                                                                           |
| `lucide-react`               | Locally bundled icons.                                                                                                              |
| `marked`                     | GitHub-flavored Markdown parsing (sanitized separately).                                                                            |
| `nanoid`                     | Cryptographic compact identifiers.                                                                                                  |
| `next-themes`                | Import required by vendor shadcn Sonner; application passes the resolved Vite theme explicitly.                                     |
| `papaparse`                  | CSV parsing and escaping.                                                                                                           |
| `parse5`                     | HTML syntax tree for local minification without network-capable minifier bundles.                                                   |
| `prettier`                   | Runtime formatter with explicitly bundled JavaScript/HTML/CSS parsers; also repository formatting.                                  |
| `qrcode`                     | QR matrix generation, serialized as local SVG.                                                                                      |
| `radix-ui`                   | Accessible primitives used by the shadcn Radix components.                                                                          |
| `react`                      | Component rendering and state.                                                                                                      |
| `react-dom`                  | Browser React renderer.                                                                                                             |
| `react-resizable-panels`     | Accessible desktop input/output resizing.                                                                                           |
| `react-router-dom`           | Deep-linkable tool routes and client-side navigation.                                                                               |
| `reflect-metadata`           | Required reflection polyfill for the X.509 parser dependency.                                                                       |
| `shadcn`                     | CLI-generated Tailwind support stylesheet and reproducible component additions (setup only).                                        |
| `shell-quote`                | Parse quoted cURL/docker arguments without executing a shell.                                                                       |
| `smol-toml`                  | TOML parsing and serialization.                                                                                                     |
| `sonner`                     | Local copy/error toast notifications.                                                                                               |
| `sql-formatter`              | SQL formatting with multiple dialects.                                                                                              |
| `tailwind-merge`             | Resolve conflicting shared Tailwind classes.                                                                                        |
| `terser`                     | Syntax-aware JavaScript minification in a worker.                                                                                   |
| `tw-animate-css`             | Local shadcn animation styles.                                                                                                      |
| `ua-parser-js`               | Offline user-agent parsing; its AGPL/commercial licensing must be reviewed before redistribution in a differently licensed product. |
| `ulid`                       | ULID generation with browser randomness.                                                                                            |
| `uuid`                       | UUID v4/v7 generation and validation.                                                                                               |
| `yaml`                       | YAML parsing/serialization and Compose output.                                                                                      |
| `zod`                        | Runtime validation of tool metadata.                                                                                                |

Development dependencies provide Vite/Tailwind, strict TypeScript, ESLint/Prettier, Vitest/Testing Library and Playwright. They are not production services. Review package licenses when redistributing; no project-wide license is implied by this initial scaffold.

## Setup-tool audit

On 2026-10-21, `npm audit --omit=dev` reported zero advisories. The full graph reported seven high-severity findings through the shadcn CLI's transitive `braces`/`micromatch`/`fast-glob`/`ts-morph` dependencies. shadcn is a **development dependency**; none of that CLI code ships in the browser or final Docker image. npm's proposed forced downgrade to shadcn 1.x is incompatible with the current component workflow, so it was not applied. Recheck advisories during dependency updates.
