import Link from "next/link";
import type { WallCollection, WallRecord } from "@/lib/wall-demo";

export function WallContentGrid({ type, items }: { type: WallCollection; items: WallRecord[] }) {
  const href = type === "businesses" ? "/discover" : type === "events" ? "/events" : type === "products" ? "/market" : "/opportunities";
  return (
    <div className="wallContentGrid">
      {items.map((item) => (
        <article className="wallContentCard" id={item.id} key={item.id}>
          <div className="wallContentCardTop"><span>{item.category}</span>{item.demo && <b>DEMO</b>}</div>
          <h2>{item.title}</h2>
          <p>{item.summary}</p>
          <div className="wallContentCardBottom"><small>{item.meta}</small><Link href={href}>{item.cta} →</Link></div>
        </article>
      ))}
    </div>
  );
}
