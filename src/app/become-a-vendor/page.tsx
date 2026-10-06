import { WallEmptyState, WallPage } from "@/components/WallPublicShell";

export default function Page() {
  return (
    <WallPage eyebrow="PARTICIPATE" title="BRING SOMETHING TO THE WALL" intro="The Wall should make it clear how a business, maker, food seller, service provider or partner can get involved.">
      <WallEmptyState label="PARTICIPATE" title="Vendor applications are the next operating layer" body="The public route is ready for the application workflow. The operator side will eventually review, approve and activate participants in Wall Control." action="Back to Opportunities" href="/opportunities" />
    </WallPage>
  );
}
