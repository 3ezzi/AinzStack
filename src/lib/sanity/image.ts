import { createImageUrlBuilder } from '@sanity/image-url';
import { getSanityClient } from '@/lib/sanity/client';

type SanityImageSource = Parameters<
  ReturnType<typeof createImageUrlBuilder>['image']
>[0];

export function urlForImage(source: SanityImageSource) {
  return createImageUrlBuilder(getSanityClient()).image(source);
}
