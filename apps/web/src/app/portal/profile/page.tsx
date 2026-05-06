'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PortalProfile() {
  const { user, token } = useAuth();
  const [name, setName] = useState(user?.name ?? '');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      await api('/api/users/profile', {
        method: 'PATCH',
        token: token ?? undefined,
        body: JSON.stringify({ name }),
      });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Profile</h1>

      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={user?.email ?? ''} disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                minLength={2}
              />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Input value={user?.role ?? ''} disabled />
            </div>
            <Button type="submit" disabled={status === 'loading'}>
              {status === 'loading' ? 'Saving...' : 'Save Changes'}
            </Button>
            {status === 'success' && <p className="text-sm text-green-600">Profile updated!</p>}
            {status === 'error' && (
              <p className="text-sm text-red-600">Failed to update. Try again.</p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
