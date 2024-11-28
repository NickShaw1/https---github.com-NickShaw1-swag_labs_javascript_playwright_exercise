import { test, expect } from '@playwright/test';

// Test with page text title
test('page_title', async ({ page }) => {
  // Go to Login page
  await page.goto('https://saucedemo.com');
  const title = await page.title();
  expect(title).toBe('Swag Labs');  // This should pass
});