import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email/send';
import { contactFormEmail } from '@/lib/email/templates';
import { getServerEnv } from '@/lib/env/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface ContactRequest {
  name: string;
  email: string;
  message: string;
}

interface ContactSuccess {
  sent: true;
}

interface ContactError {
  sent: false;
  error: string;
}

type ContactResponse = ContactSuccess | ContactError;

export async function POST(
  request: Request,
): Promise<NextResponse<ContactResponse>> {
  let body: ContactRequest;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { sent: false, error: 'Invalid request body.' },
      { status: 400 },
    );
  }

  const { name, email, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json(
      { sent: false, error: 'Name, email, and message are required.' },
      { status: 400 },
    );
  }

  // Basic email validation
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { sent: false, error: 'Invalid email address.' },
      { status: 400 },
    );
  }

  const env = getServerEnv();
  const adminEmail = env.RESEND_FROM_EMAIL ?? 'no-reply@example.com';
  const template = contactFormEmail(name, email, message);

  const result = await sendEmail({
    to: adminEmail,
    subject: template.subject,
    html: template.html,
    replyTo: email,
  });

  if (!result.success) {
    return NextResponse.json(
      { sent: false, error: result.error ?? 'Failed to send email.' },
      { status: 500 },
    );
  }

  return NextResponse.json({ sent: true });
}
