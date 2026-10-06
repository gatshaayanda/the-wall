import Link from "next/link";

const nav = [
  ["Events", "/events"],
  ["Discover", "/discover"],
  ["Market", "/market"],
  ["Opportunities", "/opportunities"],
] as const;

export function WallHeader() {
  return (
    <header className="wallNav">
      <div className="wallContainer wallNavInner">
        <Link href="/" className="wallBrand" aria-label="The Wall home">
          <span className="wallBrandMark">W</span><span>THE WALL</span>
        </Link>
        <nav className="wallNavLinks" aria-label="Primary navigation">
          {nav.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
        </nav>
        <Link href="/my-wall" className="wallNavCta">My Wall</Link>
      </div>
    </header>
  );
}

export function WallFooter() {
  return (
    <footer className="wallFooter">
      <div className="wallContainer wallFooterInner">
        <div><strong>THE WALL</strong><span>Great Wall · Molepolole</span></div>
        <div className="wallFooterLinks">
          {nav.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
          <Link href="/become-a-vendor">Become a vendor</Link>
          <Link href="/my-wall">My Wall</Link>
        </div>
      </div>
    </footer>
  );
}

export function WallPage({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <main className="wallSite">
      <WallHeader />
      <section className="wallHero" style={{ padding: "64px 0 70px" }}>
        <div className="wallContainer">
          <p className="wallEyebrow">{eyebrow}</p>
          <h1 style={{ maxWidth: 980 }}>{title}</h1>
          <p className="wallLead" style={{ maxWidth: 760 }}>{intro}</p>
        </div>
      </section>
      {children}
      <WallFooter />
    </main>
  );
}

export function WallEmptyState({
  label,
  title,
  body,
  action,
  href,
}: {
  label: string;
  title: string;
  body: string;
  action?: string;
  href?: string;
}) {
  return (
    <section className="wallIntro">
      <div className="wallContainer">
        <div style={{ maxWidth: 760, borderTop: "1px solid var(--wall-line)", paddingTop: 28 }}>
          <p className="wallEyebrow">{label}</p>
          <h2 style={{ margin: 0, fontFamily: "Georgia, serif", fontSize: "clamp(2.5rem, 6vw, 5.5rem)", lineHeight: .92, letterSpacing: "-.045em" }}>{title}</h2>
          <p style={{ maxWidth: 650, color: "var(--wall-muted)", lineHeight: 1.75, fontSize: "1.05rem" }}>{body}</p>
          {action && href && <Link href={href} className="wallButton wallButtonPrimary">{action} →</Link>}
        </div>
      </div>
    </section>
  );
}
