import "server-only";

import { wallAdminDb } from "@/lib/firebase-admin";
import { DEMO_CONTENT, type WallCollection, type WallRecord } from "@/lib/wall-demo";

function serialise(data: FirebaseFirestore.DocumentData, id: string): WallRecord {
  return {
    id,
    title: String(data.title ?? ""),
    summary: String(data.summary ?? ""),
    category: String(data.category ?? "General"),
    status: data.status === "draft" || data.status === "archived" ? data.status : "published",
    demo: data.demo === true,
    cta: String(data.cta ?? "Explore"),
    meta: String(data.meta ?? ""),
    createdAt: data.createdAt?.toDate?.()?.toISOString?.(),
    updatedAt: data.updatedAt?.toDate?.()?.toISOString?.(),
  };
}

export async function getPublishedContent(type: WallCollection): Promise<WallRecord[]> {
  const baseline = new Map(DEMO_CONTENT[type].map((item) => [item.id, item]));
  try {
    const snap = await wallAdminDb.collection(type).orderBy("title").get();
    for (const doc of snap.docs) {
      const item = serialise(doc.data(), doc.id);
      if (item.status === "published") baseline.set(item.id, item);
      else baseline.delete(item.id);
    }
  } catch {
    // Keep the labelled demo baseline available when Firebase is not configured.
  }
  return [...baseline.values()].filter((item) => item.status === "published").sort((a, b) => a.title.localeCompare(b.title));
}
