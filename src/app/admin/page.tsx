import type { Metadata } from "next";
import { WallEmpty, WallPage } from "@/components/wall-shell";
import { COLLECTION_LABELS, type WallCollection } from "@/lib/wall-demo";
import { firebaseAdminConfigured } from "@/lib/firebase-admin";
import { isWallAdmin, listAdminContent, wallAdminPasswordConfigured } from "@/lib/wall-admin";
import { loginWallAdmin, logoutWallAdmin, saveWallContent, deleteWallContent } from "./actions";

export const metadata: Metadata = { title: "Wall Control", description: "Operator workspace for The Wall.", robots: { index: false, follow: false } };

const collections: WallCollection[] = ["businesses", "events", "products", "opportunities"];

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ error?: string; saved?: string; type?: string }> }) {
  const params = await searchParams;
  const authenticated = await isWallAdmin();
  const selectedType = collections.includes(params.type as WallCollection) ? params.type as WallCollection : "businesses";
  const selectedItems = authenticated ? await listAdminContent(selectedType) : [];
  const backendReady = firebaseAdminConfigured;

  return (
    <WallPage eyebrow="WALL CONTROL" title="Run the ecosystem." intro="Publish the content that makes the public Wall useful. Demo records are deliberately marked so they can be replaced without being mistaken for live Great Wall facts.">
      {!authenticated ? (
        <section className="wallAdminGate">
          <p className="wallEyebrow">OPERATOR ACCESS</p>
          <h2>Sign in to manage The Wall.</h2>
          <p>Use the Wall Control passphrase configured for this deployment. This is an operator boundary, not public visitor authentication.</p>
          {!wallAdminPasswordConfigured && <div className="wallAdminStatus wallAdminStatusWarning" role="alert"><strong>Operator access is not configured.</strong><span>WALL_ADMIN_PASSWORD is missing from this deployment.</span></div>}
          <form className="wallAdminForm" action={loginWallAdmin}>
            <label>Passphrase<input name="password" type="password" autoComplete="current-password" required /></label>
            <button className="wallButton wallButtonPrimary" type="submit" disabled={!wallAdminPasswordConfigured}>Open Wall Control</button>
          </form>
          {params.error === "1" && <p className="wallAdminMessage wallAdminError" role="alert">That passphrase was not accepted.</p>}
        </section>
      ) : (
        <div className="wallAdminConsole">
          <div className="wallAdminTop">
            <div>
              <p className="wallEyebrow">OPERATOR WORKSPACE</p>
              <h2>{COLLECTION_LABELS[selectedType]} under control.</h2>
              <p>One collection at a time keeps the workspace focused. Changes are published to the matching public area after a successful save.</p>
            </div>
            <form action={logoutWallAdmin}><button className="wallButton wallButtonSecondary" type="submit">Sign out</button></form>
          </div>

          {!backendReady && (
            <div className="wallAdminStatus wallAdminStatusWarning" role="status">
              <strong>Preview mode — Firebase Admin is not connected.</strong>
              <span>The demo catalogue can still be viewed, but Create, Save and Delete are disabled until the Vercel production Firebase Admin configuration is repaired.</span>
            </div>
          )}

          {params.saved === "1" && backendReady && (
            <div className="wallAdminStatus wallAdminStatusSuccess" role="status">
              <strong>Saved.</strong><span>The public Wall has been revalidated.</span>
            </div>
          )}

          {params.error === "firebase" && (
            <div className="wallAdminStatus wallAdminStatusWarning" role="alert">
              <strong>Nothing was written.</strong><span>Firebase Admin is not configured correctly on this deployment. Fix the production environment variable, then retry.</span>
            </div>
          )}

          {(params.error === "save" || params.error === "delete") && (
            <div className="wallAdminStatus wallAdminStatusError" role="alert">
              <strong>Nothing was changed.</strong><span>The server could not complete that database operation. Check the Firebase configuration and retry.</span>
            </div>
          )}

          <nav className="wallAdminTabs" aria-label="Wall Control collections">
            {collections.map((type) => (
              <a key={type} href={"/admin?type=" + type} aria-current={selectedType === type ? "page" : undefined}>
                {COLLECTION_LABELS[type]}
              </a>
            ))}
          </nav>

          <section className="wallAdminSection">
            <div className="wallAdminSectionHead">
              <div>
                <p className="wallEyebrow">{COLLECTION_LABELS[selectedType].toUpperCase()}</p>
                <h3>{selectedItems.length} records</h3>
              </div>
              <p className="wallAdminHint">{backendReady ? "Changes here become the source for the public " + COLLECTION_LABELS[selectedType].toLowerCase() + " view." : "Read-only preview until Firebase Admin is repaired."}</p>
            </div>

            <div className="wallAdminEditGrid">
              {selectedItems.map((item) => (
                <article className="wallAdminItem" key={item.id}>
                  <fieldset disabled={!backendReady}>
                    <form action={saveWallContent}>
                      <input type="hidden" name="type" value={selectedType} />
                      <input type="hidden" name="id" value={item.id} />
                      <label>Title<input name="title" defaultValue={item.title} required /></label>
                      <label>Category<input name="category" defaultValue={item.category} /></label>
                      <label>Summary<textarea name="summary" defaultValue={item.summary} required rows={4} /></label>
                      <label>CTA<input name="cta" defaultValue={item.cta} /></label>
                      <label>Meta<input name="meta" defaultValue={item.meta} /></label>
                      <label>Status<select name="status" defaultValue={item.status}><option value="published">Published</option><option value="draft">Draft</option><option value="archived">Archived</option></select></label>
                      <label className="wallCheck"><input name="demo" type="checkbox" defaultChecked={item.demo} /> Demo content</label>
                      <button className="wallButton wallButtonPrimary" type="submit">Save changes</button>
                    </form>
                    <form action={deleteWallContent}>
                      <input type="hidden" name="type" value={selectedType} />
                      <input type="hidden" name="id" value={item.id} />
                      <button className="wallDangerButton" type="submit">{item.demo ? "Archive demo" : "Delete"}</button>
                    </form>
                  </fieldset>
                </article>
              ))}

              <article className="wallAdminItem wallAdminNew">
                <fieldset disabled={!backendReady}>
                  <form action={saveWallContent}>
                    <input type="hidden" name="type" value={selectedType} />
                    <p className="wallEyebrow">NEW</p>
                    <h4>Add {COLLECTION_LABELS[selectedType]}</h4>
                    <p className="wallAdminFieldHint">Start with only the information needed to make the listing understandable. Add richer relationships when the underlying domain model is ready.</p>
                    <label>Title<input name="title" required /></label>
                    <label>Category<input name="category" defaultValue="General" /></label>
                    <label>Summary<textarea name="summary" required rows={4} /></label>
                    <label>CTA<input name="cta" defaultValue="Explore" /></label>
                    <label>Meta<input name="meta" defaultValue="Live content" /></label>
                    <label>Status<select name="status" defaultValue="draft"><option value="published">Published</option><option value="draft">Draft</option><option value="archived">Archived</option></select></label>
                    <label className="wallCheck"><input name="demo" type="checkbox" /> Demo content</label>
                    <button className="wallButton wallButtonPrimary" type="submit">Create</button>
                  </form>
                </fieldset>
              </article>
            </div>
          </section>
        </div>
      )}

      {!authenticated && <WallEmpty label="PUBLIC SIDE" title="Nothing is hidden behind Wall Control." body="The public experience remains open. The operator workspace only controls what gets published." actions={[{ href:"/", label:"View public Wall", primary:true }]} />}
    </WallPage>
  );
}
