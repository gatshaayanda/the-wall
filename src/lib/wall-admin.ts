import "server-only";

import crypto from "node:crypto";
import { cookies } from "next/headers";
import { wallAdminDb } from "@/lib/firebase-admin";
import { DEMO_CONTENT, type WallCollection, type WallRecord } from "@/lib/wall-demo";

const COLLECTIONS = new Set<WallCollection>(["businesses", "events", "products", "opportunities"]);
const COOKIE = "the-wall-admin-session";
export const wallAdminPasswordConfigured = Boolean(process.env.WALL_ADMIN_PASSWORD);

export function isWallCollection(value: string): value is WallCollection {
  return COLLECTIONS.has(value as WallCollection);
}

function secret() {
  const value = process.env.WALL_ADMIN_PASSWORD;
  if (!value) throw new Error("WALL_ADMIN_PASSWORD is not configured.");
  return value;
}

function sign(payload: string) {
  return crypto.createHmac("sha256", secret()).update(payload).digest("hex");
}

function makeSession() {
  const payload = String(Date.now());
  return payload + "." + sign(payload);
}

function validSession(value?: string) {
  if (!value) return false;
  const [payload, signature] = value.split(".");
  if (!payload || !signature) return false;
  const age = Date.now() - Number(payload);
  if (!Number.isFinite(age) || age < 0 || age > 8 * 60 * 60 * 1000) return false;
  const expected = sign(payload);
  const actual = Buffer.from(signature);
  const target = Buffer.from(expected);
  return actual.length === target.length && crypto.timingSafeEqual(actual, target);
}

export async function isWallAdmin() {
  return validSession((await cookies()).get(COOKIE)?.value);
}

export async function setWallAdminSession() {
  (await cookies()).set(COOKIE, makeSession(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: 8 * 60 * 60,
  });
}

export async function clearWallAdminSession() {
  (await cookies()).delete(COOKIE);
}

export async function requireWallAdmin() {
  if (!(await isWallAdmin())) throw new Error("UNAUTHENTICATED");
}

export async function listAdminContent(type: WallCollection): Promise<WallRecord[]> {
  const records = new Map(DEMO_CONTENT[type].map((item) => [item.id, item]));
  try {
    const snap = await wallAdminDb.collection(type).orderBy("title").get();
    for (const doc of snap.docs) records.set(doc.id, { id: doc.id, ...(doc.data() as Omit<WallRecord, "id">) });
  } catch {
    // Demo baseline keeps Wall Control usable while Firebase is unavailable.
  }
  return [...records.values()].sort((a, b) => a.title.localeCompare(b.title));
}

export async function saveAdminContent(type: WallCollection, id: string | undefined, input: Omit<WallRecord, "id">) {
  const ref = id ? wallAdminDb.collection(type).doc(id) : wallAdminDb.collection(type).doc();
  const now = new Date();
  await ref.set({ ...input, updatedAt: now, ...(id ? {} : { createdAt: now }) }, { merge: true });
}

export async function deleteAdminContent(type: WallCollection, id: string) {
  const demo = DEMO_CONTENT[type].find((item) => item.id === id);
  if (demo) {
    await wallAdminDb.collection(type).doc(id).set({ ...demo, status: "archived", updatedAt: new Date() }, { merge: true });
    return "archived" as const;
  }
  await wallAdminDb.collection(type).doc(id).delete();
  return "deleted" as const;
}
