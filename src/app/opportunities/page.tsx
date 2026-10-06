import type { Metadata } from "next";
import { WallPage, WallEmpty } from "@/components/wall-shell";
import { WallContentGrid } from "@/components/wall-content-grid";
import { getPublishedContent } from "@/lib/wall-data";

export const metadata: Metadata = { title: "Opportunities", description: "Find ways to participate, partner and grow with The Wall." };

export default async function OpportunitiesPage() {
  const items = await getPublishedContent("opportunities");
  return <WallPage eyebrow="PARTICIPATION" title="What can you be part of." intro="The Wall connects people and businesses to practical opportunities — not just announcements.">
    {items.length ? <><WallContentGrid type="opportunities" items={items} /><p className="wallDemoNotice">Demo records are shown to exercise the application journey. They are not live opportunities.</p></> : <WallEmpty label="OPPORTUNITIES" title="No live opportunities are published yet." body="The operator workflow supports NEW → REVIEW → APPROVED → ACTIVE." actions={[{href:"/become-a-vendor",label:"Start with vendor participation",primary:true}]} />}
  </WallPage>;
}
