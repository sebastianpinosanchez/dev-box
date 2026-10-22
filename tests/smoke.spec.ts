import { test, expect } from '@playwright/test';
import { readdirSync } from 'node:fs';
const ids = readdirSync('src/tools', { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);
for (const id of ids)
  test(`${id}: sample, no errors, no external requests`, async ({
    page,
    context,
  }) => {
    const errors: string[] = [];
    const external: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });
    await context.route('**/*', async (route) => {
      const url = new URL(route.request().url());
      if (url.origin !== 'http://127.0.0.1:8080') {
        external.push(url.href);
        await route.abort();
      } else await route.continue();
    });
    await page.goto(`/${id}`);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await page.getByRole('button', { name: 'Load sample' }).click();
    await expect(page.getByTestId('result-ready')).toBeAttached({
      timeout: 65000,
    });
    await expect(page.getByRole('alert')).toHaveCount(0);
    if (id === 'base64')
      await page.screenshot({
        path: 'test-results/devbox-desktop.png',
        fullPage: true,
      });
    expect(errors).toEqual([]);
    expect(external).toEqual([]);
  });
test('command palette, privacy, previews and responsive layout', async ({
  page,
}) => {
  await page.goto('/base64');
  await page.getByRole('button', { name: 'Load sample' }).click();
  await expect(page.getByLabel('Output', { exact: true })).toHaveValue(
    'SGVsbG8sIGRldmVsb3BlciDwn5GL',
  );
  await page
    .getByLabel('Input', { exact: true })
    .fill('secret-value-never-save');
  await page.keyboard.press('Control+k');
  await page.getByPlaceholder('What are you working on?').fill('JWT');
  await page.getByRole('option').first().click();
  await expect(page).toHaveURL(/\/jwt$/);
  const storage = await page.evaluate(() => JSON.stringify(localStorage));
  expect(storage).not.toContain('secret-value-never-save');
  await page.goto('/markdown');
  await page
    .getByLabel('Input', { exact: true })
    .fill('<img src="https://example.com/track"><script>alert(1)</script>Safe');
  await expect(page.getByTestId('result-ready')).toBeAttached();
  await expect(
    page.locator('.markdown-preview img,.markdown-preview script'),
  ).toHaveCount(0);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/base64');
  await page.getByRole('button', { name: 'Load sample' }).click();
  await expect(page.getByTestId('result-ready')).toBeAttached();
  await page.screenshot({
    path: 'test-results/devbox-mobile.png',
    fullPage: true,
  });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test('binary uploads, QR decoding, URL editing and theme', async ({ page }) => {
  await page.goto('/base64');
  await page.getByLabel('Upload file').setInputFiles({
    name: 'bytes.bin',
    mimeType: 'application/octet-stream',
    buffer: Buffer.from([0, 255, 1]),
  });
  await expect(page.getByLabel('Output', { exact: true })).toHaveValue('AP8B');
  await page.goto('/hash');
  await page.getByLabel('Upload file').setInputFiles({
    name: 'abc.txt',
    mimeType: 'text/plain',
    buffer: Buffer.from('abc'),
  });
  await expect(page.getByLabel('Output', { exact: true })).toHaveValue(
    'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad',
  );
  await page.goto('/qr');
  await page.getByRole('button', { name: 'Load sample' }).click();
  const img = page.getByAltText('Generated or decoded preview');
  await expect(img).toBeVisible();
  const qrPNG = await img.screenshot();
  await page
    .getByLabel('Upload file')
    .setInputFiles({ name: 'qr.png', mimeType: 'image/png', buffer: qrPNG });
  await expect(page.getByLabel('Output', { exact: true })).toHaveValue(
    'Hello from DevBox',
  );
  await page.goto('/url');
  await page.getByRole('button', { name: 'Load sample' }).click();
  await page
    .getByLabel('value 1', { exact: true })
    .fill('multiple edited characters');
  await page.getByRole('heading', { level: 1 }).click();
  await expect(page.getByLabel('Input', { exact: true })).toHaveValue(
    /q=multiple\+edited\+characters/,
  );
  await page.getByRole('button', { name: 'Change theme' }).click();
  await page.getByRole('menuitem', { name: 'Dark', exact: true }).click();
  await expect(page.locator('html')).toHaveClass(/dark/);
  await page.screenshot({
    path: 'test-results/devbox-dark.png',
    fullPage: true,
  });
  await page.reload();
  await expect(page.locator('html')).toHaveClass(/dark/);
});
