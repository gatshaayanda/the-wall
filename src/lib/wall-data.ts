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
  try {
    const snap = await wallAdminDb.collection(type).where("status", "==", "published").orderBy("title").get();
    return snap.docs.map((doc) => serialise(doc.data(), doc.id));
  } catch {
    return DEMO_CONTENT[type];
  }
}
