# 0002 — Registry and workers

Accepted. Vite discovers per-tool index modules; each validates metadata with Zod and lazy-loads UI. A separate worker discovers pure logic modules and dynamically loads one. This avoids manually maintained lists and keeps heavy code out of initial rendering. Workers are disposable to guarantee cancellation, including pathological regular expressions. Tests run logic in Node and integrated workers in Chromium.
