import type { Metadata } from "next";
import { WallEmpty, WallPage } from "@/components/wall-shell";

export const metadata: Metadata = {
  title: "My Wall",
  description: "Your bookings, saved experiences, followed businesses and Wall activity.",
};

export default function MyWallPage() {
  return (
    <WallPage eyebrow="YOUR WALL" title="Keep what matters." intro="My Wall will bring together the things you choose to keep — bookings, favourites, followed businesses, offers, saved experiences and visit history.">
      <WallEmpty
        label="PERSONAL SPACE"
        title="Sign-in is not needed to explore The Wall."
        body="When accounts are connected, My Wall becomes the place for persistent activity. Public browsing remains open without an account."
        actions={[{ href: "/events", label: "Explore events", primary: true }, { href: "/discover", label: "Discover" }]}
      />
    </WallPage>
  );
}
