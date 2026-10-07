# THE WALL — Agent Operating Contract

## Product identity

Repository: gatshaayanda/the-wall
Product: THE WALL

THE WALL is a digital ecosystem for Great Wall / Chengeta that connects people to experiences, businesses, products, opportunities and participation, while giving the people operating The Wall one place to run the ecosystem.

THE WALL is not a generic marketing website, event-ticketing page, farm-management app, food-ordering clone, delivery marketplace, generic directory, or social network for its own sake.

Product one-liner:

> The Wall is a digital ecosystem that connects people to experiences, businesses, products and opportunities at Great Wall — while giving the people running The Wall one place to operate the whole ecosystem.

Core architecture:

THE WALL → Discover / Experience / Market → Participation → Wall Control

Core relationships:
- Event → Vendors → Businesses → Products
- Business → Customers → Events → Market
- Opportunity → Application → Participation → Customers
- Operator → sees and manages the network through Wall Control

Do not build isolated pages that do not connect to this model.

## Roles

- Product owner / final reviewer: user
- Technical navigator / implementation: ChatGPT through repository tooling
- GitHub: source of truth
- Local VS Code workspace: inspection and review layer
- Codex: optional hands-on coding agent; the project must not depend on it

## Mandatory workflow

START → INSPECT → BUILD → VERIFY → CHECKPOINT → CONTINUE/RECOVER

Golden rule:

> Unexpected result = STOP → inspect reality → then act.

Before meaningful changes:
1. Read this AGENTS.md.
2. Inspect actual Git branch/status and relevant source.
3. Inspect deployed state when deployment matters.
4. Inspect Firebase configuration/rules when data/auth is involved.
5. Inspect current authoritative online documentation when framework/API behaviour may have changed.
6. Inspect the existing implementation before replacing or deleting it.
7. Prefer the smallest controlled change.

After meaningful changes:
1. Verify the actual result.
2. Run TypeScript, lint and production build checks.
3. Review the real diff.
4. Update AGENTS.md when a meaningful product/architecture/security decision changes.
5. Create a meaningful checkpoint commit.
6. Push the intended branch.
7. Report exactly what changed, what was verified, and what remains.

Never claim implementation, push, deployment or verification without checking reality.

## Foundation decision

THE WALL was created from BOEMO Joos Food Deals because BOEMO already contains useful technical plumbing.

BOEMO is a technical foundation only.

Reuse where useful:
- Next.js App Router
- TypeScript
- Firebase client/admin integration
- Firebase Authentication
- Firestore
- Storage
- PWA/service-worker infrastructure
- offline/reconnection patterns
- realtime listeners
- server/API patterns
- Vercel Analytics/Speed Insights
- error/loading boundaries
- deployment configuration

Do not reuse BOEMO as product truth.

Replace or quarantine:
- BOEMO branding and copy
- food/menu/order business rules
- BOEMO-specific Firestore collections and assumptions
- BOEMO phone numbers and locations
- BOEMO images/assets
- BOEMO subscription/loyalty rules
- BOEMO admin terminology
- BOEMO notification semantics
- BOEMO Firebase project assumptions
- BOEMO-specific fallback data

Other inspected repositories are references, not dependencies:
- Atlas Service Centre: customer/request/status patterns
- Namane Tyres: offline-first and small-business/vendor workflow patterns
- TutorMe: publishing/service catalogue patterns
- Admin Hub Global: presentation/editorial/product-showcase patterns
- Admin Hub Games: not a technical foundation for THE WALL

## Public MVP

Initial public surface:
- Home / The Wall
- Events
- Event detail
- Discover
- Business profile
- Wall Market
- Product detail
- Become a Vendor
- Opportunities
- Opportunity detail
- My Wall

### Home / The Wall

The destination front door. It should answer:
- What is The Wall?
- What's happening?
- What can I do here?
- Who/what is here?
- What can I discover?
- What can I participate in?

Events are prominent but are not the entire product.

### Events

- event listing
- event detail
- date/time/venue
- lineup
- food/vendors
- FAQs
- booking/participation CTA
- booking reference
- date/people
- QR/reference when applicable
- updates
- saved/favourite state when authenticated

### Discover

Connect people to:
- Food
- Farm
- Businesses
- Services
- experiences

Avoid a dead directory. Profiles must lead to useful action.

### Business profiles

A business is a mini digital storefront/profile with:
- name and category
- description/about
- products/services
- availability where applicable
- photos
- location
- contact
- WhatsApp
- upcoming appearances/events
- adaptable CTA such as Order / Book / Enquire

### Wall Market

Start with:

VIEW → ENQUIRE → ORDER → COLLECT

Do not make delivery infrastructure a prerequisite for the first market release.

### Become a Vendor

A clear application path for businesses/people who want to sell or participate at The Wall.

### Opportunities

Relevant participation can include:
- poultry
- small stock
- produce
- food
- retail
- services
- spaces
- partnerships

Application flow:

NEW → REVIEW → APPROVED → ACTIVE

Applications must connect an opportunity to a person/business and ultimately to participation.

### My Wall

For visitors/customers:
- bookings
- favourites
- followed businesses
- offers
- saved experiences
- visit history
- relevant updates

Public browsing must not require an account.

## Operator MVP — Wall Control

Wall Control is the operational centre, not a generic ERP.

Initial areas:
- Dashboard
- Events
- Businesses
- Vendors
- Market
- Opportunities
- Applications
- Announcements

The operator should eventually see:
- what is happening
- what needs attention
- who is participating
- what has been booked
- active businesses/vendors
- applications awaiting review
- content needing publication

An announcement/story should be publishable once and reused across relevant public surfaces and notifications.

## Notifications

Potential categories:
- event reminders
- event/vendor updates
- specials/offers
- new experiences
- relevant opportunity updates

Permissions and delivery remain explicit. Do not promise browser push until HTTPS, service-worker, permission and token infrastructure is implemented and tested.

## Data architecture

Firebase/Firestore is the initial backend foundation.

Firestore is document-oriented, supports collections/subcollections, realtime listeners and offline support. Design the database around The Wall relationships, not BOEMO menu/order records. Firebase recommends choosing between documents, multiple collections and subcollections according to access patterns and growth rather than putting large growing lists into one document.

Likely domain entities:
- users
- businesses
- events
- eventVendors / eventParticipants
- products
- marketOrders / enquiries
- opportunities
- applications
- bookings
- favourites
- follows
- announcements
- notifications
- admin users/roles

These are architectural candidates, not permission to invent fields or workflows without inspecting the implementation and product requirements.

Public content must come from published data, not hard-coded fake business records. Development demo content must be clearly labelled and must never be mistaken for live Great Wall facts.

## Security boundary

The inherited Firestore rules are a safe starting point only if they remain deny-by-default until the new domain model and access rules are deliberately implemented.

Never:
- make customer profiles publicly readable
- expose private bookings/orders/applications merely to simplify UI
- grant arbitrary public writes
- hard-code an admin UID
- weaken rules to hide an application bug
- treat client-supplied role/price/payment fields as trusted authority

Public read access should be limited to intentionally published public content.

Authenticated users should only access their own private data unless an explicit operator/business role permits more.

Operator access must be role-based and enforced by rules/server-side checks, not only hidden by UI.

Rules stored in Git are not proof that live Firebase rules are deployed. Treat Firebase Rules deployment as a separate checkpoint and verify live state when relevant.

## Authentication

Public discovery must work without sign-in.

Authentication becomes useful for:
- My Wall
- bookings/history
- favourites
- follows
- applications
- business/operator actions
- persistent preferences

Anonymous auth may be used where it materially improves low-friction participation, but must not become a security bypass.

Google/email authentication can be retained where useful. Inherited BOEMO auth flows do not dictate THE WALL product behaviour.

## PWA / offline

Keep:
- installable manifest
- service worker
- offline route/shell
- reconnection handling

Public shell/content may be cached deliberately. Private Firebase responses must not be indiscriminately copied into service-worker caches. Firestore persistence can handle appropriate offline data.

Offline UX must distinguish:
- saved locally
- queued for sync
- confirmed by backend
- unavailable because of permissions/configuration

Never call a failed backend write "offline" merely to make the UI feel successful.

## Design direction

THE WALL should feel like a place, not a SaaS dashboard.

Goals:
- strong destination identity
- contemporary African/Botswana sense of place without cliché
- editorial, confident, warm and social
- photography-led when real imagery is available
- event energy without becoming nightclub-only
- strong business/product discovery
- mobile-first
- accessible
- fast
- obvious calls to action
- a reason to return

Avoid:
- generic startup gradients
- stock-photo corporate dashboards
- over-carded UI
- turning every section into a coloured admin panel
- fake statistics
- invented testimonials
- invented business facts
- empty marketplace patterns that imply supply that does not exist

## Content truth

Recent Botswana Daily News coverage describes Great Wall Farm as an emerging lifestyle destination around Molepolole, combining music, food, business and social interaction, with small-business participation and ongoing venue development. It also describes The Wall's Finest as part of that direction.

This is useful context, not permission to invent live schedules, prices, capacities, accommodation availability, vendor lists, performers or other current facts.

When live content is unknown, say so or use clearly labelled editorial placeholders.

## Technical baseline

Current foundation:
- Next.js 15
- React 19
- TypeScript
- Firebase client/admin
- Firestore
- Firebase Auth
- Firebase Storage
- PWA/service worker
- Vercel Analytics/Speed Insights
- Vercel deployment

Use Next.js App Router. Prefer Server Components by default and introduce client boundaries only where browser APIs or interaction require them. Follow current Next.js documentation for routing, metadata, images, async APIs and server/client boundaries.

Prefer:
- server-rendered public pages where possible
- next/image
- explicit metadata/OG
- semantic accessible HTML
- loading/error/not-found states
- route handlers/server actions only where they improve a boundary
- no unnecessary client-wide state

## Environment

THE WALL has its own Firebase project.

Use THE WALL environment variables. Never commit private credentials.

Client Firebase configuration is public client configuration, but remains environment-driven so deployment can change without source edits.

Current production target:
https://the-wall-ab746.vercel.app

Do not assume that hostname is the final public domain unless verified from the actual deployment/project.

## Build discipline

Before a meaningful checkpoint:

npx tsc --noEmit
npm run lint
npm run build

When a dev server is started, verify it in a browser:
- page loads
- meaningful content is present
- no Next.js error overlay
- no unexpected console errors
- key navigation/actions render
- relevant routes open

Do not run destructive dependency or audit commands blindly.

## Git / checkpoint discipline

GitHub main is the source of truth.

Before committing:
- inspect status
- inspect diff
- ensure no credentials are present
- ensure the change matches intended product scope

Prefer meaningful checkpoints over noisy probe commits.

Every meaningful checkpoint should have:
- clear commit message
- verified build state
- updated AGENTS.md when the project contract changes

## Current conversion status

The repository was created by pushing the BOEMO technical foundation into gatshaayanda/the-wall. The foundation checkpoint remains the technical starting point, but the public product is now being actively reclaimed for THE WALL.

Current phase: FOUNDATION CONVERSION → INFORMATION ARCHITECTURE.

Completed in the current conversion checkpoint:
1. THE WALL public identity, homepage and metadata established.
2. PWA/service-worker copy, install UI and app icon moved to THE WALL branding.
3. Public routes established for Events, Discover, Market, Opportunities, My Wall and Become a Vendor.
4. /admin reclaimed as a Wall Control shell instead of a BOEMO kitchen console.
5. Legacy /order, /account and /orders/[id] routes no longer expose BOEMO workflows.
6. Offline route no longer exposes BOEMO copy or order claims.
7. Firestore and Storage rules in Git are back to deny-all while the THE WALL domain model is designed.
8. Install prompt now uses THE WALL styling, suppresses itself after dismissal, and does not appear when the app is already installed.
9. PWA cache identity was bumped from `the-wall-shell-v1` to `v2`, and the app icon now has a unique `/the-wall-icon.svg` path so an inherited BOEMO icon cannot remain silently cached under the old `/icon.svg` URL.

Important current reality:
- The new public pages are honest shell states; they do not invent live events, businesses, products, prices or opportunities.
- Firebase domain collections/security rules are not yet implemented for THE WALL.
- The old BOEMO implementation still exists in quarantined source files and legacy server helpers. It is not product truth and must not be reconnected accidentally.
- Vercel does not currently have a linked THE WALL project. Project creation through the available Vercel integration returned HTTP 403 permission denied, so no deployment is claimed.
- If a browser is still showing BOEMO while GitHub main contains THE WALL routes, treat that as stale deployment/service-worker/PWA state first. Do not change correct source styling to compensate for an old deployment.
- A full local TypeScript/lint/build verification has not been performed in this checkpoint because the currently available working environment does not contain the user's local checkout.

Immediate priority:
1. finish the public information architecture and domain primitives
2. replace/quarantine remaining BOEMO source paths as each is inspected
3. design THE WALL Firestore entities and access patterns
4. write and test THE WALL security rules before enabling public data
5. build Wall Control around publishing and relationships
6. connect Events ↔ Vendors ↔ Businesses ↔ Products and Opportunities ↔ Applications ↔ Participation
7. implement My Wall and authenticated actions
8. establish Vercel project/deployment with the user's account permissions
9. verify the actual deployed product before calling the checkpoint complete

Do not stop at a renamed BOEMO website.

## Conversion quarantine

Until deliberately migrated or deleted, inherited BOEMO paths are legacy foundation code.

Examples:
- src/lib/boemo/
- public/boemo-assets/
- BOEMO-specific order/menu/account/admin routes
- BOEMO notification endpoints
- BOEMO-specific Firestore helpers
- BOEMO-specific service-worker cache names

A legacy file may be reused only after confirming that the underlying behaviour is generic and safe for THE WALL.

The goal is a clean THE WALL architecture, not a BOEMO codebase wearing a new name.

## Future-chat recovery rule

A future chat must not infer progress from conversation memory alone.

First inspect:
1. this AGENTS.md
2. current GitHub main
3. latest checkpoint commit
4. current routes/components
5. current Firebase rules/config when relevant
6. current Vercel deployment when deployment matters

Then continue from reality.

If reality differs from this document:

STOP → inspect → reconcile the contract → continue.


## Content population checkpoint — 2026-10-06

The Wall now has a deliberately labelled demo-content layer so the information architecture can be exercised before real Great Wall content is supplied.

Collections currently surfaced publicly:
- businesses
- events
- products
- opportunities

Demo records are fictional and visibly marked as DEMO. They are not claims about current Great Wall vendors, prices, schedules, availability or opportunities.

### Wall Control CRUD
- /admin is now an operator workspace for creating, editing, publishing, archiving and deleting records in those four collections.
- The operator boundary currently uses an HTTP-only signed session derived from WALL_ADMIN_PASSWORD because Firebase Auth client/admin integration was not present in the converted shell. This is an explicit temporary operator boundary, not a public role claim.
- Firebase Admin SDK is server-only and reads/writes Firestore without exposing service credentials to the browser.
- scripts/seed-wall-demo.mjs seeds the fictional dataset.
- scripts/set-wall-admin.mjs remains available for the later Firebase custom-claim migration; it is not required by the current passphrase gate.
- Public pages read published Firestore content server-side and fall back to the clearly labelled fictional dataset when backend configuration/content is unavailable.

### Security/content rules
- Firestore rules remain deny-by-default. The current public pages do not use the browser Firestore client; server-side Admin SDK access is used for this prototype boundary.
- Never seed real businesses, live event details, prices, performers or availability as demo content.
- Before production content is opened directly to browser clients, replace the temporary server-only boundary with deliberate Firebase Auth/custom-claim rules and test the rules against the public/private access model.

### Accessibility / visual correction
Public-page actions must be readable on the light paper surfaces. Do not reuse the dark-hero secondary-button treatment on `/events`, `/discover`, `/market`, `/opportunities`, `/become-a-vendor` or `/my-wall`.

For light public-page action groups:
- secondary actions use an explicit ink background with white text, not light text on a light background
- action labels must remain readable at normal mobile sizes and have enough padding/line-height to read as controls
- hover/focus states must remain readable
- do not rely on colour alone to communicate an action
- keep normal text at a strong readable contrast; WCAG's current minimum for normal text is 4.5:1, with 3:1 permitted for large text

The home hero may keep its intentionally dark presentation, but light-page controls must use the explicit light-page treatment above.

### Demo content / operator preview contract
The fictional seeded dataset is part of the current product-preview workflow. Keep enough published demo records across businesses, events, products and opportunities for the public information architecture to be exercised end-to-end.

The seed source is `scripts/seed-wall-demo.mjs`. It is an idempotent/upsert-style preview seed: records are clearly marked `demo: true`, published for preview, and remain editable through Wall Control CRUD at `/admin`.

Do not replace this preview layer with invented real Great Wall facts. Real content replaces demo records only when supplied/verified by the operator. The admin CRUD surface must continue to make it possible to create, edit, publish, archive and delete preview records while the domain model and security rules are being built.

### Current next step
Use the populated shell to test the information architecture and relationships. Then replace the demo records with real operator-managed entities, add detail routes and relationship fields, and only then open the corresponding Firestore client permissions.


## Catalogue preview rule — 2026-10-07
The public catalogue and Wall Control must be visually populated during development. An empty Firestore collection must **not** cause the public page to say nothing is published when the repository's labelled demo baseline exists.

The demo baseline in `src/lib/wall-demo.ts` is the preview catalogue:
- it is fictional
- every record is marked `demo: true`
- public cards visibly say DEMO
- it is not presented as a current Great Wall fact
- Firestore records with the same ID override the demo baseline
- Firestore draft/archived records suppress the corresponding demo baseline record
- new operator-created records are added to the catalogue

Wall Control must show the same baseline plus Firestore overrides so the operator can exercise create, edit, publish, archive and delete flows immediately. A delete of a demo-baseline record is represented by an archived Firestore override rather than pretending the source code baseline was deleted.

## Public CTA readability rule — 2026-10-07
All action controls on light public surfaces must have readable text/background contrast. This includes buttons and card links for Become a vendor, Visit Market, Discover, Events, Opportunities, Wall Control and similar actions.

Do not use the dark-hero secondary treatment on paper/white surfaces. Light-surface CTAs must use a solid ink or otherwise demonstrably high-contrast background with white text, sufficient padding and readable line height. Card action links are controls too and must receive the same treatment.
