import { PortableText as PortableTextRenderer } from '@portabletext/react';
import Image from 'next/image';
import { urlForImage } from '@/lib/sanity/image';
import type { SanityBlock } from '@/lib/sanity/queries';

interface PortableTextProps {
  value: SanityBlock[];
}

const components = {
  types: {
    image: ({
      value,
    }: {
      value: { asset: { _ref: string }; alt?: string };
    }) => {
      const url = urlForImage(value).width(720).auto('format').url();
      return (
        <figure className="my-6">
          <Image
            src={url}
            alt={value.alt ?? ''}
            width={720}
            height={400}
            className="rounded-lg"
          />
          {value.alt && (
            <figcaption className="mt-2 text-center text-xs text-muted-foreground">
              {value.alt}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    h1: ({ children }: { children?: React.ReactNode }) => (
      <h1 className="mb-4 mt-8 font-heading text-2xl font-semibold tracking-tight">
        {children}
      </h1>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="mb-3 mt-6 font-heading text-xl font-semibold tracking-tight">
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="mb-2 mt-4 font-heading text-lg font-medium">{children}</h3>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-4 text-[13px] leading-relaxed text-muted-foreground">
        {children}
      </p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="my-4 border-l-2 border-border pl-4 italic text-muted-foreground">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({
      children,
      value,
    }: {
      children?: React.ReactNode;
      value?: { href: string };
    }) => (
      <a
        href={value?.href}
        className="text-foreground underline underline-offset-2 hover:text-muted-foreground"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    code: ({ children }: { children?: React.ReactNode }) => (
      <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
        {children}
      </code>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="mb-4 list-disc space-y-1 pl-5 text-[13px] text-muted-foreground">
        {children}
      </ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="mb-4 list-decimal space-y-1 pl-5 text-[13px] text-muted-foreground">
        {children}
      </ol>
    ),
  },
};

export function PortableText({ value }: PortableTextProps) {
  if (!value || value.length === 0) {
    return null;
  }

  return (
    <div className="prose-ainz">
      <PortableTextRenderer value={value} components={components} />
    </div>
  );
}
