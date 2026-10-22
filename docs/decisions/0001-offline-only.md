# 0001 — Offline processing

Accepted. No tool makes network requests. Bundle dependencies, fonts and reference data. Serve static assets locally; use CSP connect-src none in production. Sanitize previews and keep generated commands inert. Installation may use network. Vite HMR is loopback-only development infrastructure, absent from production. External runtime API features are excluded.
