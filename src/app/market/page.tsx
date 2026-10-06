import type { Metadata } from "next";
import { WallEmpty, WallPage } from "@/components/wall-shell";

export const metadata: Metadata = {
  title: "Wall Market",
  description: "Browse products and services available through The Wall.",
};

export default function MarketPage() {
  return (
    <WallPage eyebrow="MARKET" title="What can you get." intro="The Wall Market connects published products and services to simple next steps: view, enquire, order, collect.">
      <div className="wallFlow">
        {["VIEW", "ENQUIRE", "ORDER", "COLLECT"].map((step, index) => <div key={step}><span>0{index + 1}</span><strong>{step}</strong></div>)}
      </div>
      <WallEmpty
        label="MARKET"
        title="The market is being prepared."
        body="Products should only appear once a real business, product details and the operator's availability are ready. Delivery infrastructure is not required for the first release."
        actions={[{ href: "/discover", label: "Explore businesses", primary: true }, { href: "/opportunities", label: "See opportunities" }]}
      />
    </WallPage>
  );
}
