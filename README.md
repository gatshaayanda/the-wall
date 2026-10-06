# THE WALL

THE WALL is a digital ecosystem for Great Wall / Chengeta.

It connects people to:
- experiences and events
- local businesses
- products and services
- vendors
- opportunities
- participation
- personal activity through My Wall

It also gives the people operating The Wall one place to manage the ecosystem through Wall Control.

> The Wall is a digital ecosystem that connects people to experiences, businesses, products and opportunities at Great Wall — while giving the people running The Wall one place to operate the whole ecosystem.

## Product architecture

THE WALL → Discover / Experience / Market → Participation → Wall Control

Core relationships:
- Event → Vendors → Businesses → Products
- Business → Customers → Events → Market
- Opportunity → Application → Participation → Customers

## Current repository status

This repository was created from the BOEMO Joos Food Deals codebase because BOEMO already contained useful Next.js, Firebase, PWA and operational infrastructure.

BOEMO is a technical foundation only.

The product, branding, data model, content and business rules are being converted to THE WALL. See AGENTS.md for the operating contract and recovery instructions.

## Initial public surface

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

## Initial operator surface

- Dashboard
- Events
- Businesses
- Vendors
- Market
- Opportunities
- Applications
- Announcements

## Technology

- Next.js App Router
- React
- TypeScript
- Firebase Authentication
- Cloud Firestore
- Firebase Storage
- PWA/service worker
- Vercel

## Working rule

START → INSPECT → BUILD → VERIFY → CHECKPOINT → CONTINUE/RECOVER

Unexpected result = STOP → inspect reality → then act.

GitHub is the source of truth. Read AGENTS.md before meaningful work.

<!-- Vercel production trigger probe: 2026-10-06 -->
