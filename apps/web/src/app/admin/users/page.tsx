'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { api } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ClientUser {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export default function AdminUsers() {
  const { token } = useAuth();
  const [users, setUsers] = useState<ClientUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    api<{ users: ClientUser[] }>('/api/users', { token })
      .then((data) => setUsers(data.users))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) return <p className="text-muted-foreground">Loading clients...</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Clients</h1>

      {users.length === 0 ? (
        <p className="text-muted-foreground">No clients registered yet.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {users.map((u) => (
            <Card key={u.id}>
              <CardHeader>
                <CardTitle className="text-base">{u.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">{u.email}</p>
                <p className="text-muted-foreground mt-1 text-xs">
                  Joined: {new Date(u.createdAt).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
