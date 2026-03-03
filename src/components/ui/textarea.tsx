import * as React from 'react';

import { cn } from '@/lib/utils';

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'flex field-sizing-content min-h-16 w-full rounded-md border border-input bg-transparent px-2.5 py-2 text-[13px] transition-colors duration-150 outline-none placeholder:text-muted-foreground/60 focus-visible:border-foreground/30 focus-visible:ring-1 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-40 aria-invalid:border-destructive',
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
