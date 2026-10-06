import "server-only";

import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

function getServiceAccount() {
  const raw = process.env.FIREBASE_ADMIN_KEY;
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    return {
      projectId: parsed.project_id,
      clientEmail: parsed.client_email,
      privateKey: String(parsed.private_key).replace(/\\n/g, "\n"),
    };
  } catch {
    throw new Error("FIREBASE_ADMIN_KEY is not valid JSON.");
  }
}

const serviceAccount = getServiceAccount();
const app = getApps()[0] ?? initializeApp(
  serviceAccount ? { credential: cert(serviceAccount) } : { projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "the-wall-ab746" },
);

export const wallAdminDb = getFirestore(app);
export const wallAdminAuth = getAuth(app);
