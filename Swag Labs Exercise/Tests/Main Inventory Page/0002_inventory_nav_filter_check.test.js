import { test, expect } from '@playwright/test';

// Test that filtering behaves as expected
test('filter_check', async ({ page }) => {
  // Login
  await page.goto('https://www.saucedemo.com/', { waitUntil: 'domcontentloaded' });
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  // Wait for the products page to fully load
  await page.waitForSelector('.inventory_item'); // Ensure inventory items are visible before proceeding

   // Filter high to low and validate
  await page.locator('[data-test="product-sort-container"]').selectOption('hilo');
  let pricesHighToLow = await page.locator('.inventory_item_price').allTextContents();
  let sortedHighToLow = [...pricesHighToLow].sort((a, b) => parseFloat(b.replace('$', '')) - parseFloat(a.replace('$', '')));
  expect(pricesHighToLow).toEqual(sortedHighToLow);

  // Filter low to high and validate
  await page.locator('[data-test="product-sort-container"]').selectOption('lohi');
  let pricesLowToHigh = await page.locator('.inventory_item_price').allTextContents();
  let sortedLowToHigh = [...pricesLowToHigh].sort((a, b) => parseFloat(a.replace('$', '')) - parseFloat(b.replace('$', '')));
  expect(pricesLowToHigh).toEqual(sortedLowToHigh);

  // Filter Z to A and validate
  await page.locator('[data-test="product-sort-container"]').selectOption('za');
  let namesZToA = await page.locator('.inventory_item_name').allTextContents();
  let sortedZToA = [...namesZToA].sort().reverse();  // Sort alphabetically and reverse for Z-A
  expect(namesZToA).toEqual(sortedZToA);

   // Filter A to Z and validate
  await page.locator('[data-test="product-sort-container"]').selectOption('az');
  let namesAToZ = await page.locator('.inventory_item_name').allTextContents();
  let sortedAToZ = [...namesAToZ].sort();  // Sort alphabetically for A-Z
  expect(namesAToZ).toEqual(sortedAToZ);

  // Logout
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.locator('[data-test="logout-sidebar-link"]').click();
});
