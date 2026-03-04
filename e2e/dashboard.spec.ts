import { test, expect } from '@playwright/test';

const protectedRoutes = [
  '/dashboard',
  '/dashboard/settings',
  '/dashboard/billing',
] as const;

test.describe('Dashboard', () => {
  for (const route of protectedRoutes) {
    test(`${route} redirects to sign-in when unauthenticated`, async ({
      page,
    }) => {
      await page.goto(route);

      await expect(page).toHaveURL(/\/sign-in(?:\?|$)/);
      await expect(
        page.getByRole('heading', { name: /welcome back/i }),
      ).toBeVisible();
    });
  }
});
