import type { Metadata } from "next";
import { WallEmpty, WallPage } from "@/components/wall-shell";
import { WallContentGrid } from "@/components/wall-content-grid";
import { getPublishedContent } from "@/lib/wall-data";

export const metadata: Metadata = { title: "Wall Market", description: "Browse products and services available through The Wall." };

export default async function MarketPage() {
  const items = await getPublishedContent("products");
  return <WallPage eyebrow="MARKET" title="What can you get." intro="The Wall Market connects published products and services to simple next steps: view, enquire, order, collect.">
    <div className="wallFlow">{["VIEW","ENQUIRE","ORDER","COLLECT"].map((step,index)=><div key={step}><span>{"0"+(index+1)}</span><strong>{step}</strong></div>)}</div>
    {items.length ? <><WallContentGrid type="products" items={items} /><p className="wallDemoNotice">Demo records are shown so the market flow can be tested. They are not live prices or availability.</p></> : <WallEmpty label="MARKET" title="The market is being prepared." body="Products should only appear once a real business, product details and operator availability are ready." actions={[{href:"/discover",label:"Explore businesses",primary:true},{href:"/opportunities",label:"See opportunities"}]} />}
  </WallPage>;
}
