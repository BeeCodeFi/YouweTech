import type { Metadata } from 'next';
import { CheckCircle, Users, Target, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about YouweTech — our mission, values, and the team behind the technology.',
};

const values = [
  {
    icon: Target,
    title: 'Client-First',
    description:
      'Your success is our success. We build solutions that solve real business problems.',
  },
  {
    icon: Zap,
    title: 'Modern & Fast',
    description: 'We use cutting-edge technologies to deliver performant, future-proof solutions.',
  },
  {
    icon: CheckCircle,
    title: 'Quality & Security',
    description: 'Clean code, thorough testing, and security best practices are non-negotiable.',
  },
  {
    icon: Users,
    title: 'Transparency',
    description: 'Open communication, honest timelines, and clear pricing — no surprises.',
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="from-primary/5 to-background bg-gradient-to-b py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold">About YouweTech</h1>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl">
            We&apos;re a team of engineers, designers, and strategists passionate about building
            technology that makes a difference.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl space-y-6 text-center">
            <h2 className="text-3xl font-bold">Our Mission</h2>
            <p className="text-muted-foreground text-lg">
              To empower businesses of all sizes with modern, scalable, and secure IT solutions. We
              believe great technology should be accessible to everyone — not just enterprises with
              massive budgets.
            </p>
            <p className="text-muted-foreground text-lg">
              At YouweTech, we don&apos;t just write code — we partner with you to understand your
              goals, design the right solution, and deliver it on time and within budget.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Our Values</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <value.icon className="text-primary mx-auto mb-4 h-10 w-10" />
                <h3 className="text-lg font-semibold">{value.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 text-center sm:grid-cols-3">
            <div>
              <p className="text-primary text-4xl font-bold">50+</p>
              <p className="text-muted-foreground mt-2">Projects Delivered</p>
            </div>
            <div>
              <p className="text-primary text-4xl font-bold">30+</p>
              <p className="text-muted-foreground mt-2">Happy Clients</p>
            </div>
            <div>
              <p className="text-primary text-4xl font-bold">99.9%</p>
              <p className="text-muted-foreground mt-2">Uptime Guaranteed</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
