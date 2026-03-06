import type { Metadata } from 'next';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  PasswordSettingsForm,
  PreferenceSettingsForm,
  ProfileSettingsForm,
} from '@/components/dashboard/settings-forms';
import { getCurrentUserSnapshot } from '@/lib/dashboard/data';

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Manage your account and preferences.',
};

export default async function SettingsPage() {
  const user = await getCurrentUserSnapshot();

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-xl font-bold tracking-tight">
          Settings
        </h1>
        <p className="text-[12px] text-muted-foreground">
          Manage profile data, notification preferences, and account security.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            Update the name and primary email attached to this account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileSettingsForm fullName={user.fullName} email={user.email} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>
            Control which operational and marketing emails you receive.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PreferenceSettingsForm
            emailNotifications={user.notificationsEnabled}
            marketingEmails={user.marketingEmails}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
          <CardDescription>
            Change your password using the active authenticated session.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PasswordSettingsForm />
        </CardContent>
      </Card>
    </div>
  );
}
