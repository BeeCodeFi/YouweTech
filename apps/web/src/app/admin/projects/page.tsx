'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { api } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
  DISCOVERY: 'bg-blue-100 text-blue-800',
  IN_PROGRESS: 'bg-yellow-100 text-yellow-800',
  REVIEW: 'bg-purple-100 text-purple-800',
  COMPLETED: 'bg-green-100 text-green-800',
  ON_HOLD: 'bg-gray-100 text-gray-800',
};

interface Project {
  id: string;
  title: string;
  description?: string;
  status: string;
  client?: { id: string; name: string; email: string };
  createdAt: string;
}

interface ClientUser {
  id: string;
  name: string;
  email: string;
}

export default function AdminProjects() {
  const { token } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<ClientUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (!token) return;
    Promise.all([
      api<{ projects: Project[] }>('/api/projects', { token }),
      api<{ users: ClientUser[] }>('/api/users', { token }),
    ])
      .then(([projectData, userData]) => {
        setProjects(projectData.projects);
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

    try {
      const data = await api<{ project: Project }>('/api/projects', {
        method: 'POST',
        token,
        body: JSON.stringify({
          title: formData.get('title'),
          description: formData.get('description'),
          clientId: formData.get('clientId'),
        }),
      });
      setProjects((prev) => [data.project, ...prev]);
      setDialogOpen(false);
      form.reset();
    } catch {
      // handle error
    }
  }

  async function updateStatus(id: string, status: string) {
    if (!token) return;
    try {
      await api(`/api/projects/${id}`, {
        method: 'PATCH',
        token,
        body: JSON.stringify({ status }),
      });
      setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
    } catch {
      // silently fail
    }
  }

  if (loading) return <p className="text-muted-foreground">Loading projects...</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger>
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> New Project
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" />
              </div>
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
              <Button type="submit" className="w-full">
                Create Project
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {projects.length === 0 ? (
        <p className="text-muted-foreground">No projects yet. Create one above.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <Card key={project.id}>
              <CardHeader className="flex flex-row items-start justify-between">
                <div>
                  <CardTitle className="text-base">{project.title}</CardTitle>
                  {project.client && (
                    <p className="text-muted-foreground text-sm">Client: {project.client.name}</p>
                  )}
                </div>
                <Badge className={statusColors[project.status] ?? ''}>
                  {project.status.replace('_', ' ')}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  {project.description ?? 'No description'}
                </p>
                <div className="mt-4">
                  <Select
                    defaultValue={project.status}
                    onValueChange={(val) => {
                      if (val) updateStatus(project.id, val);
                    }}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DISCOVERY">Discovery</SelectItem>
                      <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                      <SelectItem value="REVIEW">Review</SelectItem>
                      <SelectItem value="COMPLETED">Completed</SelectItem>
                      <SelectItem value="ON_HOLD">On Hold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
