import Link from "next/link";

const pillars = [
  { label: "EXPERIENCE", title: "What's happening", body: "Events, gatherings and things worth coming to.", href: "/events" },
  { label: "DISCOVER", title: "Who's here", body: "Businesses, food, services and people building around The Wall.", href: "/discover" },
  { label: "MARKET", title: "What you can get", body: "Local products and services — view, enquire, order, collect.", href: "/market" },
  { label: "OPPORTUNITIES", title: "What you can be part of", body: "Ways to sell, partner, participate and grow with The Wall.", href: "/opportunities" },
];

const actions = [
  ["Explore events", "/events"],
  ["Discover businesses", "/discover"],
  ["Visit the market", "/market"],
  ["My Wall", "/my-wall"],
];

export default function Home() {
  return (
    <main className="wallSite">
      <header className="wallNav">
        <div className="wallContainer wallNavInner">
          <Link href="/" className="wallBrand" aria-label="The Wall home">
            <span className="wallBrandMark">W</span><span>THE WALL</span>
          </Link>
          <nav className="wallNavLinks" aria-label="Primary navigation">
            <Link href="/events">Events</Link><Link href="/discover">Discover</Link><Link href="/market">Market</Link><Link href="/opportunities">Opportunities</Link>
          </nav>
          <Link href="/my-wall" className="wallNavCta">My Wall</Link>
        </div>
      </header>

      <section className="wallHero">
        <div className="wallContainer wallHeroGrid">
          <div className="wallHeroCopy">
            <p className="wallEyebrow">GREAT WALL · MOLEPOLOLE</p>
            <h1>COME TO<br /><em>THE WALL.</em></h1>
            <p className="wallLead">A living destination for experiences, businesses, food, events and opportunities. Find something happening. Find someone building. Find your reason to come.</p>
            <div className="wallActions">
              {actions.map(([label, href], index) => <Link key={href} href={href} className={index === 0 ? "wallButton wallButtonPrimary" : "wallButton wallButtonSecondary"}>{label} →</Link>)}
            </div>
          </div>
          <div className="wallHeroPanel">
            <span className="wallPanelLabel">THE WALL</span>
            <strong>More than a venue.</strong>
            <p>One place where an event can lead you to a vendor, a vendor to a business, a business to a product, and an opportunity to a new participant.</p>
            <div className="wallSignal"><span>01</span><span>EXPERIENCE</span><span>02</span><span>DISCOVER</span><span>03</span><span>PARTICIPATE</span></div>
          </div>
        </div>
      </section>

      <section className="wallIntro">
        <div className="wallContainer wallIntroGrid">
          <div><p className="wallEyebrow">WHAT IS THE WALL?</p><h2>A place you can keep coming back to.</h2></div>
          <p>The Wall is being built as a digital front door to the Great Wall experience — not just a calendar and not just a directory. The useful part is the connection between what is happening, who is involved, what is available and what you can do next.</p>
        </div>
      </section>

      <section className="wallPillars">
        <div className="wallContainer">
          <div className="wallSectionHeading"><div><p className="wallEyebrow">THE ECOSYSTEM</p><h2>There is always another door.</h2></div><p>Start anywhere. The Wall should help you find the next thing.</p></div>
          <div className="wallPillarGrid">
            {pillars.map((pillar, index) => <Link href={pillar.href} key={pillar.label} className="wallPillar"><span>0{index + 1}</span><small>{pillar.label}</small><h3>{pillar.title}</h3><p>{pillar.body}</p><b>Explore →</b></Link>)}
          </div>
        </div>
      </section>

      <section className="wallReturn">
        <div className="wallContainer wallReturnGrid">
          <div><p className="wallEyebrow">YOUR WALL</p><h2>Keep the things that matter to you.</h2><p>Bookings, saved experiences, followed businesses, offers and your history — together in My Wall.</p></div>
          <Link href="/my-wall" className="wallButton wallButtonPrimary">Open My Wall →</Link>
        </div>
      </section>

      <footer className="wallFooter">
        <div className="wallContainer wallFooterInner">
          <div><strong>THE WALL</strong><span>Great Wall · Molepolole</span></div>
          <div className="wallFooterLinks"><Link href="/events">Events</Link><Link href="/discover">Discover</Link><Link href="/market">Market</Link><Link href="/become-a-vendor">Become a vendor</Link><Link href="/admin">Wall Control</Link></div>
        </div>
      </footer>
    </main>
  );
}