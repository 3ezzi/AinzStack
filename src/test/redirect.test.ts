import { describe, expect, it } from 'vitest';
import { getSafeAuthRedirect } from '@/lib/security/redirect';

describe('getSafeAuthRedirect', () => {
  it('allows approved application paths', () => {
    expect(getSafeAuthRedirect('/dashboard/settings')).toBe('/dashboard/settings');
    expect(getSafeAuthRedirect('/reset-password?token=abc')).toBe(
      '/reset-password?token=abc',
    );
  });

  it('rejects absolute and non-allowlisted redirects', () => {
    expect(getSafeAuthRedirect('https://evil.example')).toBe('/dashboard');
    expect(getSafeAuthRedirect('//evil.example')).toBe('/dashboard');
    expect(getSafeAuthRedirect('/pricing')).toBe('/dashboard');
  });
});
