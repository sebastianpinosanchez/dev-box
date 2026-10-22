# 0004 — Static server and processing limits

Accepted. No backend processing is needed. A dependency-free Node HTTP static server provides loopback binding, SPA fallback, correct MIME types and security headers; no Fastify application/API is needed. Docker includes only Node, dist and this script. Limit files to 20 MB, QR images to 16 megapixels, bulk generation counts and worker execution time. These limits make local processing predictable; they are displayed or surfaced in errors.

HTML minification uses parse5 to remove comments and collapse ordinary text whitespace while preserving pre/textarea/script/style content. Avoid the html-minifier-terser browser bundle because it initializes XMLHttpRequest. Formatting uses bundled Prettier parsers. No user script execution is needed.
