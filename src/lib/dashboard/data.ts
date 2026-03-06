import { getDocCategories, getPosts } from "@/lib/sanity/queries";
import { STRIPE_PLANS } from "@/lib/stripe/plans";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getIntegrationSummary } from "@/lib/integrations/status";

export interface PurchaseRecord {
  id: string;
  plan: string;
  amountCents: number;
  status: string;
  createdAt: string;
}

export interface CurrentUserSnapshot {
  id: string;
  email: string;
  fullName: string;
  avatarUrl: string | null;
  notificationsEnabled: boolean;
  marketingEmails: boolean;
}

export interface CmsSummary {
  postCount: number;
  docArticleCount: number;
  docCategoryCount: number;
}

export async function getCurrentUserSnapshot(): Promise<CurrentUserSnapshot | null> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
    fullName: user.user_metadata?.full_name ?? user.email.split("@")[0] ?? "User",
    avatarUrl: user.user_metadata?.avatar_url ?? null,
    notificationsEnabled: user.user_metadata?.email_notifications ?? true,
    marketingEmails: user.user_metadata?.marketing_emails ?? false,
  };
}

export async function getUserPurchases(): Promise<PurchaseRecord[]> {
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return [];
    }

    const { data, error } = await supabase
      .from("purchases")
      .select("id, plan, amount_cents, status, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error({ error }, "Failed to fetch purchases");
      return [];
    }

    return (data ?? []).map((purchase) => ({
      id: purchase.id,
      plan: purchase.plan,
      amountCents: purchase.amount_cents,
      status: purchase.status,
      createdAt: purchase.created_at,
    }));
  } catch (error) {
    console.error({ error }, "Unexpected failure while loading purchases");
    return [];
  }
}

export async function getCmsSummary(): Promise<CmsSummary> {
  try {
    const [posts, categories] = await Promise.all([getPosts(), getDocCategories()]);
    const docArticleCount = categories.reduce((count, category) => {
      return count + category.articles.length;
    }, 0);

    return {
      postCount: posts.length,
      docCategoryCount: categories.length,
      docArticleCount,
    };
  } catch (error) {
    console.error({ error }, "Failed to load CMS summary");
    return {
      postCount: 0,
      docCategoryCount: 0,
      docArticleCount: 0,
    };
  }
}

export async function getDashboardSnapshot() {
  const [user, purchases, cmsSummary] = await Promise.all([
    getCurrentUserSnapshot(),
    getUserPurchases(),
    getCmsSummary(),
  ]);

  const integrationSummary = getIntegrationSummary();
  const activePurchase = purchases.find((purchase) => purchase.status === "succeeded");
  const plan = activePurchase
    ? STRIPE_PLANS[activePurchase.plan as keyof typeof STRIPE_PLANS] ?? STRIPE_PLANS.starter
    : STRIPE_PLANS.starter;

  return {
    user,
    purchases,
    activePurchase,
    plan,
    cmsSummary,
    integrationSummary,
  };
}
