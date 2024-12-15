/// <reference types="vitest" />
/// <reference types="vite/client" />

import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    include: ["**/*.test.{ts,tsx}"],
    globals: true,
    environment: "jsdom",
    css: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
