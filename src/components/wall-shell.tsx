import Link from "next/link";

const links = [
  { href: "/events", label: "Events" },
  { href: "/discover", label: "Discover" },
  { href: "/market", label: "Market" },
  { href: "/opportunities", label: "Opportunities" },
];

export function WallHeader() {
  return (
    <header className="wallNav">
      <div className="wallContainer wallNavInner">
        <Link href="/" className="wallBrand" aria-label="The Wall home">
          <span className="wallBrandMark" aria-hidden="true">W</span>
          <span>THE WALL</span>
        </Link>
        <nav className="wallNavLinks" aria-label="Primary navigation">
          {links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
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
          {links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
          <Link href="/become-a-vendor">Become a vendor</Link>
          <Link href="/admin">Wall Control</Link>
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
      <section className="wallPageHero">
        <div className="wallContainer">
          <p className="wallEyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{intro}</p>
        </div>
      </section>
      <section className="wallPageBody">
        <div className="wallContainer">{children}</div>
      </section>
      <WallFooter />
    </main>
  );
}

export function WallEmpty({
  label,
  title,
  body,
  actions = [],
}: {
  label: string;
  title: string;
  body: string;
  actions?: { href: string; label: string; primary?: boolean }[];
}) {
  return (
    <div className="wallEmpty">
      <p className="wallEyebrow">{label}</p>
      <h2>{title}</h2>
      <p>{body}</p>
      {actions.length > 0 && (
        <div className="wallActions">
          {actions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className={action.primary ? "wallButton wallButtonPrimary" : "wallButton wallButtonSecondary"}
            >
              {action.label} →
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
