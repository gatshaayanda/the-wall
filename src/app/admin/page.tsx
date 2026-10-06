import Link from "next/link";
import { WallEmptyState, WallPage } from "@/components/WallPublicShell";

export default function WallControl() {
  return (
    <WallPage
      eyebrow="WALL CONTROL"
      title="RUN THE WALL."
      intro="The operator workspace will connect events, businesses, vendors, market activity, opportunities, applications and announcements in one place."
    >
      <WallEmptyState
        label="OPERATOR"
        title="The control room is being rebuilt for The Wall."
        body="The inherited BOEMO kitchen dashboard has been deliberately taken out of the public product path. Wall Control will be rebuilt around The Wall's real relationships instead of renamed food-ordering screens."
        action="Back to The Wall"
        href="/"
      />
      <section className="wallPillars">
        <div className="wallContainer">
          <div className="wallSectionHeading">
            <div><p className="wallEyebrow">NEXT OPERATING LAYER</p><h2>One place to see what needs attention.</h2></div>
            <p>Events · businesses · vendors · market · opportunities · applications · announcements.</p>
          </div>
          <div className="wallPillarGrid">
            {["Dashboard","Events","Businesses & Vendors","Market","Opportunities","Applications","Announcements"].map((item, index) => (
              <div className="wallPillar" key={item}><span>{String(index + 1).padStart(2,"0")}</span><small>WALL CONTROL</small><h3>{item}</h3><p>Operator workflow to be connected to the live domain model.</p></div>
            ))}
          </div>
        </div>
      </section>
    </WallPage>
  );
}
