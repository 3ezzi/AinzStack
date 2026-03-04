import { test, expect } from '@playwright/test';

test.describe('Marketing Pages', () => {
  test('homepage loads with hero content', async ({ page }) => {
    await page.goto('/');
    const main = page.locator('#main-content');

    await expect(page).toHaveTitle(/AinzStack/i);
    await expect(page.locator('h1')).toBeVisible();
    await expect(
      main.getByRole('link', { name: /get started/i }),
    ).toBeVisible();
  });

  test('pricing page renders three plans', async ({ page }) => {
    await page.goto('/pricing');
    await expect(page.locator('h1')).toContainText('Pricing');
    // 3 plan cards
    const cards = page.locator('[data-slot="card"]');
    await expect(cards).toHaveCount(3);
  });

  test('navbar links are visible on desktop', async ({ page }) => {
    await page.goto('/');
    const nav = page.getByLabel('Main navigation');

    await expect(nav.getByRole('link', { name: 'Pricing' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Docs' })).toBeVisible();
  });
});

test.describe('Auth Pages', () => {
  test('sign-in page renders form', async ({ page }) => {
    await page.goto('/sign-in');
    await expect(page.getByText('Welcome back')).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /google/i })).toBeVisible();
  });

  test('sign-up page renders form', async ({ page }) => {
    await page.goto('/sign-up');
    await expect(page.getByText('Create an account')).toBeVisible();
    await expect(page.getByLabel('Full Name')).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
    await expect(
      page.getByRole('button', { name: /create account/i }),
    ).toBeVisible();
  });

  test('forgot-password page renders form', async ({ page }) => {
    await page.goto('/forgot-password');
    await expect(page.getByText('Reset password')).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(
      page.getByRole('button', { name: /send reset/i }),
    ).toBeVisible();
  });

  test('sign-in has link to sign-up and vice versa', async ({ page }) => {
    await page.goto('/sign-in');
    await expect(page.getByRole('link', { name: /sign up/i })).toBeVisible();

    await page.goto('/sign-up');
    await expect(page.getByRole('link', { name: /sign in/i })).toBeVisible();
  });
});

test.describe('Dashboard Protection', () => {
  test('dashboard redirects to sign-in when unauthenticated', async ({
    page,
  }) => {
    await page.goto('/dashboard');
    // Should redirect to /sign-in
    await expect(page).toHaveURL(/sign-in/);
  });
});

test.describe('API Routes', () => {
  test('health endpoint returns ok', async ({ request }) => {
    const response = await request.get('/api/health');
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.status).toBe('ok');
  });
});
