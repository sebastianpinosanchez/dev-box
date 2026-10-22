#!/usr/bin/env sh
set -eu
npm ci
npx playwright install chromium
npm run verify
npm run test:smoke
