import { codeToHtml } from 'shiki';
import { CopyButton } from '@/components/shared/copy-button';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export async function CodeBlock({
  code,
  language = 'text',
  filename,
}: CodeBlockProps) {
  const trimmedCode = code.trim();

  const html = await codeToHtml(trimmedCode, {
    lang: language,
    themes: {
      light: 'github-light',
      dark: 'github-dark',
    },
    defaultColor: false,
  });

  return (
    <div className="group relative my-5 overflow-hidden rounded-lg border border-border/60 bg-muted/30 text-[13px]">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-border/60 bg-muted/50 px-3 py-1.5">
        <span className="font-mono text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">
          {filename ?? language}
        </span>
        <CopyButton text={trimmedCode} />
      </div>

      {/* Highlighted code */}
      <div
        className="code-block-content overflow-x-auto p-3 [&_pre]:bg-transparent! [&_pre]:p-0! [&_pre]:m-0! [&_code]:text-[12px]! [&_code]:leading-relaxed! [&_code]:font-mono"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
