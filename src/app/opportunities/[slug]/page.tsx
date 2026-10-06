import { WallEmptyState, WallPage } from "@/components/WallPublicShell";

export default function Page() {
  return (
    <WallPage eyebrow="OPPORTUNITY" title="OPPORTUNITY DETAIL" intro="A published opportunity should explain what is available, who it is for and how participation works.">
      <WallEmptyState label="OPPORTUNITY" title="Opportunity detail is ready for published opportunities" body="Applications will connect people or businesses to the opportunity and, when approved, to active participation." action="See opportunities" href="/opportunities" />
    </WallPage>
  );
}
