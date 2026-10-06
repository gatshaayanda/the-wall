import type { Metadata } from "next";
import { WallPage, WallEmpty } from "@/components/wall-shell";
import { WallContentGrid } from "@/components/wall-content-grid";
import { getPublishedContent } from "@/lib/wall-data";

export const metadata: Metadata = { title: "Events", description: "Discover what's happening at The Wall." };

export default async function EventsPage() {
  const items = await getPublishedContent("events");
  return <WallPage eyebrow="EXPERIENCE" title="What's happening." intro="Events are one part of The Wall — a place to discover what is on, who is involved and what you can do next.">
    {items.length ? <><WallContentGrid type="events" items={items} /><p className="wallDemoNotice">Demo records are shown so the experience can be tested. They are not a live Great Wall calendar.</p></> : <WallEmpty label="EVENTS" title="No current events are published yet." body="Live dates and availability should come from Wall Control rather than invented placeholders." actions={[{ href:"/discover",label:"Explore Discover",primary:true},{href:"/become-a-vendor",label:"Become a vendor"}]} />}
  </WallPage>;
}
