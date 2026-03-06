import { expect, test } from '@playwright/test';

test('GET /api/health returns a configuration-aware payload', async ({ request }) => {
  const response = await request.get('/api/health');
  expect(response.ok()).toBeTruthy();

  const payload = await response.json();
  expect(['ok', 'degraded']).toContain(payload.status);
  expect(typeof payload.checkedAt).toBe('string');
  expect(typeof payload.configuredCount).toBe('number');
  expect(typeof payload.services).toBe('object');
});
