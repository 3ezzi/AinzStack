'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { signInWithEmail, signInWithGoogle } from '@/lib/auth/actions';

export default function SignInPage() {
  const [state, formAction, isPending] = useActionState(signInWithEmail, {});

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="font-heading text-base">Welcome back</CardTitle>
        <CardDescription>Sign in to your account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* OAuth */}
        <form action={signInWithGoogle}>
          <Button type="submit" variant="outline" className="w-full" size="sm">
            <svg className="size-4" viewBox="0 0 24 24" fill="none">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A10.96 10.96 0 0012 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 001 12c0 1.77.43 3.45 1.18 4.93l3.66-2.84z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </Button>
        </form>

        <div className="relative">
          <Separator />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-[11px] text-muted-foreground">
            or
          </span>
        </div>

        {/* Email / Password */}
        <form action={formAction} className="space-y-3">
          {state.error && (
            <p className="rounded-md bg-destructive/10 px-3 py-2 text-xs text-destructive">
              {state.error}
            </p>
          )}
          <div className="space-y-1.5">
            <Label htmlFor="signin-email">Email</Label>
            <Input
              id="signin-email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="signin-password">Password</Label>
              <Link
                href="/forgot-password"
                className="text-[11px] text-muted-foreground hover:text-foreground"
              >
                Forgot?
              </Link>
            </div>
            <Input
              id="signin-password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            size="sm"
            disabled={isPending}
          >
            {isPending ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <p className="text-center text-[11px] text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link href="/sign-up" className="text-foreground hover:underline">
            Sign up
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
