export type WallCollection = "businesses" | "events" | "products" | "opportunities";

export type WallRecord = {
  id: string;
  title: string;
  summary: string;
  category: string;
  status: "draft" | "published" | "archived";
  demo: boolean;
  cta: string;
  meta: string;
  createdAt?: string;
  updatedAt?: string;
};

export const DEMO_CONTENT: Record<WallCollection, WallRecord[]> = {
  businesses: [
    { id: "demo-wall-kitchen", title: "Wall Kitchen", summary: "A fictional food concept showing how a Wall business can publish an offer, connect to events and move customers toward enquiry or collection.", category: "Food", status: "published", demo: true, cta: "Enquire", meta: "Demo business · Food" },
    { id: "demo-wall-studio", title: "Wall Studio", summary: "A fictional creative service profile for testing the business discovery experience and event appearances.", category: "Creative", status: "published", demo: true, cta: "Enquire", meta: "Demo business · Creative" },
    { id: "demo-wall-goods", title: "Wall Goods", summary: "A fictional small retail brand showing how products can sit underneath a business profile.", category: "Retail", status: "published", demo: true, cta: "View products", meta: "Demo business · Retail" },
  ],
  events: [
    { id: "demo-saturday-social", title: "Saturday Social — Demo", summary: "A fictional lifestyle gathering used to demonstrate event discovery, vendor participation and booking flows.", category: "Lifestyle", status: "published", demo: true, cta: "Explore event", meta: "Demo event · Saturday" },
    { id: "demo-makers-day", title: "Makers Day — Demo", summary: "A fictional market and maker showcase used to demonstrate businesses, products and participation working together.", category: "Market", status: "published", demo: true, cta: "Explore event", meta: "Demo event · Market" },
  ],
  products: [
    { id: "demo-morogo-box", title: "Farm Table Box — Demo", summary: "A fictional collection-ready product showing the Wall Market VIEW → ENQUIRE → ORDER → COLLECT path.", category: "Food", status: "published", demo: true, cta: "Enquire", meta: "Demo product · Collection" },
    { id: "demo-style-session", title: "Style Session — Demo", summary: "A fictional service listing showing that Market can include services as well as physical products.", category: "Service", status: "published", demo: true, cta: "Book", meta: "Demo service · Appointment" },
    { id: "demo-market-bundle", title: "Wall Market Bundle — Demo", summary: "A fictional bundle for testing product cards and operator-managed availability.", category: "Retail", status: "published", demo: true, cta: "View", meta: "Demo product · Retail" },
  ],
  opportunities: [
    { id: "demo-food-vendor", title: "Food Vendor Space — Demo", summary: "A fictional participation opportunity demonstrating NEW → REVIEW → APPROVED → ACTIVE.", category: "Vendor", status: "published", demo: true, cta: "Apply", meta: "Demo opportunity · Food" },
    { id: "demo-producer-partner", title: "Local Producer Partnership — Demo", summary: "A fictional opportunity for a producer or small business to test partnership applications.", category: "Partnership", status: "published", demo: true, cta: "Apply", meta: "Demo opportunity · Partnership" },
    { id: "demo-event-collab", title: "Event Collaboration — Demo", summary: "A fictional collaboration route for creatives, services and experience partners.", category: "Experience", status: "published", demo: true, cta: "Apply", meta: "Demo opportunity · Experience" },
  ],
};

export const COLLECTION_LABELS: Record<WallCollection, string> = {
  businesses: "Businesses",
  events: "Events",
  products: "Market",
  opportunities: "Opportunities",
};
