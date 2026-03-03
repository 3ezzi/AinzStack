import * as React from 'react';

import { cn } from '@/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'flex h-8 w-full min-w-0 rounded-md border border-input bg-transparent px-2.5 py-1 text-[13px] transition-colors duration-150 outline-none file:border-0 file:bg-transparent file:text-[13px] file:font-medium placeholder:text-muted-foreground/60 disabled:pointer-events-none disabled:opacity-40',
        'focus-visible:border-foreground/30 focus-visible:ring-1 focus-visible:ring-ring/30',
        'aria-invalid:border-destructive aria-invalid:ring-destructive/20',
        className,
      )}
      {...props}
    />
  );
}

export { Input };
