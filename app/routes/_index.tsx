import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useConfigurables } from "~/modules/configurables";

export default function IndexPage() {
  const navigate = useNavigate();
  const { config, loading } = useConfigurables();

  useEffect(() => {
    if (loading) return;
    // Check if user has completed onboarding
    const onboardingDone =
      typeof window !== "undefined" &&
      localStorage.getItem("dealradar_onboarding_done") === "true";

    if (config?.showOnboarding !== false && !onboardingDone) {
      navigate("/onboarding");
    } else {
      navigate("/home");
    }
  }, [loading, config?.showOnboarding, navigate]);

  // Show a minimal splash while deciding route
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1A1A2E]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-[#FF4D00] flex items-center justify-center shadow-lg shadow-orange-500/30">
          <span className="text-3xl">📡</span>
        </div>
        <p className="text-white/60 text-sm font-medium tracking-wide">Loading DealRadar…</p>
      </div>
    </div>
  );
}
