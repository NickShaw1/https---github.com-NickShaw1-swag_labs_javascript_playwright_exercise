import { test, expect } from '@playwright/test';

// Test to determine that prices match on inventory (main) and product pages for each item
test('price_match', async ({ page }) => {
  // Login
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  // Inventory items and expected prices
  const inventoryItems = [
    {
      titleLink: '[data-test="item-4-title-link"]',
      expectedPrice: '$29.99',
    },
    {
      titleLink: '[data-test="item-0-title-link"]',
      expectedPrice: '$9.99',
    },
    {
      titleLink: '[data-test="item-1-title-link"]',
      expectedPrice: '$15.99',
    },
    {
      titleLink: '[data-test="item-5-title-link"]',
      expectedPrice: '$49.99',
    },
    {
      titleLink: '[data-test="item-2-title-link"]',
      expectedPrice: '$7.99',
    },
    {
      titleLink: '[data-test="item-3-title-link"]',
      expectedPrice: '$15.99',
    },
  ];

  // Iterate over each item and check the price
  for (const item of inventoryItems) {
    // Click the item link to go to the product page
    await page.locator(item.titleLink).click();

    // Get the actual price of the item on the product page
    const actualPrice = await page.locator('[data-test="inventory-item-price"]').textContent();

    // Compare the actual price with the expected price
    expect(actualPrice?.trim()).toBe(item.expectedPrice);

    // Go back to the inventory page
    await page.locator('[data-test="back-to-products"]').click();
  }

  // Logout
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.locator('[data-test="logout-sidebar-link"]').click();
});
