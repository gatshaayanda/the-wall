import type { Metadata } from "next";
import { WallEmpty, WallPage } from "@/components/wall-shell";

export const metadata: Metadata = { title: "My Wall", description: "Your personal Wall activity." };

export default function AccountPage() {
  return (
    <WallPage eyebrow="YOUR WALL" title="Your place in The Wall." intro="The old BOEMO customer account is not being carried into this product. My Wall will own the personal experience here.">
      <WallEmpty label="LEGACY ROUTE" title="Use My Wall." body="Bookings, favourites, followed businesses, offers, saved experiences and visit history belong in My Wall. Authentication will be connected when those real workflows are ready." actions={[{ href:"/my-wall",label:"Open My Wall",primary:true},{ href:"/discover",label:"Keep exploring"}]} />
    </WallPage>
  );
}
