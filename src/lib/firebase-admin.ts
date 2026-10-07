import "server-only";

import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

function parseServiceAccount(raw: string) {
  const candidates = [raw.trim()];
  if (candidates[0].startsWith("'") && candidates[0].endsWith("'")) {
    candidates.push(candidates[0].slice(1, -1));
  }

  for (const candidate of candidates) {
    try {
      return JSON.parse(candidate);
    } catch {
      const repaired = candidate.replace(
        /("private_key"\s*:\s*")([\s\S]*?)(")(\s*[,}])/,
        (_, prefix, key, suffix, tail) => prefix + key.replace(/\r?\n/g, "\\n") + suffix + tail,
      );
      try {
        return JSON.parse(repaired);
      } catch {
        // Try the next representation.
      }
    }
  }

  return null;
}

function getServiceAccount() {
  const raw = process.env.FIREBASE_ADMIN_KEY;
  if (!raw) return null;

  const parsed = parseServiceAccount(raw);
  if (!parsed) {
    console.warn("FIREBASE_ADMIN_KEY could not be parsed; Firebase Admin is unavailable.");
    return null;
  }

  if (!parsed.project_id || !parsed.client_email || !parsed.private_key) {
    console.warn("FIREBASE_ADMIN_KEY is missing required service-account fields; Firebase Admin is unavailable.");
    return null;
  }

  return {
    projectId: parsed.project_id,
    clientEmail: parsed.client_email,
    privateKey: String(parsed.private_key).replace(/\\n/g, "\n"),
  };
}

const serviceAccount = getServiceAccount();
const app = getApps()[0] ?? initializeApp(
  serviceAccount
    ? { credential: cert(serviceAccount) }
    : { projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "the-wall-ab746" },
);

export const wallAdminDb = getFirestore(app);
export const wallAdminAuth = getAuth(app);
