import { expect, test } from "@playwright/test";

test("GET /api/health returns scaffold payload", async ({ request }) => {
  const response = await request.get("/api/health");
  expect(response.ok()).toBeTruthy();

  const payload = await response.json();
  expect(payload.status).toBe("ok");
  expect(typeof payload.timestamp).toBe("string");
  expect(typeof payload.services).toBe("object");
});
