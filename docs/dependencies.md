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

## Dependency updates

[`renovate.json`](../renovate.json) configures the hosted Renovate GitHub App. Renovate is repository maintenance tooling; it adds no application dependency or runtime network access.

### Activation

1. Merge this configuration into the default branch.
2. Install the [Renovate GitHub App](https://github.com/apps/renovate) for this repository. A repository administrator must grant access; committing the configuration alone does not activate the service.
3. Enable GitHub's dependency graph and Dependabot alerts so Renovate can use vulnerability alerts. Do not also enable Dependabot version/security update PRs, which would duplicate Renovate's work.
4. Configure a branch ruleset for `main` requiring pull requests and the existing `verify` job from the Verify workflow. That job runs `npm ci`, `npm run verify` and browser smoke tests. Confirm the required check name from a completed PR run.
5. Check the Dependency Dashboard issue after the first run for extraction errors and pending updates. Renovate will propose GitHub Action SHA pins and Docker image digest pins; review those initial PRs.

### Policy

- Ordinary updates and lockfile maintenance run Monday between 00:00 and 06:59 in America/Bogota, subject to the hosted app's execution schedule. Ordinary releases wait three days. At most five ordinary PRs are open concurrently, with at most two created per hour.
- Related React, ESLint, Tailwind and unit-testing minor/patch updates are grouped. Other npm dependencies update independently. Major updates require selection in the Dependency Dashboard before a separate PR is opened. All merges remain manual.
- Node updates stay within major 22 and group `.nvmrc` with both Docker stages. CI already reads `.nvmrc`. The `package.json` engines range remains a compatibility floor; Renovate does not rewrite it. For a major migration, review the supported LTS releases and update the Renovate allowed range, engines range, runtime pins and `@types/node` together. The existing `@types/node` 26 versus runtime 22 mismatch should be resolved in a dedicated dependency change.
- GitHub Actions are pinned to commit SHAs and Docker images to digests through Renovate PRs. Future version and digest updates remain reviewable.
- Vulnerability-alert PRs bypass the weekly schedule and release-age delay. Renovate also exempts these PRs from ordinary PR rate/concurrency limits. Alerts depend on GitHub advisory coverage; review `npm audit` and `npm audit --omit=dev` during maintenance as well. Document exceptions and avoid forced downgrades without compatibility review.
- Review changelogs, licenses, install scripts and offline behavior before merging runtime dependency changes. Updating the shadcn npm package does not regenerate copied components: use the documented CLI workflow, review the vendor diff and run `node scripts/record-ui.mjs` for those changes.

Validate configuration changes during setup with `npx --yes --package renovate -- renovate-config-validator --strict --no-global renovate.json`. This downloads Renovate only as a setup tool to check its configuration and presets; it is intentionally not added to the application's dependency graph. Use the Node version required by that validator release if it differs from the application's runtime. Then run `npm run verify` with `nvm use`.

## Setup-tool audit

On 2026-10-21, `npm audit --omit=dev` reported zero advisories. The full graph reported seven high-severity findings through the shadcn CLI's transitive `braces`/`micromatch`/`fast-glob`/`ts-morph` dependencies. shadcn is a **development dependency**; none of that CLI code ships in the browser or final Docker image. npm's proposed forced downgrade to shadcn 1.x is incompatible with the current component workflow, so it was not applied. Recheck advisories during dependency updates.
