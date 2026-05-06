// ── User ──────────────────────────────────────────────────────────────────────
export type Role = 'ADMIN' | 'CLIENT';

export interface UserDTO {
  id: string;
  email: string;
  name: string;
  role: Role;
  createdAt: string;
}

export interface AuthResponse {
  user: UserDTO;
  accessToken: string;
}

// ── Project ───────────────────────────────────────────────────────────────────
export type ProjectStatus = 'DISCOVERY' | 'IN_PROGRESS' | 'REVIEW' | 'COMPLETED' | 'ON_HOLD';

export interface ProjectDTO {
  id: string;
  title: string;
  description?: string;
  status: ProjectStatus;
  startDate?: string;
  endDate?: string;
  clientId: string;
  client?: Pick<UserDTO, 'id' | 'name' | 'email'>;
  createdAt: string;
  updatedAt: string;
}

// ── Invoice ───────────────────────────────────────────────────────────────────
export type InvoiceStatus = 'DRAFT' | 'SENT' | 'PAID' | 'OVERDUE' | 'CANCELLED';

export interface InvoiceDTO {
  id: string;
  amount: number; // in cents
  currency: string;
  status: InvoiceStatus;
  description?: string;
  dueDate?: string;
  clientId: string;
  projectId?: string;
  project?: { id: string; title: string };
  createdAt: string;
  updatedAt: string;
}

// ── Inquiry ───────────────────────────────────────────────────────────────────
export type InquiryStatus = 'NEW' | 'IN_REVIEW' | 'RESPONDED' | 'CLOSED';

export interface InquiryDTO {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service?: string;
  message: string;
  status: InquiryStatus;
  createdAt: string;
}

// ── API Response wrapper ──────────────────────────────────────────────────────
export interface ApiError {
  error: string;
}
