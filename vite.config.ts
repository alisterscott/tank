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
        name: "Juiced Fish",
        short_name: "Juiced Fish",
        description:
          "A progressive web app that simulates a fish tank with animated fish.",
        theme_color: "#0891b2",
        background_color: "#0c4a6e",
        display: "standalone",
        icons: [
          {
            src: "fish-icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "fish-icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
});
