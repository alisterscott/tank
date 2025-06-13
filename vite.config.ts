import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/tank/",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
      includeAssets: ["fish-icon.svg"],
      manifest: {
        name: "Virtual Fish Tank",
        short_name: "Aquarium",
        description: "A beautiful animated fish tank progressive web app",
        theme_color: "#0891b2",
        background_color: "#0c4a6e",
        display: "standalone",
        icons: [
          {
            src: "fish-icon.svg",
            sizes: "512x512",
            type: "image/svg+xml",
          },
        ],
      },
    }),
  ],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
});
