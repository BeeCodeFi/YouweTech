'use client';

import { useRef, useEffect, useState } from 'react';
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  type Variants,
  type HTMLMotionProps,
} from 'framer-motion';
import { cn } from '@/lib/utils';

// ─── Shared variants ─────────────────────────────────────────────────────────

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.03,
    },
  },
};

// ─── FadeUp ──────────────────────────────────────────────────────────────────

interface FadeUpProps extends HTMLMotionProps<'div'> {
  delay?: number;
  once?: boolean;
}

export function FadeUp({ children, delay = 0, once = true, className, ...props }: FadeUpProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        hidden: fadeUp.hidden,
        visible: {
          ...(fadeUp.visible as object),
          transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94], delay },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ─── FadeIn ──────────────────────────────────────────────────────────────────

interface FadeInProps extends HTMLMotionProps<'div'> {
  delay?: number;
  once?: boolean;
}

export function FadeIn({ children, delay = 0, once = true, className, ...props }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        hidden: fadeIn.hidden,
        visible: {
          ...(fadeIn.visible as object),
          transition: { duration: 0.5, ease: 'easeOut', delay },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ─── StaggerList ─────────────────────────────────────────────────────────────

interface StaggerListProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
  fast?: boolean;
}

export function StaggerList({
  children,
  className,
  delay = 0,
  once = true,
  fast = false,
}: StaggerListProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: '-60px' });

  const variants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: fast ? 0.07 : 0.12,
        delayChildren: delay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── StaggerItem ─────────────────────────────────────────────────────────────

export function StaggerItem({ children, className, ...props }: HTMLMotionProps<'div'>) {
  return (
    <motion.div variants={fadeUp} className={className} {...props}>
      {children}
    </motion.div>
  );
}

// ─── AnimatedSection ─────────────────────────────────────────────────────────
// Generic scroll-triggered wrapper

interface AnimatedSectionProps extends HTMLMotionProps<'section'> {
  variants?: Variants;
  delay?: number;
  once?: boolean;
}

export function AnimatedSection({
  children,
  variants: customVariants,
  delay = 0,
  once = true,
  className,
  ...props
}: AnimatedSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once, margin: '-80px' });

  const vars = customVariants ?? fadeUp;

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        hidden: vars.hidden,
        visible: {
          ...(vars.visible as object),
          transition: {
            ...((vars.visible as { transition?: object })?.transition ?? {}),
            delay,
          },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.section>
  );
}

// ─── CountUp ─────────────────────────────────────────────────────────────────

interface CountUpProps {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export function CountUp({ to, suffix = '', prefix = '', duration = 1.8, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: duration * 1000, bounce: 0 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) motionValue.set(to);
  }, [inView, motionValue, to]);

  useEffect(() => {
    return spring.on('change', (v) => setDisplay(Math.round(v)));
  }, [spring]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

// ─── HeroEntrance ────────────────────────────────────────────────────────────
// Special entrance for hero — runs immediately on mount

export function HeroEntrance({
  children,
  delay = 0,
  className,
  ...props
}: HTMLMotionProps<'div'> & { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ─── ScaleOnHover card wrapper ────────────────────────────────────────────────

export function MotionCard({ children, className, ...props }: HTMLMotionProps<'div'>) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={cn('cursor-default', className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
