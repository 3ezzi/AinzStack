import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('renders hero section and navigation', async ({ page }) => {
    await page.goto('/');
    const main = page.locator('#main-content');

    await expect(page.locator('header')).toBeVisible();
    await expect(
      page.getByRole('heading', { name: /ship your saas/i }),
    ).toBeVisible();
    await expect(main.getByRole('link', { name: /get started/i })).toBeVisible();
    await expect(
      main.getByRole('link', { name: /documentation/i }),
    ).toBeVisible();
  });

  test('displays tech stack badges', async ({ page }) => {
    await page.goto('/');
    const main = page.locator('#main-content');

    await expect(main.getByText('Next.js 16', { exact: true })).toBeVisible();
    await expect(main.getByText('React 19', { exact: true })).toBeVisible();
    await expect(main.getByText('TypeScript', { exact: true })).toBeVisible();
  });

  test('displays feature cards', async ({ page }) => {
    await page.goto('/');
    const main = page.locator('#main-content');

    await expect(
      main.getByRole('heading', { name: 'Authentication' }),
    ).toBeVisible();
    await expect(main.getByRole('heading', { name: 'Payments' })).toBeVisible();
    await expect(main.getByRole('heading', { name: 'Turbopack' })).toBeVisible();
  });

  test('navbar links navigate correctly', async ({ page }) => {
    await page.goto('/');
    const nav = page.getByRole('navigation');

    await nav.getByRole('link', { name: 'Pricing' }).click();
    await expect(page).toHaveURL('/pricing');

    await page
      .getByRole('navigation')
      .getByRole('link', { name: 'AinzStack' })
      .click();
    await expect(page).toHaveURL('/');
  });
});
