'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur transition-shadow duration-200',
        scrolled && 'shadow-sm',
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-primary text-2xl font-bold tracking-tight">YouweTech</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center space-x-1 md:flex">
          {navLinks.map((link) => {
            const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center space-x-3">
          <Link href="/portal" className="hidden md:block">
            <Button variant="outline" size="sm">
              Client Portal
            </Button>
          </Link>
          <Link href="/contact" className="hidden md:block">
            <Button size="sm">Get Started</Button>
          </Link>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="md:hidden" aria-label="Open menu">
              <Button variant="ghost" size="icon" aria-label="Open menu" tabIndex={-1}>
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <nav className="mt-8 flex flex-col space-y-1">
                {navLinks.map((link) => {
                  const isActive =
                    link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        'rounded-md px-3 py-2 text-lg font-medium transition-colors',
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'hover:bg-accent hover:text-foreground',
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                <div className="mt-4 flex flex-col space-y-2 border-t pt-4">
                  <Link href="/portal" onClick={() => setOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Client Portal
                    </Button>
                  </Link>
                  <Link href="/contact" onClick={() => setOpen(false)}>
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
