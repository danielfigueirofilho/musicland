import path from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig } from "vitest/config";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    pool: "forks",
    setupFiles: ["./vitest.setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: [
        "lib/gamification/**",
        "lib/music/**",
        "lib/auth/**",
        "lib/quiz/**",
        "lib/db/progress.ts",
      ],
      exclude: [
        "**/*.test.ts",
        "**/*.test.tsx",
        "**/index.ts",
        "lib/music/tone-player.ts",
        "lib/auth/current-session.ts",
        "lib/quiz/modules.ts",
        "lib/quiz/modules.ts",
        "lib/quiz/modules.ts",
      ],
      thresholds: {
        lines: 70,
        functions: 70,
        branches: 70,
        statements: 70,
      },
    },
  },
  resolve: {
    alias: {
      "@": rootDir,
    },
  },
});
