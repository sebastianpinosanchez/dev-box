# Architecture

DevBox is a static Vite application. React Router maps `/tool-id` to a lazy Tool component. `registry.ts` eagerly discovers only each folder's small index and validated Zod metadata; tool UI and processing libraries are separate lazy chunks. The same registry drives navigation and the fuzzy command palette.

Each Tool configures the shared Workbench with metadata, sample and controls. Text edits debounce for 250 ms. A new module worker loads `src/tools/<id>/logic.ts` through a build-time glob, invokes `run(input, options, bytes)` and posts a ToolResult. The previous worker is terminated when inputs change or the route unmounts. Regex work has a 2.5-second deadline; other operations have 60 seconds. This also isolates hashing, bcrypt and RSA generation. Randomness and Web Crypto remain on the local device.

ToolResult contains text and optional table rows, status, tree, diff, HTML, image or downloadable bytes. HTML is sanitized at the DOM boundary; all active/remote content is removed. JSONPath expression evaluation is disabled. URL/cURL/reference samples are inert text. QR SVG is generated from numeric modules, never raw user XML.

Files are capped at 20 MB. Binary data remains bytes, not lossy text. QR image decoding uses browser image decoding and a canvas, with a 16-megapixel limit before pixel extraction. No uploads occur. Files, inputs and results are never stored. Only theme, route and safe nonsecret controls persist; sensitive tools persist no options.

`npm start` serves built files using a small Node static server. It binds to loopback by default and sets a restrictive Content Security Policy. `connect-src 'none'` prohibits runtime connections; local scripts, fonts and workers are served from the same origin. WASM compilation is allowed for bundled hashing code. The development server uses local Vite HMR; production smoke tests run against the static server without HMR. Docker listens on its internal interface but Compose publishes only to host loopback.

The repository harness validates tool completeness, dependency documentation, imports, generated UI integrity, runtime networking APIs and source/build URL references. Playwright opens every route and exercises its sample while rejecting external requests. These checks complement the CSP; static scanning alone is not a proof of absence of all possible network behavior.
