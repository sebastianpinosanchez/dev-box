import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  timeout: 90000,
  workers: 2,
  use: {
    baseURL: 'http://127.0.0.1:8080',
    browserName: 'chromium',
    headless: true,
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'npm start',
    url: 'http://127.0.0.1:8080',
    reuseExistingServer: !process.env.CI,
    timeout: 30000,
  },
});
