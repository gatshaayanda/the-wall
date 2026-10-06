import type { Metadata } from "next";
import { WallEmpty, WallPage } from "@/components/wall-shell";
import { COLLECTION_LABELS, type WallCollection } from "@/lib/wall-demo";
import { isWallAdmin, listAdminContent } from "@/lib/wall-admin";
import { loginWallAdmin, logoutWallAdmin, saveWallContent, deleteWallContent } from "./actions";

export const metadata: Metadata = { title: "Wall Control", description: "Operator workspace for The Wall.", robots: { index: false, follow: false } };

const collections: WallCollection[] = ["businesses", "events", "products", "opportunities"];

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const params = await searchParams;
  const authenticated = await isWallAdmin();

  return (
    <WallPage eyebrow="WALL CONTROL" title="Run the ecosystem." intro="Publish the content that makes the public Wall useful. Demo records are deliberately marked so they can be replaced without being mistaken for live Great Wall facts.">
      {!authenticated ? (
        <section className="wallAdminGate">
          <p className="wallEyebrow">OPERATOR ACCESS</p>
          <h2>Sign in to manage The Wall.</h2>
          <p>Use the Wall Control passphrase configured for this deployment. This is an operator boundary, not public visitor authentication.</p>
          <form className="wallAdminForm" action={loginWallAdmin}>
            <label>Passphrase<input name="password" type="password" autoComplete="current-password" required /></label>
            <button className="wallButton wallButtonPrimary" type="submit">Open Wall Control</button>
          </form>
          {params.error && <p className="wallAdminMessage">That passphrase was not accepted.</p>}
        </section>
      ) : (
        <div className="wallAdminConsole">
          <div className="wallAdminTop">
            <div><p className="wallEyebrow">OPERATOR WORKSPACE</p><h2>Seeded content, under control.</h2><p>Create, edit, publish, archive or delete the records used by the public experience.</p></div>
            <form action={logoutWallAdmin}><button className="wallButton wallButtonSecondary">Sign out</button></form>
          </div>
          <div className="wallAdminTabs">
            {collections.map((type) => <a key={type} href={"/admin?type=" + type}>{COLLECTION_LABELS[type]}</a>)}
          </div>
          {await Promise.all(collections.map(async (type) => {
            const items = await listAdminContent(type);
            return (
              <section className="wallAdminSection" key={type}>
                <div className="wallAdminSectionHead"><div><p className="wallEyebrow">{COLLECTION_LABELS[type].toUpperCase()}</p><h3>{items.length} records</h3></div></div>
                <div className="wallAdminEditGrid">
                  {items.map((item) => (
                    <article className="wallAdminItem" key={item.id}>
                      <form action={saveWallContent}>
                        <input type="hidden" name="type" value={type} />
                        <input type="hidden" name="id" value={item.id} />
                        <label>Title<input name="title" defaultValue={item.title} required /></label>
                        <label>Category<input name="category" defaultValue={item.category} /></label>
                        <label>Summary<textarea name="summary" defaultValue={item.summary} required rows={4} /></label>
                        <label>CTA<input name="cta" defaultValue={item.cta} /></label>
                        <label>Meta<input name="meta" defaultValue={item.meta} /></label>
                        <label>Status<select name="status" defaultValue={item.status}><option value="published">Published</option><option value="draft">Draft</option><option value="archived">Archived</option></select></label>
                        <label className="wallCheck"><input name="demo" type="checkbox" defaultChecked={item.demo} /> Demo content</label>
                        <button className="wallButton wallButtonPrimary">Save changes</button>
                      </form>
                      <form action={deleteWallContent}><input type="hidden" name="type" value={type} /><input type="hidden" name="id" value={item.id} /><button className="wallDangerButton">Delete</button></form>
                    </article>
                  ))}
                  <article className="wallAdminItem wallAdminNew">
                    <form action={saveWallContent}>
                      <input type="hidden" name="type" value={type} />
                      <p className="wallEyebrow">NEW</p><h4>Add {COLLECTION_LABELS[type]}</h4>
                      <label>Title<input name="title" required /></label>
                      <label>Category<input name="category" defaultValue="General" /></label>
                      <label>Summary<textarea name="summary" required rows={4} /></label>
                      <label>CTA<input name="cta" defaultValue="Explore" /></label>
                      <label>Meta<input name="meta" defaultValue="Demo content" /></label>
                      <label>Status<select name="status" defaultValue="published"><option value="published">Published</option><option value="draft">Draft</option><option value="archived">Archived</option></select></label>
                      <label className="wallCheck"><input name="demo" type="checkbox" defaultChecked /> Demo content</label>
                      <button className="wallButton wallButtonPrimary">Create</button>
                    </form>
                  </article>
                </div>
              </section>
            );
          }))}
        </div>
      )}
      {!authenticated && <WallEmpty label="PUBLIC SIDE" title="Nothing is hidden behind Wall Control." body="The public experience remains open. The operator workspace only controls what gets published." actions={[{ href:"/", label:"View public Wall", primary:true }]} />}
    </WallPage>
  );
}
