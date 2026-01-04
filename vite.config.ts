import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  build: {
    // Use relative paths for Chrome extension compatibility
    outDir: "dist",
    assetsDir: "assets",
  },
  // Use relative paths so assets load correctly in extension context
  base: "./",
});
