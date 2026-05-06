import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Globe,
  Smartphone,
  Cloud,
  Palette,
  Lightbulb,
  Wrench,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: 'Web Development',
    description: 'Custom websites and web applications built with modern frameworks.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Development',
    description: 'Cross-platform mobile apps for iOS and Android.',
  },
  {
    icon: Cloud,
    title: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure, migration, and DevOps.',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'User-centered design that converts visitors into customers.',
  },
  {
    icon: Lightbulb,
    title: 'IT Consulting',
    description: 'Strategic technology guidance to align IT with business goals.',
  },
  {
    icon: Wrench,
    title: 'Maintenance & Support',
    description: '24/7 monitoring, updates, and dedicated support.',
  },
];

const whyUs = [
  'Modern tech stack — built for performance and scalability',
  'Transparent pricing — no hidden costs or surprise invoices',
  'Dedicated project portal — track progress in real time',
  'Agile delivery — iterative development with frequent updates',
  "Post-launch support — we don't disappear after deployment",
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="from-primary/5 to-background relative overflow-hidden bg-gradient-to-b py-24 sm:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Build Smarter. <span className="text-primary">Scale Faster.</span>
          </h1>
          <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg">
            YouweTech delivers end-to-end IT services — from custom web and mobile development to
            cloud infrastructure and strategic consulting. Let&apos;s turn your ideas into reality.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/contact">
              <Button size="lg" className="gap-2">
                Start Your Project <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" size="lg">
                Explore Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold">Our Services</h2>
            <p className="text-muted-foreground mt-4">
              Everything you need to build, launch, and grow your digital product.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Card key={service.title} className="transition-shadow hover:shadow-lg">
                <CardHeader>
                  <service.icon className="text-primary mb-2 h-10 w-10" />
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/services">
              <Button variant="link" className="gap-1">
                View all services <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why YouweTech */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold">Why YouweTech?</h2>
              <p className="text-muted-foreground mt-4">
                We combine technical expertise with a client-first approach to deliver solutions
                that actually work for your business.
              </p>
              <ul className="mt-8 space-y-4">
                {whyUs.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="text-primary mt-0.5 h-5 w-5 shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="from-primary/10 to-primary/5 flex items-center justify-center rounded-xl bg-gradient-to-br p-12">
              <div className="text-center">
                <p className="text-primary text-5xl font-bold">100%</p>
                <p className="text-muted-foreground mt-2 text-sm">Client Satisfaction Goal</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold">Ready to Build Something Great?</h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-xl">
            Tell us about your project and we&apos;ll get back to you within 24 hours with a free
            consultation.
          </p>
          <div className="mt-8">
            <Link href="/contact">
              <Button size="lg" className="gap-2">
                Get a Free Quote <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
