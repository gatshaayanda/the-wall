import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import PwaRegister from "@/app/pwa-register";
import "./globals.css";
import "./pwa.css";

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://the-wall-ab746.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "THE WALL", template: "%s | THE WALL" },
  description: "A digital ecosystem for Great Wall — experiences, businesses, products and opportunities.",
  applicationName: "THE WALL",
  keywords: ["The Wall", "Great Wall", "Molepolole", "Botswana", "events", "businesses", "market", "opportunities"],
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: siteUrl, siteName: "THE WALL", title: "THE WALL", description: "Experiences, businesses, products and opportunities at Great Wall." },
  twitter: { card: "summary", title: "THE WALL", description: "Experiences, businesses, products and opportunities at Great Wall." },
  icons: { icon: "/the-wall-icon.svg", apple: "/the-wall-icon.svg" },
  manifest: "/manifest.webmanifest?v=2",
  appleWebApp: { capable: true, title: "THE WALL", statusBarStyle: "black-translucent" },
};

export const viewport: Viewport = { themeColor: "#111111", colorScheme: "dark" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body><PwaRegister />{children}<Analytics /><SpeedInsights /></body></html>;
}