import { WallEmptyState, WallPage } from "@/components/WallPublicShell";

export default function Page() {
  return (
    <WallPage eyebrow="EVENTS" title="WHAT'S HAPPENING" intro="The event layer of The Wall is where experiences become discoverable — gatherings, programmes, launches and things worth making the trip for.">
      <WallEmptyState label="EVENTS" title="Nothing published yet" body="Live event listings will appear here when the Wall team publishes them. We are deliberately not inventing schedules, prices or lineups." action="Become a vendor" href="/become-a-vendor" />
    </WallPage>
  );
}
