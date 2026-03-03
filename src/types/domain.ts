export type IntegrationStatus = "unknown" | "ok" | "error";

export type BillingPlan = "free" | "pro" | "enterprise";

export interface UserProfile {
  id: string;
  email: string;
  fullName: string | null;
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AppSettings {
  timezone: string;
  emailNotifications: boolean;
  marketingEmails: boolean;
}
