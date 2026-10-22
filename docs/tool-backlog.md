# Tool backlog

## Completed self-test

- **Line sorter** (`line-sorter`, Text). Sort newline-separated text ascending/descending, optionally remove duplicate lines. Deterministic Unicode code-unit order, CRLF support, empty-input coverage. Added with the documented generator walkthrough.

## Next

1. **JSON Schema validator** (`json-schema`, Formatting & Data). Validate input against a pasted schema without resolving remote refs. Show instance paths and messages. Tests: valid/invalid data, local refs, remote-ref refusal. Consider a browser-safe validator; justify dependency.
2. **Internationalized domain converter** (`idn`, Encoding). Unicode domains ⇄ ASCII labels, no DNS. Show per-label validation. Tests: known IDNs, invalid labels, empty input.
3. **Image resize** (`image-resize`, Misc). Resize local raster images with dimensions, aspect lock and downloadable PNG/WebP. Guard pixel and byte limits. Tests: dimensions, aspect ratio, invalid image and cancellation.
4. **Duration calculator** (`duration`, Time & Scheduling). ISO 8601 fixed-unit durations and elapsed-time arithmetic; explicitly distinguish calendar months. Tests: negative/zero durations and ambiguous calendar units.

## Intentionally excluded

- Live DNS, HTTP request execution, TLS fetching, live package/version lookup: require runtime network access. The corresponding local parsers/generators remain available.
- PWA/service-worker caching is optional in the specification and not enabled; run the local static server to open the app offline.
