# Product Overview

## App Name
**ThriftFam**

## What It Is
A mobile e-commerce price comparison and deal finder app. Users search for any product and instantly see a ranked list of online stores (Amazon, Flipkart, and others) where it is available — each card showing the store's logo, true landed price (base price + shipping/delivery charge), active coupons with calculated discount values, and a prominent "Buy Now" deep link to complete the purchase in one tap.

## Target Users
Value-conscious, tech-savvy digital shoppers who buy online frequently and are tired of wasting time and money on market inefficiencies. The app removes the friction of tab-switching, coupon hunting, and hidden delivery-cost surprises at checkout. Three core segments:
- **Gen Z deal hunters** — budget-driven shoppers who refuse to overpay and will switch stores to save.
- **Busy working professionals** — want to skip manual comparison and trust one screen to surface the best deal instantly.
- **Niche hobbyists** — gamers, sneakerheads, and collectors tracking volatile price drops on high-value items.

## Core Screens

### 1. Home Screen
- Prominent search bar at the top — the primary entry point for the entire experience
- Camera/photo icon beside the search bar: tap to snap a photo or pick from gallery and search by image
- Grid of popular/trending product categories below for discovery without a specific search query

### 2. Results Screen
- Searched product displayed at the top for context
- Vertical list of result cards, one per retailer (e.g. Amazon, Flipkart)
- Each result card contains:
  - Product photo
  - Product name
  - Estimated delivery timer
  - Delivery fee (shown as a separate line)
  - Base product cost
  - Total cost (base + delivery − coupons applied)
  - Active coupons with calculated discount values
  - **"Buy Now"** button — deep link to the product page on that retailer
  - **"Save to Wishlist"** button — bookmarks the deal locally for later

### 3. Onboarding Flow (3 steps, first launch only)
1. **Notification permission screen** — value prop headline + native OS push notification prompt
2. **Camera permission screen** — explains photo search benefit + native OS camera/photo library prompt
3. **Benefits slide** — single screen showing ThriftFam's three core benefits with a "Get Started" CTA that leads directly to the Home screen; never shown again after first launch

## Positioning
The app sits at the intersection of price intelligence and coupon discovery for mobile-first shoppers. Its core value proposition is showing the true landed cost (product + shipping − applied coupons) across all major retailers in a single view, eliminating guesswork and tab-switching from the deal-hunting process.

## Brand & Tone
Utility-first, trustworthy, fast. Clean and information-dense without being cluttered. Users feel in control and informed, not overwhelmed.

## Strategic Principles
1. **Transparency first** — always surface how the total price is calculated (base + shipping − coupon)
2. **Speed is the product** — comparison results must load fast; latency erodes user trust
3. **Deep links are the revenue hook** — affiliate-style "Buy Now" links are the primary monetisation path
4. **Zero-effort comparison** — the user should never need to open a second app to validate a deal

## Scope (MVP)
Three screens: Home (search + trending categories), Results (store comparison cards), and Onboarding (location + push notification permissions). No user accounts, no payment processing, no inventory management — the app is a discovery and routing layer over existing retailer platforms.

## Post-MVP Roadmap

### Feature 1: Price Drop Alerts
Users can set a target price threshold on any product and receive a push notification the moment any tracked store's true landed price falls at or below that threshold. Supports tracking multiple products simultaneously. Alerts surface the winning store, the new price, and a one-tap deep link to buy immediately.

### Feature 2: Deal Feed & Flash Sales
A curated, real-time home feed of trending deals, limited-time flash sales, and category-specific hot picks. Feed updates continuously and surfaces time-remaining countdowns for flash sales. Users can filter the feed by category and save deals directly to their wishlist.

### Feature 3: Smart Wishlist with Price History
Users can save any product to a personal wishlist. Each wishlisted item displays a price history chart showing price highs and lows across all tracked stores over time, enabling shoppers to make informed decisions about the best time to buy.
