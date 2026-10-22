import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
const root = resolve('dist');
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.wasm': 'application/wasm',
};
const csp =
  "default-src 'none'; script-src 'self' 'wasm-unsafe-eval'; style-src 'self' 'unsafe-inline'; font-src 'self'; img-src 'self' data: blob:; worker-src 'self'; connect-src 'none'; object-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'";
await stat(resolve(root, 'index.html')).catch(() => {
  console.error('Build first: npm run build');
  process.exit(1);
});
const server = createServer(async (req, res) => {
  res.setHeader('Content-Security-Policy', csp);
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'no-referrer');
  if (!['GET', 'HEAD'].includes(req.method)) {
    res.writeHead(405);
    res.end();
    return;
  }
  try {
    const pathname = decodeURIComponent(
      new URL(req.url, 'http://localhost').pathname,
    );
    let path = resolve(root, '.' + pathname);
    if (!path.startsWith(root + sep) && path !== root) {
      res.writeHead(403);
      res.end();
      return;
    }
    if (!extname(path)) path = resolve(root, 'index.html');
    const data = await readFile(path);
    res.setHeader(
      'Content-Type',
      mime[extname(path)] || 'application/octet-stream',
    );
    res.setHeader(
      'Cache-Control',
      path.includes(`${sep}assets${sep}`)
        ? 'public, max-age=31536000, immutable'
        : 'no-cache',
    );
    res.writeHead(200);
    res.end(req.method === 'HEAD' ? undefined : data);
  } catch {
    res.writeHead(404);
    res.end('Not found');
  }
});
const host = process.env.HOST || '127.0.0.1';
const port = Number(process.env.PORT || 8080);
server.listen(port, host, () => console.log(`DevBox: http://${host}:${port}`));
