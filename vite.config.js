import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === "github-pages" ? "/HostelHub/" : "/",
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": "http://localhost:4000",
    },
  },
}));
