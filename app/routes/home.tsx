import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { Search, TrendingUp, Heart, User } from "lucide-react";
import { useConfigurables } from "~/modules/configurables";
import BottomNav from "~/components/BottomNav";

export default function HomePage() {
  const navigate = useNavigate();
  const { config, loading } = useConfigurables();
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const appName = config?.appName || "DealRadar";
  const placeholder = config?.searchPlaceholder || "Search products, brands…";
  const categories = config?.categories?.length
    ? config.categories
    : [
        { name: "Electronics", emoji: "📱", gradient: "from-blue-500 to-indigo-600" },
        { name: "Sneakers", emoji: "👟", gradient: "from-orange-400 to-red-500" },
        { name: "Gaming", emoji: "🎮", gradient: "from-violet-500 to-purple-700" },
        { name: "Fashion", emoji: "👗", gradient: "from-pink-400 to-rose-500" },
        { name: "Beauty", emoji: "💄", gradient: "from-fuchsia-400 to-pink-600" },
        { name: "Home", emoji: "🏠", gradient: "from-emerald-400 to-teal-600" },
        { name: "Books", emoji: "📚", gradient: "from-amber-400 to-orange-500" },
        { name: "Sports", emoji: "⚽", gradient: "from-green-400 to-emerald-600" },
        { name: "Toys", emoji: "🧸", gradient: "from-yellow-400 to-amber-500" },
      ];

  const trendingSearches = config?.trendingSearches?.length
    ? config.trendingSearches
    : ["iPhone 15", "Nike Air Max", "PS5 Controller", "MacBook Air M3"];

  function handleSearch(searchQuery: string) {
    const q = searchQuery.trim();
    if (!q) return;
    navigate(`/results?q=${encodeURIComponent(q)}`);
  }

  function handleCategoryTap(catName: string) {
    navigate(`/results?q=${encodeURIComponent(catName)}`);
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col">
      {/* Header */}
      <div className="bg-[#1A1A2E] px-5 pt-14 pb-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            {!loading && (
              <>
                <p className="text-white/50 text-xs font-medium tracking-widest uppercase">
                  {appName}
                </p>
                <h1 className="text-white text-2xl font-bold font-['Plus_Jakarta_Sans'] mt-0.5">
                  Find the best deal
                </h1>
              </>
            )}
          </div>
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
            <User className="w-5 h-5 text-white/60" />
          </div>
        </div>

        {/* Search Bar */}
        <div
          className={`flex items-center bg-white rounded-full px-4 py-3 gap-3 transition-all duration-200 ${
            focused ? "shadow-lg shadow-orange-500/20 ring-2 ring-[#FF4D00]" : "shadow-md"
          }`}
        >
          <Search className="w-5 h-5 text-[#FF4D00] flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch(query);
            }}
            placeholder={placeholder}
            className="flex-1 bg-transparent outline-none text-[#0D0D0D] placeholder-[#6B6B6B] text-sm font-medium"
          />
          {query.length > 0 && (
            <button
              onClick={() => handleSearch(query)}
              className="bg-[#FF4D00] text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-transform active:scale-95"
            >
              Go
            </button>
          )}
        </div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto pb-24">
        {/* Trending searches */}
        <div className="px-5 pt-5 pb-3">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-[#FF4D00]" />
            <span className="text-[#0D0D0D] text-sm font-semibold">Trending now</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {trendingSearches.map((term) => (
              <button
                key={term}
                onClick={() => handleSearch(term)}
                className="px-3 py-1.5 rounded-full bg-white border border-[#E5E5E5] text-[#0D0D0D] text-xs font-medium shadow-sm hover:border-[#FF4D00] hover:text-[#FF4D00] transition-colors active:scale-95"
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        {/* Categories section */}
        <div className="px-5 pt-4">
          <h2 className="text-[#0D0D0D] text-base font-semibold mb-4 font-['Plus_Jakarta_Sans']">
            Browse Categories
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {categories.map((cat, index) => (
              <CategoryCard
                key={cat.name}
                name={cat.name}
                emoji={cat.emoji}
                gradient={cat.gradient}
                delay={index * 50}
                onTap={() => handleCategoryTap(cat.name)}
              />
            ))}
          </div>
        </div>
      </div>

      <BottomNav active="home" />
    </div>
  );
}

function CategoryCard({
  name,
  emoji,
  gradient,
  delay,
  onTap,
}: {
  name: string;
  emoji: string;
  gradient: string;
  delay: number;
  onTap: () => void;
}) {
  const [pressed, setPressed] = useState(false);

  return (
    <button
      onClick={onTap}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      style={{
        animationDelay: `${delay}ms`,
        transform: pressed ? "scale(0.96)" : "scale(1)",
        transition: "transform 100ms ease",
      }}
      className="relative rounded-2xl overflow-hidden aspect-square shadow-sm"
    >
      {/* Gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-90`} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full gap-1.5 p-2">
        <span className="text-2xl">{emoji}</span>
        <span className="text-white text-xs font-semibold text-center leading-tight drop-shadow">
          {name}
        </span>
      </div>
    </button>
  );
}
