import { describe, it, expect, vi } from 'vitest';
import { urlForImage } from '@/lib/sanity/image';

// Mock the Sanity client and dependencies
vi.mock('@/lib/sanity/client', () => ({
  getSanityClient: vi.fn(() => ({
    clientConfig: {
      projectId: 'test-project',
      dataset: 'production',
    },
  })),
}));

describe('Sanity Image Builder', () => {
  it('should generate a valid image URL object', () => {
    // A mock Sanity image reference
    const mockImageSource = {
      _type: 'image',
      asset: {
        _ref: 'image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg',
        _type: 'reference',
      },
    };

    const builder = urlForImage(mockImageSource);

    // Verify it returns an ImageUrlBuilder instance that we can chain
    expect(builder).toBeDefined();
    expect(typeof builder.url).toBe('function');
    expect(typeof builder.width).toBe('function');
    expect(typeof builder.height).toBe('function');

    // Generate url to ensure it doesn't crash
    const url = builder.url();
    expect(typeof url).toBe('string');
    // Ensure the generated string contains the mock project id
    expect(url).toContain('test-project');
  });
});
