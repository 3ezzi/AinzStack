import { getResendClient } from './resend';
import { getServerEnv } from '@/lib/env/server';

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}

interface SendEmailResult {
  success: boolean;
  id?: string;
  error?: string;
}

/**
 * Send a transactional email via Resend.
 * Falls back gracefully when RESEND_API_KEY is not configured.
 */
export async function sendEmail(
  options: SendEmailOptions,
): Promise<SendEmailResult> {
  const env = getServerEnv();

  if (!env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not configured — skipping email send');
    return { success: false, error: 'Email service not configured.' };
  }

  const resend = getResendClient();
  const from = env.RESEND_FROM_EMAIL ?? 'no-reply@example.com';

  try {
    const { data, error } = await resend.emails.send({
      from,
      to: Array.isArray(options.to) ? options.to : [options.to],
      subject: options.subject,
      html: options.html,
      replyTo: options.replyTo,
    });

    if (error) {
      console.error({ error }, 'Resend email send failed');
      return { success: false, error: error.message };
    }

    return { success: true, id: data?.id };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Email send failed';
    console.error({ error }, 'Email send exception');
    return { success: false, error: message };
  }
}
