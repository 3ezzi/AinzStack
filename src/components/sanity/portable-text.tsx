import { PortableText as PortableTextRenderer } from '@portabletext/react';
import Image from 'next/image';
import { urlForImage } from '@/lib/sanity/image';
import { CodeBlock } from '@/components/shared/code-block';
import type { SanityBlock } from '@/lib/sanity/queries';

interface PortableTextProps {
  value: SanityBlock[];
}

interface PortableTextChild {
  text?: string;
}

interface PortableTextLikeBlock {
  _type?: string;
  _key?: string;
  style?: string;
  children?: PortableTextChild[];
}

interface PortableTextCodeBlock {
  _type: 'code';
  _key: string;
  code: string;
  language: string;
}

function extractPlainText(block: PortableTextLikeBlock): string {
  if (!Array.isArray(block.children)) {
    return '';
  }

  return block.children
    .map((child) => (typeof child.text === 'string' ? child.text : ''))
    .join('');
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
    code: ({
      value,
    }: {
      value: { code: string; language?: string; filename?: string };
    }) => {
      return (
        <CodeBlock
          code={value.code}
          language={value.language}
          filename={value.filename}
        />
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
      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[11px] text-foreground">
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

  // Pre-process the blocks to detect markdown-style code blocks
  // that were pasted as normal text (e.g. ```bash \n ... \n ```)
  const processedBlocks: Array<SanityBlock | PortableTextCodeBlock> = [];
  let inCode = false;
  let codeContent = '';
  let language = '';
  let generatedCodeKeyCounter = 0;

  const nextCodeKey = (
    prefix: string,
    blockIndex: number,
    existingKey?: string,
  ) => {
    if (existingKey) {
      return existingKey;
    }

    generatedCodeKeyCounter += 1;
    return `${prefix}-${blockIndex}-${generatedCodeKeyCounter}`;
  };

  for (const [blockIndex, rawBlock] of value.entries()) {
    const block = rawBlock as PortableTextLikeBlock;

    // We only inspect "normal" text blocks
    if (block._type === 'block' && (block.style === 'normal' || !block.style)) {
      const text = extractPlainText(block);

      // Check if starting a new code block
      if (!inCode && text.trim().startsWith('```')) {
        const lines = text.split('\n');
        const lastLine = (lines[lines.length - 1] ?? '').trim();

        // If it starts and ends with ``` in the same block (Shift+Enter)
        if (lines.length > 1 && lastLine === '```') {
          const lang = (lines[0] ?? '').trim().substring(3).trim();
          const code = lines.slice(1, -1).join('\n');
          processedBlocks.push({
            _type: 'code',
            _key: nextCodeKey('code', blockIndex, block._key),
            code,
            language: lang || 'text',
          });
          continue;
        } else {
          // Starts a multi-block code block
          inCode = true;
          language = (lines[0] ?? '').trim().substring(3).trim();
          codeContent = lines.slice(1).join('\n');
          if (lines.length > 1) codeContent += '\n';
          continue;
        }
      }

      // If we are accumulating lines inside a code block
      if (inCode) {
        const lines = text.split('\n');
        let closedInThisBlock = false;

        // Check if the closing ``` is anywhere in this block
        for (let i = 0; i < lines.length; i++) {
          const currentLine = lines[i];
          if (currentLine && currentLine.trim() === '```') {
            inCode = false;
            closedInThisBlock = true;
            codeContent += lines.slice(0, i).join('\n');
            processedBlocks.push({
              _type: 'code',
              _key: nextCodeKey('code', blockIndex, block._key),
              code: codeContent.trimEnd(),
              language: language || 'text',
            });
            break;
          }
        }

        if (!closedInThisBlock) {
          codeContent += text + '\n';
        }
        continue;
      }
    } else if (inCode) {
      // If we hit a non-normal block (like an image) while unclosed, force close
      inCode = false;
      processedBlocks.push({
        _type: 'code',
        _key: nextCodeKey('forced-code', blockIndex),
        code: codeContent.trimEnd(),
        language: language || 'text',
      });
    }

    // Normal pass-through
    if (!inCode) {
      processedBlocks.push(rawBlock);
    }
  }

  // Handle cleanly if the document ends while still in a code block
  if (inCode) {
    processedBlocks.push({
      _type: 'code',
      _key: nextCodeKey('unclosed-code', value.length),
      code: codeContent.trimEnd(),
      language: language || 'text',
    });
  }

  return (
    <div className="prose-ainz">
      <PortableTextRenderer value={processedBlocks} components={components} />
    </div>
  );
}
