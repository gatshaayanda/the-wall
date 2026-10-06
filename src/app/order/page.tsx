import type { Metadata } from "next";
import { WallEmpty, WallPage } from "@/components/wall-shell";

export const metadata: Metadata = { title: "Market", description: "The Wall Market is being prepared." };

export default function OrderPage() {
  return (
    <WallPage eyebrow="MARKET" title="Not a BOEMO order page." intro="The Wall is not a renamed food-ordering app. Its market will support products and services across the wider ecosystem.">
      <WallEmpty label="LEGACY ROUTE" title="This old route has been reclaimed." body="The previous BOEMO ordering workflow is no longer part of The Wall's product model. Use Market for the future view → enquire → order → collect flow." actions={[{ href:"/market",label:"Open Wall Market",primary:true},{ href:"/",label:"Back to The Wall"}]} />
    </WallPage>
  );
}
