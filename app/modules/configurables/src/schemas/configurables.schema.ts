/* START: THIS SECTION CODE IS CANNOT BE CHANGED, YOU ONLY READ IT */
export interface FieldSchemaType {
  fieldName?: string;
  type:
    | "string"
    | "number"
    | "boolean"
    | "object"
    | "array"
    | "color"
    | "url"
    | "enum"
    | "datetime"
    | "file"
    | "files";
  required?: boolean;
  label?: string;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  options?: string[];
  fields?: FieldSchemaType[];
  item?: FieldSchemaType;
}
/* END: THIS SECTION CODE IS CANNOT BE CHANGED, YOU ONLY READ IT */

export type ConfigurableSchemas = {
  formSchema: FieldSchemaType[];
};

export const configurableSchemas: ConfigurableSchemas = {
  formSchema: [
    {
      fieldName: "appName",
      type: "string",
      required: true,
      label: "App Name",
    },
    {
      fieldName: "appTagline",
      type: "string",
      required: false,
      label: "App Tagline",
      maxLength: 120,
    },
    {
      fieldName: "logoUrl",
      type: "url",
      required: true,
      label: "Logo URL",
    },
    {
      fieldName: "brandColor",
      type: "object",
      required: true,
      label: "Brand Color",
      fields: [
        {
          fieldName: "primary",
          type: "color",
          required: true,
          label: "Primary",
        },
        {
          fieldName: "secondary",
          type: "color",
          required: true,
          label: "Secondary",
        },
        {
          fieldName: "accent",
          type: "color",
          required: true,
          label: "Accent",
        },
      ],
    },
    {
      fieldName: "searchPlaceholder",
      type: "string",
      required: false,
      label: "Search Bar Placeholder",
      maxLength: 80,
    },
    {
      fieldName: "categories",
      type: "array",
      label: "Product Categories",
      item: {
        type: "object",
        fields: [
          { fieldName: "name", type: "string", required: true, label: "Name" },
          { fieldName: "emoji", type: "string", required: true, label: "Emoji Icon" },
          { fieldName: "gradient", type: "string", required: false, label: "Gradient CSS (e.g. from-orange-400 to-red-500)" },
        ],
      },
    },
    {
      fieldName: "onboardingLocationTitle",
      type: "string",
      required: false,
      label: "Onboarding: Location Permission Title",
    },
    {
      fieldName: "onboardingLocationBody",
      type: "string",
      required: false,
      label: "Onboarding: Location Permission Body",
    },
    {
      fieldName: "onboardingNotifTitle",
      type: "string",
      required: false,
      label: "Onboarding: Notification Permission Title",
    },
    {
      fieldName: "onboardingNotifBody",
      type: "string",
      required: false,
      label: "Onboarding: Notification Permission Body",
    },
    {
      fieldName: "onboardingCtaLabel",
      type: "string",
      required: false,
      label: "Onboarding: CTA Button Label",
    },
    {
      fieldName: "onboardingSkipLabel",
      type: "string",
      required: false,
      label: "Onboarding: Skip Link Label",
    },
    {
      fieldName: "buyNowLabel",
      type: "string",
      required: false,
      label: "Results: Buy Now Button Label",
    },
    {
      fieldName: "bestDealBadgeLabel",
      type: "string",
      required: false,
      label: "Results: Best Deal Badge Label",
    },
    {
      fieldName: "resultsSortDefault",
      type: "enum",
      required: false,
      label: "Results: Default Sort Order",
      options: ["price-asc", "price-desc", "savings-desc"],
    },
    {
      fieldName: "showOnboarding",
      type: "boolean",
      required: false,
      label: "Show Onboarding on First Launch",
    },
    {
      fieldName: "trendingSearches",
      type: "array",
      label: "Trending Searches",
      item: { type: "string", required: true },
    },
  ],
};
