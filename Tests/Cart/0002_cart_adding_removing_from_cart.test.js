import { test, expect } from '@playwright/test';

test('verify_items_removed_from_cart_and_badge', async ({ page }) => {
  // Login
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  // Add items to the cart
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();

  // Verify that the cart badge displays the correct number of items
  const cartBadge = await page.locator('[data-test="shopping-cart-badge"]');
  const badgeText = await cartBadge.textContent();
  expect(badgeText).toBe('3');  // There should be 3 items in the cart

  // Navigate to the cart
  await page.locator('[data-test="shopping-cart-link"]').click();

  // Remove items from the cart
  await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
  await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();
  await page.locator('[data-test="remove-sauce-labs-bolt-t-shirt"]').click();

  // Verify that the cart badge no longer exists (empty cart)
  const emptyCartBadge = await page.locator('[data-test="shopping-cart-badge"]');
  await expect(emptyCartBadge).toHaveCount(0);  // Badge should not be present

  // Continue shopping
  await page.locator('[data-test="continue-shopping"]').click();

  // Logout
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.locator('[data-test="logout-sidebar-link"]').click();
});
