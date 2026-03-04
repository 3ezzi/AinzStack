'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ConstructionIcon, ArrowLeftIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ComingSoonProps {
  title?: string;
  description?: string;
  backHref?: string;
  backLabel?: string;
}

export function ComingSoon({
  title = 'Coming Soon',
  description = 'This feature is currently under development. Check back soon for updates.',
  backHref = '/dashboard',
  backLabel = 'Back to Dashboard',
}: ComingSoonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="flex min-h-[60vh] flex-col items-center justify-center text-center"
    >
      {/* Icon */}
      <div className="flex size-12 items-center justify-center rounded-xl bg-muted">
        <ConstructionIcon className="size-5 text-muted-foreground" />
      </div>

      {/* Text */}
      <h1 className="mt-5 text-[18px] font-semibold tracking-tight">{title}</h1>
      <p className="mt-1.5 max-w-sm text-[12px] leading-relaxed text-muted-foreground">
        {description}
      </p>

      {/* Progress indicator */}
      <div className="mt-5 flex flex-col items-center gap-1.5">
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground/70">
          In Development
        </span>
        <div className="h-[2px] w-16 overflow-hidden rounded-full bg-border">
          <div className="loading-bar h-full rounded-full bg-foreground" />
        </div>
      </div>

      {/* Back button */}
      <Button
        variant="outline"
        size="sm"
        asChild
        className="mt-6 gap-1.5 text-[12px]"
      >
        <Link href={backHref}>
          <ArrowLeftIcon className="size-3" />
          {backLabel}
        </Link>
      </Button>
    </motion.div>
  );
}
