import Link from "next/link";

export default function OfflinePage() {
  return (
    <main className="wallSite">
      <section className="wallHero" style={{ minHeight: "100vh", display: "grid", alignItems: "center" }}>
        <div className="wallContainer">
          <p className="wallEyebrow">THE WALL · OFFLINE</p>
          <h1 style={{ maxWidth: 900 }}>YOU'RE<br /><em>OFF THE GRID.</em></h1>
          <p className="wallLead">The Wall can keep its public shell available on this device while your connection is away. Anything that needs the live network will wait until you reconnect.</p>
          <div className="wallActions">
            <Link href="/" className="wallButton wallButtonPrimary">Back to The Wall →</Link>
            <Link href="/events" className="wallButton wallButtonSecondary">Try Events →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
