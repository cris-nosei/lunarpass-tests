import { defineConfig, devices } from '@playwright/test';

// Carrega as variáveis do arquivo .env (ex.: DATABASE_URL)
try { process.loadEnvFile() } catch { }

export default defineConfig({
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'mission-control',
      testDir: './tests/mission-control',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:3000',
      },
    },
    {
      name: 'storefront',
      testDir: './tests/storefront',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:3000', // TODO: confirmar baseURL do storefront
      },
    },
  ],
});
