import { WallEmptyState, WallPage } from "@/components/WallPublicShell";

export default function Page() {
  return (
    <WallPage eyebrow="MARKET" title="WHAT CAN YOU GET?" intro="Browse what is available around The Wall, then move from viewing to enquiry, order and collection.">
      <WallEmptyState label="MARKET" title="Market opening in stages" body="The first market release is designed around view → enquire → order → collect. No fake catalogue is shown before there is real supply." action="Become a vendor" href="/become-a-vendor" />
    </WallPage>
  );
}
