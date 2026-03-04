'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

/**
 * Full-page loading screen displayed until all assets are ready.
 * Uses the monogram logo with a subtle pulse animation, then
 * fades out smoothly once the window fires the 'load' event.
 */
export function LoadingScreen() {
  const [loaded, setLoaded] = useState(
    () => typeof document !== 'undefined' && document.readyState === 'complete',
  );
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (loaded) return;

    function handleLoad() {
      setLoaded(true);
    }

    // Check again in case readyState changed between render and effect
    if (document.readyState === 'complete') {
      setLoaded(true);
      return;
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
        <div className="loading-logo flex size-10 items-center justify-center rounded-xl bg-foreground">
          <span className="text-[16px] font-bold tracking-tight text-background">
            A
          </span>
        </div>

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
