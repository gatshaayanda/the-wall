import { WallEmptyState, WallPage } from "@/components/WallPublicShell";

export default function Page() {
  return (
    <WallPage eyebrow="MARKET" title="PRODUCT DETAIL" intro="A market item should lead naturally from viewing to enquiry, order and collection.">
      <WallEmptyState label="MARKET" title="Product detail is ready for published supply" body="No catalogue item is being fabricated here. Published products will carry their real business relationship and next action." action="Back to Market" href="/market" />
    </WallPage>
  );
}
