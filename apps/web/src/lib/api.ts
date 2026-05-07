// Use relative paths so Next.js rewrites proxy requests through Vercel → no CORS.
// next.config.ts rewrite: /api/* → https://youwetech.onrender.com/api/*
const API_URL =
  typeof window === 'undefined'
    ? (process.env.NEXT_PUBLIC_API_URL ?? 'https://youwetech.onrender.com')
    : ''; // browser uses relative path → Vercel rewrite handles routing

interface FetchOptions extends RequestInit {
  token?: string;
}

export async function api<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { token, headers, ...rest } = options;

  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    credentials: 'include',
    ...rest,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new ApiError(res.status, body.error ?? 'Something went wrong');
  }

  return res.json();
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}
