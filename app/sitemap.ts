import type { MetadataRoute } from "next";
import { CHARA_TYPES, SITE_URL } from "@/lib/chara-types";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...CHARA_TYPES.map((t) => ({ url: `${SITE_URL}/r/${t.id}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
