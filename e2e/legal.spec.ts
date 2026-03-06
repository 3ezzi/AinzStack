import { expect, test } from '@playwright/test';

test.describe('Legal Pages', () => {
  test('privacy policy renders real content', async ({ page }) => {
    await page.goto('/privacy');

    await expect(
      page.getByRole('heading', { name: /privacy policy/i }),
    ).toBeVisible();
    await expect(page.getByText(/information we process/i)).toBeVisible();
  });

  test('terms of service renders real content', async ({ page }) => {
    await page.goto('/terms');

    await expect(
      page.getByRole('heading', { name: /terms of service/i }),
    ).toBeVisible();
    await expect(page.getByText(/license scope/i)).toBeVisible();
  });
});
