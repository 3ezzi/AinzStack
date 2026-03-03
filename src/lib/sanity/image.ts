import imageUrlBuilder from "@sanity/image-url";
import { getSanityClient } from "@/lib/sanity/client";

type SanityImageSource = Parameters<ReturnType<typeof imageUrlBuilder>["image"]>[0];

export function urlForImage(source: SanityImageSource) {
  return imageUrlBuilder(getSanityClient()).image(source);
}
