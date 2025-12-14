import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        background: "./background.js",
        content: "./content.js",
        popup: "./popup.js"
      },
      output: {
        entryFileNames: "[name].js"
      }
    }
  }
});
