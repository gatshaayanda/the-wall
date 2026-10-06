import type { Metadata } from "next";
import { WallEmpty, WallPage } from "@/components/wall-shell";

export const metadata: Metadata = {
  title: "Events",
  description: "Discover what's happening at The Wall.",
};

export default function EventsPage() {
  return (
    <WallPage eyebrow="EXPERIENCE" title="What's happening." intro="Events are one part of The Wall — a place to discover what is on, who is involved and what you can do next.">
      <WallEmpty
        label="EVENTS"
        title="No current events are published yet."
        body="The Wall is ready for an event calendar, but live dates, lineups, ticket prices and availability should come from Wall Control rather than invented placeholders."
        actions={[
          { href: "/discover", label: "Explore Discover", primary: true },
          { href: "/become-a-vendor", label: "Become a vendor" },
        ]}
      />
    </WallPage>
  );
}
