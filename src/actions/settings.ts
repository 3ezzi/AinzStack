"use server";

import { notImplementedAction, type ActionResult } from "@/types/actions";
import type { AppSettings } from "@/types/domain";

export interface ProfileSettingsInput {
  userId: string;
  fullName: string;
  avatarUrl?: string;
}

export interface NotificationSettingsInput {
  userId: string;
  emailNotifications: boolean;
  marketingEmails: boolean;
}

export async function updateProfileSettings(
  _input: ProfileSettingsInput,
): Promise<ActionResult<{ updated: true }>> {
  void _input;
  return notImplementedAction(
    "updateProfileSettings is scaffolded but not implemented.",
  );
}

export async function updateNotificationSettings(
  _input: NotificationSettingsInput,
): Promise<ActionResult<AppSettings>> {
  void _input;
  return notImplementedAction(
    "updateNotificationSettings is scaffolded but not implemented.",
  );
}
