import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Transparent pricing for YouweTech IT services.',
};

const plans = [
  {
    name: 'Starter',
    description: 'Perfect for small businesses and MVPs.',
    price: 'Custom',
    period: 'per project',
    features: [
      'Landing page or simple website',
      'Responsive design',
      'Basic SEO setup',
      'Contact form integration',
      '2 rounds of revisions',
      '30 days post-launch support',
    ],
    cta: 'Get a Quote',
    highlighted: false,
  },
  {
    name: 'Professional',
    description: 'For growing businesses that need a full-stack solution.',
    price: 'Custom',
    period: 'per project',
    features: [
      'Everything in Starter',
      'Full-stack web application',
      'User authentication',
      'Database design & integration',
      'Admin dashboard',
      'Payment integration',
      '90 days post-launch support',
      'Priority communication',
    ],
    cta: 'Get a Quote',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    description: 'Tailored solutions for large organizations.',
    price: 'Custom',
    period: 'retainer',
    features: [
      'Everything in Professional',
      'Dedicated development team',
      'Cloud infrastructure setup',
      'CI/CD pipeline',
      'Performance monitoring',
      'SLA guaranteed uptime',
      '24/7 support',
      'Quarterly strategy reviews',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <>
      <section className="from-primary/5 to-background bg-gradient-to-b py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold">Simple, Transparent Pricing</h1>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl">
            Every project is unique. We provide custom quotes based on your specific requirements —
            no hidden fees, no surprises.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-3">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative flex flex-col ${
                  plan.highlighted ? 'border-primary shadow-lg' : ''
                }`}
              >
                {plan.highlighted && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most Popular</Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <p className="text-muted-foreground mt-2 text-sm">{plan.description}</p>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground text-sm"> / {plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col">
                  <ul className="flex-1 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <Check className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className="mt-8 block">
                    <Button
                      className="w-full gap-2"
                      variant={plan.highlighted ? 'default' : 'outline'}
                    >
                      {plan.cta} <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
