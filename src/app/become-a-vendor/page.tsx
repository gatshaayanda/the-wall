import type { Metadata } from "next";
import { WallEmpty, WallPage } from "@/components/wall-shell";

export const metadata: Metadata = {
  title: "Become a Vendor",
  description: "Apply to sell or participate at The Wall.",
};

export default function BecomeAVendorPage() {
  return (
    <WallPage eyebrow="PARTICIPATE" title="Bring something to The Wall." intro="A simple route for businesses and people who want to sell, showcase, partner or participate.">
      <div className="wallInfoGrid">
        <article className="wallInfoCard"><span>01</span><h2>Tell us what you do</h2><p>Business or individual, category, products or services and how you want to participate.</p></article>
        <article className="wallInfoCard"><span>02</span><h2>Application review</h2><p>Applications move through a deliberate review instead of disappearing into an inbox.</p></article>
        <article className="wallInfoCard"><span>03</span><h2>Get active</h2><p>Approved participants can connect to events, market listings and relevant opportunities.</p></article>
      </div>
      <WallEmpty
        label="VENDOR APPLICATIONS"
        title="The application workflow is next."
        body="The public route is established now; the Firebase-backed application form and operator review will be connected once the Wall domain model and security rules are ready."
        actions={[{ href: "/discover", label: "See the public side", primary: true }, { href: "/admin", label: "Wall Control" }]}
      />
    </WallPage>
  );
}
