import "server-only";

import crypto from "node:crypto";
import { cookies } from "next/headers";
import { wallAdminDb } from "@/lib/firebase-admin";
import type { WallCollection, WallRecord } from "@/lib/wall-demo";

const COLLECTIONS = new Set<WallCollection>(["businesses", "events", "products", "opportunities"]);
const COOKIE = "the-wall-admin-session";

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
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
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
  const snap = await wallAdminDb.collection(type).orderBy("title").get();
  return snap.docs.map((doc) => ({ id: doc.id, ...(doc.data() as Omit<WallRecord, "id">) }));
}

export async function saveAdminContent(type: WallCollection, id: string | undefined, input: Omit<WallRecord, "id">) {
  const ref = id ? wallAdminDb.collection(type).doc(id) : wallAdminDb.collection(type).doc();
  const now = new Date();
  await ref.set({ ...input, updatedAt: now, ...(id ? {} : { createdAt: now }) }, { merge: true });
}

export async function deleteAdminContent(type: WallCollection, id: string) {
  await wallAdminDb.collection(type).doc(id).delete();
}
