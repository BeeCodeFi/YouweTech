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
  Star,
  Zap,
  Shield,
} from 'lucide-react';
import {
  HeroEntrance,
  FadeUp,
  FadeIn,
  StaggerList,
  StaggerItem,
  CountUp,
  MotionCard,
} from '@/components/ui/motion';
import { motion } from 'framer-motion';

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

const stats = [
  { icon: Star, value: 50, suffix: '+', label: 'Projects Delivered' },
  { icon: Zap, value: 30, suffix: '+', label: 'Happy Clients' },
  { icon: Shield, value: 99.9, suffix: '%', label: 'Uptime Guaranteed' },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="from-primary/8 via-primary/4 to-background relative overflow-hidden bg-gradient-to-b py-24 sm:py-36">
        {/* Animated background blob */}
        <motion.div
          aria-hidden="true"
          className="bg-primary/12 pointer-events-none absolute -top-32 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.6, 0.9, 0.6],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="relative container mx-auto px-4 text-center">
          <HeroEntrance delay={0} className="mb-6">
            <div className="border-primary/20 bg-primary/5 text-primary inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium">
              <Zap className="h-3.5 w-3.5" />
              Trusted by 30+ businesses worldwide
            </div>
          </HeroEntrance>

          <HeroEntrance delay={0.1}>
            <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Build Smarter.{' '}
              <span className="from-primary to-primary animate-gradient-x bg-gradient-to-r via-blue-400 bg-[length:200%_auto] bg-clip-text text-transparent">
                Scale Faster.
              </span>
            </h1>
          </HeroEntrance>

          <HeroEntrance delay={0.2}>
            <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg leading-relaxed">
              YouweTech delivers end-to-end IT services — from custom web and mobile development to
              cloud infrastructure and strategic consulting. Let&apos;s turn your ideas into
              reality.
            </p>
          </HeroEntrance>

          <HeroEntrance delay={0.32}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/contact">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Button size="lg" className="shadow-primary/25 gap-2 shadow-md">
                    Start Your Project <ArrowRight className="h-4 w-4" />
                  </Button>
                </motion.div>
              </Link>
              <Link href="/services">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Button variant="outline" size="lg">
                    Explore Services
                  </Button>
                </motion.div>
              </Link>
            </div>
          </HeroEntrance>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-muted/30 border-y">
        <div className="container mx-auto px-4 py-8">
          <StaggerList className="grid grid-cols-3 divide-x" delay={0.1}>
            {stats.map(({ icon: Icon, value, suffix, label }) => (
              <StaggerItem
                key={label}
                className="flex flex-col items-center gap-1 px-4 text-center"
              >
                <Icon className="text-primary mb-1 h-5 w-5" />
                <p className="text-primary text-2xl font-bold sm:text-3xl">
                  <CountUp to={value} suffix={suffix} />
                </p>
                <p className="text-muted-foreground text-xs sm:text-sm">{label}</p>
              </StaggerItem>
            ))}
          </StaggerList>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <FadeUp className="mb-12 text-center">
            <h2 className="text-3xl font-bold">Our Services</h2>
            <p className="text-muted-foreground mx-auto mt-4 max-w-xl">
              Everything you need to build, launch, and grow your digital product.
            </p>
          </FadeUp>

          <StaggerList className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <StaggerItem key={service.title}>
                <MotionCard className="h-full rounded-xl">
                  <Card className="h-full border-0 bg-transparent shadow-none">
                    <CardHeader>
                      <div className="bg-primary/10 mb-3 flex h-12 w-12 items-center justify-center rounded-xl">
                        <service.icon className="text-primary h-6 w-6" />
                      </div>
                      <CardTitle>{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm">{service.description}</p>
                    </CardContent>
                  </Card>
                </MotionCard>
              </StaggerItem>
            ))}
          </StaggerList>

          <FadeUp delay={0.3} className="mt-10 text-center">
            <Link href="/services">
              <Button variant="link" className="text-primary gap-1">
                View all services <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* Why YouweTech */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <FadeUp>
              <h2 className="text-3xl font-bold">Why YouweTech?</h2>
              <p className="text-muted-foreground mt-4">
                We combine technical expertise with a client-first approach to deliver solutions
                that actually work for your business.
              </p>
              <StaggerList className="mt-8 space-y-4" delay={0.1}>
                {whyUs.map((item) => (
                  <StaggerItem key={item} className="flex items-start gap-3">
                    <CheckCircle className="text-primary mt-0.5 h-5 w-5 shrink-0" />
                    <span className="text-sm">{item}</span>
                  </StaggerItem>
                ))}
              </StaggerList>
              <div className="mt-8">
                <Link href="/about">
                  <Button variant="outline" className="gap-2">
                    Learn more about us <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </FadeUp>

            <FadeUp delay={0.15} className="relative flex items-center justify-center">
              <motion.div
                className="from-primary/20 to-primary/5 absolute inset-0 rounded-2xl bg-gradient-to-br blur-xl"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div className="border-primary/20 from-primary/10 to-primary/5 animate-float relative flex flex-col items-center justify-center rounded-2xl border bg-gradient-to-br p-12 text-center">
                <motion.p
                  className="text-primary text-6xl font-bold"
                  initial={{ scale: 0.7, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.2 }}
                >
                  100%
                </motion.p>
                <p className="text-muted-foreground mt-2 text-sm font-medium">
                  Client Satisfaction Goal
                </p>
                <p className="text-muted-foreground mt-4 max-w-xs text-xs">
                  Every project delivered with care, quality, and a commitment to your success.
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* CTA */}
      <FadeUp className="py-20">
        <div className="container mx-auto px-4">
          <div className="from-primary/10 via-primary/5 to-background border-primary/20 rounded-2xl border bg-gradient-to-br p-10 text-center sm:p-16">
            <h2 className="text-3xl font-bold">Ready to Build Something Great?</h2>
            <p className="text-muted-foreground mx-auto mt-4 max-w-xl">
              Tell us about your project and we&apos;ll get back to you within 24 hours with a free
              consultation.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/contact">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Button size="lg" className="shadow-primary/25 gap-2 shadow-md">
                    Get a Free Quote <ArrowRight className="h-4 w-4" />
                  </Button>
                </motion.div>
              </Link>
              <Link href="/portfolio">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Button variant="outline" size="lg">
                    See Our Work
                  </Button>
                </motion.div>
              </Link>
            </div>
          </div>
        </div>
      </FadeUp>
    </>
  );
}
