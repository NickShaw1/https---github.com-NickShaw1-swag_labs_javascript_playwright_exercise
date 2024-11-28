import { test, expect } from '@playwright/test';

// Test with page text title
test('header_check', async ({ page }) => {
  // Go to Login page
  await page.goto('https://www.saucedemo.com/');
});