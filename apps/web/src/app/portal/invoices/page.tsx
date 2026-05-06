'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { api } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const statusColors: Record<string, string> = {
  DRAFT: 'bg-gray-100 text-gray-800',
  SENT: 'bg-blue-100 text-blue-800',
  PAID: 'bg-green-100 text-green-800',
  OVERDUE: 'bg-red-100 text-red-800',
  CANCELLED: 'bg-gray-100 text-gray-500',
};

interface Invoice {
  id: string;
  amount: number;
  currency: string;
  status: string;
  description?: string;
  dueDate?: string;
  project?: { id: string; title: string };
  createdAt: string;
}

export default function PortalInvoices() {
  const { token } = useAuth();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) return;
    api<{ invoices: Invoice[] }>('/api/invoices', { token })
      .then((data) => setInvoices(data.invoices))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  async function handlePay(invoiceId: string) {
    if (!token) return;
    try {
      const data = await api<{ url: string }>(`/api/invoices/${invoiceId}/checkout`, {
        method: 'POST',
        token,
      });
      if (data.url) window.location.href = data.url;
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Payment failed');
    }
  }

  if (loading) return <p className="text-muted-foreground">Loading invoices...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Invoices</h1>

      {invoices.length === 0 ? (
        <p className="text-muted-foreground">No invoices yet.</p>
      ) : (
        <div className="space-y-4">
          {invoices.map((invoice) => (
            <Card key={invoice.id}>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base">
                    {invoice.description ?? `Invoice #${invoice.id.slice(0, 8)}`}
                  </CardTitle>
                  {invoice.project && (
                    <p className="text-muted-foreground text-sm">
                      Project: {invoice.project.title}
                    </p>
                  )}
                </div>
                <Badge className={statusColors[invoice.status] ?? ''}>{invoice.status}</Badge>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">
                    ${(invoice.amount / 100).toFixed(2)}{' '}
                    <span className="text-muted-foreground text-sm font-normal uppercase">
                      {invoice.currency}
                    </span>
                  </p>
                  {invoice.dueDate && (
                    <p className="text-muted-foreground text-xs">
                      Due: {new Date(invoice.dueDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
                {(invoice.status === 'SENT' || invoice.status === 'OVERDUE') && (
                  <Button onClick={() => handlePay(invoice.id)}>Pay Now</Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
