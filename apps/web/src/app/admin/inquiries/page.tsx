'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { api } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const statusColors: Record<string, string> = {
  NEW: 'bg-blue-100 text-blue-800',
  IN_REVIEW: 'bg-yellow-100 text-yellow-800',
  RESPONDED: 'bg-green-100 text-green-800',
  CLOSED: 'bg-gray-100 text-gray-500',
};

interface Inquiry {
  id: string;
  name: string;
  email: string;
  company?: string;
  service?: string;
  message: string;
  status: string;
  createdAt: string;
}

export default function AdminInquiries() {
  const { token } = useAuth();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    api<{ inquiries: Inquiry[] }>('/api/inquiries', { token })
      .then((data) => setInquiries(data.inquiries))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [token]);

  async function updateStatus(id: string, status: string) {
    if (!token) return;
    try {
      await api(`/api/inquiries/${id}/status`, {
        method: 'PATCH',
        token,
        body: JSON.stringify({ status }),
      });
      setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
    } catch {
      // silently fail for now
    }
  }

  if (loading) return <p className="text-muted-foreground">Loading inquiries...</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Inquiries</h1>

      {inquiries.length === 0 ? (
        <p className="text-muted-foreground">No inquiries yet.</p>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inquiry) => (
            <Card key={inquiry.id}>
              <CardHeader className="flex flex-row items-start justify-between">
                <div>
                  <CardTitle className="text-base">{inquiry.name}</CardTitle>
                  <p className="text-muted-foreground text-sm">{inquiry.email}</p>
                  {inquiry.company && (
                    <p className="text-muted-foreground text-sm">{inquiry.company}</p>
                  )}
                </div>
                <Badge className={statusColors[inquiry.status] ?? ''}>{inquiry.status}</Badge>
              </CardHeader>
              <CardContent>
                {inquiry.service && (
                  <p className="mb-2 text-sm font-medium">Service: {inquiry.service}</p>
                )}
                <p className="text-muted-foreground text-sm">{inquiry.message}</p>
                <div className="mt-4 flex items-center gap-2">
                  <Select
                    defaultValue={inquiry.status}
                    onValueChange={(val) => {
                      if (val) updateStatus(inquiry.id, val);
                    }}
                  >
                    <SelectTrigger className="w-[160px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NEW">New</SelectItem>
                      <SelectItem value="IN_REVIEW">In Review</SelectItem>
                      <SelectItem value="RESPONDED">Responded</SelectItem>
                      <SelectItem value="CLOSED">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                  <span className="text-muted-foreground text-xs">
                    {new Date(inquiry.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
