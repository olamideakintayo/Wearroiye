import type { MetadataRoute } from "next";
import { variants } from "@/src/content/catalogue";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wearroiye.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    ...variants.map((variant) => ({
      url: `${baseUrl}/catalogue/${variant.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
