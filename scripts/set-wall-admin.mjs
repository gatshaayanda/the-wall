import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const email = process.argv[2];
if (!email) throw new Error("Usage: node scripts/set-wall-admin.mjs admin@example.com");
const raw = process.env.FIREBASE_ADMIN_KEY;
if (!raw) throw new Error("Set FIREBASE_ADMIN_KEY before running this script.");
const key = JSON.parse(raw);
const app = getApps()[0] ?? initializeApp({ credential: cert({ projectId: key.project_id, clientEmail: key.client_email, privateKey: key.private_key.replace(/\\n/g, "\n") }) });
const auth = getAuth(app);
const user = await auth.getUserByEmail(email);
await auth.setCustomUserClaims(user.uid, { ...(user.customClaims ?? {}), admin: true });
console.log("Granted The Wall admin claim to " + email + ". Sign out/in again to refresh the ID token.");
