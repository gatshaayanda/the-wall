import type { Metadata } from "next";
import { WallEmpty, WallPage } from "@/components/wall-shell";

export const metadata: Metadata = {
  title: "Wall Control",
  description: "Operator workspace for The Wall.",
};

export default function AdminPage() {
  return (
    <WallPage eyebrow="WALL CONTROL" title="Run the ecosystem." intro="Wall Control will be the operational centre for events, businesses, vendors, market activity, opportunities, applications and announcements.">
      <div className="wallInfoGrid">
        <article className="wallInfoCard"><span>01</span><h2>Publish</h2><p>Events, businesses, products, opportunities and announcements become the source of truth for the public experience.</p></article>
        <article className="wallInfoCard"><span>02</span><h2>Coordinate</h2><p>Connect vendors to events, businesses to products and applications to participation.</p></article>
        <article className="wallInfoCard"><span>03</span><h2>Operate</h2><p>See what is happening, what needs attention and who is participating.</p></article>
      </div>
      <WallEmpty label="OPERATOR WORKSPACE" title="The old BOEMO kitchen console is no longer the product." body="This route has been reclaimed for The Wall. The Firebase-backed Wall Control modules will be built around the new domain model instead of carrying the inherited menu and order system forward." actions={[{ href:"/", label:"View public Wall", primary:true }, { href:"/become-a-vendor", label:"View participation"}]} />
    </WallPage>
  );
}
