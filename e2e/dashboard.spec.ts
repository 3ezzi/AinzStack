import { test, expect } from '@playwright/test';

test.describe('Dashboard', () => {
  test('renders stat cards', async ({ page }) => {
    await page.goto('/dashboard');

    await expect(
      page.getByRole('heading', { name: /dashboard/i }),
    ).toBeVisible();
    await expect(page.getByText('Total Users')).toBeVisible();
    await expect(page.getByText('Revenue')).toBeVisible();
    await expect(page.getByText('1,284')).toBeVisible();
    await expect(page.getByText('$8,420')).toBeVisible();
  });

  test('settings page renders form', async ({ page }) => {
    await page.goto('/dashboard/settings');

    await expect(
      page.getByRole('heading', { name: /settings/i }),
    ).toBeVisible();
    await expect(page.getByText('Profile')).toBeVisible();
    await expect(page.getByText('Notifications')).toBeVisible();
    await expect(page.getByText('Danger Zone')).toBeVisible();
  });

  test('billing page renders plan', async ({ page }) => {
    await page.goto('/dashboard/billing');

    await expect(page.getByRole('heading', { name: /billing/i })).toBeVisible();
    await expect(page.getByText('Current Plan')).toBeVisible();
    await expect(page.getByText('$49')).toBeVisible();
    await expect(page.getByText('Active')).toBeVisible();
  });
});
