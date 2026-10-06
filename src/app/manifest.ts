import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "THE WALL",
    short_name: "THE WALL",
    description: "A digital home for experiences, businesses, products and opportunities at Great Wall.",
    start_url: "/",
    display: "standalone",
    display_override: ["window-controls-overlay", "standalone"],
    background_color: "#111111",
    theme_color: "#111111",
    orientation: "portrait-primary",
    lang: "en",
    categories: ["events", "business", "shopping", "travel"],
    shortcuts: [
      { name: "Events", short_name: "Events", description: "Explore what is happening at The Wall", url: "/events" },
      { name: "Discover", short_name: "Discover", description: "Find businesses and services", url: "/discover" },
      { name: "Market", short_name: "Market", description: "Browse products and services", url: "/market" },
      { name: "My Wall", short_name: "My Wall", description: "Open your saved Wall activity", url: "/my-wall" }
    ],
    icons: [
      { src: "/the-wall-icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" }
    ]
  };
}
