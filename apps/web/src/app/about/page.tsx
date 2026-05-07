import type { Metadata } from 'next';
import { CheckCircle, Users, Target, Zap } from 'lucide-react';
import { HeroEntrance, FadeUp, StaggerList, StaggerItem, CountUp } from '@/components/ui/motion';

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
          <HeroEntrance delay={0}>
            <h1 className="text-4xl font-bold">About YouweTech</h1>
          </HeroEntrance>
          <HeroEntrance delay={0.1}>
            <p className="text-muted-foreground mx-auto mt-4 max-w-2xl">
              We&apos;re a team of engineers, designers, and strategists passionate about building
              technology that makes a difference.
            </p>
          </HeroEntrance>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <FadeUp className="mx-auto max-w-3xl space-y-6 text-center">
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
          </FadeUp>
        </div>
      </section>

      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <FadeUp className="mb-12 text-center">
            <h2 className="text-3xl font-bold">Our Values</h2>
          </FadeUp>
          <StaggerList className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <div className="border-border bg-card hover:border-primary/30 hover:shadow-primary/10 rounded-xl border p-6 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
                  <div className="bg-primary/10 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl">
                    <value.icon className="text-primary h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold">{value.title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm">{value.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerList>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <StaggerList className="grid gap-6 text-center sm:grid-cols-3">
            <StaggerItem className="border-primary/20 from-primary/10 to-primary/5 rounded-2xl border bg-gradient-to-br p-8">
              <p className="text-primary text-5xl font-bold">
                <CountUp to={50} suffix="+" />
              </p>
              <p className="text-muted-foreground mt-2 font-medium">Projects Delivered</p>
            </StaggerItem>
            <StaggerItem className="border-primary/20 from-primary/10 to-primary/5 rounded-2xl border bg-gradient-to-br p-8">
              <p className="text-primary text-5xl font-bold">
                <CountUp to={30} suffix="+" />
              </p>
              <p className="text-muted-foreground mt-2 font-medium">Happy Clients</p>
            </StaggerItem>
            <StaggerItem className="border-primary/20 from-primary/10 to-primary/5 rounded-2xl border bg-gradient-to-br p-8">
              <p className="text-primary text-5xl font-bold">
                <CountUp to={99} suffix=".9%" />
              </p>
              <p className="text-muted-foreground mt-2 font-medium">Uptime Guaranteed</p>
            </StaggerItem>
          </StaggerList>
        </div>
      </section>
    </>
  );
}
