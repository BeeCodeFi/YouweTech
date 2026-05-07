import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Github, Linkedin, Twitter } from 'lucide-react';

const footerLinks = {
  Services: [
    { href: '/services#web-development', label: 'Web Development' },
    { href: '/services#mobile-development', label: 'Mobile Development' },
    { href: '/services#cloud-solutions', label: 'Cloud Solutions' },
    { href: '/services#consulting', label: 'IT Consulting' },
  ],
  Company: [
    { href: '/about', label: 'About Us' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ],
  Legal: [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
  ],
};

const socialLinks = [
  {
    href: 'https://github.com/BeeCodeFi/YouweTech',
    label: 'GitHub',
    icon: Github,
  },
  {
    href: 'https://linkedin.com/company/youwetech',
    label: 'LinkedIn',
    icon: Linkedin,
  },
  {
    href: 'https://twitter.com/youwetech',
    label: 'Twitter / X',
    icon: Twitter,
  },
];

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="text-primary text-2xl font-bold tracking-tight">
              YouweTech
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Empowering businesses with modern IT solutions. From concept to deployment, we build
              technology that scales.
            </p>
            <div className="flex items-center gap-3 pt-1">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-4 text-sm font-semibold">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} YouweTech. All rights reserved.
          </p>
          <p className="text-muted-foreground text-xs">Built with Next.js &amp; Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
