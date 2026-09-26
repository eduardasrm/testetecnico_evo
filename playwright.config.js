const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'https://localhost:44329',
    ignoreHTTPSErrors: true,
  },
});
