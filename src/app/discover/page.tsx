import { WallEmptyState, WallPage } from "@/components/WallPublicShell";

export default function Page() {
  return (
    <WallPage eyebrow="DISCOVER" title="WHO'S HERE" intro="Find the businesses, food, services, experiences and people that make The Wall more than a venue.">
      <WallEmptyState label="DISCOVER" title="The network is being built" body="Business and experience profiles will become the useful layer behind events and the market — with real contact, availability and actions." action="See opportunities" href="/opportunities" />
    </WallPage>
  );
}
