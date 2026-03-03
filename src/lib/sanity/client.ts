import { createClient } from "next-sanity";
import { getServerEnv, requireServerEnvValue } from "@/lib/env/server";

export function getSanityClient() {
  const env = getServerEnv();
  const projectId = requireServerEnvValue("SANITY_PROJECT_ID", env.SANITY_PROJECT_ID);

  const tokenConfig = env.SANITY_READ_TOKEN
    ? { token: env.SANITY_READ_TOKEN }
    : {};

  return createClient({
    projectId,
    dataset: env.SANITY_DATASET,
    apiVersion: env.SANITY_API_VERSION,
    useCdn: env.NODE_ENV === "production",
    ...tokenConfig,
  });
}
