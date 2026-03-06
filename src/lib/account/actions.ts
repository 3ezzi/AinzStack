'use server';

import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";

interface AccountActionState {
  error?: string;
  success?: string;
}

const profileSchema = z.object({
  fullName: z.string().trim().min(2, "Full name must be at least 2 characters.").max(80, "Full name must be 80 characters or fewer."),
  email: z.string().trim().email("Enter a valid email address."),
});

const preferencesSchema = z.object({
  emailNotifications: z.boolean(),
  marketingEmails: z.boolean(),
});

const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .max(128, "Password must be 128 characters or fewer."),
    confirmPassword: z.string(),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

function normalizeCheckboxValue(value: FormDataEntryValue | null): boolean {
  return value === "on" || value === "true";
}

export async function updateProfile(
  _previousState: AccountActionState,
  formData: FormData,
): Promise<AccountActionState> {
  const parsed = profileSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Profile update failed.",
    };
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be signed in to update your profile." };
  }

  const updatePayload: {
    email?: string;
    data: Record<string, unknown>;
  } = {
    data: {
      ...user.user_metadata,
      full_name: parsed.data.fullName,
    },
  };

  if (parsed.data.email !== user.email) {
    updatePayload.email = parsed.data.email;
  }

  const { error } = await supabase.auth.updateUser(updatePayload);

  if (error) {
    return { error: error.message };
  }

  return {
    success:
      parsed.data.email === user.email
        ? "Profile updated."
        : "Profile updated. Confirm the new email address from the verification email.",
  };
}

export async function updatePreferences(
  _previousState: AccountActionState,
  formData: FormData,
): Promise<AccountActionState> {
  const parsed = preferencesSchema.safeParse({
    emailNotifications: normalizeCheckboxValue(formData.get("emailNotifications")),
    marketingEmails: normalizeCheckboxValue(formData.get("marketingEmails")),
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Preferences update failed.",
    };
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be signed in to update preferences." };
  }

  const { error } = await supabase.auth.updateUser({
    data: {
      ...user.user_metadata,
      email_notifications: parsed.data.emailNotifications,
      marketing_emails: parsed.data.marketingEmails,
    },
  });

  if (error) {
    return { error: error.message };
  }

  return { success: "Notification preferences updated." };
}

export async function updatePassword(
  _previousState: AccountActionState,
  formData: FormData,
): Promise<AccountActionState> {
  const parsed = passwordSchema.safeParse({
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Password update failed.",
    };
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Recovery session expired. Request a new password reset link." };
  }

  const { error } = await supabase.auth.updateUser({
    password: parsed.data.password,
  });

  if (error) {
    return { error: error.message };
  }

  return { success: "Password updated successfully." };
}
