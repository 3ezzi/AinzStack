import { serializeJsonLd } from '@/lib/seo/json-ld';

interface JsonLdProps {
  data: Record<string, unknown>;
}

/**
 * Injects a JSON-LD `<script>` tag for structured data (Schema.org).
 * Use with `WebSite`, `BlogPosting`, `Organization`, etc.
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
