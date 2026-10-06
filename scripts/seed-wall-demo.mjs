import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const raw = process.env.FIREBASE_ADMIN_KEY;
if (!raw) throw new Error("Set FIREBASE_ADMIN_KEY before running the seed.");
const key = JSON.parse(raw);
const app = getApps()[0] ?? initializeApp({ credential: cert({ projectId: key.project_id, clientEmail: key.client_email, privateKey: key.private_key.replace(/\\n/g, "\n") }) });
const db = getFirestore(app);

const content = {
  businesses: [
    ["demo-wall-kitchen", "Wall Kitchen", "A fictional food concept for testing business discovery and enquiry.", "Food", "Enquire", "Demo business · Food"],
    ["demo-wall-studio", "Wall Studio", "A fictional creative service profile for testing event appearances.", "Creative", "Enquire", "Demo business · Creative"],
    ["demo-wall-goods", "Wall Goods", "A fictional small retail brand for testing products under a business.", "Retail", "View products", "Demo business · Retail"],
  ],
  events: [
    ["demo-saturday-social", "Saturday Social — Demo", "A fictional lifestyle gathering for testing event discovery and participation.", "Lifestyle", "Explore event", "Demo event · Saturday"],
    ["demo-makers-day", "Makers Day — Demo", "A fictional market showcase connecting businesses, products and participation.", "Market", "Explore event", "Demo event · Market"],
  ],
  products: [
    ["demo-morogo-box", "Farm Table Box — Demo", "A fictional collection-ready product for the VIEW → ENQUIRE → ORDER → COLLECT path.", "Food", "Enquire", "Demo product · Collection"],
    ["demo-style-session", "Style Session — Demo", "A fictional service listing showing that Market can include services.", "Service", "Book", "Demo service · Appointment"],
    ["demo-market-bundle", "Wall Market Bundle — Demo", "A fictional retail bundle for testing operator-managed availability.", "Retail", "View", "Demo product · Retail"],
  ],
  opportunities: [
    ["demo-food-vendor", "Food Vendor Space — Demo", "A fictional participation opportunity demonstrating the review workflow.", "Vendor", "Apply", "Demo opportunity · Food"],
    ["demo-producer-partner", "Local Producer Partnership — Demo", "A fictional producer partnership route for testing applications.", "Partnership", "Apply", "Demo opportunity · Partnership"],
    ["demo-event-collab", "Event Collaboration — Demo", "A fictional collaboration route for creatives and experience partners.", "Experience", "Apply", "Demo opportunity · Experience"],
  ],
};

for (const [type, rows] of Object.entries(content)) {
  const batch = db.batch();
  for (const [id, title, summary, category, cta, meta] of rows) {
    batch.set(db.collection(type).doc(id), { title, summary, category, status: "published", demo: true, cta, meta, createdAt: new Date(), updatedAt: new Date() }, { merge: true });
  }
  await batch.commit();
  console.log("Seeded " + type + ": " + rows.length);
}
