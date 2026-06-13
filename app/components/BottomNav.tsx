import { useNavigate } from "react-router";
import { Home, Search, Heart, User } from "lucide-react";

type NavTab = "home" | "search" | "wishlist" | "profile";

interface BottomNavProps {
  active: NavTab;
}

export default function BottomNav({ active }: BottomNavProps) {
  const navigate = useNavigate();

  const tabs: { id: NavTab; label: string; icon: React.FC<{ className?: string }> ; route: string }[] = [
    { id: "home", label: "Home", icon: Home, route: "/home" },
    { id: "search", label: "Search", icon: Search, route: "/results?q=" },
    { id: "wishlist", label: "Wishlist", icon: Heart, route: "/wishlist" },
    { id: "profile", label: "Profile", icon: User, route: "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-[#E5E5E5]"
         style={{ boxShadow: "0 -2px 8px rgba(0,0,0,0.06)" }}>
      <div className="flex items-center justify-around px-2 py-2 pb-safe">
        {tabs.map((tab) => {
          const isActive = active === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => {
                if (tab.id === "search") {
                  navigate("/home");
                } else {
                  navigate(tab.route);
                }
              }}
              className="flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl transition-all"
            >
              <Icon
                className={`w-5 h-5 transition-colors ${
                  isActive ? "text-[#FF4D00]" : "text-[#6B6B6B]"
                }`}
              />
              <span
                className={`text-[10px] font-medium transition-colors ${
                  isActive ? "text-[#FF4D00]" : "text-[#6B6B6B]"
                }`}
              >
                {tab.label}
              </span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-[#FF4D00] mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
