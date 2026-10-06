import type { Metadata } from "next";
import { WallPage, WallEmpty } from "@/components/wall-shell";
import { WallContentGrid } from "@/components/wall-content-grid";
import { getPublishedContent } from "@/lib/wall-data";

export const metadata: Metadata = { title: "Discover", description: "Discover businesses, food, services and experiences around The Wall." };

export default async function DiscoverPage() {
  const items = await getPublishedContent("businesses");
  return <WallPage eyebrow="DISCOVER" title="Who's here." intro="Find the businesses, food, services and experiences that make The Wall useful beyond an event.">
    {items.length ? <><WallContentGrid type="businesses" items={items} /><p className="wallDemoNotice">Demo records are shown so the experience can be tested. They are not a verified live vendor directory.</p></> : <WallEmpty label="PUBLIC CATALOGUE" title="Nothing is published yet." body="Public discovery should reflect real businesses and offerings, not fake demo listings presented as Great Wall facts." actions={[{href:"/become-a-vendor",label:"Become a vendor",primary:true},{href:"/market",label:"Visit Market"}]} />}
  </WallPage>;
}
