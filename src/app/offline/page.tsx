import Link from "next/link";

export default function OfflinePage() {
  return (
    <main className="wallSite">
      <section className="wallPageHero">
        <div className="wallContainer">
          <p className="wallEyebrow">THE WALL · OFFLINE</p>
          <h1>Still here.</h1>
          <p>The public shell can remain available on this device where content has already been cached. Live information still needs a connection.</p>
        </div>
      </section>
      <section className="wallPageBody">
        <div className="wallContainer">
          <div className="wallEmpty">
            <p className="wallEyebrow">CONNECTION LOST</p>
            <h2>We&apos;ll reconnect when you do.</h2>
            <p>Cached public pages may still open. Private activity, new applications and other backend actions are not treated as confirmed until the Wall backend responds.</p>
            <div className="wallActions">
              <Link className="wallButton wallButtonPrimary" href="/">Back to The Wall →</Link>
              <Link className="wallButton wallButtonSecondary" href="/discover">Explore cached Discover →</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
