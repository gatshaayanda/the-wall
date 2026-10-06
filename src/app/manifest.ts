import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "THE WALL",
    short_name: "THE WALL",
    description: "The digital front door to Great Wall — experiences, businesses, products and opportunities.",
    start_url: "/",
    display: "standalone",
    background_color: "#F4F0E7",
    theme_color: "#F4F0E7",
    orientation: "portrait-primary",
    lang: "en",
    categories: ["events", "business", "shopping"],
    shortcuts: [
      { name: "Events", short_name: "Events", description: "See what is happening at The Wall", url: "/events" },
      { name: "Discover", short_name: "Discover", description: "Find businesses and experiences", url: "/discover" },
      { name: "Market", short_name: "Market", description: "Browse what is available", url: "/market" },
      { name: "My Wall", short_name: "My Wall", description: "Open your saved Wall activity", url: "/my-wall" },
    ],
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any maskable" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
