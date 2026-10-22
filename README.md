# DevBox

A local developer toolbox with **42 tools**, bundled fonts and reference data. No accounts, telemetry, external APIs or runtime internet access. Text, files, keys and tokens stay on your device.

## Run locally

The Node version pinned in `.nvmrc` and npm are required. Run `nvm use` to select it. Network is needed only for setup.

```sh
npm ci
npm run dev
```

For the production build with strict offline security headers:

```sh
npm run build
npm start
```

Open **http://127.0.0.1:8080**. Keep this local static server running to use the app offline. `npm run dev` uses Vite's loopback development server and HMR. Installable PWA caching is not enabled.

## Tools

- **Encoding:** Base64 text/files and URL-safe variants; JWT decode/sign/verify (HS, RS and ES); URL editing; HTML entities; UTF-8 hex/binary/ASCII/Unicode; arbitrary number bases.
- **Formatting:** JSON/tree/JSONPath; JSON/YAML/TOML/XML/CSV; SQL dialects; JS/CSS/HTML/XML; inline/side-by-side diff; sanitized GFM Markdown.
- **Security:** MD5/SHA/HMAC text/files, UUID v4/v7, ULID/NanoID, passwords, bcrypt, RSA/SSH key pairs, X.509 decoder.
- **Text/time:** regex highlights/groups, naming conventions, counts, lorem ipsum, slugs/escapes, line sorting, timestamps/timezones and cron next runs.
- **Web/reference:** statuses, MIME types, IPv4/IPv6 subnets, user agents, cURL-to-code, color/contrast, Linux/shell, shortcuts, Git, containers, chmod and syntax references.
- **Misc:** QR generation/image decoding, image data URIs, .env/JSON, docker-run-to-Compose.

Use Ctrl/Cmd+K to find a tool. Each route is deep-linkable. Load sample demonstrates the default mode; Clear removes working data. Theme and safe settings persist; inputs, files, keys, passwords and results never do.

## Docker

```sh
docker compose up --build -d
```

Open **http://127.0.0.1:8080**. The final image contains only Node, built static files and the static server. Compose binds the published port to loopback. No external access is needed after image construction. To run manually: `docker build -t devbox .` then `docker run --rm -p 127.0.0.1:8080:8080 devbox`.

## Quality and contributions

```sh
npm run verify
npx playwright install chromium  # setup only
npm run test:smoke
npm run new-tool -- your-tool --category "Text"
```

Verify runs typecheck, ESLint, Prettier check, Vitest, production build and repository guardrails. Browser tests open every tool, load samples and reject external requests. `scripts/setup.sh` performs a complete setup and verification. CI runs both suites.

Read [AGENTS.md](AGENTS.md), [architecture](docs/architecture.md), [adding a tool](docs/adding-a-tool.md) and [UI guidelines](docs/ui-guidelines.md). Base64 is the reference implementation. Tool metadata, navigation and routes come from one registry. All heavy processing runs in cancellable workers.

## Behavior and limits

- Files: 20 MB maximum; QR images: 16 megapixels. Regex timeout: 2.5 seconds; other worker operations: 60 seconds.
- JWT decoding does not establish authenticity. Verify explicitly with a selected algorithm/key. PEM signing uses PKCS#8 private keys; verification uses SPKI public keys. Certificate decoding does not validate a trust chain.
- Bcrypt rejects inputs over 72 UTF-8 bytes. Password entropy assumes independently uniform characters; selecting a character set allows its characters without forcing one of each.
- CSV output requires flat records. Format conversion can change type conventions; XML attributes use `@_` keys. XML DTDs are rejected. HTML minification preserves preformatted/script/style content; it does not execute it.
- cURL/docker conversion supports the common flags documented in tool errors/tests and rejects unsupported flags. Generated code is never executed. Shell expansion is not performed. Environment conversion handles single-line assignments and escaped multiline double-quoted values; it does not expand variables.
- Contrast checks require opaque colors. IPv6 has no broadcast address. References are curated offline quick references, not exhaustive manuals.
- The production CSP blocks connections. Only local assets, bundled WASM and safe data/blob images are allowed. Markdown remote links/images are disabled. Keep the app on loopback so Web Crypto and clipboard APIs remain available.
