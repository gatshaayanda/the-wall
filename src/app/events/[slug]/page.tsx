import { WallEmptyState, WallPage } from "@/components/WallPublicShell";

export default function Page() {
  return (
    <WallPage eyebrow="EVENT" title="EVENT DETAIL" intro="A published event will connect its date, place, programme, participating vendors and your next action.">
      <WallEmptyState label="EVENT" title="Event detail is ready for published content" body="No live event has been published into this environment yet. Once one is, this route can carry booking, updates and saved state without inventing facts." action="See all events" href="/events" />
    </WallPage>
  );
}
