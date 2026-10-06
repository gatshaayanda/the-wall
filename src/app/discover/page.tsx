import type { Metadata } from "next";
import { WallEmpty, WallPage } from "@/components/wall-shell";

export const metadata: Metadata = {
  title: "Discover",
  description: "Discover businesses, food, services and experiences around The Wall.",
};

export default function DiscoverPage() {
  return (
    <WallPage eyebrow="DISCOVER" title="Who's here." intro="Find the businesses, food, services and experiences that make The Wall useful beyond an event.">
      <div className="wallInfoGrid">
        <article className="wallInfoCard"><span>01</span><h2>Businesses</h2><p>Profiles will become useful storefronts with services, products, contact details and appearances.</p></article>
        <article className="wallInfoCard"><span>02</span><h2>Experiences</h2><p>Discover what you can do, not just a list of names.</p></article>
        <article className="wallInfoCard"><span>03</span><h2>Food & services</h2><p>Browse published offerings and move naturally into enquiry, booking or collection.</p></article>
      </div>
      <WallEmpty
        label="PUBLIC CATALOGUE"
        title="Nothing is published yet."
        body="That is deliberate. Public discovery should reflect real businesses and offerings, not fake demo listings presented as Great Wall facts."
        actions={[{ href: "/become-a-vendor", label: "Become a vendor", primary: true }, { href: "/market", label: "Visit Market" }]}
      />
    </WallPage>
  );
}
