import { GET } from "@/app/api/health/route";
import { describe, expect, it } from "vitest";

describe("GET /api/health", () => {
  it("returns a healthy scaffold response", async () => {
    const response = await GET();
    expect(response.status).toBe(200);

    const body = await response.json();
    expect(body.status).toBe("ok");
    expect(typeof body.timestamp).toBe("string");
    expect(typeof body.services).toBe("object");
    expect(body.services).toHaveProperty("supabase");
    expect(body.services).toHaveProperty("stripe");
    expect(body.services).toHaveProperty("sanity");
    expect(body.services).toHaveProperty("resend");
  });
});
