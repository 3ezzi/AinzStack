'use client';

import Link from 'next/link';
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
import { ArrowLeftIcon } from 'lucide-react';

export default function ForgotPasswordPage() {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="font-heading text-base">Reset password</CardTitle>
        <CardDescription>
          Enter your email and we&apos;ll send you a reset link.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form className="space-y-3">
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
          <Button type="submit" className="w-full" size="sm">
            Send Reset Link
          </Button>
        </form>
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
