'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

/**
 * Full-page loading screen displayed until all assets are ready.
 * Uses the monogram logo with a subtle pulse animation, then
 * fades out smoothly once the window fires the 'load' event.
 */
export function LoadingScreen() {
  const [loaded, setLoaded] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (loaded) return;

    function handleLoad() {
      setLoaded(true);
    }

    // If the page already loaded before this effect ran (common during
    // hydration), defer setState via rAF to satisfy the lint rule that
    // forbids synchronous setState inside effects.
    if (document.readyState === 'complete') {
      const id = requestAnimationFrame(() => setLoaded(true));
      return () => cancelAnimationFrame(id);
    }

    window.addEventListener('load', handleLoad);
    return () => window.removeEventListener('load', handleLoad);
  }, [loaded]);

  // After the fade-out animation completes, unmount entirely
  useEffect(() => {
    if (!loaded) return;
    const timer = setTimeout(() => setHidden(true), 600);
    return () => clearTimeout(timer);
  }, [loaded]);

  if (hidden) return null;

  return (
    <div
      aria-hidden="true"
      className={cn(
        'fixed inset-0 z-[9999] flex items-center justify-center bg-background transition-opacity duration-500 ease-out',
        loaded ? 'pointer-events-none opacity-0' : 'opacity-100',
      )}
    >
      <div className="flex flex-col items-center gap-4">
        {/* Monogram */}
        <Image
          src="/logo.png"
          alt="AinzStack Logo"
          width={40}
          height={40}
          className="rounded-xl"
          priority
        />

        {/* Brand */}
        <div className="flex flex-col items-center gap-1">
          <span className="font-heading text-[14px] font-semibold tracking-tight text-foreground">
            AinzStack
          </span>
          <span className="text-[10px] tracking-widest uppercase text-muted-foreground">
            Loading
          </span>
        </div>

        {/* Minimal progress bar */}
        <div className="h-[2px] w-16 overflow-hidden rounded-full bg-border">
          <div className="loading-bar h-full rounded-full bg-foreground" />
        </div>
      </div>
    </div>
  );
}
