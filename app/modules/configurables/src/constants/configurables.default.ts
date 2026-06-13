/*
 * Default Configurable Data — seeded into Mongo on first boot.
 *
 * BEFORE EDITING: read ./RULES.md (especially R5: schema and defaults must
 * stay in sync) and ./configurables.schema.ts. For per-type schema and
 * default-value samples, see RULES.md §5 "Field Type Reference".
 */

export type TBrandColor = {
  primary: string;
  secondary: string;
  accent: string;
};

export type TCategory = {
  name: string;
  emoji: string;
  gradient: string;
};

export type TDefaultConfigurableData = {
  appName: string;
  appTagline: string;
  logoUrl: string;
  brandColor: TBrandColor;
  searchPlaceholder: string;
  categories: TCategory[];
  onboardingLocationTitle: string;
  onboardingLocationBody: string;
  onboardingNotifTitle: string;
  onboardingNotifBody: string;
  onboardingCtaLabel: string;
  onboardingSkipLabel: string;
  buyNowLabel: string;
  bestDealBadgeLabel: string;
  resultsSortDefault: string;
  showOnboarding: boolean;
  trendingSearches: string[];
};

export const defaultConfigurablesData: TDefaultConfigurableData = {
  appName: "DealRadar",
  appTagline: "Find the best price, instantly.",
  logoUrl: "FILL_LOGO_URL_HERE",
  brandColor: {
    primary: "#FF4D00",
    secondary: "#1A1A2E",
    accent: "#00E5FF",
  },
  searchPlaceholder: "Search products, brands…",
  categories: [
    { name: "Electronics", emoji: "📱", gradient: "from-blue-500 to-indigo-600" },
    { name: "Sneakers", emoji: "👟", gradient: "from-orange-400 to-red-500" },
    { name: "Gaming", emoji: "🎮", gradient: "from-violet-500 to-purple-700" },
    { name: "Fashion", emoji: "👗", gradient: "from-pink-400 to-rose-500" },
    { name: "Beauty", emoji: "💄", gradient: "from-fuchsia-400 to-pink-600" },
    { name: "Home", emoji: "🏠", gradient: "from-emerald-400 to-teal-600" },
    { name: "Books", emoji: "📚", gradient: "from-amber-400 to-orange-500" },
    { name: "Sports", emoji: "⚽", gradient: "from-green-400 to-emerald-600" },
    { name: "Toys", emoji: "🧸", gradient: "from-yellow-400 to-amber-500" },
  ],
  onboardingLocationTitle: "Share your location",
  onboardingLocationBody: "We use it to show region-specific deals and accurate delivery estimates near you.",
  onboardingNotifTitle: "Never miss a deal",
  onboardingNotifBody: "Get instant alerts when prices drop on items you're watching.",
  onboardingCtaLabel: "Allow",
  onboardingSkipLabel: "Maybe Later",
  buyNowLabel: "Buy Now",
  bestDealBadgeLabel: "Best Deal",
  resultsSortDefault: "price-asc",
  showOnboarding: true,
  trendingSearches: [
    "iPhone 15",
    "Nike Air Max",
    "PS5 Controller",
    "MacBook Air M3",
    "OnePlus 12",
    "Levi's 511 Jeans",
  ],
};
