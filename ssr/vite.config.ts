import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

import type { UserConfig } from "vitest/config";

const test = {
  globals: true,
  environment: "jsdom",
  setupFiles: ["src/__tests__/setupTests.ts"],
  threads: false,
  watch: false,
} as UserConfig["test"];

export default defineConfig({
  plugins: [react()],
  server: { port: 3000 },
  root: ".",
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "dist/client",
    ssrManifest: true,
    rollupOptions: {
      input: path.resolve(__dirname, "index.html"),
    },
  },
  test,
});
