import { defineConfig } from "vite";
import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";

// Clinical Evidence Observatory: browser calls /api; Vite proxies it to the local FastAPI process during development.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
export default defineConfig({
  root: path.resolve(__dirname, "client"),
  plugins: [react(), tailwindcss(), vitePluginManusRuntime()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "client/src") },
  },
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    proxy: {
      "/api": {
        target: process.env.VITE_FASTAPI_TARGET || "https://clincal-hfauajcje8h7a3av.spaincentral-01.azurewebsites.net",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
