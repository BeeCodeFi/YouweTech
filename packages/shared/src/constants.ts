export const SERVICES = [
  {
    id: 'web-development',
    title: 'Web Development',
    description: 'Custom websites and web applications built with modern frameworks.',
    icon: 'Globe',
  },
  {
    id: 'mobile-development',
    title: 'Mobile Development',
    description: 'Cross-platform mobile apps for iOS and Android.',
    icon: 'Smartphone',
  },
  {
    id: 'cloud-solutions',
    title: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure, migration, and DevOps.',
    icon: 'Cloud',
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    description: 'User-centered design that converts visitors into customers.',
    icon: 'Palette',
  },
  {
    id: 'consulting',
    title: 'IT Consulting',
    description: 'Strategic technology guidance to align IT with business goals.',
    icon: 'Lightbulb',
  },
  {
    id: 'maintenance',
    title: 'Maintenance & Support',
    description: '24/7 monitoring, updates, and dedicated support.',
    icon: 'Wrench',
  },
] as const;

export const PROJECT_STATUS_LABELS: Record<string, string> = {
  DISCOVERY: 'Discovery',
  IN_PROGRESS: 'In Progress',
  REVIEW: 'Under Review',
  COMPLETED: 'Completed',
  ON_HOLD: 'On Hold',
};

export const INVOICE_STATUS_LABELS: Record<string, string> = {
  DRAFT: 'Draft',
  SENT: 'Sent',
  PAID: 'Paid',
  OVERDUE: 'Overdue',
  CANCELLED: 'Cancelled',
};
