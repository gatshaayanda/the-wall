import type { Metadata } from "next";
import { WallEmpty, WallPage } from "@/components/wall-shell";

export const metadata: Metadata = {
  title: "Opportunities",
  description: "Find ways to participate, partner and grow with The Wall.",
};

export default function OpportunitiesPage() {
  return (
    <WallPage eyebrow="PARTICIPATION" title="What can you be part of." intro="The Wall is designed to connect people and businesses to practical opportunities — not just publish announcements.">
      <div className="wallInfoGrid">
        <article className="wallInfoCard"><span>01</span><h2>Sell</h2><p>Food, produce, retail and services can have a clear route into participation.</p></article>
        <article className="wallInfoCard"><span>02</span><h2>Partner</h2><p>Spaces, experiences and collaborations can be published as real opportunities.</p></article>
        <article className="wallInfoCard"><span>03</span><h2>Grow</h2><p>Relevant farm and small-business opportunities can move from application to active participation.</p></article>
      </div>
      <WallEmpty
        label="OPPORTUNITIES"
        title="No live opportunities are published yet."
        body="The first operator workflow will support NEW → REVIEW → APPROVED → ACTIVE so participation can be managed instead of disappearing into a contact form."
        actions={[{ href: "/become-a-vendor", label: "Start with vendor participation", primary: true }]}
      />
    </WallPage>
  );
}
