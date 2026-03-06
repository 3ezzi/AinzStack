import { describe, expect, it } from 'vitest';
import { serializeJsonLd } from '@/lib/seo/json-ld';

describe('serializeJsonLd', () => {
  it('escapes characters that can break out of a script tag', () => {
    const serialized = serializeJsonLd({
      title: '</script><script>alert("xss")</script>',
      body: 'line\u2028separator\u2029here',
    });

    expect(serialized).not.toContain('</script>');
    expect(serialized).toContain('\\u003C/script>');
    expect(serialized).toContain('\\u2028');
    expect(serialized).toContain('\\u2029');
  });
});
