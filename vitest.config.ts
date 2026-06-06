import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

/**
 * Vitest configuration.
 *
 * The suite is pure data-integrity / i18n-parity assertions over the typed
 * data modules (`src/data`, `src/lib`) and the message catalogs
 * (`messages/*.json`) — no DOM, no React rendering — so the `node` environment
 * is sufficient and fast. `vite-tsconfig-paths` makes the `@/*` path alias from
 * `tsconfig.json` resolve inside tests exactly as it does in the app.
 */
export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: "node",
    include: ["src/**/*.{test,spec}.ts"],
    globals: false,
    reporters: "default",
  },
});
