import { Resend } from 'resend';

function getResend() {
  if (!process.env.RESEND_API_KEY) return null;
  return new Resend(process.env.RESEND_API_KEY);
}

const FROM_EMAIL = process.env.FROM_EMAIL ?? 'YouweTech <noreply@youwetech.com>';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? 'admin@youwetech.com';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  company?: string | null;
  service?: string | null;
  message: string;
}

export async function sendInquiryNotification(inquiry: Inquiry) {
  const resend = getResend();
  if (!resend) return;
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `New Inquiry from ${inquiry.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${inquiry.name}</p>
        <p><strong>Email:</strong> ${inquiry.email}</p>
        ${inquiry.company ? `<p><strong>Company:</strong> ${inquiry.company}</p>` : ''}
        ${inquiry.service ? `<p><strong>Service:</strong> ${inquiry.service}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${inquiry.message}</p>
      `,
    });
  } catch (err) {
    console.error('[Email] Failed to send inquiry notification:', err);
  }
}

export async function sendWelcomeEmail(name: string, email: string) {
  const resend = getResend();
  if (!resend) return;
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Welcome to YouweTech',
      html: `
        <h2>Welcome, ${name}!</h2>
        <p>Thank you for creating an account with YouweTech.</p>
        <p>You can now access your client portal to track projects, view invoices, and manage your account.</p>
        <p>— The YouweTech Team</p>
      `,
    });
  } catch (err) {
    console.error('[Email] Failed to send welcome email:', err);
  }
}
