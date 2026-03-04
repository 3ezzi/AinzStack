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
import { signUpWithEmail, signInWithGoogle } from '@/lib/auth/actions';

export default function SignUpPage() {
  const [state, formAction, isPending] = useActionState(signUpWithEmail, {});

  return (
    <Card>
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="font-heading text-[15px]">
          Create an account
        </CardTitle>
        <CardDescription className="text-[11px]">
          Get started with AinzStack
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* OAuth */}
        <form action={signInWithGoogle}>
          <Button
            type="submit"
            variant="outline"
            className="w-full text-[12px]"
            size="sm"
          >
            <svg className="size-3.5" viewBox="0 0 24 24" fill="none">
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
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-[10px] text-muted-foreground">
            or
          </span>
        </div>

        {/* Registration form */}
        <form action={formAction} className="space-y-3">
          {state.error && (
            <p className="rounded-md bg-destructive/10 px-3 py-2 text-[11px] text-destructive">
              {state.error}
            </p>
          )}
          <div className="space-y-1.5">
            <Label htmlFor="signup-name" className="text-[12px]">
              Full Name
            </Label>
            <Input
              id="signup-name"
              name="name"
              type="text"
              placeholder="Jane Doe"
              className="text-[12px]"
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="signup-email" className="text-[12px]">
              Email
            </Label>
            <Input
              id="signup-email"
              name="email"
              type="email"
              placeholder="you@example.com"
              className="text-[12px]"
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="signup-password" className="text-[12px]">
              Password
            </Label>
            <Input
              id="signup-password"
              name="password"
              type="password"
              placeholder="••••••••"
              className="text-[12px]"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full text-[12px]"
            size="sm"
            disabled={isPending}
          >
            {isPending ? 'Creating...' : 'Create Account'}
          </Button>
        </form>

        <p className="text-center text-[10px] text-muted-foreground">
          Already have an account?{' '}
          <Link href="/sign-in" className="text-foreground hover:underline">
            Sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
