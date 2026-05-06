'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Send } from 'lucide-react';

export default function PortalSupport() {
  const { token } = useAuth();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      await api('/api/inquiries', {
        method: 'POST',
        token: token ?? undefined,
        body: JSON.stringify({
          name: formData.get('subject'),
          email: 'support@portal',
          message: formData.get('message'),
          service: 'Support Ticket',
        }),
      });
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Support</h1>
      <p className="text-muted-foreground">
        Need help? Submit a support ticket and we&apos;ll get back to you.
      </p>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>New Support Ticket</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" name="subject" required minLength={2} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Describe your issue</Label>
              <Textarea id="message" name="message" required minLength={10} rows={5} />
            </div>
            <Button type="submit" disabled={status === 'loading'} className="gap-2">
              {status === 'loading' ? 'Submitting...' : 'Submit Ticket'}
              <Send className="h-4 w-4" />
            </Button>
            {status === 'success' && (
              <p className="text-sm text-green-600">Ticket submitted! We&apos;ll be in touch.</p>
            )}
            {status === 'error' && (
              <p className="text-sm text-red-600">Failed to submit. Please try again.</p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
