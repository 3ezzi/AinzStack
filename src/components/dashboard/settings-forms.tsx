'use client';

import { useActionState, useState } from 'react';
import {
  updatePassword,
  updatePreferences,
  updateProfile,
} from '@/lib/account/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface FormState {
  error?: string;
  success?: string;
}

interface ProfileSettingsFormProps {
  fullName: string;
  email: string;
}

interface PreferenceSettingsFormProps {
  emailNotifications: boolean;
  marketingEmails: boolean;
}

interface PasswordSettingsFormProps {
  recoveryMode?: boolean;
}

const initialState: FormState = {};

function FormStatus({ error, success }: FormState) {
  if (!error && !success) {
    return null;
  }

  return (
    <p
      className={
        error
          ? 'rounded-md bg-destructive/10 px-3 py-2 text-[11px] text-destructive'
          : 'rounded-md bg-emerald-50 px-3 py-2 text-[11px] text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
      }
    >
      {error ?? success}
    </p>
  );
}

export function ProfileSettingsForm({
  fullName,
  email,
}: ProfileSettingsFormProps) {
  const [state, formAction, isPending] = useActionState(updateProfile, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <FormStatus error={state.error} success={state.success} />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="settings-name">Full Name</Label>
          <Input
            id="settings-name"
            name="fullName"
            defaultValue={fullName}
            autoComplete="name"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="settings-email">Email</Label>
          <Input
            id="settings-email"
            name="email"
            type="email"
            defaultValue={email}
            autoComplete="email"
          />
        </div>
      </div>
      <Button size="sm" disabled={isPending}>
        {isPending ? 'Saving...' : 'Save Profile'}
      </Button>
    </form>
  );
}

export function PreferenceSettingsForm({
  emailNotifications,
  marketingEmails,
}: PreferenceSettingsFormProps) {
  const [state, formAction, isPending] = useActionState(
    updatePreferences,
    initialState,
  );
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] = useState(
    emailNotifications,
  );
  const [marketingEmailsEnabled, setMarketingEmailsEnabled] = useState(
    marketingEmails,
  );

  return (
    <form action={formAction} className="space-y-4">
      <FormStatus error={state.error} success={state.success} />
      <input
        type="hidden"
        name="emailNotifications"
        value={String(emailNotificationsEnabled)}
      />
      <input
        type="hidden"
        name="marketingEmails"
        value={String(marketingEmailsEnabled)}
      />
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[13px] font-medium">Email notifications</p>
          <p className="text-[11px] text-muted-foreground">
            Receive account updates and delivery notifications.
          </p>
        </div>
        <Switch
          checked={emailNotificationsEnabled}
          onCheckedChange={setEmailNotificationsEnabled}
        />
      </div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[13px] font-medium">Marketing emails</p>
          <p className="text-[11px] text-muted-foreground">
            Receive product announcements, release notes, and tips.
          </p>
        </div>
        <Switch
          checked={marketingEmailsEnabled}
          onCheckedChange={setMarketingEmailsEnabled}
        />
      </div>
      <Button size="sm" disabled={isPending}>
        {isPending ? 'Saving...' : 'Save Preferences'}
      </Button>
    </form>
  );
}

export function PasswordSettingsForm({
  recoveryMode = false,
}: PasswordSettingsFormProps) {
  const [state, formAction, isPending] = useActionState(
    updatePassword,
    initialState,
  );
  const submitLabel = recoveryMode ? 'Set Password' : 'Update Password';
  const pendingLabel = recoveryMode ? 'Saving...' : 'Updating...';

  return (
    <form action={formAction} className="space-y-4">
      <FormStatus error={state.error} success={state.success} />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="settings-password">New Password</Label>
          <Input
            id="settings-password"
            name="password"
            type="password"
            autoComplete="new-password"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="settings-password-confirm">Confirm Password</Label>
          <Input
            id="settings-password-confirm"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
          />
        </div>
      </div>
      <Button size="sm" disabled={isPending}>
        {isPending ? pendingLabel : submitLabel}
      </Button>
    </form>
  );
}
