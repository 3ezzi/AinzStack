import { test, expect } from '@playwright/test';

test.describe('Auth Pages', () => {
  test('sign-in page renders form', async ({ page }) => {
    await page.goto('/sign-in');

    await expect(
      page.getByRole('heading', { name: /welcome back/i }),
    ).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible();
    await expect(
      page.getByRole('button', { name: /continue with google/i }),
    ).toBeVisible();
  });

  test('sign-up page renders form', async ({ page }) => {
    await page.goto('/sign-up');

    await expect(
      page.getByRole('heading', { name: /create an account/i }),
    ).toBeVisible();
    await expect(page.getByLabel('Full Name')).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
  });

  test('forgot-password page renders form', async ({ page }) => {
    await page.goto('/forgot-password');

    await expect(
      page.getByRole('heading', { name: /reset password/i }),
    ).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(
      page.getByRole('button', { name: /send reset link/i }),
    ).toBeVisible();
  });

  test('sign-in has link to sign-up', async ({ page }) => {
    await page.goto('/sign-in');

    await page.getByRole('link', { name: /sign up/i }).click();
    await expect(page).toHaveURL('/sign-up');
  });

  test('sign-in has link to forgot-password', async ({ page }) => {
    await page.goto('/sign-in');

    await page.getByRole('link', { name: /forgot/i }).click();
    await expect(page).toHaveURL('/forgot-password');
  });
});
