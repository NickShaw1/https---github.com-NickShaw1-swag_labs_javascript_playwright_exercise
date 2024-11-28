// playwright.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  workers: 3, // This is how many workers Playwright will use
  reporter: [
    ['list'], // Prints results directly in the terminal
    ['html', { outputFolder: 'test-results', open: 'never' }] // Generates HTML report
  ],
  projects: [
    {
      name: 'Chromium',
      use: { browserName: 'chromium' }, // Run tests in Chromium
    },
    {
      name: 'Firefox',
      use: { browserName: 'firefox' },  // Run tests in Firefox
    },
    {
      name: 'WebKit',
      use: { browserName: 'webkit' },   // Run tests in WebKit
    },
  ],
});