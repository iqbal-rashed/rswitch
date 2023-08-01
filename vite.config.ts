import { resolve } from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig(() => ({
    plugins: [
        tsConfigPaths(),
        dts({
            include: ["src/"],
        }),
    ],
    build: {
        lib: {
            entry: resolve("src", "index.ts"),
            name: "rswitch",
            fileName: (format) => `rswitch.${format}.js`,
        },
    },
}));
