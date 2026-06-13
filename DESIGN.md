# DealRadar — Design Guidelines

## Brand Identity
- **App Name**: DealRadar
- **Personality**: Bold, energetic, trustworthy — like a radar that locks onto deals the moment you search.

## Color Palette
- **Primary**: `#FF4D00` — electric orange-red. Used for CTAs ("Buy Now"), active states, highlights.
- **Secondary**: `#1A1A2E` — deep navy. Used for backgrounds, card surfaces in dark mode.
- **Accent**: `#00E5FF` — neon cyan. Used for badges, coupon tags, "Best Deal" indicators.
- **Surface / Light**: `#F5F5F5` — off-white. Card backgrounds in light mode.
- **Text Primary**: `#0D0D0D` (light mode) / `#F0F0F0` (dark mode).
- **Text Secondary**: `#6B6B6B` (light mode) / `#A0A0A0` (dark mode).
- **Success / Savings**: `#00C853` — green. Used for discount percentages and savings callouts.

## Typography
- **Display / Headings**: "Plus Jakarta Sans" — modern, geometric, great for bold product names.
- **Body / UI Labels**: "Inter" — clean, highly legible at small sizes.
- **Numeric (prices)**: Tabular figures enabled. Bold weight for prices, medium for labels.
- **Scale**:
  - H1: 28sp bold
  - H2: 22sp semibold
  - H3: 18sp semibold
  - Body: 14sp regular
  - Caption / Label: 12sp medium

## Elevation & Shadows
- Cards use soft shadows: `box-shadow: 0 2px 12px rgba(0,0,0,0.08)`.
- Bottom nav and sticky search bar use `0 -2px 8px rgba(0,0,0,0.06)`.
- No hard outlines — rely on shadow + surface color contrast.

## Component Guidelines

### Search Bar
- Full-width, rounded-pill shape (`border-radius: 999px`).
- Left icon: magnifying glass in `#FF4D00`.
- Placeholder: "Search products, brands…" in muted text.
- Focused state: subtle `#FF4D00` border glow.

### Category Grid (Home)
- 2-column or 3-column grid of rounded-square category cards.
- Each card: icon/emoji + category name + subtle gradient overlay.
- Tap state: scale-down micro-animation (0.96x).

### Store Cards (Results)
- Full-width card with `border-radius: 16px` and soft shadow.
- Left: store logo (48x48, rounded corners).
- Center: store name, base price, coupon tag (neon cyan pill), true total.
- Right: "Buy Now" button in `#FF4D00`, pill-shaped.
- Best deal card: thin `#00E5FF` border + "Best Deal" badge at top-right.
- Strikethrough on original price when coupon applied.

### Coupon Tags
- Pill shape, `background: #00E5FF`, dark text.
- Label: "SAVE ₹X" or "X% OFF".
- If multiple coupons, show the best one + a "+N more" chip.

### Onboarding
- Full-screen illustration per permission screen.
- Large icon centered, heading, 2-line explanation, and a primary CTA button.
- "Maybe Later" ghost text link below the CTA.

## Motion & Animation
- Screen transitions: shared-element or slide-up (300ms ease-out).
- Card entrance: stagger-fade from bottom (50ms delay between cards).
- Skeleton loaders: shimmer animation while results load.
- "Buy Now" press: ripple effect + brief scale-down (0.95x, 100ms).

## Platform
- Mobile-first. Designed for iOS and Android form factors.
- React Native / Expo layout conventions.
- Safe area insets respected on all screens.
- Bottom tab bar with: Home, Search (active on Results), Wishlist, Profile.
