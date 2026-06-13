import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { ArrowLeft, Search, SlidersHorizontal, ExternalLink, Tag, Truck } from "lucide-react";
import { useConfigurables } from "~/modules/configurables";
import BottomNav from "~/components/BottomNav";

// ─── Mock Data Types ────────────────────────────────────────────────────────

type Coupon = {
  code: string;
  label: string;
  discountAmount: number;
};

type StoreResult = {
  id: string;
  storeName: string;
  storeLogo: string; // emoji fallback
  storeColor: string;
  basePrice: number;
  shippingCost: number;
  coupons: Coupon[];
  deepLink: string;
};

// ─── Mock store results generator ───────────────────────────────────────────

function generateMockResults(query: string): StoreResult[] {
  const seed = query.toLowerCase().charCodeAt(0) % 7;
  const baseRef = 800 + seed * 200;

  const stores: StoreResult[] = [
    {
      id: "amazon",
      storeName: "Amazon",
      storeLogo: "🛒",
      storeColor: "#FF9900",
      basePrice: baseRef + 50,
      shippingCost: 0,
      coupons: [
        { code: "SAVE10", label: "10% OFF", discountAmount: (baseRef + 50) * 0.1 },
      ],
      deepLink: `https://www.amazon.in/s?k=${encodeURIComponent(query)}`,
    },
    {
      id: "flipkart",
      storeName: "Flipkart",
      storeLogo: "🛍️",
      storeColor: "#2874F0",
      basePrice: baseRef + 100,
      shippingCost: 40,
      coupons: [
        { code: "FKSAVE", label: "SAVE ₹200", discountAmount: 200 },
        { code: "FK5OFF", label: "5% OFF", discountAmount: (baseRef + 100) * 0.05 },
      ],
      deepLink: `https://www.flipkart.com/search?q=${encodeURIComponent(query)}`,
    },
    {
      id: "myntra",
      storeName: "Myntra",
      storeLogo: "👔",
      storeColor: "#FF3F6C",
      basePrice: baseRef - 50,
      shippingCost: 49,
      coupons: [],
      deepLink: `https://www.myntra.com/${encodeURIComponent(query)}`,
    },
    {
      id: "meesho",
      storeName: "Meesho",
      storeLogo: "🏷️",
      storeColor: "#9B2DAC",
      basePrice: baseRef - 150,
      shippingCost: 0,
      coupons: [
        { code: "MFIRST", label: "SAVE ₹50", discountAmount: 50 },
      ],
      deepLink: `https://www.meesho.com/search?q=${encodeURIComponent(query)}`,
    },
    {
      id: "croma",
      storeName: "Croma",
      storeLogo: "📺",
      storeColor: "#1A7A4C",
      basePrice: baseRef + 200,
      shippingCost: 0,
      coupons: [
        { code: "CRFEST", label: "15% OFF", discountAmount: (baseRef + 200) * 0.15 },
      ],
      deepLink: `https://www.croma.com/search/#text=${encodeURIComponent(query)}`,
    },
  ];

  return stores;
}

function getTrueTotal(store: StoreResult): number {
  const bestCoupon =
    store.coupons.length > 0
      ? store.coupons.reduce((best, c) =>
          c.discountAmount > best.discountAmount ? c : best
        )
      : null;
  const discount = bestCoupon ? bestCoupon.discountAmount : 0;
  return store.basePrice + store.shippingCost - discount;
}

// ─── Skeleton Loader ─────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-gray-200 flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-3.5 bg-gray-200 rounded-full w-24" />
          <div className="h-4 bg-gray-200 rounded-full w-32" />
          <div className="h-3 bg-gray-200 rounded-full w-20" />
        </div>
        <div className="w-20 h-10 bg-gray-200 rounded-xl" />
      </div>
    </div>
  );
}

// ─── Coupon Tag ───────────────────────────────────────────────────────────────

function CouponTag({ coupon, extra }: { coupon: Coupon; extra?: number }) {
  return (
    <div className="flex items-center gap-1">
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#00E5FF] text-[#0D0D0D] text-[10px] font-bold">
        <Tag className="w-2.5 h-2.5" />
        {coupon.label}
      </span>
      {extra && extra > 0 ? (
        <span className="text-[#6B6B6B] text-[10px] font-medium">+{extra} more</span>
      ) : null}
    </div>
  );
}

// ─── Store Card ───────────────────────────────────────────────────────────────

function StoreCard({
  store,
  isBest,
  index,
  buyNowLabel,
  bestDealBadgeLabel,
}: {
  store: StoreResult;
  isBest: boolean;
  index: number;
  buyNowLabel: string;
  bestDealBadgeLabel: string;
}) {
  const bestCoupon =
    store.coupons.length > 0
      ? store.coupons.reduce((best, c) =>
          c.discountAmount > best.discountAmount ? c : best
        )
      : null;
  const extraCoupons = store.coupons.length > 1 ? store.coupons.length - 1 : 0;
  const trueTotal = getTrueTotal(store);
  const hasCoupon = bestCoupon !== null;
  const originalTotal = store.basePrice + store.shippingCost;
  const savings = originalTotal - trueTotal;

  return (
    <div
      className={`bg-white rounded-2xl overflow-hidden shadow-sm transition-all duration-200 ${
        isBest ? "ring-2 ring-[#00E5FF] ring-offset-1" : ""
      }`}
      style={{
        animation: `fadeInUp 300ms ease-out both`,
        animationDelay: `${index * 60}ms`,
      }}
    >
      {/* Best deal badge */}
      {isBest && (
        <div className="bg-[#00E5FF] px-4 py-1.5 flex items-center justify-between">
          <span className="text-[#0D0D0D] text-[11px] font-bold tracking-wide uppercase">
            {bestDealBadgeLabel}
          </span>
          {savings > 0 && (
            <span className="text-[#0D0D0D] text-[11px] font-semibold">
              Save ₹{Math.round(savings).toLocaleString("en-IN")}
            </span>
          )}
        </div>
      )}

      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Store logo */}
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 shadow-sm"
            style={{ backgroundColor: store.storeColor + "15" }}
          >
            {store.storeLogo}
          </div>

          {/* Store info */}
          <div className="flex-1 min-w-0">
            <p
              className="text-xs font-semibold mb-0.5"
              style={{ color: store.storeColor }}
            >
              {store.storeName}
            </p>

            {/* Prices */}
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="text-[#0D0D0D] text-lg font-bold tabular-nums">
                ₹{Math.round(trueTotal).toLocaleString("en-IN")}
              </span>
              {hasCoupon && (
                <span className="text-[#6B6B6B] text-xs line-through tabular-nums">
                  ₹{Math.round(originalTotal).toLocaleString("en-IN")}
                </span>
              )}
              {savings > 0 && (
                <span className="text-[#00C853] text-xs font-semibold">
                  -{Math.round(savings).toLocaleString("en-IN")}
                </span>
              )}
            </div>

            {/* Shipping info */}
            <div className="flex items-center gap-1 mt-1">
              <Truck className="w-3 h-3 text-[#6B6B6B]" />
              <span className="text-[#6B6B6B] text-[11px]">
                {store.shippingCost === 0
                  ? "Free delivery"
                  : `+₹${store.shippingCost} delivery`}
              </span>
            </div>

            {/* Price breakdown (base) */}
            <p className="text-[#6B6B6B] text-[11px] mt-0.5">
              Base ₹{Math.round(store.basePrice).toLocaleString("en-IN")}
            </p>

            {/* Coupon */}
            {bestCoupon && (
              <div className="mt-2">
                <CouponTag coupon={bestCoupon} extra={extraCoupons} />
              </div>
            )}
          </div>

          {/* Buy Now CTA */}
          <div className="flex-shrink-0 self-center ml-1">
            <a
              href={store.deepLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-4 py-2.5 rounded-xl bg-[#FF4D00] text-white text-xs font-bold shadow-md shadow-orange-500/25 active:scale-95 transition-transform duration-100"
            >
              {buyNowLabel}
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Results Page ────────────────────────────────────────────────────────

export default function ResultsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { config, loading: configLoading } = useConfigurables();
  const query = searchParams.get("q") || "";
  const [searchInput, setSearchInput] = useState(query);
  const [loadingResults, setLoadingResults] = useState(true);
  const [results, setResults] = useState<StoreResult[]>([]);

  const buyNowLabel = config?.buyNowLabel || "Buy Now";
  const bestDealBadgeLabel = config?.bestDealBadgeLabel || "Best Deal";

  // Simulate async fetch with skeleton loading
  useEffect(() => {
    if (!query) return;
    setLoadingResults(true);
    const timer = setTimeout(() => {
      const raw = generateMockResults(query);
      // Sort by true total ascending
      const sorted = [...raw].sort((a, b) => getTrueTotal(a) - getTrueTotal(b));
      setResults(sorted);
      setLoadingResults(false);
    }, 1100);
    return () => clearTimeout(timer);
  }, [query]);

  function handleSearch(q: string) {
    const trimmed = q.trim();
    if (!trimmed) return;
    navigate(`/results?q=${encodeURIComponent(trimmed)}`);
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col">
      {/* Sticky header */}
      <div className="sticky top-0 z-20 bg-[#1A1A2E] px-4 pt-12 pb-4 shadow-lg">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/home")}
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 active:scale-95 transition-transform"
          >
            <ArrowLeft className="w-4 h-4 text-white" />
          </button>
          <div className="flex-1 flex items-center bg-white rounded-full px-4 py-2.5 gap-2 shadow">
            <Search className="w-4 h-4 text-[#FF4D00] flex-shrink-0" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch(searchInput);
              }}
              className="flex-1 bg-transparent outline-none text-[#0D0D0D] text-sm font-medium placeholder-[#6B6B6B]"
              placeholder="Search products, brands…"
            />
          </div>
          <button className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
            <SlidersHorizontal className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-24 px-4 pt-4">
        {/* Query heading */}
        {!loadingResults && results.length > 0 && (
          <div className="mb-4">
            <p className="text-[#6B6B6B] text-xs font-medium mb-0.5">
              {results.length} stores compared
            </p>
            <h2 className="text-[#0D0D0D] text-xl font-bold font-['Plus_Jakarta_Sans'] leading-snug">
              {query}
            </h2>
            <p className="text-[#6B6B6B] text-xs mt-1">
              Sorted by lowest true total price
            </p>
          </div>
        )}

        {loadingResults || configLoading ? (
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : results.length > 0 ? (
          <div className="space-y-3">
            {results.map((store, index) => (
              <StoreCard
                key={store.id}
                store={store}
                isBest={index === 0}
                index={index}
                buyNowLabel={buyNowLabel}
                bestDealBadgeLabel={bestDealBadgeLabel}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <span className="text-5xl mb-4">🔍</span>
            <p className="text-[#0D0D0D] font-semibold text-lg mb-1">No results found</p>
            <p className="text-[#6B6B6B] text-sm">Try a different search term</p>
          </div>
        )}
      </div>

      <BottomNav active="search" />

      {/* Keyframe animation style */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
