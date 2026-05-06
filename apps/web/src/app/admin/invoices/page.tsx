'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { api } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';

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
  createdAt: string;
}

interface ClientUser {
  id: string;
  name: string;
  email: string;
}

export default function AdminInvoices() {
  const { token } = useAuth();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [clients, setClients] = useState<ClientUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (!token) return;
    Promise.all([
      api<{ invoices: Invoice[] }>('/api/invoices', { token }),
      api<{ users: ClientUser[] }>('/api/users', { token }),
    ])
      .then(([invoiceData, userData]) => {
        setInvoices(invoiceData.invoices);
        setClients(userData.users);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [token]);

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!token) return;
    const form = e.currentTarget;
    const formData = new FormData(form);

    const amountDollars = parseFloat(formData.get('amount') as string);

    try {
      const data = await api<{ invoice: Invoice }>('/api/invoices', {
        method: 'POST',
        token,
        body: JSON.stringify({
          clientId: formData.get('clientId'),
          amount: Math.round(amountDollars * 100), // convert to cents
          description: formData.get('description'),
        }),
      });
      setInvoices((prev) => [data.invoice, ...prev]);
      setDialogOpen(false);
      form.reset();
    } catch {
      // handle error
    }
  }

  if (loading) return <p className="text-muted-foreground">Loading invoices...</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Invoices</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger>
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> New Invoice
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Invoice</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="clientId">Client</Label>
                <Select name="clientId" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select client" />
                  </SelectTrigger>
                  <SelectContent>
                    {clients.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name} ({c.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount ($)</Label>
                <Input id="amount" name="amount" type="number" step="0.01" min="0.50" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input id="description" name="description" />
              </div>
              <Button type="submit" className="w-full">
                Create Invoice
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {invoices.length === 0 ? (
        <p className="text-muted-foreground">No invoices yet.</p>
      ) : (
        <div className="space-y-4">
          {invoices.map((invoice) => (
            <Card key={invoice.id}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">
                  {invoice.description ?? `Invoice #${invoice.id.slice(0, 8)}`}
                </CardTitle>
                <Badge className={statusColors[invoice.status] ?? ''}>{invoice.status}</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  ${(invoice.amount / 100).toFixed(2)}{' '}
                  <span className="text-muted-foreground text-sm font-normal uppercase">
                    {invoice.currency}
                  </span>
                </p>
                <p className="text-muted-foreground mt-1 text-xs">
                  Created: {new Date(invoice.createdAt).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
