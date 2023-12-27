import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsConfigPath from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsConfigPath()],
  server: {
    proxy: {
      "/api": {
        target: "https://kdt.frontend.5th.programmers.co.kr",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
