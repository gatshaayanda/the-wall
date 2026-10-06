import { WallEmptyState, WallPage } from "@/components/WallPublicShell";

export default function Page() {
  return (
    <WallPage eyebrow="BUSINESS" title="BUSINESS PROFILE" intro="A Wall business profile should work like a useful mini storefront: what it does, what is available, where to find it and what you can do next.">
      <WallEmptyState label="BUSINESS" title="Business profiles are waiting for published businesses" body="The profile model is intended to connect businesses to products, services and events rather than become a dead directory." action="Discover" href="/discover" />
    </WallPage>
  );
}
