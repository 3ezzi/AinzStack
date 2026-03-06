import { GET } from "@/app/api/health/route";
import { describe, expect, it } from "vitest";

describe("GET /api/health", () => {
  it("returns a configuration-aware health response", async () => {
    const response = await GET();
    expect(response.status).toBe(200);

    const body = await response.json();
    expect(["ok", "degraded"]).toContain(body.status);
    expect(typeof body.checkedAt).toBe("string");
    expect(typeof body.configuredCount).toBe("number");
    expect(typeof body.totalCount).toBe("number");
    expect(body.services.supabase).toHaveProperty("status");
    expect(body.services.stripe).toHaveProperty("status");
    expect(body.services.sanity).toHaveProperty("status");
    expect(body.services.resend).toHaveProperty("status");
  });
});
