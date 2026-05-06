import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
          <h1 className="text-4xl font-bold">Our Work</h1>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl">
            A selection of projects we&apos;re proud of. Each one built with care, delivered on
            time, and designed to scale.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Card key={project.title} className="flex flex-col">
                <CardHeader>
                  <Badge variant="secondary" className="w-fit">
                    {project.category}
                  </Badge>
                  <CardTitle className="mt-2 text-lg">{project.title}</CardTitle>
                  <p className="text-muted-foreground text-sm">Client: {project.client}</p>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col">
                  <p className="text-muted-foreground flex-1 text-sm">{project.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <Badge key={t} variant="outline" className="text-xs">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
