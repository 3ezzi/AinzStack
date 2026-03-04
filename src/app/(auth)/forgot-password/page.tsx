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
import { ArrowLeftIcon, CheckIcon } from 'lucide-react';
import { resetPassword } from '@/lib/auth/actions';

export default function ForgotPasswordPage() {
  const [state, formAction, isPending] = useActionState(resetPassword, {});
  const success = state.error === undefined && isPending === false;

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="font-heading text-base">Reset password</CardTitle>
        <CardDescription>
          Enter your email and we&apos;ll send you a reset link.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {success && !state.error ? (
          <div className="flex flex-col items-center gap-2 py-4 text-center">
            <div className="flex size-8 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
              <CheckIcon className="size-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <p className="text-[13px] font-medium">Check your email</p>
            <p className="text-xs text-muted-foreground">
              We&apos;ve sent a password reset link to your email.
            </p>
          </div>
        ) : (
          <form action={formAction} className="space-y-3">
            {state.error && (
              <p className="rounded-md bg-destructive/10 px-3 py-2 text-xs text-destructive">
                {state.error}
              </p>
            )}
            <div className="space-y-1.5">
              <Label htmlFor="reset-email">Email</Label>
              <Input
                id="reset-email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              size="sm"
              disabled={isPending}
            >
              {isPending ? 'Sending...' : 'Send Reset Link'}
            </Button>
          </form>
        )}
        <div className="text-center">
          <Link
            href="/sign-in"
            className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground"
          >
            <ArrowLeftIcon className="size-3" />
            Back to sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
