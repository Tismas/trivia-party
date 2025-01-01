import { defineConfig, devices } from "@playwright/test";
import path from "path";

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  forbidOnly: false,
  retries: 0,
  workers: 1,
  reporter: "html",
  timeout: 120_000,
  use: {
    baseURL: "http://localhost:5173",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  webServer: [
    {
      command: "pnpm start:e2e",
      url: "http://localhost:8080",
      cwd: path.resolve(__dirname, "../be"),
      timeout: 15 * 1000,
      reuseExistingServer: true,
    },
    {
      command: "pnpm dev",
      url: "http://localhost:5173",
      cwd: path.resolve(__dirname, "../fe"),
      timeout: 15 * 1000,
      reuseExistingServer: true,
    },
  ],
});
