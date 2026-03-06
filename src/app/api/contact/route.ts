import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sendEmail } from '@/lib/email/send';
import { contactFormEmail } from '@/lib/email/templates';
import { getServerEnv } from '@/lib/env/server';
import { rateLimitByKey } from '@/lib/security/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const contactRequestSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters.')
    .max(80, 'Name must be 80 characters or fewer.'),
  email: z.string().trim().email('Invalid email address.'),
  message: z
    .string()
    .trim()
    .min(10, 'Message must be at least 10 characters.')
    .max(2000, 'Message must be 2000 characters or fewer.'),
});

interface ContactSuccess {
  sent: true;
}

interface ContactError {
  sent: false;
  error: string;
}

type ContactResponse = ContactSuccess | ContactError;

function getRequestOrigin(request: Request): string | null {
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer') ?? request.referrer;
  const candidate = origin ?? referer;

  if (!candidate) {
    return null;
  }

  try {
    return new URL(candidate).origin;
  } catch {
    return null;
  }
}

function isAllowedOrigin(origin: string | null, appUrl: string): boolean {
  if (!origin) {
    return false;
  }

  try {
    return origin === new URL(appUrl).origin;
  } catch {
    return false;
  }
}

function getRequestIdentifier(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const cfIp = request.headers.get('cf-connecting-ip');

  return forwardedFor?.split(',')[0]?.trim() ?? realIp ?? cfIp ?? 'anonymous';
}

export async function POST(
  request: Request,
): Promise<NextResponse<ContactResponse>> {
  const env = getServerEnv();
  const appUrl = env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

  if (!request.headers.get('content-type')?.includes('application/json')) {
    return NextResponse.json(
      { sent: false, error: 'Content-Type must be application/json.' },
      { status: 415 },
    );
  }

  if (!isAllowedOrigin(getRequestOrigin(request), appUrl)) {
    return NextResponse.json(
      { sent: false, error: 'Invalid request origin.' },
      { status: 403 },
    );
  }

  const rateLimit = rateLimitByKey(
    `contact:${getRequestIdentifier(request)}`,
    5,
    5 * 60 * 1000,
  );

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { sent: false, error: 'Too many contact requests. Please try again later.' },
      {
        status: 429,
        headers: {
          'Retry-After': Math.ceil((rateLimit.resetAt - Date.now()) / 1000).toString(),
        },
      },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { sent: false, error: 'Invalid request body.' },
      { status: 400 },
    );
  }

  const parsed = contactRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        sent: false,
        error: parsed.error.issues[0]?.message ?? 'Invalid contact payload.',
      },
      { status: 400 },
    );
  }

  if (!env.SUPPORT_EMAIL) {
    return NextResponse.json(
      { sent: false, error: 'Support inbox is not configured.' },
      { status: 503 },
    );
  }

  const template = contactFormEmail(
    parsed.data.name,
    parsed.data.email,
    parsed.data.message,
  );

  const result = await sendEmail({
    to: env.SUPPORT_EMAIL,
    subject: template.subject,
    html: template.html,
    replyTo: parsed.data.email,
  });

  if (!result.success) {
    return NextResponse.json(
      { sent: false, error: result.error ?? 'Failed to send email.' },
      { status: 500 },
    );
  }

  return NextResponse.json({ sent: true });
}
