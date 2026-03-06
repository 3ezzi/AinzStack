import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('POST /api/contact', () => {
  beforeEach(() => {
    vi.resetModules();
    process.env.NEXT_PUBLIC_APP_URL = 'http://localhost:3000';
    process.env.RESEND_API_KEY = 're_test_key';
    process.env.RESEND_FROM_EMAIL = 'no-reply@example.com';
    process.env.SUPPORT_EMAIL = 'support@example.com';
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('rejects invalid origins', async () => {
    vi.doMock('@/lib/email/send', () => ({
      sendEmail: vi.fn(),
    }));

    const { POST } = await import('@/app/api/contact/route');
    const response = await POST(
      new Request('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        referrer: 'https://evil.example/contact',
        body: JSON.stringify({
          name: 'Security Test',
          email: 'test@example.com',
          message: 'This should not be accepted from another origin.',
        }),
      }),
    );

    expect(response.status).toBe(403);
  });

  it('validates payloads with zod before sending email', async () => {
    const sendEmail = vi.fn();
    vi.doMock('@/lib/email/send', () => ({
      sendEmail,
    }));

    const { POST } = await import('@/app/api/contact/route');
    const response = await POST(
      new Request('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-forwarded-for': '127.0.0.2',
        },
        referrer: 'http://localhost:3000/contact',
        body: JSON.stringify({
          name: 'A',
          email: 'not-an-email',
          message: 'short',
        }),
      }),
    );

    expect(response.status).toBe(400);
    expect(sendEmail).not.toHaveBeenCalled();
  });

  it('sends valid requests to the configured support inbox', async () => {
    const sendEmail = vi.fn().mockResolvedValue({ success: true });
    vi.doMock('@/lib/email/send', () => ({
      sendEmail,
    }));

    const { POST } = await import('@/app/api/contact/route');
    const response = await POST(
      new Request('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-forwarded-for': '127.0.0.3',
        },
        referrer: 'http://localhost:3000/contact',
        body: JSON.stringify({
          name: 'Support Request',
          email: 'test@example.com',
          message: 'This is a valid support request body for testing.',
        }),
      }),
    );

    expect(response.status).toBe(200);
    expect(sendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'support@example.com',
        replyTo: 'test@example.com',
      }),
    );
  });
});
