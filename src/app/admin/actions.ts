"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { clearWallAdminSession, deleteAdminContent, isWallCollection, requireWallAdmin, saveAdminContent, setWallAdminSession } from "@/lib/wall-admin";

export async function loginWallAdmin(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  if (!process.env.WALL_ADMIN_PASSWORD || password !== process.env.WALL_ADMIN_PASSWORD) redirect("/admin?error=1");
  await setWallAdminSession();
  redirect("/admin");
}

export async function logoutWallAdmin() {
  await clearWallAdminSession();
  redirect("/admin");
}

export async function saveWallContent(formData: FormData) {
  await requireWallAdmin();
  const type = String(formData.get("type") ?? "");
  if (!isWallCollection(type)) throw new Error("Unknown content type.");
  const id = String(formData.get("id") ?? "").trim() || undefined;
  const input = {
    title: String(formData.get("title") ?? "").trim(),
    summary: String(formData.get("summary") ?? "").trim(),
    category: String(formData.get("category") ?? "General").trim(),
    status: String(formData.get("status") ?? "published") === "draft" ? "draft" as const : String(formData.get("status") ?? "published") === "archived" ? "archived" as const : "published" as const,
    demo: formData.get("demo") === "on",
    cta: String(formData.get("cta") ?? "Explore").trim(),
    meta: String(formData.get("meta") ?? "").trim(),
  };
  if (!input.title || !input.summary) throw new Error("Title and summary are required.");
  await saveAdminContent(type, id, input);
  revalidatePath("/");
  revalidatePath("/events");
  revalidatePath("/discover");
  revalidatePath("/market");
  revalidatePath("/opportunities");
  revalidatePath("/admin");
}

export async function deleteWallContent(formData: FormData) {
  await requireWallAdmin();
  const type = String(formData.get("type") ?? "");
  const id = String(formData.get("id") ?? "");
  if (!isWallCollection(type) || !id) throw new Error("Content and id are required.");
  await deleteAdminContent(type, id);
  revalidatePath("/");
  revalidatePath("/events");
  revalidatePath("/discover");
  revalidatePath("/market");
  revalidatePath("/opportunities");
  revalidatePath("/admin");
}
