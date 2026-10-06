import "server-only";

import { wallAdminAuth, wallAdminDb } from "@/lib/firebase-admin";
import type { WallCollection, WallRecord } from "@/lib/wall-demo";

const COLLECTIONS = new Set<WallCollection>(["businesses", "events", "products", "opportunities"]);

export function isWallCollection(value: string): value is WallCollection {
  return COLLECTIONS.has(value as WallCollection);
}

export async function requireWallAdmin(request: Request) {
  const header = request.headers.get("authorization");
  const token = header?.replace(/^Bearer\s+/i, "");
  if (!token) throw new Error("UNAUTHENTICATED");

  const decoded = await wallAdminAuth.verifyIdToken(token);
  const allowlisted = (process.env.WALL_ADMIN_EMAILS ?? "")
    .split(",").map((email) => email.trim().toLowerCase()).filter(Boolean);

  if (decoded.admin !== true && (!decoded.email || !allowlisted.includes(decoded.email.toLowerCase()))) {
    throw new Error("FORBIDDEN");
  }
  return decoded;
}

export async function listAdminContent(type: WallCollection): Promise<WallRecord[]> {
  const snap = await wallAdminDb.collection(type).orderBy("title").get();
  return snap.docs.map((doc) => ({ id: doc.id, ...(doc.data() as Omit<WallRecord, "id">) }));
}

export async function saveAdminContent(type: WallCollection, id: string | undefined, input: Omit<WallRecord, "id">) {
  const ref = id ? wallAdminDb.collection(type).doc(id) : wallAdminDb.collection(type).doc();
  const now = new Date();
  await ref.set({ ...input, updatedAt: now, ...(id ? {} : { createdAt: now }) }, { merge: true });
  return ref.id;
}

export async function deleteAdminContent(type: WallCollection, id: string) {
  await wallAdminDb.collection(type).doc(id).delete();
}
