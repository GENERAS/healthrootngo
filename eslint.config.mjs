import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = defineConfig([
  ...nextVitals,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Unreferenced static copy of the old template - not part of the build.
    "legacy/**",
    // Third-party vendor scripts, not our code.
    "public/js/**",
    "public/vendor/**",
  ]),
]);

export default eslintConfig;
