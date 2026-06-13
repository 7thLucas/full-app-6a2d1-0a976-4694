import { User, Bell, MapPin, Shield, ChevronRight } from "lucide-react";
import BottomNav from "~/components/BottomNav";
import { useConfigurables } from "~/modules/configurables";

export default function ProfilePage() {
  const { config } = useConfigurables();
  const appName = config?.appName || "DealRadar";

  const menuItems = [
    { icon: Bell, label: "Price Drop Alerts", sub: "Manage notifications" },
    { icon: MapPin, label: "Location", sub: "Update your region" },
    { icon: Shield, label: "Privacy", sub: "Data & permissions" },
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col">
      {/* Header */}
      <div className="bg-[#1A1A2E] px-5 pt-14 pb-8">
        <p className="text-white/50 text-xs font-medium tracking-widest uppercase mb-1">
          {appName}
        </p>
        <div className="flex items-center gap-4 mt-4">
          <div className="w-16 h-16 rounded-2xl bg-[#FF4D00]/20 flex items-center justify-center">
            <User className="w-8 h-8 text-[#FF4D00]" strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="text-white text-lg font-bold font-['Plus_Jakarta_Sans']">
              Guest User
            </h2>
            <p className="text-white/50 text-sm">Sign in to save deals</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="flex-1 px-4 pt-5 pb-24 space-y-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className="w-full bg-white rounded-2xl px-4 py-4 flex items-center gap-3 shadow-sm active:scale-[0.99] transition-transform"
            >
              <div className="w-10 h-10 rounded-xl bg-[#F5F5F5] flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-[#FF4D00]" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-[#0D0D0D] text-sm font-semibold">{item.label}</p>
                <p className="text-[#6B6B6B] text-xs">{item.sub}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-[#6B6B6B]" />
            </button>
          );
        })}
      </div>

      <BottomNav active="profile" />
    </div>
  );
}
