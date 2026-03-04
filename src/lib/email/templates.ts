/**
 * Email templates for transactional emails.
 * Uses inline HTML for maximum email client compatibility.
 */

const baseStyles = `
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #000;
  line-height: 1.6;
  max-width: 560px;
  margin: 0 auto;
  padding: 32px 24px;
`;

const buttonStyles = `
  display: inline-block;
  background: #000;
  color: #fff;
  padding: 10px 24px;
  border-radius: 6px;
  text-decoration: none;
  font-size: 13px;
  font-weight: 500;
`;

function wrapper(content: string): string {
  return `
    <div style="${baseStyles}">
      <div style="margin-bottom: 24px;">
        <strong style="font-size: 15px; letter-spacing: -0.01em;">AinzStack</strong>
      </div>
      ${content}
      <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #e5e5e5; font-size: 11px; color: #999;">
        Sent by AinzStack. If you didn't expect this email, you can safely ignore it.
      </div>
    </div>
  `;
}

export function welcomeEmail(name: string): { subject: string; html: string } {
  return {
    subject: 'Welcome to AinzStack',
    html: wrapper(`
      <h1 style="font-size: 20px; font-weight: 600; margin: 0 0 8px;">Welcome, ${name}</h1>
      <p style="font-size: 13px; color: #666; margin: 0 0 20px;">
        Your account is ready. Start building your next project with the full power of AinzStack.
      </p>
      <a href="{{APP_URL}}/dashboard" style="${buttonStyles}">
        Go to Dashboard
      </a>
    `),
  };
}

export function purchaseConfirmationEmail(
  name: string,
  plan: string,
  amount: string,
): { subject: string; html: string } {
  return {
    subject: `Purchase confirmed — ${plan} Plan`,
    html: wrapper(`
      <h1 style="font-size: 20px; font-weight: 600; margin: 0 0 8px;">Purchase Confirmed</h1>
      <p style="font-size: 13px; color: #666; margin: 0 0 16px;">
        Thanks, ${name}! Here's your receipt:
      </p>
      <div style="background: #fafafa; border: 1px solid #e5e5e5; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; font-size: 13px;">
          <span style="color: #666;">Plan</span>
          <strong>${plan}</strong>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 13px; margin-top: 8px;">
          <span style="color: #666;">Amount</span>
          <strong>${amount}</strong>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 13px; margin-top: 8px;">
          <span style="color: #666;">Access</span>
          <strong>Lifetime</strong>
        </div>
      </div>
      <a href="{{APP_URL}}/dashboard" style="${buttonStyles}">
        Go to Dashboard
      </a>
    `),
  };
}

export function contactFormEmail(
  name: string,
  email: string,
  message: string,
): { subject: string; html: string } {
  return {
    subject: `Contact form: ${name}`,
    html: wrapper(`
      <h1 style="font-size: 20px; font-weight: 600; margin: 0 0 8px;">New Contact Message</h1>
      <div style="background: #fafafa; border: 1px solid #e5e5e5; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
        <p style="font-size: 13px; margin: 0 0 8px;"><strong>From:</strong> ${name} (${email})</p>
        <p style="font-size: 13px; margin: 0; white-space: pre-wrap;">${message}</p>
      </div>
    `),
  };
}
