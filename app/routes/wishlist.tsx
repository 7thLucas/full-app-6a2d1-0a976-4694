import { Heart } from "lucide-react";
import BottomNav from "~/components/BottomNav";
import { useConfigurables } from "~/modules/configurables";

export default function WishlistPage() {
  const { config } = useConfigurables();
  const appName = config?.appName || "DealRadar";

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col">
      {/* Header */}
      <div className="bg-[#1A1A2E] px-5 pt-14 pb-5">
        <p className="text-white/50 text-xs font-medium tracking-widest uppercase mb-1">
          {appName}
        </p>
        <h1 className="text-white text-2xl font-bold font-['Plus_Jakarta_Sans']">
          Wishlist
        </h1>
      </div>

      {/* Empty state */}
      <div className="flex-1 flex flex-col items-center justify-center pb-24 px-8 text-center">
        <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center mb-5">
          <Heart className="w-9 h-9 text-[#FF4D00]" strokeWidth={1.5} />
        </div>
        <h2 className="text-[#0D0D0D] text-lg font-semibold font-['Plus_Jakarta_Sans'] mb-2">
          No saved items yet
        </h2>
        <p className="text-[#6B6B6B] text-sm leading-relaxed">
          Save products you love and we'll alert you when prices drop.
        </p>
      </div>

      <BottomNav active="wishlist" />
    </div>
  );
}
