import { test, expect } from '@playwright/test';

// Test Checkout confirmation process
test('checkout_successful_test', async ({ page }) => {
  // Navigate to the site and log in
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  // Add items to the shopping cart
  const cartItems = [
    '[data-test="add-to-cart-sauce-labs-backpack"]',
    '[data-test="add-to-cart-sauce-labs-bike-light"]',
    '[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]'
  ];

  for (const item of cartItems) {
    await page.locator(item).click();
  }

  // Proceed to checkout
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="checkout"]').click();

  // Fill in checkout details
  await page.locator('[data-test="firstName"]').fill('Test123');
  await page.locator('[data-test="lastName"]').fill('Test123');
  await page.locator('[data-test="postalCode"]').fill('Test123');
  await page.locator('[data-test="continue"]').click();

  // Complete checkout process
  await page.locator('[data-test="finish"]').click();

  // Verify successful completion
  await expect(page.locator('text=Swag Labs')).toBeVisible();
  await expect(page.locator('text=Checkout: Complete!')).toBeVisible();

  // Final steps after completing checkout
  await page.locator('[data-test="pony-express"]').click();
  await page.locator('[data-test="complete-header"]').click();
  await expect(page.locator('text=Thank you for your order!')).toBeVisible();
  await page.locator('[data-test="complete-text"]').click();
  await expect(page.locator('text=Your order has been dispatched, and will arrive just as fast as the pony can get there!')).toBeVisible();
  await page.locator('[data-test="back-to-products"]').click();

  // Return to the Swag Labs homepage
  await page.locator('[data-test="primary-header"] div').filter({ hasText: 'Swag Labs' }).first().click();

  // Open the menu and log out
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.locator('[data-test="logout-sidebar-link"]').click();
});
