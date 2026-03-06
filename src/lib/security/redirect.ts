const DEFAULT_AUTH_REDIRECT = "/dashboard";
const ALLOWED_AUTH_REDIRECT_PREFIXES = ["/dashboard", "/reset-password"] as const;

export function getSafeAuthRedirect(value: string | null | undefined): string {
  if (!value || !value.startsWith("/") || value.startsWith("//") || value.includes("\\")) {
    return DEFAULT_AUTH_REDIRECT;
  }

  const candidate = new URL(value, "https://ainzstack.local");
  const normalized = `${candidate.pathname}${candidate.search}${candidate.hash}`;

  const isAllowed = ALLOWED_AUTH_REDIRECT_PREFIXES.some((prefix) => {
    return (
      normalized === prefix ||
      normalized.startsWith(`${prefix}/`) ||
      normalized.startsWith(`${prefix}?`) ||
      normalized.startsWith(`${prefix}#`)
    );
  });

  return isAllowed ? normalized : DEFAULT_AUTH_REDIRECT;
}
