import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port: 8080,
    host: "0.0.0.0",
    proxy: {
      "^/api": {
        target: "https://560a-82-215-96-33.ngrok-free.app",
        changeOrigin: mode === "development",
        secure: mode !== "development",
      },
    },
  },
}));
