import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HeroEntrance, StaggerList, StaggerItem } from '@/components/ui/motion';

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'See our recent work and case studies at YouweTech.',
};

const projects = [
  {
    title: 'E-Commerce Platform',
    client: 'RetailCo',
    category: 'Web Development',
    description:
      'Built a high-performance e-commerce platform handling 10K+ daily transactions with real-time inventory management.',
    tech: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe', 'Redis'],
  },
  {
    title: 'Healthcare App',
    client: 'MedTech Solutions',
    category: 'Mobile Development',
    description:
      'Cross-platform mobile app for patient scheduling, telehealth consultations, and health record management.',
    tech: ['React Native', 'Express', 'MongoDB', 'WebRTC'],
  },
  {
    title: 'Cloud Migration',
    client: 'FinServe Inc.',
    category: 'Cloud Solutions',
    description:
      'Migrated legacy on-premise infrastructure to AWS, reducing operational costs by 40% and improving uptime to 99.99%.',
    tech: ['AWS', 'Terraform', 'Docker', 'Kubernetes', 'GitHub Actions'],
  },
  {
    title: 'SaaS Dashboard',
    client: 'DataViz Pro',
    category: 'Full-Stack',
    description:
      'Real-time analytics dashboard with role-based access, custom reporting, and data visualization.',
    tech: ['React', 'TypeScript', 'D3.js', 'FastAPI', 'PostgreSQL'],
  },
  {
    title: 'Corporate Website Redesign',
    client: 'Global Consulting Group',
    category: 'UI/UX Design',
    description:
      'Complete brand refresh and website redesign resulting in 65% increase in organic traffic and 3x more lead conversions.',
    tech: ['Next.js', 'Tailwind CSS', 'Sanity CMS', 'Vercel'],
  },
  {
    title: 'IoT Monitoring Platform',
    client: 'SmartFactory',
    category: 'Cloud Solutions',
    description:
      'Real-time IoT sensor monitoring dashboard with alerting, historical data analysis, and predictive maintenance.',
    tech: ['React', 'Node.js', 'InfluxDB', 'MQTT', 'Grafana'],
  },
];

export default function PortfolioPage() {
  return (
    <>
      <section className="from-primary/5 to-background bg-gradient-to-b py-16">
        <div className="container mx-auto px-4 text-center">
          <HeroEntrance delay={0}>
            <h1 className="text-4xl font-bold">Our Work</h1>
          </HeroEntrance>
          <HeroEntrance delay={0.1}>
            <p className="text-muted-foreground mx-auto mt-4 max-w-2xl">
              A selection of projects we&apos;re proud of. Each one built with care, delivered on
              time, and designed to scale.
            </p>
          </HeroEntrance>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <StaggerList className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <StaggerItem key={project.title}>
                <Card className="group hover:shadow-primary/10 hover:border-primary/30 flex h-full flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                  <CardHeader>
                    <Badge
                      variant="secondary"
                      className="bg-primary/10 text-primary border-primary/20 w-fit"
                    >
                      {project.category}
                    </Badge>
                    <CardTitle className="mt-2 text-lg">{project.title}</CardTitle>
                    <p className="text-muted-foreground text-sm">Client: {project.client}</p>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col">
                    <p className="text-muted-foreground flex-1 text-sm">{project.description}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <Badge
                          key={t}
                          variant="outline"
                          className="hover:bg-primary/10 hover:border-primary/30 text-xs transition-colors"
                        >
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerList>
        </div>
      </section>
    </>
  );
}
