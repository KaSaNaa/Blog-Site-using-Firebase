import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      'Cross-Origin-Embedder-Policy': 'unsafe-none'
    },
  },
  devServer: {
    headers: {
      'Cross-Origin-Embedder-Policy': 'unsafe-none'
    }
  }
});
