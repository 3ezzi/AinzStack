import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-1.5 rounded-md text-[13px] font-medium whitespace-nowrap transition-colors duration-150 outline-none cursor-pointer select-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-40 aria-invalid:border-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground hover:opacity-80 active:opacity-70',
        destructive:
          'bg-destructive text-white hover:opacity-90 active:opacity-80',
        outline:
          'border border-border bg-background hover:bg-accent active:bg-accent/80',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/70 active:bg-secondary/60',
        ghost: 'hover:bg-accent active:bg-accent/80',
        link: 'text-foreground underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-8 px-3 py-1.5',
        xs: "h-6 gap-1 rounded px-2 text-[11px] [&_svg:not([class*='size-'])]:size-3",
        sm: 'h-7 gap-1 rounded-md px-2.5 text-xs',
        lg: 'h-9 rounded-md px-5 text-sm',
        xl: 'h-10 rounded-lg px-6 text-sm font-semibold',
        icon: 'size-8',
        'icon-xs': "size-6 rounded [&_svg:not([class*='size-'])]:size-3",
        'icon-sm': 'size-7',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
