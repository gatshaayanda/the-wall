import { WallEmptyState, WallPage } from "@/components/WallPublicShell";

export default function Page() {
  return (
    <WallPage eyebrow="OPPORTUNITIES" title="WHAT CAN YOU BE PART OF?" intro="A route into The Wall for people and businesses looking to sell, partner, provide services, use space or participate.">
      <WallEmptyState label="OPPORTUNITIES" title="Opportunities will be published here" body="Applications will move through NEW → REVIEW → APPROVED → ACTIVE, so participation has a clear path instead of disappearing into a contact form." action="Become a vendor" href="/become-a-vendor" />
    </WallPage>
  );
}
