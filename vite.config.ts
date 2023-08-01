import { resolve } from "node:path";
import { defineConfig } from "vite";

import dts from "vite-plugin-dts";
import EsLint from "vite-plugin-linter";
import tsConfigPaths from "vite-tsconfig-paths";
const { EsLinter, linterPlugin } = EsLint;

export default defineConfig((configEnv) => ({
    plugins: [
        tsConfigPaths(),
        linterPlugin({
            include: ["./src}/**/*.{ts}"],
            linters: [new EsLinter({ configEnv })],
        }),
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
