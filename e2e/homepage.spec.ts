import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('renders hero section and navigation', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('header')).toBeVisible();
    await expect(
      page.getByRole('heading', { name: /ship your saas/i }),
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: /get started/i }).first(),
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: /documentation/i }),
    ).toBeVisible();
  });

  test('displays tech stack badges', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByText('Next.js 16')).toBeVisible();
    await expect(page.getByText('React 19')).toBeVisible();
    await expect(page.getByText('TypeScript')).toBeVisible();
  });

  test('displays feature cards', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByText('Authentication')).toBeVisible();
    await expect(page.getByText('Payments')).toBeVisible();
    await expect(page.getByText('Turbopack')).toBeVisible();
  });

  test('navbar links navigate correctly', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('link', { name: 'Pricing' }).first().click();
    await expect(page).toHaveURL('/pricing');

    await page.getByRole('link', { name: 'AinzStack' }).click();
    await expect(page).toHaveURL('/');
  });
});
