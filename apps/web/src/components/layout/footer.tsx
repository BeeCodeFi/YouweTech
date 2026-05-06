import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

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

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="text-primary text-2xl font-bold">
              YouweTech
            </Link>
            <p className="text-muted-foreground text-sm">
              Empowering businesses with modern IT solutions. From concept to deployment, we build
              technology that scales.
            </p>
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
          <div className="flex space-x-4">
            <a
              href="https://github.com/BeeCodeFi/YouweTech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground text-sm"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
