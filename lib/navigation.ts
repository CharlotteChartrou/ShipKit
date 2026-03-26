export { getDashboardNavigation as dashboardNavigation, getMarketingNavigation as marketingNavigation } from "@/lib/i18n";

export const protectedAppRoutes = ["/dashboard", "/account", "/profile", "/billing"] as const;
export const authRoutes = ["/login", "/signup"] as const;
