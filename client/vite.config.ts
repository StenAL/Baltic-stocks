import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
    return {
        server: {
            host: "127.0.0.1",
            port: 3000,
        },
        esbuild: {
            supported: {
                "top-level-await": true,
            },
        },
        build: { outDir: "build", sourcemap: mode === "production" },
        base: "/stonks",
        plugins: [react()],
    };
});
