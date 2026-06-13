import { useState } from "react";
import { useNavigate } from "react-router";
import { MapPin, Bell, ChevronRight } from "lucide-react";
import { useConfigurables } from "~/modules/configurables";

type OnboardingStep = "location" | "notifications";

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { config, loading } = useConfigurables();
  const [step, setStep] = useState<OnboardingStep>("location");

  const appName = config?.appName || "DealRadar";
  const locationTitle = config?.onboardingLocationTitle || "Share your location";
  const locationBody =
    config?.onboardingLocationBody ||
    "We use it to show region-specific deals and accurate delivery estimates near you.";
  const notifTitle = config?.onboardingNotifTitle || "Never miss a deal";
  const notifBody =
    config?.onboardingNotifBody ||
    "Get instant alerts when prices drop on items you're watching.";
  const ctaLabel = config?.onboardingCtaLabel || "Allow";
  const skipLabel = config?.onboardingSkipLabel || "Maybe Later";

  function handleAllow() {
    if (step === "location") {
      setStep("notifications");
    } else {
      finishOnboarding();
    }
  }

  function handleSkip() {
    if (step === "location") {
      setStep("notifications");
    } else {
      finishOnboarding();
    }
  }

  function finishOnboarding() {
    if (typeof window !== "undefined") {
      localStorage.setItem("dealradar_onboarding_done", "true");
    }
    navigate("/home");
  }

  const isLocation = step === "location";

  return (
    <div className="min-h-screen bg-[#1A1A2E] flex flex-col overflow-hidden">
      {/* Progress dots */}
      <div className="flex items-center justify-center gap-2 pt-14 pb-0">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${
            isLocation ? "w-8 bg-[#FF4D00]" : "w-2 bg-white/30"
          }`}
        />
        <div
          className={`h-2 rounded-full transition-all duration-300 ${
            !isLocation ? "w-8 bg-[#FF4D00]" : "w-2 bg-white/30"
          }`}
        />
      </div>

      {/* Illustration area */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 pt-8 pb-4">
        {/* Icon ring */}
        <div className="relative mb-10">
          <div
            className={`w-36 h-36 rounded-full flex items-center justify-center transition-all duration-500 ${
              isLocation
                ? "bg-gradient-to-br from-blue-500/20 to-indigo-600/20"
                : "bg-gradient-to-br from-orange-500/20 to-red-600/20"
            }`}
          >
            <div
              className={`w-24 h-24 rounded-full flex items-center justify-center shadow-xl transition-all duration-500 ${
                isLocation
                  ? "bg-gradient-to-br from-blue-500 to-indigo-600 shadow-blue-500/30"
                  : "bg-gradient-to-br from-[#FF4D00] to-red-600 shadow-orange-500/30"
              }`}
            >
              {isLocation ? (
                <MapPin className="w-12 h-12 text-white" strokeWidth={1.5} />
              ) : (
                <Bell className="w-12 h-12 text-white" strokeWidth={1.5} />
              )}
            </div>
          </div>

          {/* Decorative pulse rings */}
          <div
            className={`absolute inset-0 rounded-full animate-ping opacity-10 ${
              isLocation ? "bg-blue-500" : "bg-[#FF4D00]"
            }`}
          />
        </div>

        {/* App name badge */}
        {!loading && (
          <div className="mb-6 px-4 py-1.5 rounded-full bg-white/10 border border-white/10">
            <span className="text-white/70 text-xs font-medium tracking-wider uppercase">
              {appName}
            </span>
          </div>
        )}

        {/* Text */}
        <h1 className="text-3xl font-bold text-white text-center leading-tight mb-4 font-['Plus_Jakarta_Sans']">
          {isLocation ? locationTitle : notifTitle}
        </h1>
        <p className="text-white/60 text-center text-base leading-relaxed max-w-xs">
          {isLocation ? locationBody : notifBody}
        </p>
      </div>

      {/* Actions */}
      <div className="px-6 pb-12 pt-2 flex flex-col items-center gap-4">
        <button
          onClick={handleAllow}
          className="w-full max-w-xs py-4 rounded-2xl bg-[#FF4D00] text-white font-semibold text-base flex items-center justify-center gap-2 shadow-lg shadow-orange-600/30 active:scale-95 transition-transform duration-100"
        >
          {ctaLabel}
          <ChevronRight className="w-5 h-5" />
        </button>
        <button
          onClick={handleSkip}
          className="text-white/40 text-sm font-medium py-2 hover:text-white/70 transition-colors"
        >
          {skipLabel}
        </button>
      </div>
    </div>
  );
}
