import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Globe, Smartphone, Cloud, Palette, Lightbulb, Wrench, ArrowRight } from 'lucide-react';
import { FadeUp, StaggerList, StaggerItem, HeroEntrance } from '@/components/ui/motion';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Explore the full range of IT services offered by YouweTech.',
};

const services = [
  {
    id: 'web-development',
    icon: Globe,
    title: 'Web Development',
    description:
      'From landing pages to complex SaaS platforms, we build fast, accessible, and SEO-friendly web applications using Next.js, React, and Node.js.',
    features: [
      'Custom web applications',
      'E-commerce platforms',
      'Progressive Web Apps (PWA)',
      'API development & integration',
    ],
  },
  {
    id: 'mobile-development',
    icon: Smartphone,
    title: 'Mobile Development',
    description:
      'Cross-platform mobile apps that feel native on both iOS and Android, built with React Native or Flutter.',
    features: [
      'iOS & Android apps',
      'Cross-platform development',
      'App Store optimization',
      'Push notifications & real-time features',
    ],
  },
  {
    id: 'cloud-solutions',
    icon: Cloud,
    title: 'Cloud Solutions',
    description:
      'Design, deploy, and manage scalable cloud infrastructure on AWS, Azure, or Google Cloud.',
    features: [
      'Cloud migration',
      'Infrastructure as Code (IaC)',
      'CI/CD pipelines',
      'Auto-scaling & monitoring',
    ],
  },
  {
    id: 'ui-ux-design',
    icon: Palette,
    title: 'UI/UX Design',
    description:
      'User research, wireframes, prototypes, and pixel-perfect designs that drive engagement and conversions.',
    features: [
      'User research & personas',
      'Wireframing & prototyping',
      'Design systems',
      'Usability testing',
    ],
  },
  {
    id: 'consulting',
    icon: Lightbulb,
    title: 'IT Consulting',
    description:
      'Strategic guidance to help you make the right technology decisions for your business.',
    features: [
      'Technology audits',
      'Architecture planning',
      'Vendor evaluation',
      'Digital transformation strategy',
    ],
  },
  {
    id: 'maintenance',
    icon: Wrench,
    title: 'Maintenance & Support',
    description:
      'Keep your applications running smoothly with proactive monitoring, updates, and dedicated support.',
    features: [
      '24/7 uptime monitoring',
      'Security patches & updates',
      'Performance optimization',
      'Dedicated support team',
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="from-primary/5 to-background bg-gradient-to-b py-16">
        <div className="container mx-auto px-4 text-center">
          <HeroEntrance delay={0}>
            <h1 className="text-4xl font-bold">Our Services</h1>
          </HeroEntrance>
          <HeroEntrance delay={0.1}>
            <p className="text-muted-foreground mx-auto mt-4 max-w-2xl">
              We offer a comprehensive suite of IT services to help businesses of all sizes build,
              scale, and maintain their digital presence.
            </p>
          </HeroEntrance>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <StaggerList className="space-y-12">
            {services.map((service) => (
              <StaggerItem key={service.id} id={service.id} className="scroll-mt-20">
                <Card className="hover:shadow-primary/10 hover:border-primary/30 overflow-hidden transition-all duration-200 hover:shadow-md">
                  <div className="grid md:grid-cols-3">
                    <CardHeader className="from-primary/10 to-primary/5 bg-gradient-to-br md:col-span-1">
                      <div className="bg-primary/15 mb-3 flex h-14 w-14 items-center justify-center rounded-xl">
                        <service.icon className="text-primary h-7 w-7" />
                      </div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 md:col-span-2">
                      <p className="text-muted-foreground">{service.description}</p>
                      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-sm">
                            <span className="bg-primary h-1.5 w-1.5 shrink-0 rounded-full" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </StaggerList>

          <FadeUp delay={0.2} className="mt-16 text-center">
            <p className="text-muted-foreground">
              Not sure which service you need? Let&apos;s talk.
            </p>
            <Link href="/contact" className="mt-4 inline-block">
              <Button size="lg" className="gap-2">
                Get a Free Consultation <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
