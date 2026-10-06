import type { Metadata } from "next";
import { WallEmpty, WallPage } from "@/components/wall-shell";

export const metadata: Metadata = { title: "Activity", description: "The Wall activity." };

export default function LegacyOrderPage() {
  return (
    <WallPage eyebrow="MY WALL" title="That tracking route is no longer used." intro="The Wall will use activity-specific references for bookings, applications and market orders instead of inheriting BOEMO's food-order tracking model.">
      <WallEmpty label="LEGACY ROUTE" title="Nothing is being tracked here." body="Once The Wall's domain model is connected, each activity will have the right private state and reference without exposing unrelated data." actions={[{ href:"/my-wall",label:"Open My Wall",primary:true},{ href:"/market",label:"Visit Market"}]} />
    </WallPage>
  );
}
