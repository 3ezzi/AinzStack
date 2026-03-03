import { test, expect } from '@playwright/test';

test.describe('Pricing Page', () => {
  test('renders all pricing tiers', async ({ page }) => {
    await page.goto('/pricing');

    await expect(
      page.getByRole('heading', { name: /simple, transparent pricing/i }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Starter', exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Pro', exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Team', exact: true }),
    ).toBeVisible();
  });

  test('shows prices', async ({ page }) => {
    await page.goto('/pricing');

    await expect(page.getByText('Free')).toBeVisible();
    await expect(page.getByText('$49')).toBeVisible();
    await expect(page.getByText('$149')).toBeVisible();
  });

  test('pro plan is marked as popular', async ({ page }) => {
    await page.goto('/pricing');

    await expect(page.getByText('Most Popular')).toBeVisible();
  });
});
