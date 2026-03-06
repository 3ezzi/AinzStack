import { redirect } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PasswordSettingsForm } from '@/components/dashboard/settings-forms';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export const metadata = {
  title: 'Reset Password',
  description: 'Choose a new password for your AinzStack account.',
};

export default async function ResetPasswordPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/forgot-password');
  }

  return (
    <Card>
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="font-heading text-[15px]">
          Set a new password
        </CardTitle>
        <CardDescription className="text-[11px]">
          Your recovery session is active. Choose a new password to finish the reset flow.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <PasswordSettingsForm recoveryMode />
      </CardContent>
    </Card>
  );
}
